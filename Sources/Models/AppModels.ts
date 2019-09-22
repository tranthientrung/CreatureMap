export type CoordinateTypes = {
  latitude: number;
  longitude: number;
};

export type CreatureTypes = {
  creatureID: number;
  coordinates: Array<CoordinateTypes>;
  pictures: Array<string>;
  scienceName: string;
  englishName: string;
  commonName: string;
  distribution: string;
  shapeCharacteristics: string;
  biologicalCharacteristics: string;
  reproductionInformation: string;
  livingEnvironment: string;
  sampleStatus: string;
  sampleStorage: string;
};

export type GetCreatureResponseTypes = {
  status: number;
  data: CreatureTypes;
};

export type SearchCreatureResponseTypes = {
  status: number;
  data: Array<CreatureTypes>;
};
