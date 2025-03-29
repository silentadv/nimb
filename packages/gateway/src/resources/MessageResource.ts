import {
  BaseMessageResource,
  BaseClient,
  BaseGuildResource,
  BaseChannelResource,
} from "@nimb/types";
import { APIMessage } from "discord-api-types/v10";

export class MessageResource implements BaseMessageResource {
  public id: string;
  public content: string;
  public createdAt: Date;

  public constructor(
    private client: BaseClient,
    public guild: BaseGuildResource,
    public channel: BaseChannelResource,
    payload: APIMessage
  ) {
    this.id = payload.id;
    this.content = payload.content;
    this.createdAt = new Date(payload.timestamp);
  }

  public equals(other: BaseMessageResource) {
    return this.id === other.id;
  }
}
