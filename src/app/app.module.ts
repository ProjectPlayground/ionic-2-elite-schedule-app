import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { MyApp } from './app.component';

import { MyTeamsPage, TeamDetailPage, TeamsPage, TournamentsPage, GamePage, TeamHomePage, StandingsPage, MapPage } from '../pages/pages';
import { EliteApi, UserSettings } from './shared/shared';
@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    TeamDetailPage,
    TeamsPage,
    TournamentsPage,
    GamePage,
    TeamHomePage,
    StandingsPage,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCEa8esjMkV6Nb3HOsFytOOxy9aza4B64s'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    TeamDetailPage,
    TeamsPage,
    TournamentsPage,
    GamePage,
    TeamHomePage,
    StandingsPage,
    MapPage
  ],
  providers: [
    EliteApi,
    Storage,
    UserSettings]
})
export class AppModule { }
