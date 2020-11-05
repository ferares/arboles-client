import { LatLng } from 'leaflet';

export class NominatimResponse {
  constructor(
    public latlng: LatLng,
    public displayName: string,
    public type: string,
    public address: object,
  ) {}
}
