import { IPropertyBase } from "./ipropertybase";

export class Property implements IPropertyBase{
  id: number;
  sellRent: number;
  name: string;
  propertyType: string;
  bhk: number;
  furnishingType: string;
  price: number;
  builtArea: number;
  CarpetArea: number;
  Address: string;
  Address2?: string;
  city: string;
  FloorNo?: string;
  TotalFloors?: string;
  readyToMove: number;
  AOP?: string;
  MainEntrance?: string;
  Security?: string;
  Gated?: number;
  Maintenance?: number;
  Possession?: string;
  image?: string;
  Description: string;
  PostedOn: string;
  PostedBy: number;

}
