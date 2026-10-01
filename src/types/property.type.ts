export type PropertyStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

export interface IPropertyOwner {
  id: string;
  name: string;
  email: string;
}

export interface IProperty {
  id: string;
  ownerId: string;
  title: string;
  address: string;
  city: string;
  description: string | null;
  status: PropertyStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  owner?: IPropertyOwner;
}