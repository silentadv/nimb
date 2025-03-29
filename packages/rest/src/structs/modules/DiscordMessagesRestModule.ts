import {
  RESTPostAPIChannelMessageJSONBody,
  RESTPostAPIChannelMessageResult,
} from "discord-api-types/v10";
import { DiscordRestEndpoints } from "../DiscordRestEndpoints";
import {
  BaseDiscordMessagesRestModule,
  BaseDiscordRestClient,
} from "@nimb/types";

export class DiscordMessagesRestModule
  implements BaseDiscordMessagesRestModule
{
  public constructor(public restClient: BaseDiscordRestClient) {}

  public async sendMessage(
    channelId: string,
    content: string
  ): Promise<RESTPostAPIChannelMessageResult> {
    const response = await this.restClient.post<
      RESTPostAPIChannelMessageResult,
      RESTPostAPIChannelMessageJSONBody
    >(DiscordRestEndpoints.POSTMessage(channelId), { content });

    return response;
  }
}
