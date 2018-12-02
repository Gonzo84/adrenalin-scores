import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Events} from "ionic-angular";


import Topics from '../../../TOPICS';

@Component({
  selector: 'results-item',
  templateUrl: 'results-item.html'
})
export class ResultsItemComponent implements OnInit, OnDestroy {

  @Input() public componentIndex: number;

  public counter: number = 0;

  @Input() public data: any;

  public localTeamName: string;

  public scores: any = {
    localteam_score: undefined,
    visitorteam_score: undefined
  };

  public showLocalTeamName: boolean = false;

  public showVisitorTeamName: boolean = false;

  public showLocalTeamScore: boolean = false;

  public showVisitorTeamScore: boolean = false;

  public status: string;

  public topic: string;

  public visitorTeamName: string;


  constructor(private events: Events) {
  }

  public ngOnInit(): void {
    this.topic = 'revealPortionOfData' + this.componentIndex;
    this.events.subscribe(this.topic, this.onRevealPortionHandler.bind(this));
    this.setData();
  }

  public ngOnDestroy(): void {
    this.events.unsubscribe(this.topic);
  }

  public onRevealPortionHandler() {
    this.counter++;
    switch (this.counter) {
      case 1:
        this.showLocalTeamName = true;
        break;
      case 2:
        this.showVisitorTeamName = true;
        break;
      case 3:
        this.showLocalTeamScore = true;
        break;
      case 4:
        this.showVisitorTeamScore = true;
        break;
      default:
        break;
    }
    if (this.counter === 4) {
      this.events.unsubscribe(this.topic);
      this.events.publish(Topics.incrementComponentIndex)
    }
  }

  public setData() {
    this.localTeamName = this.data.localTeam.data.name;
    this.visitorTeamName = this.data.visitorTeam.data.name;
    this.scores.localteam_score = this.data.scores.localteam_score;
    this.scores.visitorteam_score = this.data.scores.visitorteam_score;
    this.status = this.data.time.status;
  }

}
