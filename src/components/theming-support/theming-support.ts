import {Injector, OnInit} from "@angular/core";
import {Events} from "ionic-angular";

import {LogProvider} from "../../providers/log/log";
import {UsersDataProvider} from "../../providers/users-data/users-data";

import Topics from '../../TOPICS';

export class ThemingSupport implements OnInit {
  public activeTheme: string;
  public events: Events;
  public logProvider: LogProvider;
  public usersDataProvider: UsersDataProvider;

  constructor(protected injector: Injector) {
    this.usersDataProvider = injector.get(UsersDataProvider);
    this.logProvider = injector.get(LogProvider);
    this.events = injector.get(Events);
  }

  public ngOnInit(): void {
    this.events.subscribe(Topics.themeChanged, this.getActiveTheme.bind(this));
    this.getActiveTheme();
  }

  public getActiveTheme() {
    this.usersDataProvider.getActiveTheme()
      .subscribe(this.setActiveTheme.bind(this),
        this.logProvider.logError
      )
  }

  private setActiveTheme(theme) {
    this.activeTheme = theme;
  }
}
