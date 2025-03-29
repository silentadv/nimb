import { GatewayIdentifyProperties } from "discord-api-types/v10";

export const WSS_GATEWAY_URL = "wss://gateway.discord.gg/?v=10&encoding=json";

export const SHARD_IDENTIFY_LIBRARY_NAME = "sunshiny";

export const SHARD_IDENTIFY_PROPERTIES: GatewayIdentifyProperties = {
  os: "linux",
  browser: SHARD_IDENTIFY_LIBRARY_NAME,
  device: SHARD_IDENTIFY_LIBRARY_NAME,
};

export const SHARD_CONNECTION_DELAY_IN_MS = 6500; // 6.5 seconds
