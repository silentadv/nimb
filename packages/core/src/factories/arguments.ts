import {
  PartialPrefixedCommandArgument,
  PrefixedCommandArgument,
} from "@nimb/types";

export interface BaseArgumentOptions {
  description?: string;
}

export function createStringArgument(
  options?: BaseArgumentOptions
): PartialPrefixedCommandArgument<"String"> {
  return {
    type: "String",
    description: options?.description,
    resolver: (raw) => raw,
  };
}

export function createNumberArgument(
  options?: BaseArgumentOptions
): PartialPrefixedCommandArgument<"Number"> {
  return {
    type: "Number",
    description: options?.description,
    resolver: parseInt,
  };
}

export function createBooleanArgument(
  options?: BaseArgumentOptions
): PartialPrefixedCommandArgument<"Boolean"> {
  return {
    type: "Boolean",
    description: options?.description,
    resolver: Boolean,
  };
}
