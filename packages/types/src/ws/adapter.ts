import { GatewaySendPayload } from "discord-api-types/v10";
import type { RawData, WebSocket } from "ws";
import { Connectable } from "../utils";
import { BaseClient } from "../client/base";
import { BaseShard } from "./shard";
import { BaseMessageResource } from "../resources";

export interface BaseSocketAdapterHandlers {
  open(): Promise<void>;
  message(message: RawData, isBinary: boolean): Promise<void>;
  close(code: number, reason: Buffer): Promise<void>;
  error(error: Error): Promise<void>;
}

export interface BaseSocketAdapterMethods extends Connectable {
  send(payload: GatewaySendPayload): void;
}

export interface BaseSocketAdapter extends BaseSocketAdapterMethods {
  socket: WebSocket | null;
  handlers: BaseSocketAdapterHandlers;
}

export interface BaseSocketAdapterGatewayEventMap {
  connect: [client: BaseClient];
  shardConnect: [shard: BaseShard];
  messageCreate: [message: BaseMessageResource];
}
