import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserSettings {
     constructor(
         private events: Events,
         private storage: Storage) {
     }

     favoriteTeam(team: any, tournamentId: number, tournamentName: string){
        const item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
        return new Promise((resolve, reject) => {
                this.storage.set(team.id.toString(), JSON.stringify(item)).then(() => {
                    this.events.publish('favorites:changed');
                    resolve();
                }).catch((err) => {
                    console.error(`Error adding favorite for team ${JSON.stringify(team)} and tournamentId ${JSON.stringify(tournamentId)}`);
                    reject(err);
                });
        });
     }

     unfavoriteTeam(team: any){
        return new Promise((resolve, reject) => {
            this.storage.remove(team.id.toString()).then(() => {
                                this.events.publish('favorites:changed');
                                resolve();
                            }).catch((err) => {
                                console.error(`Error removing team ${JSON.stringify(team)}`);
                                reject(err);
                            });
        });
     }

     isFavoriteTeam(teamId: any){
        return new Promise((resolve, reject) => { 
            this.storage.get(teamId.toString()).then((value) => {
                resolve(value ? true : false);
            }).catch((err) => {
                console.error(`Error getting favorite for team ${JSON.stringify(teamId)}`);
                reject(err);
            });
        });
     }

     getAllFavorites(){
         return new Promise<any[]>((resolve, reject) => {
                try {
                    let results = [];
                    this.storage.forEach(data => {
                        results.push(JSON.parse(data));
                    });
                    return resolve(results);
                } catch (error) {
                    console.error(`Error getting all Favorites`);
                    reject(error);
                }
            });
     }
}