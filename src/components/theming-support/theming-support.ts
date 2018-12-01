import {Injector, OnInit} from "@angular/core";
import {Events} from "ionic-angular";

import {LogProvider} from "../../providers/log/log";
import {UsersDataProvider} from "../../providers/users-data/users-data";

import Topics from '../../TOPICS';

export class ThemingSupport implements OnInit {
  /**
   * Currentlu active theme
   * @type{string} activeTheme
   */
  public activeTheme: string;
  /**
   * Events provider
   * @type{Events} events
   */
  public events: Events;
  /**
   * Custom log provider
   * @type{LogProvider} logProvider
   */
  public logProvider: LogProvider;
  /**
   * Custom users data provider
   * @type{UsersDataProvider} usersDataProvider
   */
  public usersDataProvider: UsersDataProvider;

  constructor(protected injector: Injector) {
    this.usersDataProvider = injector.get(UsersDataProvider);
    this.logProvider = injector.get(LogProvider);
    this.events = injector.get(Events);
  }

  /**
   * Angular lifecycle hook
   */
  public ngOnInit(): void {
    this.events.subscribe(Topics.themeChanged, this.getActiveTheme.bind(this));
    this.getActiveTheme();
  }

  /**
   * Return active theme
   */
  public getActiveTheme() {
    this.usersDataProvider.getActiveTheme()
      .subscribe(this.setActiveTheme.bind(this),
        this.logProvider.logError
      )
  }

  /**
   * Sets new theme
   * @param{string} theme
   */
  private setActiveTheme(theme: string) {
    this.activeTheme = theme;
  }
}
