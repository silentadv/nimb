import { GatewayGuildCreateDispatchData } from "discord-api-types/v10";
import { ChannelResource, GuildResource } from "../resources";
import { BaseEventHandler, BaseShard } from "@nimb/types";

export class GuildCreateEventHandler
  implements BaseEventHandler<GatewayGuildCreateDispatchData>
{
  public constructor(public shard: BaseShard) {}

  public handle(payload: GatewayGuildCreateDispatchData) {
    const guild = new GuildResource(this.shard.client, payload);
    this.shard.client.guilds.set(guild.id, guild);

    payload.channels.forEach((channelPayload) => {
      const channel = new ChannelResource(
        this.shard.client,
        guild,
        channelPayload
      );
      this.shard.client.channels.set(channel.id, channel);
    });
  }
}
