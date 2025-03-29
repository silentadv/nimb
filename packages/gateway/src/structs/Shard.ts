import {
  GatewayDispatchEvents,
  GatewayHeartbeat,
  GatewayIdentify,
  GatewayIdentifyData,
  GatewayIntentBits,
  GatewayOpcodes,
  GatewayReceivePayload,
} from "discord-api-types/v10";

import * as Constants from "../utils/constants";
import { RawData } from "ws";
import { SocketAdapter } from "./SocketAdapter";

import {
  GuildCreateEventHandler,
  MessageCreateEventHandler,
  ReadyEventHandler,
} from "../events";

import {
  BaseShard,
  BaseEventHandler,
  BaseShardManager,
  BaseClient,
  BaseSocketAdapter,
  BaseShardOptions,
} from "@nimb/types";

export class Shard implements BaseShard {
  public id: number;
  public token: string;
  public ping: number = -1;
  public connected: boolean = false;
  public totalShardCount: number;
  public intents: GatewayIntentBits[];

  public events: Map<GatewayDispatchEvents, BaseEventHandler> = new Map();
  public manager: BaseShardManager;
  public client: BaseClient;
  public socket: BaseSocketAdapter;

  public heartbeat: number = 0;
  public heartbeatInterval?: NodeJS.Timeout;
  public lastHeartbeatTimestamp: number = 0;

  public constructor({
    id,
    totalShardCount = 1,
    token,
    manager,
    client,
    intents = [],
  }: BaseShardOptions) {
    this.socket = new SocketAdapter(manager, {
      open: this.handleOpenEvent.bind(this),
      message: this.handleMessageEvent.bind(this),
      close: this.handleCloseEvent.bind(this),
      error: this.handleErrorEvent.bind(this),
    });

    this.id = id;
    this.totalShardCount = totalShardCount;
    this.token = token;
    this.manager = manager;
    this.client = client;
    this.intents = intents;

    this.setupEventHandlers();
  }

  public setupEventHandlers() {
    this.events.set(GatewayDispatchEvents.Ready, new ReadyEventHandler(this));
    this.events.set(
      GatewayDispatchEvents.MessageCreate,
      new MessageCreateEventHandler(this)
    );
    this.events.set(
      GatewayDispatchEvents.GuildCreate,
      new GuildCreateEventHandler(this)
    );
  }

  public connect() {
    this.socket.connect();
  }

  public close() {
    clearInterval(this.heartbeatInterval);
    // this.socket.close();
  }

  private makeHeartbeat() {
    const payload: GatewayHeartbeat = {
      op: GatewayOpcodes.Heartbeat,
      d: this.manager.sequence,
    };

    return payload;
  }

  private async handleErrorEvent(error: Error) {
    console.error(error.message);
    throw error;
  }

  private async handleCloseEvent(code: number, reason: Buffer) {
    console.log(code, reason.toString());
  }

  private async handleOpenEvent() {
    const payload = this.makeIdentify();
    this.socket.send(payload);
  }

  private async handleMessageEvent(message: RawData) {
    const data: GatewayReceivePayload = JSON.parse(message.toString());

    if (data.s) this.manager.sequence = data.s;
    if (data.t && this.events.has(data.t))
      this.events.get(data.t)!.handle(data.d);

    switch (data.op) {
      case GatewayOpcodes.Hello:
        this.heartbeat = data.d.heartbeat_interval;
        this.heartbeatInterval = setInterval(() => {
          const payload = this.makeHeartbeat();

          this.lastHeartbeatTimestamp = Date.now();
          this.socket.send(payload);
        }, this.heartbeat * Math.random()); // jitter;
        break;
      case GatewayOpcodes.HeartbeatAck:
        this.ping = Date.now() - this.lastHeartbeatTimestamp;
        break;
    }
  }

  private makeIdentify() {
    const intents = this.intents.reduce((acc, curr) => acc | curr, 0);

    const data: GatewayIdentifyData = {
      intents,
      shard: [this.id, this.totalShardCount],
      token: this.token,
      properties: Constants.SHARD_IDENTIFY_PROPERTIES,
    };

    const payload: GatewayIdentify = {
      op: GatewayOpcodes.Identify,
      d: data,
    };

    return payload;
  }
}
