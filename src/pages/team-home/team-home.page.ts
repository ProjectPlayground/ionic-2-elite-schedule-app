import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StandingsPage, TeamDetailPage } from '../pages.ts';
@Component({
  selector: 'team-home',
  templateUrl: 'team-home.page.html'
})
export class TeamHomePage {
  
  team: any;
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;

  constructor(public nav: NavController, private navParams: NavParams) {
    this.team = this.navParams.data;
  }

  goHome(){
    //this.nav.push(MyTeamsPage);
    this.nav.popToRoot();
  }
}
