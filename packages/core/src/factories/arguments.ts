import { PrefixedCommandArgument } from "@nimb/types";

export interface BaseArgumentOptions {
  name: string;
  description?: string;
}

export function createStringArgument({
  name,
  description,
}: BaseArgumentOptions): PrefixedCommandArgument<"String"> {
  return { name, type: "String", description, resolver: (raw) => raw };
}

export function createNumberArgument({
  name,
  description,
}: BaseArgumentOptions): PrefixedCommandArgument<"Number"> {
  return {
    name,
    type: "Number",
    description,
    resolver: parseInt,
  };
}

export function createBooleanArgument({
  name,
  description,
}: BaseArgumentOptions): PrefixedCommandArgument<"Boolean"> {
  return {
    name,
    type: "Boolean",
    description,
    resolver: Boolean,
  };
}
