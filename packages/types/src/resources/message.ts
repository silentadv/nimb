import { BaseResource } from "./base";
import { BaseChannelResource } from "./channel";
import { BaseGuildResource } from "./guild";

export interface BaseMessageResourceMethods {}

export interface BaseMessageResource
  extends BaseResource,
    BaseMessageResourceMethods {
  content: string;
  channel: BaseChannelResource;
  guild: BaseGuildResource;
}
