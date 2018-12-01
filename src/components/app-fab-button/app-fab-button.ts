import {Component} from '@angular/core';
import {ModalController} from "ionic-angular";

import {BootRoomModal} from "../../modals/boot-room/boot-room";

@Component({
  selector: 'app-fab-button',
  templateUrl: 'app-fab-button.html'
})
export class AppFabButtonComponent {

  constructor(private modalCtrl: ModalController) {
  }

  /**
   * tap handler, creates boot room modal
   */
  public onFabButtonTap() {
    this.modalCtrl.create(BootRoomModal).present()
  }
}
