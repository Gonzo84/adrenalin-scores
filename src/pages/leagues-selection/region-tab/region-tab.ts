import {Component, OnInit} from '@angular/core';
import {Events, NavParams} from "ionic-angular";
import {SportmonksApiCallProvider} from "../../../providers/sportmonks-api-call/sportmonks-api-call";


import Topics from '../../../TOPICS';

@Component({
  selector: 'region-tab',
  templateUrl: 'region-tab.html'
})
export class RegionTabComponent implements OnInit {
  public regionData: any[] = [];
  public regionName: string;

  constructor(private navParams: NavParams,
              private sportmonks: SportmonksApiCallProvider,
              private events: Events) {
  }

  public ngOnInit(): void {
    this.regionName = this.navParams.get('regionName');
    this.events.subscribe(Topics.liveScoresFetched, this.setData.bind(this));


  }

  public setData() {
    this.regionData = [];
    let tempData = this.sportmonks.getSpecificRegion(this.regionName);
    this.transformData(tempData);
  }

  private transformData(data) {
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
