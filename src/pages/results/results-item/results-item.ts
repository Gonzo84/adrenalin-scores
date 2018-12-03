import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Events} from "ionic-angular";


import Topics from '../../../TOPICS';

@Component({
  selector: 'results-item',
  templateUrl: 'results-item.html'
})
export class ResultsItemComponent implements OnInit, OnDestroy {
  /**
   * current component index
   * @type{number}
   */
  @Input() public componentIndex: number;

  /**
   * counter of shown portions of view
   * @type{number}
   */
  public counter: number = 0;
  /**
   * result item data
   * @type{Object}
   */
  @Input() public data: any;
  /**
   * local Team Name
   * @type{string}
   */
  public localTeamName: string;
  /**
   * Object of match result
   * @type{Object}
   */
  public scores: any = {
    localteam_score: undefined,
    visitorteam_score: undefined
  };
  /**
   * flag for displaying LocalTeamName
   * @type{boolean}
   */
  public showLocalTeamName: boolean = false;
  /**
   * flag for displaying VisitorTeamName
   * @type{boolean}
   */
  public showVisitorTeamName: boolean = false;
  /**
   * flag for displaying LocalTeamScore
   * @type{boolean}
   */
  public showLocalTeamScore: boolean = false;
  /**
   * flag for displaying VisitorTeamScore
   * @type{boolean}
   */
  public showVisitorTeamScore: boolean = false;
  /**
   * status of the match
   * @type{string}
   */
  public status: string;
  /**
   * generated topic for event subscribing
   * @type{string}
   */
  public topic: string;
  /**
   * visitor Team Name
   * @type{string}
   */
  public visitorTeamName: string;


  constructor(private events: Events) {
  }

  /**
   * Angular lifecycle hook
   */
  public ngOnInit(): void {
    this.topic = 'revealPortionOfData' + this.componentIndex;
    this.events.subscribe(this.topic, this.onRevealPortionHandler.bind(this));
    this.setData();
  }

  /**
   * Angular lifecycle hook
   */
  public ngOnDestroy(): void {
    this.events.unsubscribe(this.topic);
  }

  /**
   * Displays portion of view depending on counters number
   */
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

  /**
   * sets data
   */
  public setData() {
    this.localTeamName = this.data.localTeam.data.name;
    this.visitorTeamName = this.data.visitorTeam.data.name;
    this.scores.localteam_score = this.data.scores.localteam_score;
    this.scores.visitorteam_score = this.data.scores.visitorteam_score;
    this.status = this.data.time.status;
  }

}
