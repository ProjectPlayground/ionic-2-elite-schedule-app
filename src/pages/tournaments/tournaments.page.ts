import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TeamsPage} from '../pages';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.page.html'
})
export class TournamentsPage {

  constructor(public nav: NavController) {}

  itemTapped(){
    this.nav.push(TeamsPage)
  }
}
