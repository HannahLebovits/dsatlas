import { LatLng } from 'leaflet';

export class ChapterModel {
  _id: string;
  name: string;
  lat: number;
  lon: number;
  city: string;
  state: string;
  members: number;
  facebook: string;
  twitter: string;
  website: string;
  LatLng: LatLng;
}
