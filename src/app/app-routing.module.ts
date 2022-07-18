import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/pages/login/login.component';
import { InitiatorComponent } from '../app/pages/initiator/initiator.component';
import { PriceProposalComponent } from '../app/pages/initiator/price-proposal/price-proposal.component';
import { ClusterHeadComponent } from '../app/pages/cluster-head/cluster-head.component';
import { PriceLeadComponent } from '../app/pages/price-lead/price-lead.component';
import { MarketingLeadComponent } from '../app/pages/marketing-lead/marketing-lead.component';
import { GeneralManagerComponent } from '../app/pages/general-manager/general-manager.component';
import { AccessDirectorComponent } from '../app/pages/access-director/access-director.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'initiator' , component: InitiatorComponent },
  { path: 'initiator/price-proposal' , component: PriceProposalComponent },
  { path: 'cluster-head', component: ClusterHeadComponent },
  { path: 'price-lead', component: PriceLeadComponent },
  { path: 'marketing-lead', component: MarketingLeadComponent },
  { path: 'general-manager', component: GeneralManagerComponent },
  { path: 'access-director', component: AccessDirectorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
