export interface IPropertyBase {
  id: number;
  sellRent: number;
  photo?: string;
  name: string;
  propertyType: string;
  furnishingType: string;
  price: number;
  bhk: number;
  builtArea: number;
  city: string;
  readyToMove: boolean;
  estPossessionOn?: string;
}
