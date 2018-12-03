import {Component, OnInit} from '@angular/core';
import {Events, NavParams} from "ionic-angular";

import {SportmonksApiCallProvider} from "../../../providers/sportmonks-api-call/sportmonks-api-call";


import Topics from '../../../TOPICS';

@Component({
  selector: 'region-tab',
  templateUrl: 'region-tab.html'
})
export class RegionTabComponent implements OnInit {
  /**
   * list of regions data
   * @type{Object[]}
   */
  public regionData: any[] = [];
  /**
   * region name key
   * @type{string}
   */
  public regionName: string;

  constructor(private navParams: NavParams,
              private sportmonks: SportmonksApiCallProvider,
              private events: Events) {
  }

  /**
   * Angular lifecycle hook
   */
  public ngOnInit(): void {
    this.regionName = this.navParams.get('regionName');
    this.events.subscribe(Topics.liveScoresFetched, this.setData.bind(this));
  }

  /**
   * sets data for specific region
   */
  public setData():void {
    this.regionData = [];
    let tempData = this.sportmonks.getSpecificRegion(this.regionName);
    this.transformData(tempData);
  }

  /**
   * transforms data for displaying
   * @param{O)bject} data
   */
  private transformData(data):void {
    let region = data[this.regionName];
    let tempArray = [];
    for (var key in region) {
      tempArray.push({
        [key]: region[key]
      })
    }
    this.regionData = this.regionData.concat(tempArray);
  }
}
