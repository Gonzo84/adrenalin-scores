import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SportmonksApi} from "sportmonks";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController) {

  }

  public ngOnInit() {

    const sportmonks = new SportmonksApi('i5nMctZR7QzlHBNUGXfmrSVb8C0kwd3MR2THCd5DIeJOBZ9WaSM88mE33Ifn');
    sportmonks.get('v2.0/fixtures/date/{date}', {date:'2018-12-02', localTeam: true, visitorTeam: true}).then(function (resp) {
      //pagination info can be found in
      console.log(resp)
    });
  }
}
