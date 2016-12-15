import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite } from 'ionic-native';
import { SqlStorage } from './shared';

const win: any = window;

@Injectable()
export class UserSettings {
    public sql: SqlStorage;

    constructor(
        private events: Events,
        private storage: Storage) {
        if (win.sqlitePlugin) {
            this.sql = new SqlStorage();
        } else {
            console.warn('SQLite plugin not installed. Falling back to regular Ionic Storage.');
        }
    }

    favoriteTeam(team: any, tournamentId: number, tournamentName: string) {
        const item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };

        if (this.sql) {
            this.sql.set(team.id.toString(), JSON.stringify(item)).then(data => {
                this.events.publish('favorites:changed');
            });
        } else {
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
    }

    unfavoriteTeam(team: any) {
        if (this.sql) {
            this.sql.remove(team.id.toString()).then(data => {
                this.events.publish('favorites:changed');
            });
        } else {
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
    }

    isFavoriteTeam(teamId: any) {
        if (this.sql) {
            return this.sql.get(teamId.toString()).then(value => value ? true : false);
        } else {
            return new Promise((resolve, reject) => {
                this.storage.get(teamId.toString()).then((value) => {
                    resolve(value ? true : false);
                }).catch((err) => {
                    console.error(`Error getting favorite for team ${JSON.stringify(teamId)}`);
                    reject(err);
                });
            });
        }
    }

    getAllFavorites() {
        if (this.sql) {
            return this.sql.getAll();
        } else {
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

    initStorage() {
        if (this.sql) {
            return this.sql.initializeDatabase();
        } else {
            return new Promise(resolve => resolve());
        }
    }
}