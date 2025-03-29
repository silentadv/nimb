import { GatewayIntentBits } from "discord-api-types/v10";
import { BaseClient } from "./base";
import { BaseDiscordRestClient } from "../rest/discord-client";
import { Connectable } from "../utils";

export interface ClientMethods extends Connectable {}

export interface ClientAttributes extends ClientMethods, BaseClient {
  intents: GatewayIntentBits[];
  token: string;
}

export interface ClientOptions {
  intents: GatewayIntentBits[];
  token: string;
  totalShardCount?: number;
}
