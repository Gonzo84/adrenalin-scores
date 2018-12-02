import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";

import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

//Import PAGES
import {AuthenticationPage} from "../pages/authentication/authentication";
import {BootRoomModal} from "../modals/boot-room/boot-room";
import {ChangeSkinModal} from "../modals/change-skin/change-skin";
import {HomePage} from '../pages/home/home';
import {LeaguesSelectionPage} from "../pages/leagues-selection/leagues-selection";
import {ResultsPage} from "../pages/results/results";
import {SuperTabsModule} from "ionic2-super-tabs";

// Import CUSTOM COMPONENTS
import {AppFabButtonComponent} from "../components/app-fab-button/app-fab-button";
import {MyApp} from './app.component';
import {RegionTabComponent} from "../pages/leagues-selection/region-tab/region-tab";
import {RegionTabItemComponent} from "../pages/leagues-selection/region-tab/region-tab-item/region-tab-item";
import {ResultsItemComponent} from "../pages/results/results-item/results-item";
import {SkinTabComponent} from "../modals/change-skin/skin-tab/skin-tab";

//Import PROVIDERS
import {LanguageSupportProvider} from '../providers/language-support/language-support';
import {LogProvider} from '../providers/log/log';
import {SportmonksApiCallProvider} from '../providers/sportmonks-api-call/sportmonks-api-call';
import {UsersDataProvider} from '../providers/users-data/users-data';


import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppFabButtonComponent,
    AuthenticationPage,
    BootRoomModal,
    ChangeSkinModal,
    HomePage,
    LeaguesSelectionPage,
    MyApp,
    RegionTabComponent,
    RegionTabItemComponent,
    ResultsItemComponent,
    ResultsPage,
    SkinTabComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AuthenticationPage,
    BootRoomModal,
    ChangeSkinModal,
    HomePage,
    LeaguesSelectionPage,
    MyApp,
    RegionTabComponent,
    ResultsPage,
    SkinTabComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LogProvider,
    UsersDataProvider,
    LanguageSupportProvider,
    SportmonksApiCallProvider
  ]
})
export class AppModule {
}
