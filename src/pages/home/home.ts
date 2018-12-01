import {Component, OnInit} from '@angular/core';

import {SportmonksApi} from "sportmonks";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor() {

  }

  public ngOnInit() {

    // const sportmonks = new SportmonksApi('hRKhi8GYmw93oycLMaxixICwoAtwHEnIuodsA70ImYotSXN3S4rBxoeUghdm');
    // sportmonks.get('v2.0/leagues/{id}', {id:'8'}).then(function (resp) {
    //   //pagination info can be found in
    //   console.log(resp)
    // });
  }
}
