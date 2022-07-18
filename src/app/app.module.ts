import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { InitiatorComponent } from './pages/initiator/initiator.component';
import { ClusterHeadComponent } from './pages/cluster-head/cluster-head.component';
import { PriceLeadComponent } from './pages/price-lead/price-lead.component';
import { MarketingLeadComponent } from './pages/marketing-lead/marketing-lead.component';
import { GeneralManagerComponent } from './pages/general-manager/general-manager.component';
import { AccessDirectorComponent } from './pages/access-director/access-director.component';
import { HeaderComponent } from './components/header/header.component';
import { PriceProposalComponent } from './pages/initiator/price-proposal/price-proposal.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InitiatorComponent,
    ClusterHeadComponent,
    PriceLeadComponent,
    MarketingLeadComponent,
    GeneralManagerComponent,
    AccessDirectorComponent,
    HeaderComponent,
    PriceProposalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
