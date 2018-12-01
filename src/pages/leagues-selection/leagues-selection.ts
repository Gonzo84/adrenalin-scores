import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SportmonksApiCallProvider} from "../../providers/sportmonks-api-call/sportmonks-api-call";

@Component({
  selector: 'page-leagues-selection',
  templateUrl: 'leagues-selection.html',
})
export class LeaguesSelectionPage {

  public regionsArray: any = [];

  constructor(public navCtrl: NavController,
              private sportmonks: SportmonksApiCallProvider) {
  }

}
