export type MedicationType = {
  id: string;
  name: string;
  apteka: string;
  address: string;
  phone: string;
  workTime: string;
  price: string;
  updateTime: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};

export type MedicationMarkerType = {
  id: string;
  address: string;
  price: string;
  apteka: string;
  phone: string;
  workTime: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};

export type GetMedicationsResponseType = {
  status: string;
  messages: string;
  data: {
    parsedMedications: MedicationType[];
    parsedMapMarkers: {
      [key: string]: MedicationMarkerType;
    };
  };
};

export type SortByNamesType = "name" | "price" | "apteka";

export type RegionType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
