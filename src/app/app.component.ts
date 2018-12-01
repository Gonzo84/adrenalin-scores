import {Component, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from "@ngx-translate/core";

import {AuthenticationPage} from "../pages/authentication/authentication";
import {HomePage} from '../pages/home/home';
import {LeaguesSelectionPage} from "../pages/leagues-selection/leagues-selection";

import {LanguageSupportProvider} from "../providers/language-support/language-support";
import {LogProvider} from "../providers/log/log";
import {UsersDataProvider} from "../providers/users-data/users-data";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  /**
   * Navigation controller
   * @type{NavController} nav
   */
  @ViewChild('nav') public nav: NavController;

  /**
   * Root page of app - placeholder
   * @type{Object}rootPage
   */
  public rootPage: any = HomePage;

  public selectedTheme: String;

  constructor(platform: Platform,
              statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private translateService: TranslateService,
              private logProvider: LogProvider,
              private usersDataProvider: UsersDataProvider,
              private languageSupportProvider: LanguageSupportProvider) {
    this.usersDataProvider.getActiveTheme().subscribe(val => this.selectedTheme = val);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.setLanguage();
    });
  }

  /**
   * check for userName
   */
  private async authentifyUser() {
    const user = await this.usersDataProvider.getUserName();
    const rootPage = user ? LeaguesSelectionPage : AuthenticationPage;
    this.nav.setRoot(rootPage)
      .then(
        this.removeSplash.bind(this),
        this.logProvider.logError
      );
  }

  /**
   * Hides splash screen
   */
  public removeSplash() {
    this.splashScreen.hide();
  }

  /**
   *check if there is preferred language, otherwise set English as a default
   */
  private async setLanguage() {
    const preferredLanguage = await this.languageSupportProvider.getPreferredLanguage();
    let language = preferredLanguage ? preferredLanguage : 'en_US';
    this.translateService.setDefaultLang(language);
    this.translateService.use(language)
      .subscribe(
        this.authentifyUser.bind(this),
        this.logProvider.logError
      );
  }
}

