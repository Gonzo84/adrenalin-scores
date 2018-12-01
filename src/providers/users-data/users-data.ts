import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {BehaviorSubject, Observable} from "rxjs";
import {Events} from "ionic-angular";

import {LogProvider} from "../log/log";

import Topics from "../../TOPICS";

@Injectable()
export class UsersDataProvider {

  /**
   * Theme watcher
   * @type{BehaviorSubject<String>}
   */
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

  /**
   * Returns active theme
   * @return{Observable<any> }
   */
  public getActiveTheme():Observable<any> {
    return this.theme.asObservable();
  }

  /**
   * Returns user name
   * @return{Promise<string>}
   */
  public getUserName():Promise<string> {
    return this.storage.get('userName');
  }

  /**
   * Sets active theme or if there is no active, sets default and publishes event
   * @param{string} val
   */
  public setActiveTheme(val):void {
    let theme = val || 'grass_skin-theme';
    this.theme.next(theme);
    this.storage.set('theme', theme);
    this.events.publish(Topics.themeChanged)
  }

  /**
   * Sets user name and returns promise
   * @param{string} userName
   * @return{Promise<any>}
   */
  public setUserName(userName: string):Promise<any> {
    return this.storage.set('userName', userName);
  }
}
