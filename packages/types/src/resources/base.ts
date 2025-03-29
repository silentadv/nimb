export interface BaseResourceMethods {
  equals(other: BaseResource): boolean;
}

export interface BaseResource extends BaseResourceMethods {
  id: string;
  createdAt: Date;
}
