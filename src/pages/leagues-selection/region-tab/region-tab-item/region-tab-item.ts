import {Component, Input, OnInit} from '@angular/core';
import {Events} from "ionic-angular";


import Topics from '../../../../TOPICS';

@Component({
  selector: 'region-tab-item',
  templateUrl: 'region-tab-item.html'
})
export class RegionTabItemComponent implements OnInit {
  @Input() public data: any;
  public leagueNameKey: string;

  constructor(private events: Events) {
  }

  public ngOnInit(): void {
    this.setLeagueName();
  }

  public onLeagueSelect() {
    if (this.data[this.leagueNameKey].length) {
      this.events.publish(Topics.leagueSelected, this.data)
    }
  }

  private setLeagueName() {
    let tempArray = Object.keys(this.data);
    this.leagueNameKey = tempArray[0];
  }
}
