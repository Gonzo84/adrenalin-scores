import {Component, OnInit} from '@angular/core';
import {Events, NavController} from 'ionic-angular';

import {RegionTabComponent} from "./region-tab/region-tab";

import {SportmonksApiCallProvider} from "../../providers/sportmonks-api-call/sportmonks-api-call";

import Topics from '../../TOPICS';
import {ResultsPage} from "../results/results";

@Component({
  selector: 'page-leagues-selection',
  templateUrl: 'leagues-selection.html',
})
export class LeaguesSelectionPage implements OnInit {

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

  public ngOnInit(): void {
    this.getLiveScores();
  }

  public getLiveScores() {
    this.sportmonks.getLiveScores();
  }

  private onLeagueSelect(league) {
    this.navCtrl.push(ResultsPage, {data: league})
  }

  private setRegions() {
    this.regions = this.sportmonks.getRegions();
  }
}
