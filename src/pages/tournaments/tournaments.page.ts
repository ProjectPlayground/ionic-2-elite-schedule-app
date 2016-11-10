import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { TeamsPage} from '../pages';
import { EliteApi } from '../../app/shared/elite-api.service';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.page.html'
})
export class TournamentsPage {

  tournaments: any;
  constructor(public nav: NavController, private EliteApi: EliteApi, private loadingController: LoadingController) {}

  itemTapped($event, tourney){
    this.nav.push(TeamsPage, tourney);
  }

  ionViewDidLoad(){
    const loader = this.loadingController.create({
      content: 'Getting Tournaments...',
      //spinner: 'dots'
    });

    loader.present().then(() => {
      this.EliteApi.getTournaments().then(data => {
        this.tournaments = data;
        loader.dismiss();
      });
    });
  }
}
