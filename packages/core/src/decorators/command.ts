import "reflect-metadata";
import {
  PartialPrefixedCommandArgument,
  PrefixedCommandArgument,
  PrefixedCommandOptions,
} from "@nimb/types";
import { PrefixedCommand } from "../structs";

interface BaseClass {
  new (...args: any[]): {};
}

export interface InjectionData {
  key: string;
  index: number;
}

export const COMMAND_METADATA_KEY = "nimb:commands:md";
export const ARGUMENT_METADATA_KEY = "nimb:arguments:md";
export const INJECT_METADATA_KEY = "nimb:injects:md";

export function Command({
  name,
  description,
  aliases = [],
}: PrefixedCommandOptions) {
  return <T extends BaseClass>(constructor: T) => {
    Reflect.defineMetadata(
      COMMAND_METADATA_KEY,
      { name, description, aliases },
      constructor
    );
  };
}

export function Arguments(
  rawArgs: Record<string, PartialPrefixedCommandArgument>
) {
  return <T extends BaseClass>(constructor: T) => {
    const args: PrefixedCommandArgument[] = Object.entries(rawArgs).map(
      ([name, partialArgument]) => ({ name, ...partialArgument })
    );

    Reflect.defineMetadata(ARGUMENT_METADATA_KEY, args, constructor);
  };
}

export function Inject(argument: string) {
  return (target: PrefixedCommand, key: string, index: number) => {
    const injections: InjectionData[] =
      Reflect.getMetadata(INJECT_METADATA_KEY, target, key) || [];
    injections.push({ index, key: argument });

    Reflect.defineMetadata(INJECT_METADATA_KEY, injections, target, key);
  };
}
