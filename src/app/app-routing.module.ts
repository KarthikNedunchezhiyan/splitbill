import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InitiatorComponent} from "./initiator/initiator.component";
import {UpdatorComponent} from "./updator/updator.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {TallyComponent} from "./tally/tally.component";

const routes: Routes = [
  {
    component: InitiatorComponent,
    path: "initiator"
  },
  {
    component: UpdatorComponent,
    path: "updater"
  },
  {
    component: TallyComponent,
    path: "tally"
  },
  {
    component: PageNotFoundComponent,
    path: "**"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
