import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';

import { TeamHomePage } from '../pages';
import { EliteApi } from '../../app/shared/elite-api.service';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.page.html'
})
export class TeamsPage {
  private allTeams: any;
  private allTeamDivisions: any;
  teams = [];
  queryText: string = '';

  constructor(private nav: NavController,
              private navParams: NavParams,
              private loadingController: LoadingController,
              private eliteApi: EliteApi) { }
  
  ionViewDidLoad(){
    const selectedTourney = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Getting data...'
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
        this.allTeams = data.teams;
        this.allTeamDivisions =
          _.chain(data.teams)
           .groupBy('division')
           .toPairs()
           .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
           .value();
  
        this.teams = this.allTeamDivisions;
        console.log('division teams', this.teams);
        loader.dismiss();
      });
    });
  }

  itemTapped($event, team){
    this.nav.push(TeamHomePage, team);
  }

  updateTeams(){
    const queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });

    this.teams = filteredTeams;
  }
}
