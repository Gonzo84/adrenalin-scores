import {Component, OnInit} from '@angular/core';
import {Events, NavController} from 'ionic-angular';

import {ResultsPage} from "../results/results";
import {RegionTabComponent} from "./region-tab/region-tab";

import {SportmonksApiCallProvider} from "../../providers/sportmonks-api-call/sportmonks-api-call";

import Topics from '../../TOPICS';

@Component({
  selector: 'page-leagues-selection',
  templateUrl: 'leagues-selection.html',
})
export class LeaguesSelectionPage implements OnInit {

  /**
   * String of available regions
   * @type{string[]}regions
   */
  public regions: string[] = [];

  /**
   * Reference to RegionTabComponent
   * @type{RegionTabComponent} tab
   */
  public tab: any = RegionTabComponent;
  /**
   * Index of active tab on creating super tabs component
   * @type{number}tabIndex
   */
  public tabIndex: number = 0;

  constructor(public navCtrl: NavController,
              private sportmonks: SportmonksApiCallProvider,
              private events: Events) {
    this.events.subscribe(Topics.leagueSelected, this.onLeagueSelect.bind(this));
    this.setRegions();
  }

  /**
   * Angular lifecycle hook
   */
  public ngOnInit(): void {
    this.getLiveScores();
  }

  /**
   * get live scores api call
   */
  public getLiveScores():void {
    this.sportmonks.getLiveScores();
  }

  /**
   * League data
   * @param {Object}league
   */
  private onLeagueSelect(league):void {
    this.navCtrl.push(ResultsPage, {data: league})
  }

  /**
   * sets regions
   */
  private setRegions():void {
    this.regions = this.sportmonks.getRegions();
  }
}
