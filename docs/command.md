## Prefixed Commands

> Simple Command

```ts
@Command({ name: "ping", aliases: ["latency"] })
export class PingCommand extends PrefixedCommand {
  public execute(ctx: PrefixedCommandContext) {
    const latency = ctx.client.gateway.latency();
    return ctx.write(`Pong! Latency: ${latency}ms.`);
  }
}
```

> Command with arguments

```ts
@Command({ name: "balance", aliases: ["bal"] })
@Arguments({
  user: createUserArgument({ default: "author" }),
})
export class BalanceCommand extends PrefixedCommand {
  public execute(ctx: PrefixedCommandContext, @Inject("user") user: User) {
    const balance = Math.floor(Math.random() * 100);

    if (ctx.isAuthor(user))
      return ctx.write(`You have ${balance} in your balance.`);

    return ctx.write(`${user.username} has ${balance} in balance`);
  }
}
```
