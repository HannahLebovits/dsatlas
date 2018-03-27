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
  email: string;
  tel: string;
  LatLng: LatLng;

  constructor(props?: any) {
    this._id = props._id;
    this.name = props.name;
    this.lat = props.lat;
    this.lon = props.lon;
    this.city = props.city;
    this.state = props.state;
    this.members = props.members;
    this.facebook = props.facebook;
    this.twitter = props.twitter;
    this.website = props.website;
    this.email = props.email;
    this.tel = props.tel;
  }
}
