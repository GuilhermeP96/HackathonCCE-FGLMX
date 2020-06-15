import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';


@Component({
  selector: 'app-inicia-viagem',
  templateUrl: './inicia-viagem.page.html',
  styleUrls: ['./inicia-viagem.page.scss'],
})
export class IniciaViagemPage implements OnInit {

  map: GoogleMap;
  public dados: any = {};

  constructor() { }

  ngOnInit() {
    this.loadMap(-23.5342385,-46.895581);
  }

  loadMap(latitude, longitude) {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyATfhOTs0X1l9bP5wy56kH1kfNNx_pgUcs',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyATfhOTs0X1l9bP5wy56kH1kfNNx_pgUcs'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: latitude,
          lng: longitude
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: latitude,
        lng: longitude
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }

}
