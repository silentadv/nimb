import { APIChannel } from "discord-api-types/v10";
import { getTimestampFromSnowflake } from "../utils/get-timestamp-from-snowflake";
import { MessageResource } from "./MessageResource";
import {
  BaseChannelResource,
  BaseClient,
  BaseGuildResource,
} from "@nimb/types";

export class ChannelResource implements BaseChannelResource {
  public id: string;
  public name: string;
  public createdAt: Date;

  public constructor(
    private client: BaseClient,
    public guild: BaseGuildResource,
    payload: APIChannel
  ) {
    const creationTimestamp = getTimestampFromSnowflake(payload.id);

    this.id = payload.id;
    this.name = payload.name ?? "Unnamed";
    this.createdAt = new Date(creationTimestamp);
    this.guild = guild;
  }

  public equals(other: BaseChannelResource) {
    return this.id === other.id;
  }

  public async write(content: string) {
    const payload = await this.client.rest.messages.sendMessage(
      this.id,
      content
    );

    const message = new MessageResource(this.client, this.guild, this, payload);

    return message;
  }
}
