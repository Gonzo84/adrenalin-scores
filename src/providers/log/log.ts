/**
 * Log service
 * @author Marko Krstic
 */
import {Injectable} from '@angular/core';

@Injectable()
export class LogProvider {

  /**
   * Displays error toast to the user and logs that error to the console
   *
   * @param {Object} error
   */
  public logError(error: any) {
    console.log(error);
  }
}
