import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Events, NavParams} from 'ionic-angular';
import {SportmonksApiCallProvider} from "../../providers/sportmonks-api-call/sportmonks-api-call";


import Topics from '../../TOPICS';
import {LogProvider} from "../../providers/log/log";

@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage implements OnInit, OnDestroy {
  public allShown: boolean = false;
  public componentIndex: number = 0;
  public currentDate;
  public data: any;
  public leagueNameKey: string;
  public matchArray: any[] = [];
  public untached: boolean = true;

  constructor(public navParams: NavParams,
              public events: Events,
              private sportmonks: SportmonksApiCallProvider,
              private logProvider: LogProvider) {
    this.events.subscribe(Topics.incrementComponentIndex, this.incrementComponentIndex.bind(this))
  }

  public ngOnInit(): void {
    this.currentDate = new Date();
    this.data = this.navParams.get('data');
    this.setLeagueName();
  }

  public ngOnDestroy(): void {
    this.events.unsubscribe(Topics.incrementComponentIndex);
  }

  private getLeaguesData(refresher, data) {
    this.sportmonks.getSpecificLeague(this.leagueNameKey)
      .then(
        this.setLeagueData.bind(this, refresher),
        this.logProvider.logError);
  }

  private generateEvent() {
    let eventName = 'revealPortionOfData' + this.componentIndex;
    return eventName;
  }

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

  private onRefresh(refresher) {
    this.resetAllData();
    this.sportmonks.getLiveScores().then(
      this.getLeaguesData.bind(this, refresher),
      this.logProvider.logError
    );
  }

  private setLeagueData(refresher, data) {
    if (data) {
      this.matchArray = data;
      refresher.complete();
    } else {
      this.matchArray = refresher;
    }
  }

  private setLeagueName() {
    let tempArray = Object.keys(this.data);
    this.leagueNameKey = tempArray[0];
    this.sportmonks.getSpecificLeague(this.leagueNameKey)
      .then(
        this.setLeagueData.bind(this),
        this.logProvider.logError);
  }

  private resetAllData() {
    this.matchArray = [];
    this.untached = true;
    this.allShown = false;
    this.componentIndex = 0;
    this.events.publish(Topics.resetResultItemData);
  }
}
