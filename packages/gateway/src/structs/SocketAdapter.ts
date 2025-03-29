import * as Constants from "../utils/constants";
import { WebSocket } from "ws";
import { GatewaySendPayload } from "discord-api-types/v10";
import {
  BaseShardManager,
  BaseSocketAdapter,
  BaseSocketAdapterHandlers,
} from "@nimb/types";

export class SocketAdapter implements BaseSocketAdapter {
  public socket: WebSocket | null = null;

  public constructor(
    public manager: BaseShardManager,
    public handlers: BaseSocketAdapterHandlers
  ) {}

  public send(payload: GatewaySendPayload): void {
    if (!this.socket) throw new Error("Websocket is not connected.");
    this.socket.send(JSON.stringify(payload));
  }

  public connect() {
    this.socket = new WebSocket(Constants.WSS_GATEWAY_URL);
    this.socket
      .on("open", this.handlers.open)
      .on("close", this.handlers.close)
      .on("message", this.handlers.message)
      .on("error", this.handlers.error);
  }
}
