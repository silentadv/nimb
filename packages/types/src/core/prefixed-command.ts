import { BaseChannelResource, BaseMessageResource } from "../resources";
import { BaseCommand, BaseCommandContext } from "./command";

export type PrefixedCommandArgumentType = "String" | "Number" | "Boolean";

export type PrefixedCommandArgumentResolver<
  T extends PrefixedCommandArgumentType
> = (raw: string) => PrefixedCommandArgumentTypeMap[T];

export interface PrefixedCommandArgumentTypeMap {
  String: string;
  Number: number;
  Boolean: boolean;
}

export interface PrefixedCommandArgument<
  T extends PrefixedCommandArgumentType = "String"
> {
  name: string;
  type: T;
  resolver: PrefixedCommandArgumentResolver<T>;
  description?: string;
}

export interface PrefixedCommandContext extends BaseCommandContext {
  message: BaseMessageResource;
  channel: BaseChannelResource;
}

export interface PrefixedCommandMethods extends BaseCommand {
  execute(ctx: PrefixedCommandContext): unknown;
}

export interface PrefixedCommand extends PrefixedCommandMethods {
  aliases: string[];
  arguments: PrefixedCommandArgument[];
}

export interface PrefixedCommandOptions {
  name: string;
  description?: string;
  aliases?: string[];
}
