export function getTimestampFromSnowflake(snowflake: string): number {
  return Number((BigInt(snowflake) >> 22n) + 1420070400000n);
}
