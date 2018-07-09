import { LatLng } from 'leaflet';

export class ElectedModel {
  _id: string;
  name: string;
  lat: number;
  lon: number;
  city: string;
  state: string;
  member: boolean;
  years: number[];
  url: string;
  level: string;
  position: string;
  LatLng: LatLng;

  constructor(props?: any) {
    this._id = props._id;
    this.name = props.name;
    this.lat = props.lat;
    this.lon = props.lon;
    this.city = props.city;
    this.state = props.state;
    this.member = props.member;
    this.years = props.years;
    this.url = props.url;
    this.level = props.level;
    this.position = props.position;
  }
}
