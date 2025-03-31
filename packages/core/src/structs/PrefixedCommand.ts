import {
  PrefixedCommandArgument,
  PrefixedCommand as PrefixedCommandAttributes,
  PrefixedCommandContext,
  PrefixedCommandOptions,
} from "@nimb/types";

import "reflect-metadata";
import {
  ARGUMENT_METADATA_KEY,
  COMMAND_METADATA_KEY,
  INJECT_METADATA_KEY,
  InjectionData,
} from "../decorators";

export abstract class PrefixedCommand implements PrefixedCommandAttributes {
  public aliases!: string[];
  public args!: PrefixedCommandArgument[];
  public name!: string;
  public description?: string;

  public abstract execute(
    ctx: PrefixedCommandContext,
    ...args: unknown[]
  ): unknown;

  public wrap() {
    const defaultExecutor = this.execute;

    const commandProperties: PrefixedCommandOptions = Reflect.getMetadata(
      COMMAND_METADATA_KEY,
      this.constructor
    );

    if (!commandProperties)
      throw new Error("You must to define command options with @Command.");

    this.name = commandProperties.name;
    this.aliases = commandProperties.aliases || [];
    this.description = commandProperties.description;

    const commandArguments: PrefixedCommandArgument[] =
      Reflect.getMetadata(ARGUMENT_METADATA_KEY, this.constructor) || [];
    const commandInjections: InjectionData[] =
      Reflect.getMetadata(INJECT_METADATA_KEY, this, "execute") || [];

    this.execute = function (ctx: PrefixedCommandContext, ...args: unknown[]) {
      const resolvedArgs = [...args];
      commandInjections.forEach((injection) => {
        const injectionArgument = commandArguments.find(
          (argument) => argument.name === injection.key
        );

        if (!injectionArgument) return;

        resolvedArgs[injection.index - 1] = injectionArgument.resolver(
          args[injection.index - 1] as string
        );
      });

      return defaultExecutor.apply(this, [ctx, ...resolvedArgs]);
    };
  }
}
