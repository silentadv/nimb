import { EventEmitter } from "stream";
import { Shard } from "./Shard";
import { GatewaySendPayload } from "discord-api-types/v10";
import * as Constants from "../utils/constants";

import {
  BaseShardManager,
  BaseSocketAdapterGatewayEventMap,
  ClientAttributes,
} from "@nimb/types";

export class ShardManager
  extends EventEmitter<BaseSocketAdapterGatewayEventMap>
  implements BaseShardManager
{
  public totalShardCount: number;
  public connectedShardCount: number;

  public sequence: number | null = null;
  public collection: Map<number, Shard> = new Map();

  public constructor(public client: ClientAttributes) {
    super();

    this.totalShardCount = client.totalShardCount;
    this.connectedShardCount = 0;
  }

  public spawn(id: number) {
    const shard = new Shard({
      id,
      token: this.client.token,
      totalShardCount: this.client.totalShardCount,
      manager: this,
      client: this.client,
      intents: this.client.intents,
    });

    shard.connect();

    this.connectedShardCount++;
    this.collection.set(id, shard);
  }

  public async load(count?: number) {
    const shardCount = count ?? this.client.totalShardCount;

    for (let i = 0; i < shardCount; i++) {
      this.spawn(i);

      // sleep after shard spawn
      if (i < shardCount - 1)
        await new Promise((resolve) => {
          setTimeout(
            () => resolve(null),
            Constants.SHARD_CONNECTION_DELAY_IN_MS
          );
        });
    }
  }

  public broadcast(payload: GatewaySendPayload) {
    this.collection.forEach((shard) => shard.socket.send(payload));
  }

  public latency() {
    const totalLatency = Array.from(this.collection.values()).reduce(
      (acc, shard) => acc + shard.ping,
      0
    );

    const averageLatency = Math.floor(totalLatency / this.totalShardCount);

    return averageLatency;
  }
}
