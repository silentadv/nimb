import { GatewayDispatchPayload } from "discord-api-types/v10";
import { BaseShard } from "./shard";

export type BaseEventHandlerPayloadData = GatewayDispatchPayload["d"];

export interface BaseEventHandlerMethods<
  T extends BaseEventHandlerPayloadData
> {
  handle(payload: T): void;
}

export interface BaseEventHandler<
  T extends BaseEventHandlerPayloadData = BaseEventHandlerPayloadData
> extends BaseEventHandlerMethods<T> {
  shard: BaseShard;
}
