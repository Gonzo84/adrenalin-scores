import {Component, OnInit} from '@angular/core';
import {Events, NavParams} from "ionic-angular";

import Topics from "../../../TOPICS";

@Component({
  selector: 'skin-tab',
  templateUrl: 'skin-tab.html',
})
export class SkinTabComponent implements OnInit {

  /**
   * Name of skin scss class
   * @type{string} skinClass
   */
  public skinClass: string = '';

  constructor(private navParams: NavParams,
              private events: Events) {
  }

  /**
   * Angular lifecycle hook
   */
  public ngOnInit(): void {
    this.skinClass = this.navParams.get('skin');
  }

  /**
   * On skin select handler, fires event
   */
  public onSkinSelect() {
    this.events.publish(Topics.skinSelected, this.skinClass);
  }
}
