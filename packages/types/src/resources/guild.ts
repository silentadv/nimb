import { BaseResource } from "./base";
import { BaseChannelResource } from "./channel";

export interface BaseGuildResourceMethods {}

export interface BaseGuildResource
  extends BaseResource,
    BaseGuildResourceMethods {
  name: string;
  channels: Map<string, BaseChannelResource>;
}
