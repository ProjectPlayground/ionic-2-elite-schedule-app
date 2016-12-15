import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HttpModule } from '@angular/http';

import { MyTeamsPage, TeamHomePage, TournamentsPage } from '../pages/pages';
import { EliteApi, UserSettings } from './shared/shared';

@Component({
  templateUrl: 'app.html',
  providers: [
    EliteApi,
    UserSettings,
    HttpModule
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  rootPage: any = MyTeamsPage;

  constructor(
    private events: Events,
    private loadingController: LoadingController,
    private eliteApi: EliteApi,
    public platform: Platform,
    private userSettings: UserSettings) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.userSettings.initStorage().then(() => {
        this.rootPage = MyTeamsPage;
        this.refreshFavorites();
        this.events.subscribe('favorites:changed', () => this.refreshFavorites());
      });
    });
  }

  refreshFavorites() {
    this.userSettings.getAllFavorites().then(favs => this.favoriteTeams = favs);
  }


  goHome() {
    this.nav.push(MyTeamsPage)
  }

  goToTeam(favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(l => this.nav.push(TeamHomePage, favorite.team));
  }

  goToTournaments() {
    this.nav.push(TournamentsPage)
  }
}
