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

  /**
   * Array of available languages
   * @type{string[]} availableLanguages
   */
  public availableLanguages: string[] = [];
  /**
   *  Reference on selected language
   * @type{string} selectedLanguage
   */
  public selectedLanguage: string;

  constructor(private viewCtrl: ViewController,
              private languageSupportProvider: LanguageSupportProvider,
              private translateService: TranslateService,
              private modalCtrl: ModalController,
              protected injector: Injector) {
    super(injector);
  }

  /**
   * @inheritDoc
   */
  public async ngOnInit() {
    super.ngOnInit();
    this.selectedLanguage = await this.languageSupportProvider.getPreferredLanguage();
    this.availableLanguages = await this.languageSupportProvider.getAvailableLanguages();
  }

  /**
   * Sets new language as a default
   * @param{string} lang
   */
  public onLanguageChange(lang):void {
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang)
      .subscribe(
        this.storeLanguage.bind(this, lang),
        this.logProvider.logError
      )

  }

  /**
   * Creates change skin modal
   */
  public openChangeSkinModal():void {
    this.modalCtrl.create(ChangeSkinModal).present();
  }

  /**
   * stores currently selected language
   * @param{string} lang
   */
  public storeLanguage(lang) {
    this.languageSupportProvider.setPreferredLanguage(lang)
  }
}
