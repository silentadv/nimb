import { GatewayMessageCreateDispatchData } from "discord-api-types/v10";
import { MessageResource } from "../resources";
import { BaseEventHandler, BaseShard } from "@nimb/types";

export class MessageCreateEventHandler
  implements BaseEventHandler<GatewayMessageCreateDispatchData>
{
  public constructor(public shard: BaseShard) {}

  public handle(payload: GatewayMessageCreateDispatchData) {
    // message has not created in guild
    if (!payload.guild_id) return;

    const shard = this.shard;
    const guild = shard.client.guilds.get(payload.guild_id);
    const channel = shard.client.channels.get(payload.channel_id);

    // created message guild or channel not cached
    if (!guild || !channel) return;

    const message = new MessageResource(shard.client, guild, channel, payload);
    shard.manager.emit("messageCreate", message);
  }
}
