import { ClientAttributes } from "../client";
import { BaseMessageResource } from "../resources";

export interface BaseCommandContextMethods {
  write(content: string): Promise<BaseMessageResource>;
}

export interface BaseCommandContext extends BaseCommandContextMethods {
  client: ClientAttributes;
}

export interface BaseCommandMethods {
  execute(ctx: BaseCommandContext): unknown;
}

export interface BaseCommand extends BaseCommandMethods {
  name: string;
  description?: string;
}
