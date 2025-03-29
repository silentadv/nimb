import { PrefixedCommandArgument, PrefixedCommandOptions } from "@nimb/types";

interface BaseClass {
  new (...args: any[]): {};
}

export function Command({
  name,
  description,
  aliases = [],
}: PrefixedCommandOptions) {
  return <T extends BaseClass>(constructor: T) => {
    return class extends constructor {
      name = name;
      description = description;
      aliases = aliases;
    };
  };
}

export function Arguments(args: PrefixedCommandArgument[]) {
  return <T extends BaseClass>(constructor: T) => {
    return class extends constructor {
      arguments = args;
    };
  };
}
