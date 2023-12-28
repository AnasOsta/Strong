import { createContext } from "react";

export interface Data {
  id: string;
  userId: string;
  completed: boolean;
  name: string;
  locationE: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  date: {
    date: string;
    hour: string;
  };
  spor: {
    type: string;
    duration: string;
  };
}

export const DataContext = createContext();
