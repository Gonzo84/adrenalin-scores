import {Injectable} from '@angular/core';
import {SportmonksApi} from "sportmonks";

import Config from '../../config';

@Injectable()
export class SportmonksApiCallProvider {

  constructor() {
  }

  public ngOnInit() {
    const sportmonks = new SportmonksApi(Config.API_TOKEN);
    sportmonks.get('v2.0/leagues/{id}', {id: '8'}).then(function (resp) {
      //pagination info can be found in
      console.log(resp)
    });
  }

}
