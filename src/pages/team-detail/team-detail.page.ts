import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MyTeamsPage } from '../pages';
@Component({
  selector: 'team-detail',
  templateUrl: 'team-detail.page.html'
})
export class TeamDetailPage {
  
  team: any;

  constructor(public nav: NavController, private navParams: NavParams) {
    this.team = this.navParams.data;
    console.log(navParams);
  }

  /*goHome(){
    //this.nav.push(MyTeamsPage);
    //this.nav.popToRoot();
    this.nav.parent.parent.popToRoot();
  }*/
}
