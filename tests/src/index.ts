import { Client } from "@nimb/core";
import { GatewayIntentBits } from "discord-api-types/v10";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
  token: process.env.TOKEN!,
  totalShardCount: 2,
});

client.gateway.on("shardConnect", (shard) =>
  console.log(`shard: ${shard.id} is connected.`)
);

client.gateway.on("connect", (_) => console.log(`client is connected.`));
client.gateway.on("messageCreate", (message) => {
  if (message.content.startsWith("!ping"))
    return message.channel.write(
      `Pong! Latency: ${client.gateway.latency()} ms.`
    );
});

client.connect();
