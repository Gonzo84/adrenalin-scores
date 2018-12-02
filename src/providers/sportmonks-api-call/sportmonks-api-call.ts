import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Events} from "ionic-angular";
import {SportmonksApi} from "sportmonks";

import Config from '../../config';
import {LogProvider} from "../log/log";

import Topics from '../../TOPICS';


import MockData from '../../data/mock-data';

@Injectable()
export class SportmonksApiCallProvider {
  public leaguesIdArray: any = [];
  public leaguesMapObject: any;

  public mockData: boolean = true;
  public regionsDataArray: any = [{
    England: {
      premierLeague: [],
      championship: [],
      league1: [],
      league2: []
    }
  }, {
    Scotland: {
      scottishPremiership: [],
      scottishChampionship: [],
      scottishLeagueOne: [],
      scottishLeagueTwo: []
    }
  }];

  public regionNames: string[] = ['England', 'Scotland'];

  constructor(private http: HttpClient,
              private logProvider: LogProvider,
              private events: Events) {
    this.setLeaguesIds();
  }

  private filterData(resolve, data) {
    let filteredData = data.data.filter(this.filterDataFn.bind(this));
    this.setData(filteredData, resolve);
  }

  private filterDataFn(match) {
    return this.leaguesIdArray.includes(match.league_id.toString())
  }

  private getLeagueData(leagueKey, data) {
    let leagueData;
    let regionNames = this.regionNames;
    let regionNamesLength = regionNames.length;
    let item = 0;
    let currentRegion;
    while (!leagueData && item < regionNamesLength) {
      currentRegion = data[regionNames[item]];
      leagueData = !!currentRegion && currentRegion[leagueKey];
      item++;
    }
    return leagueData;
  }

  public getLiveScores() {
    this.resetData();
    return new Promise(this.getLiveScoresFn.bind(this));
  }

  private getLiveScoresFn(resolve, reject) {
    if (this.mockData) {
      this.filterData(resolve, MockData);
    } else {
      const sportmonks = new SportmonksApi(Config.apiToken);
      sportmonks.get(Config.endpoints.scoresList, {localTeam: true, visitorTeam: true, 'league.country': true})
        .then(
          this.filterData.bind(this, resolve),
          reject);
    }
  }

  public getRegions() {
    return this.regionNames;
  }

  public getSpecificLeague(league) {
    return new Promise(this.getSpecificLeagueFn.bind(this, league))
  }

  public getSpecificLeagueFn(league, resolve, reject) {
    let leagueData;
    let item = 0;
    while (!leagueData && item < this.regionsDataArray.length) {
      let tempData = this.getLeagueData(league, this.regionsDataArray[item]);
      if (tempData) {
        leagueData = tempData;
      }
      item++;
    }
    if (leagueData) {
      if (this.mockData) {
        setTimeout(() => {
          resolve(leagueData)
        }, 100)
      } else {
        resolve(leagueData)
      }
    } else {
      reject();
    }
  }

  public getSpecificRegion(regionName) {
    let regionData = this.regionsDataArray.filter((region) => {
      return region.hasOwnProperty(regionName);
    });
    return regionData[0];
  }

  private mapData(match) {
    const leaguesMapObject = this.leaguesMapObject;
    for (var key in leaguesMapObject) {
      if (leaguesMapObject[key] === match.league_id.toString()) {
        this.regionsDataArray.map((region) => {
          let country = match.league.data.country.data.name;
          if (region.hasOwnProperty(country)) {
            region[country][key].push(match);
          }
        });
        return;
      }
    }
  }

  private resetData() {
    this.regionsDataArray = [{
      England: {
        premierLeague: [],
        championship: [],
        league1: [],
        league2: []
      }
    }, {
      Scotland: {
        scottishPremiership: [],
        scottishChampionship: [],
        scottishLeagueOne: [],
        scottishLeagueTwo: []
      }
    }];
  }

  private setData(data, resolve) {
    data.map(this.mapData.bind(this));
    if (this.mockData) {
      setTimeout(() => {
        resolve(data);
        this.events.publish(Topics.liveScoresFetched);
      }, 100)
    } else {
      this.events.publish(Topics.liveScoresFetched);
    }
  }

  private setLeaguesIds() {
    let england = Config.leagues.England;
    let scotland = Config.leagues.Scotland;
    let merged = {...england, ...scotland};
    this.leaguesMapObject = merged;
    this.leaguesIdArray = Object.values(merged);
  }
}
