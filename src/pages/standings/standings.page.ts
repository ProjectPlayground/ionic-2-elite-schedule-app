import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'standings',
  templateUrl: 'standings.page.html'
})
export class StandingsPage {
  
  constructor(public navCtrl: NavController, private navParams: NavParams) {

  }
}
