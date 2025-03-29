import {
  PrefixedCommandArgument,
  PrefixedCommand as PrefixedCommandAttributes,
  PrefixedCommandContext,
} from "@nimb/types";

export abstract class PrefixedCommand implements PrefixedCommandAttributes {
  public aliases!: string[];
  public arguments!: PrefixedCommandArgument[];
  public name!: string;
  public description?: string;

  public abstract execute(ctx: PrefixedCommandContext): unknown;
}
