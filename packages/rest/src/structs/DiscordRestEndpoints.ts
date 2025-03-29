export const DiscordRestEndpoints = {
  POSTMessage: (channelId: string) => `/channels/${channelId}/messages`,
  GETChannel: (channelId: string) => `/channels/${channelId}`,
};
