import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Events, NavParams} from 'ionic-angular';

import {LogProvider} from "../../providers/log/log";
import {SportmonksApiCallProvider} from "../../providers/sportmonks-api-call/sportmonks-api-call";


import Topics from '../../TOPICS';

@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage implements OnInit, OnDestroy {
  /**
   * flag that represents if all datas are shown
   * @type{boolean}
   */
  public allShown: boolean = false;
  /**
   * index of current component
   * @type{number}
   */
  public componentIndex: number = 0;
  /**
   * current data
   * @type{Object}
   */
  public currentDate;
  /**
   * data passed over trough nav params - unprocessed
   * @type{Object}
   */
  public data: any;
  /**
   * league name key
   * @type{string}
   */
  public leagueNameKey: string;
  /**
   * List of match datas
   * @type{Object[]}
   */
  public matchArray: any[] = [];
  /**
   * flag that represents if all view is touched
   * @type{boolean}
   */
  public untached: boolean = true;

  constructor(public navParams: NavParams,
              public events: Events,
              private sportmonks: SportmonksApiCallProvider,
              private logProvider: LogProvider) {
    this.events.subscribe(Topics.incrementComponentIndex, this.incrementComponentIndex.bind(this))
  }

  /**
   * Angular lifecycle hook
   */
  public ngOnInit(): void {
    this.currentDate = new Date();
    this.data = this.navParams.get('data');
    this.setLeagueName();
  }

  /**
   * Angular lifecycle hook
   */
  public ngOnDestroy(): void {
    this.events.unsubscribe(Topics.incrementComponentIndex);
  }

  /**
   * returns league data
   * ion refresher handler is optional argument
   * @param {Object}refresher
   * @param {Object}data
   */
  private getLeaguesData(refresher, data) {
    this.sportmonks.getSpecificLeague(this.leagueNameKey)
      .then(
        this.setLeagueData.bind(this, refresher),
        this.logProvider.logError);
  }

  /**
   * generates event for specific result item component
   */
  private generateEvent() {
    let eventName = 'revealPortionOfData' + this.componentIndex;
    return eventName;
  }

  /**
   * increase component index event handler
   */
  private incrementComponentIndex() {
    this.componentIndex++;
    if (this.componentIndex === this.matchArray.length) {
      this.allShown = true;
    }
  }

  /**
   * Image mouseup event handler
   * Triggers displaying full photo in photo viewer
   *
   * @param {HTMLElement} target
   */
  @HostListener('mouseup', ['$event.target'])
  public handleClick(target: HTMLElement): void {
    if (!this.allShown) {
      let topic = this.generateEvent();
      this.events.publish(topic)
    }
    this.untached = false;
  }

  /**
   * on ion refresh handler
   * @param{Object} refresher
   */
  private onRefresh(refresher) {
    this.resetAllData();
    this.sportmonks.getLiveScores().then(
      this.getLeaguesData.bind(this, refresher),
      this.logProvider.logError
    );
  }

  /**
   * sets league data
   * @param {Object}refresher
   * @param {Object}data
   */
  private setLeagueData(refresher, data):void {
    if (data) {
      this.matchArray = data;
      refresher.complete();
    } else {
      this.matchArray = refresher;
    }
  }

  /**
   * sets league name and fires api call for specific lague data
   */
  private setLeagueName() {
    let tempArray = Object.keys(this.data);
    this.leagueNameKey = tempArray[0];
    this.sportmonks.getSpecificLeague(this.leagueNameKey)
      .then(
        this.setLeagueData.bind(this),
        this.logProvider.logError);
  }

  /**
   * resets all data and flags
   */
  private resetAllData() {
    this.matchArray = [];
    this.untached = true;
    this.allShown = false;
    this.componentIndex = 0;
    this.events.publish(Topics.resetResultItemData);
  }
}
