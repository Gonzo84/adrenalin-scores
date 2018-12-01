import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";

@Injectable()
export class LanguageSupportProvider {

  private availableLanguages: string[] = ['en_US', 'sr_SR'];

  constructor(private storage: Storage) {
  }

  public getAvailableLanguages():string[] {
    return this.availableLanguages;
  }

  public getPreferredLanguage() {
    return this.storage.get('language');
  }

  public setPreferredLanguage(language) {
    return this.storage.set('language', language);
  }
}
