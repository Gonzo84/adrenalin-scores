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
  /**
   * list of leagues ids
   * @type{Object[]}
   */
  public leaguesIdArray: any = [];
  /**
   * map of regions and their leagues
   * @type{Object}
   */
  public leaguesMapObject: any;
  /**
   * flag that switches between live api calls and mock data
   * @type{boolean}
   */
  public mockData: boolean = true;
  /**
   * regions data array
   * @type{Object[]}
   */
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
  /**
   * list of region names
   * @type{string[]}
   */
  public regionNames: string[] = ['England', 'Scotland'];

  constructor(private http: HttpClient,
              private logProvider: LogProvider,
              private events: Events) {
    this.setLeaguesIds();
  }

  /**
   * filters data
   * @param {Function}resolve
   * @param {Object}data
   */
  private filterData(resolve, data) {
    let filteredData = data.data.filter(this.filterDataFn.bind(this));
    this.setData(filteredData, resolve);
  }

  /**
   * filter Data Fn
   * @param{Object} match
   */
  private filterDataFn(match) {
    return this.leaguesIdArray.includes(match.league_id.toString())
  }

  /**
   * returns league data
   * @param {string}leagueKey
   * @param {Object}data
   * @return{Object}
   */
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

  /**
   * get live scores api call
   * @return{Promise}
   */
  public getLiveScores() {
    this.resetData();
    return new Promise(this.getLiveScoresFn.bind(this));
  }


  /**
   * get live scores api call function
   */
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

  /**
   * returns  region names
   * @return{Object}
   */
  public getRegions() {
    return this.regionNames;
  }

  /**
   * get specific lague
   * @param{string} league
   */
  public getSpecificLeague(league) {
    return new Promise(this.getSpecificLeagueFn.bind(this, league))
  }

  /**
   * get specific lague function
   * @param {string}league
   * @param {Function}resolve
   * @param {Function}reject
   */
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

  /**
   * returns specific region
   * @param{string} regionName
   */
  public getSpecificRegion(regionName) {
    let regionData = this.regionsDataArray.filter((region) => {
      return region.hasOwnProperty(regionName);
    });
    return regionData[0];
  }

  /**
   * maps data
   * @param{Object} match
   */
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

  /**
   * resets data
   */
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

  /**
   * sets data
   * @param {Object}data
   * @param {Function}resolve
   */
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

  /**
   * sets league id
   */
  private setLeaguesIds() {
    let england = Config.leagues.England;
    let scotland = Config.leagues.Scotland;
    let merged = {...england, ...scotland};
    this.leaguesMapObject = merged;
    this.leaguesIdArray = Object.values(merged);
  }
}
