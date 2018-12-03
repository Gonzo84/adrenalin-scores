import {Component, Input, OnInit} from '@angular/core';
import {Events} from "ionic-angular";


import Topics from '../../../../TOPICS';

@Component({
  selector: 'region-tab-item',
  templateUrl: 'region-tab-item.html'
})
export class RegionTabItemComponent implements OnInit {
  /**
   * region data
   * @type{Object}
   */
  @Input() public data: any;
  /**
   * league name key
   * @type{string}
   */
  public leagueNameKey: string;

  constructor(private events: Events) {
  }

  /**
   * Angular lifecycle hook
   */
  public ngOnInit(): void {
    this.setLeagueName();
  }

  /**
   * on league select handler
   */
  public onLeagueSelect() {
    if (this.data[this.leagueNameKey].length) {
      this.events.publish(Topics.leagueSelected, this.data)
    }
  }

  /**
   * sets league name key
   */
  private setLeagueName() {
    let tempArray = Object.keys(this.data);
    this.leagueNameKey = tempArray[0];
  }
}
