import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HttpModule } from '@angular/http';

import { MyTeamsPage, TournamentsPage } from '../pages/pages';
import { EliteApi } from './shared/elite-api.service';

@Component({
  templateUrl: 'app.html',
  providers: [
    EliteApi,
    HttpModule
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: Component = MyTeamsPage;

  constructor(public platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  goHome()
  {
    this.nav.push(MyTeamsPage)
  }

  goToTournaments(){
    this.nav.push(TournamentsPage)
  }
}
