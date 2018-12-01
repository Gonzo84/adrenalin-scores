import {Component, Injector} from '@angular/core';
import {Events, ModalController, ViewController} from "ionic-angular";

import {SkinTabComponent} from "./skin-tab/skin-tab";

import {UsersDataProvider} from "../../providers/users-data/users-data";

import Topics from '../../TOPICS';
import {ThemingSupport} from "../../components/theming-support/theming-support";

@Component({
  selector: 'page-change-skin',
  templateUrl: 'change-skin.html',
})
export class ChangeSkinModal extends ThemingSupport {
  public availableSkins: string[] = ['grass_skin', 'teletext_skin', 'champ_man_skin'];
  public availableThemes: any = {
    grass_skin: 'grass_skin-theme',
    teletext_skin: 'teletext_skin-theme',
    champ_man_skin: 'champ_man_skin-theme'
  };

  public tab: any = SkinTabComponent;

  public tabIndex: number = 0;

  constructor(private viewCtrl: ViewController,
              protected injector: Injector) {
    super(injector);
    this.events.subscribe(Topics.skinSelected, this.onSkinSelect.bind(this));
  }

  public onSkinSelect(skin: string): void {
    this.usersDataProvider.setActiveTheme(this.availableThemes[skin]);
    this.viewCtrl.dismiss();
  }
}
