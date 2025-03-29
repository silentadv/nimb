import { IncomingHttpHeaders } from "node:http";
import { RestClient } from "./client";
import { RESTPostAPIChannelMessageResult } from "discord-api-types/v10";

export interface BaseDiscordRestModules {
  messages: BaseDiscordMessagesRestModule;
}

export interface BaseDiscordRestClient
  extends RestClient,
    BaseDiscordRestModules {
  defaultHeaders: IncomingHttpHeaders;
}

export interface BaseDiscordMessagesRestModuleMethods {
  sendMessage(
    channelId: string,
    content: string
  ): Promise<RESTPostAPIChannelMessageResult>;
}

export interface BaseDiscordMessagesRestModule
  extends BaseDiscordMessagesRestModuleMethods {
  restClient: BaseDiscordRestClient;
}
