import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-leagues-selection',
  templateUrl: 'leagues-selection.html',
})
export class LeaguesSelectionPage {

  public regionsArray: any = [];

  constructor(public navCtrl: NavController) {
  }

}
