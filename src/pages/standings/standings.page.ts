import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';

import { EliteApi } from './../../app/shared/elite-api.service';
@Component({
  selector: 'standings',
  templateUrl: 'standings.page.html'
})
export class StandingsPage {
  allStandings: any[];
  divisionFilter: string = '';
  standings: any[];
  team: any;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private eliteApi: EliteApi) {
  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    const tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;

    /*this.allStandings = 
      _.chain(this.standings)
       .groupBy('division')
       .toPairs()
       .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
       .value();*/

    this.allStandings = tourneyData.standings;

    this.filterDivision();
  }

  filterDivision() {
    if (this.divisionFilter === 'all') {
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }

  getHeader(record, recordIndex, records) {
    if (recordIndex === 0 || record.division !== records[recordIndex - 1].division) {
      return record.division;
    }
    return null;
  }
}
