import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { MyTeamsPage, TeamDetailPage, TeamsPage, TournamentsPage, GamePage, TeamHomePage, StandingsPage } from '../pages/pages';
@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    TeamDetailPage,
    TeamsPage,
    TournamentsPage,
    GamePage,
    TeamHomePage,
    StandingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
    StandingsPage
  ],
  providers: []
})
export class AppModule {}
