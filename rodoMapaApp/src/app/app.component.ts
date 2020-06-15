import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Iniciar nova viagem',
      url: '/inicia-viagem',
      icon: 'mail'
    },
    {
      title: 'Abrir viagem salva',
      url: '/abrir-viagem',
      icon: 'paper-plane'
    },
    {
      title: 'Meus locais',
      url: '/meus-locais',
      icon: 'heart'
    },
    {
      title: 'Notificaçōes',
      url: '/notificacoes',
      icon: 'archive'
    },
    {
      title: 'Contatos de Emergência',
      url: '/contatos-de-emergencia',
      icon: 'trash'
    },
  ];
  public labels = ['Configurações', 'Avalie-nos'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
