import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {LeaguesSelectionPage} from "../leagues-selection/leagues-selection";

import {LogProvider} from "../../providers/log/log";
import {UsersDataProvider} from "../../providers/users-data/users-data";

@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {
  /**
   * Reference on user name
   * @type{string} userName
   */
  public userName: string = '';

  constructor(public navCtrl: NavController,
              private usersDataProvider: UsersDataProvider,
              private logProvider: LogProvider) {
  }

  /**
   * Sets LeaguesSelectionPage as a root
   */
  private navigateToLeaguesSelectionPage(): void {
    this.navCtrl.setRoot(LeaguesSelectionPage);
  }

  /**
   * On button click handler, saves username and navigates to LeaguesSelectionPage
   */
  private onBtnClick() {
    this.usersDataProvider.setUserName(this.userName)
      .then(
        this.navigateToLeaguesSelectionPage.bind(this),
        this.logProvider.logError
      )
  }
}
