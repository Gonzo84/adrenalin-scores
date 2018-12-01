import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";

@Injectable()
export class LanguageSupportProvider {
  /**
   * Array of available languages
   * @type{string[]}availableLanguages
   */
  private availableLanguages: string[] = ['en_US', 'sr_SR'];

  constructor(private storage: Storage) {
  }

  /**
   * Returns available languages
   * @return{string[]}
   */
  public getAvailableLanguages():string[] {
    return this.availableLanguages;
  }

  /**
   * Returns preferred language
   *@return{Promise<any>}
   */
  public getPreferredLanguage():Promise<any> {
    return this.storage.get('language');
  }

  /**
   * Sets preferred language
   * @param{string} language
   * @return{:Promise<any>}
   */
  public setPreferredLanguage(language):Promise<any> {
    return this.storage.set('language', language);
  }
}
