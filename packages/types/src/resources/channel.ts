import { BaseResource } from "./base";
import { BaseGuildResource } from "./guild";
import { BaseMessageResource } from "./message";

export interface BaseChannelResourceMethods {
  write(content: string): Promise<BaseMessageResource>;
}

export interface BaseChannelResource
  extends BaseResource,
    BaseChannelResourceMethods {
  name: string;
  guild: BaseGuildResource;
}
