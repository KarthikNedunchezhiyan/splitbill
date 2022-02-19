import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InitiatorComponent} from './initiator/initiator.component';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {UpdatorComponent} from './updator/updator.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {FormsModule} from '@angular/forms';
import {TallyComponent} from './tally/tally.component';
import {ClipboardModule} from 'ngx-clipboard';

@NgModule({
  declarations: [
    AppComponent,
    InitiatorComponent,
    NavigationBarComponent,
    UpdatorComponent,
    PageNotFoundComponent,
    TallyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
