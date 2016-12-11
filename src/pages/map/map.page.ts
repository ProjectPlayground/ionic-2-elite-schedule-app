import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { EliteApi } from './../../app/shared/elite-api.service';

@Component({
    selector: 'map',
    templateUrl: 'map.page.html'
})
export class MapPage {

    map: any = {};

    constructor(public navParams: NavParams, public eliteApi: EliteApi) {

    }

    ionViewDidLoad() {
        let games = this.navParams.data;
        let tourneyData = this.eliteApi.getCurrentTourney();
        let location = tourneyData.locations[games.locationId];

        this.map = {
            lat: location.latitude,
            lng: location.longitude,
            zoom: 12,
            markerLabel: games.location,
            marker: '../../assets/img/google-marker.png'
        };
    }
}
