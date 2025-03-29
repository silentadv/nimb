import {
  GatewayDispatchEvents,
  GatewayHeartbeat,
  GatewayIdentify,
  GatewayIntentBits,
} from "discord-api-types/v10";
import { Connectable } from "../utils";
import { BaseSocketAdapter, BaseSocketAdapterHandlers } from "./adapter";
import { BaseClient } from "../client/base";
import { BaseShardManager } from "./shard-manager";
import { BaseEventHandler } from "./event";

export interface BaseShardMethods
  extends Connectable,
    BaseSocketAdapterHandlers {
  makeHeartbeat(): GatewayHeartbeat;
  makeIdentify(): GatewayIdentify;
}

export interface BaseShard {
  id: number;
  ping: number;
  connected: boolean;
  totalShardCount: number;

  events: Map<GatewayDispatchEvents, BaseEventHandler>;
  manager: BaseShardManager;
  client: BaseClient;
  socket: BaseSocketAdapter;

  heartbeat: number;
  heartbeatInterval?: NodeJS.Timeout;
  lastHeartbeatTimestamp: number;
}

export interface BaseShardOptions {
  id: number;
  token: string;
  totalShardCount?: number;
  client: BaseClient;
  manager: BaseShardManager;
  intents?: GatewayIntentBits[];
}
