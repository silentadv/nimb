import { BaseEventHandler, BaseShard } from "@nimb/types";
import { GatewayReadyDispatchData } from "discord-api-types/v10";

export class ReadyEventHandler
  implements BaseEventHandler<GatewayReadyDispatchData>
{
  public constructor(public shard: BaseShard) {}

  public handle(payload: GatewayReadyDispatchData) {
    const shard = this.shard;

    shard.connected = true;
    shard.manager.emit("shardConnect", shard);

    if (shard.manager.connectedShardCount >= shard.manager.totalShardCount)
      shard.manager.emit("connect", shard.client);
  }
}
