import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import _ from 'lodash';

import { GamePage } from '../pages';
import { EliteApi } from './../../app/shared/elite-api.service';

@Component({
  selector: 'team-detail',
  templateUrl: 'team-detail.page.html'
})
export class TeamDetailPage {
  
  games: any[];
  team: any;
  private tourneyData: any;

  constructor(private nav: NavController, private navParams: NavParams, private eliteApi: EliteApi) {}
  ionViewDidLoad(){
    this.team = this.navParams.data;
    this.tourneyData = this.eliteApi.getCurrentTourney();

    this.games = _.chain(this.tourneyData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                      const isTeam1 = (g.team1Id === this.team.id);
                      const opponentName = isTeam1 ? g.team2 : g.team1;
                      const scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                      return {
                        gameId: g.id,
                        opponent: opponentName,
                        time: Date.parse(g.time),
                        location: g.location,
                        locationUrl: g.locationUrl,
                        scoreDisplay: scoreDisplay,
                        homeAway: (isTeam1 ? "vs." : "at")
                      };
                  })
                  .value();      
  }

  getScoreDisplay(isTeam1, team1Score, team2Score){
    if(team1Score && team2Score){
      let teamScore = (isTeam1 ? team1Score : team2Score);
      let opponentScore = (isTeam1 ? team2Score : team1Score);
      let winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    }
    return "";
  }

  gameClicked($event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.nav.parent.parent.push(GamePage, sourceGame);
  }

  /*goHome(){
    //this.nav.push(MyTeamsPage);
    //this.nav.popToRoot();
    this.nav.parent.parent.popToRoot();
  }*/
}
