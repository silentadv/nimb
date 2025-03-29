import { BaseChannelResource } from "../resources/channel";
import { BaseGuildResource } from "../resources/guild";
import { BaseDiscordRestClient } from "../rest/discord-client";
import { Connectable } from "../utils";
import { BaseShardManager } from "../ws/shard-manager";

export interface BaseClient extends Connectable {
  rest: BaseDiscordRestClient;
  gateway: BaseShardManager;
  totalShardCount: number;
  guilds: Map<string, BaseGuildResource>;
  channels: Map<string, BaseChannelResource>;
}
