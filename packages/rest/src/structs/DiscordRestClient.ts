import { IncomingHttpHeaders } from "node:http";
import * as Constants from "../utils/constants";
import { request } from "undici";

import { join } from "node:path";

import { DiscordMessagesRestModule } from "./modules/DiscordMessagesRestModule";
import {
  BaseDiscordRestClient,
  BaseDiscordMessagesRestModule,
  RestClientRequestBody,
  RestClientHttpMethod,
} from "@nimb/types";

export class DiscordRestClient implements BaseDiscordRestClient {
  public baseUrl: string = Constants.DISCORD_API_BASE_URL;
  public defaultHeaders: IncomingHttpHeaders;
  public messages: BaseDiscordMessagesRestModule;

  public constructor(token: string) {
    this.defaultHeaders = {
      authorization: `Bot ${token}`,
      "content-type": "application/json",
    };

    this.messages = new DiscordMessagesRestModule(this);
  }

  public async request<T, U = RestClientRequestBody>(
    method: RestClientHttpMethod,
    endpoint: string,
    body?: U
  ): Promise<T> {
    const url = join(this.baseUrl, endpoint);

    const response = await request(url, {
      body: body ? JSON.stringify(body) : null,
      method,
      headers: this.defaultHeaders,
    });

    if (response.statusCode >= 400) {
      const message = await response.body.text();
      throw new Error(
        `Discord rest api error, status: ${response.statusCode} \n Error: ${message}`
      );
    }

    const data = await response.body.json();

    return data as T;
  }

  public async post<T, U = RestClientRequestBody>(endpoint: string, body: U) {
    const response = await this.request<T, U>("POST", endpoint, body);
    return response;
  }

  public async get<T>(endpoint: string) {
    const response = await this.request<T, undefined>("GET", endpoint);
    return response;
  }
}
