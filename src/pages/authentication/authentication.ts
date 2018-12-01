import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {LeaguesSelectionPage} from "../leagues-selection/leagues-selection";

import {LogProvider} from "../../providers/log/log";
import {UsersDataProvider} from "../../providers/users-data/users-data";

@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {

  public userName: string = '';

  constructor(public navCtrl: NavController,
              private usersDataProvider: UsersDataProvider,
              private logProvider: LogProvider) {
  }

  private navigateToLeaguesSelectionPage() {
    this.navCtrl.setRoot(LeaguesSelectionPage);
  }

  private onBtnClick() {
    this.usersDataProvider.setUserName(this.userName)
      .then(
        this.navigateToLeaguesSelectionPage.bind(this),
        this.logProvider.logError
      )
  }
}
