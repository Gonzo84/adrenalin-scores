import {Component, Injector, OnInit} from '@angular/core';
import {ModalController, ViewController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";

import {ChangeSkinModal} from "../change-skin/change-skin";
import {ThemingSupport} from "../../components/theming-support/theming-support";

import {LanguageSupportProvider} from "../../providers/language-support/language-support";

@Component({
  selector: 'page-boot-room',
  templateUrl: 'boot-room.html',
})
export class BootRoomModal extends ThemingSupport implements OnInit {

  public availableLanguages: string[] = [];

  public selectedLanguage: string;

  constructor(private viewCtrl: ViewController,
              private languageSupportProvider: LanguageSupportProvider,
              private translateService: TranslateService,
              private modalCtrl: ModalController,
              protected injector: Injector) {
    super(injector);
  }

  public async ngOnInit() {
    super.ngOnInit();
    this.selectedLanguage = await this.languageSupportProvider.getPreferredLanguage();
    this.availableLanguages = await this.languageSupportProvider.getAvailableLanguages();
  }

  public onLanguageChange(lang) {
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang)
      .subscribe(
        this.storeLanguage.bind(this, lang),
        this.logProvider.logError
      )

  }

  public openChangeSkinModal() {
    this.modalCtrl.create(ChangeSkinModal).present();
  }

  public storeLanguage(lang) {
    this.languageSupportProvider.setPreferredLanguage(lang)
  }
}
