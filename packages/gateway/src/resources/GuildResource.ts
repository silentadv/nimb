import { APIGuild } from "discord-api-types/v10";
import { getTimestampFromSnowflake } from "../utils/get-timestamp-from-snowflake";
import {
  BaseGuildResource,
  BaseChannelResource,
  BaseClient,
} from "@nimb/types";

export class GuildResource implements BaseGuildResource {
  public id: string;
  public name: string;
  public createdAt: Date;
  public channels: Map<string, BaseChannelResource>;

  public constructor(private client: BaseClient, payload: APIGuild) {
    const creationTimestamp = getTimestampFromSnowflake(payload.id);

    this.id = payload.id;
    this.name = payload.name;
    this.channels = new Map();
    this.createdAt = new Date(creationTimestamp);
  }

  public equals(other: BaseGuildResource) {
    return this.id === other.id;
  }
}
