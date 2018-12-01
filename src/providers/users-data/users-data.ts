import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {BehaviorSubject} from "rxjs";
import {Events} from "ionic-angular";

import {LogProvider} from "../log/log";

import Topics from "../../TOPICS";

@Injectable()
export class UsersDataProvider {


  private theme: BehaviorSubject<String>;

  constructor(private storage: Storage,
              public events: Events,
              private logProvider: LogProvider) {
    this.theme = new BehaviorSubject('grass_skin-theme');
    this.storage.get('theme')
      .then(
        this.setActiveTheme.bind(this),
        this.logProvider.logError
      )
  }

  public getActiveTheme() {
    return this.theme.asObservable();
  }

  public getUserName() {
    return this.storage.get('userName');
  }

  public setActiveTheme(val) {
    let theme = val || 'grass_skin-theme';
    this.theme.next(theme);
    this.storage.set('theme', theme);
    this.events.publish(Topics.themeChanged)
  }

  public setUserName(userName: string) {
    return this.storage.set('userName', userName);
  }
}
