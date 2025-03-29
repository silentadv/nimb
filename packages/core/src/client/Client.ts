import { GatewayIntentBits } from "discord-api-types/v10";
import {
  BaseChannelResource,
  BaseDiscordRestClient,
  BaseGuildResource,
  BaseShardManager,
  ClientAttributes,
  ClientOptions,
} from "@nimb/types";

import { ShardManager } from "@nimb/gateway";
import { DiscordRestClient } from "@nimb/rest";

export class Client implements ClientAttributes {
  public intents: GatewayIntentBits[];
  public token: string;
  public totalShardCount: number;
  public rest: BaseDiscordRestClient;
  public gateway: BaseShardManager;

  // simple cache
  public guilds: Map<string, BaseGuildResource> = new Map();
  public channels: Map<string, BaseChannelResource> = new Map();

  public constructor({ intents, token, totalShardCount = 1 }: ClientOptions) {
    this.intents = intents;
    this.token = token;
    this.totalShardCount = totalShardCount;
    this.rest = new DiscordRestClient(token);
    this.gateway = new ShardManager(this);
  }

  public connect() {
    this.gateway.load();
  }
}
