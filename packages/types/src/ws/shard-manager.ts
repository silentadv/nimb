import { GatewaySendPayload } from "discord-api-types/v10";
import { BaseShard } from "./shard";
import { BaseClient } from "../client/base";
import { BaseSocketAdapterGatewayEventMap } from "./adapter";

export interface BaseShardManagerMethods {
  latency(): number;
  spawn(id: number): void;
  load(count?: number): Promise<void>;
  broadcast(payload: GatewaySendPayload): void;
  emit<T extends keyof BaseSocketAdapterGatewayEventMap>(
    event: T,
    ...args: BaseSocketAdapterGatewayEventMap[T]
  ): void;
  on<T extends keyof BaseSocketAdapterGatewayEventMap>(
    event: T,
    handler: (...args: BaseSocketAdapterGatewayEventMap[T]) => unknown
  ): void;
}

export interface BaseShardManager extends BaseShardManagerMethods {
  client: BaseClient;
  sequence: number | null;
  totalShardCount: number;
  connectedShardCount: number;
  collection: Map<number, BaseShard>;
}
