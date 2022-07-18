import { Component, OnInit, ViewChild, TemplateRef,  Input, ElementRef, Injectable, ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbDateStruct, NgbDateParserFormatter, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormGroupName, FormArray } from '@angular/forms';
import { AppService } from '../../../app.service';


@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? (date.day <= 9 ? '0'+date.day : date.day) + this.DELIMITER + (date.month <= 9 ? '0'+date.month : date.month) + this.DELIMITER + date.year : '';
  }
}


@Component({
  selector: 'app-price-proposal',
  templateUrl: './price-proposal.component.html',
  styleUrls: ['./price-proposal.component.css'],
  providers: [NgbModalConfig, NgbModal, { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}],
})
export class PriceProposalComponent implements OnInit {
  @ViewChild('proposalEnd') private contentRef!: TemplateRef<Object>;
  @ViewChild('proposalStart') private contentRef1!: TemplateRef<Object>;
  
  model!: NgbDateStruct;
  
  token =  '';
  proposerName = '';
  isUser = true;
  step = 1;
  closeResult = '';
  step2TableMaxRow = 17;
  step2CurRow = 1;
 
  userID:any = 0;
  proposalID:any = 0;
  productSKUList = [{id:1, product:'Product 1'},{id:2, product:'Product 2'},{id:3, product:'Product 3'},{id:4, product:'Product 4'},{id:5, product:'Product 5'}];
  selectedProductSKU = 'Select Product SKU';

  proposalSpecificList = [{id:1, item:'Item 1'},{id:2, item:'Item 2'},{id:3, item:'Item 3'},{id:4, item:'Item 4'},{id:5, item:'Item 5'}];

  sofist= [{id:1, title:'ESIC/ESIS', value:'ESIC/ESIS'},{id:2, title:'CGHS', value:'CGHS'},{id:3, title:'Army', value:'Army'},{id:4, title:'Railways', value:'Railways'},{id:5, title:'PSU', value:'PSU'},{id:6, title:'State Government', value:'State Government'},{id:7, title:'OOP Affluent (Who do not have issues of affordability on Roche Drugs)', value:'OOP Affluent'},{id:1, title:'OOP Elite (Who can afford drugs worth INR 20 Mn)', value:'OOP Elite'},{id:1, title:'OOP  (Who can afford drugs worth INR 10- 15 Mn)', value: 'OOP'},{id:1, title:'OOP APL / BPL Population Who has upto 10 lacs fund', value:'OOP APL/BPL'},{id:1, title:'BPL Population (Population covered under INR 5 lac basic cover)', value:'BPL Population'}];

  curDate = new Date();
  getYear = this.curDate.getFullYear();
  getMonth = this.curDate.getMonth() + 1;
  getDay = this.curDate.getDate();

  currentDate = { year: this.getYear, month: this.getMonth, day: this.getDay };
  futureDate = { year: this.getYear+2, month: this.getMonth, day: this.getDay };
  updateFromDate = { year: this.getYear, month: this.getMonth, day: this.getDay };
  
  step1Form: FormGroup | any;
  step2Form: FormGroup | any;
  step3Form: FormGroup | any;
  step4Form: FormGroup | any;
  step5Form: FormGroup | any;
  step6Form: FormGroup | any;
  proposalStartForm: FormGroup | any;

  step1Submitted = false;
  step2Submitted = false;
  step3Submitted = false;
  step4Submitted = false;
  step5Submitted = false;
  step6Submitted = false;
  proposalStartSubmitted = false;

  step1Next = false;
  step2Next = false;
  step3Next = false;
  step4Next = false;
  step5Next = false;
  step6Next = false;

  step1Message = '';
  step2Message = '';
  step3Message = '';
  step4Message = '';
  step5Message = '';
  step6Message = '';
  


  private modalRef!: NgbModalRef;
  formName: any;

  constructor(private modalService: NgbModal, config: NgbModalConfig, private router: Router, private fb: FormBuilder, private el: ElementRef, private api:AppService, private cdref: ChangeDetectorRef) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    localStorage.setItem('proposalID', this.proposalID);

    let tempToken:any = localStorage.getItem("token");
    this.token = tempToken;

    let proposer:any = localStorage.getItem("firstname")+' '+localStorage.getItem("lastname");
    this.proposerName = proposer;
    this.userID = localStorage.getItem("user");


    this.step1Form = this.fb.group({
      proposerName: [this.proposerName, Validators.required],
      proposerID: [this.userID, Validators.required],
      clusterHeadName: ['Charles Methews', Validators.required],
      productSKU:['', Validators.required],
      proposalIndication:['', Validators.required],
      proposalSpecific:['', Validators.required],
      whatProposal:['', Validators.required],
      rationaleBehind:['', Validators.required],

      higherPatient:['', Validators.required],
      higherPatientNo1:['', Validators.required],
      higherPatientNo2:['', Validators.required],
      higherPatientYes1:['', Validators.required],
      higherPatientYes2:['', Validators.required],

      proposedPilot:['', Validators.required],
      proposedPilotFromDate:['',  Validators.required],
      proposedPilotToDate:['', Validators.required],
      proposedPilotPriceAction:['', Validators.required],

      patientBenefit:['', Validators.required],
      impactExpected:['', Validators.required],
      additionalExpected:['', Validators.required],

      beforePrice1:['', Validators.required],
      afterPrice1:['', Validators.required],
      
      beforePrice2:['', Validators.required],
      afterPrice2:['', Validators.required],
      
      beforePrice3:['', Validators.required],
      afterPrice3:['', Validators.required],

      beforePrice4:['', Validators.required],
      afterPrice4:['', Validators.required],
      
      beyondPriceAction:['', Validators.required],

      nameInsights:[''],
      sourceInsights:[''],
      sourceInsightsApart:[''],
      sourceInsightsFile:['']
    });

    this.step2Form = this.fb.group({
      step2Fields: this.fb.array([this.createStep2Fields(this.step2CurRow, this.proposalID)])
    });

    this.step3Form = this.fb.group({
      specificAccount:['', Validators.required],
      accountName:['', Validators.required],
      specificSof:['', Validators.required],
      sof:['', Validators.required],

      totalPatientESIC1:['', Validators.required],
      totalPatientCGHS1:['', Validators.required],
      totalPatientArmy1:['', Validators.required],
      totalPatientRailways1:['', Validators.required],
      totalPatientPSU1:['', Validators.required],
      totalPatientSG1:['', Validators.required],
      totalPatientOOPAFF1:['', Validators.required],
      totalPatientOOPELI1:['', Validators.required],
      totalPatientOOPAfford1:['', Validators.required],
      totalPatientOOPAPL1:['', Validators.required],
      totalPatientBPL1:['', Validators.required],

      totalPatientESIC2:['', Validators.required],
      totalPatientCGHS2:['', Validators.required],
      totalPatientArmy2:['', Validators.required],
      totalPatientRailways2:['', Validators.required],
      totalPatientPSU2:['', Validators.required],
      totalPatientSG2:['', Validators.required],
      totalPatientOOPAFF2:['', Validators.required],
      totalPatientOOPELI2:['', Validators.required],
      totalPatientOOPAfford2:['', Validators.required],
      totalPatientOOPAPL2:['', Validators.required],
      totalPatientBPL2:['', Validators.required],

      totalPatientESIC3:['', Validators.required],
      totalPatientCGHS3:['', Validators.required],
      totalPatientArmy3:['', Validators.required],
      totalPatientRailways3:['', Validators.required],
      totalPatientPSU3:['', Validators.required],
      totalPatientSG3:['', Validators.required],
      totalPatientOOPAFF3:['', Validators.required],
      totalPatientOOPELI3:['', Validators.required],
      totalPatientOOPAfford3:['', Validators.required],
      totalPatientOOPAPL3:['', Validators.required],
      totalPatientBPL3:['', Validators.required],

      totalPatientESIC4:['', Validators.required],
      totalPatientCGHS4:['', Validators.required],
      totalPatientArmy4:['', Validators.required],
      totalPatientRailways4:['', Validators.required],
      totalPatientPSU4:['', Validators.required],
      totalPatientSG4:['', Validators.required],
      totalPatientOOPAFF4:['', Validators.required],
      totalPatientOOPELI4:['', Validators.required],
      totalPatientOOPAfford4:['', Validators.required],
      totalPatientOOPAPL4:['', Validators.required],
      totalPatientBPL4:['', Validators.required],
      proposalID:[''],
    });

    this.step4Form = this.fb.group({
      existingDOT:['', Validators.required],
      productSKUDOT:['', Validators.required],
      changeDOT:['', Validators.required],
      systemicChange:['', Validators.required],
      proposalID:[''],
    });    

    this.step5Form = this.fb.group({
      competitionName:['', Validators.required],
      competitionProfile:['', Validators.required],
      existingPrice:['', Validators.required],
      premiumDiscount:['', Validators.required],
      papDiscount:['', Validators.required],
      proposalID:[''],
    });

    this.proposalStartForm = this.fb.group({
      proposalRequire:['', Validators.required],
    });

    
    setTimeout(() => {
      this.open(this.contentRef1);
    }, 500);
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  createStep2Fields(rowNo:number, proposal:any){
    return this.fb.group({
      proposalID:[proposal],
      rowNo:[rowNo],
      doctorName:['', Validators.required],
      accountName:['', Validators.required],
      clusterName:['', Validators.required],
      footfall:['', Validators.required],
      footfallPatient:['', Validators.required],
      diagnosedPatient:['', Validators.required],
      patientsCompetition:['', Validators.required],
      patientsRoche:['', Validators.required],
      planAction:['', Validators.required],
      numberProposed3Month:['', Validators.required],
      numberProposed6Month:['', Validators.required],
      numberProposed1Year:['', Validators.required],
    })
  }

  addTableRow(){
    this.step2CurRow++;
    (this.step2Form.controls['step2Fields'] as FormArray).push(this.createStep2Fields(this.step2CurRow, this.proposalID));           
    console.log(this.step2CurRow)
  }

  removeTableRow(i:any){
    const control = <FormArray>this.step2Form.controls['step2Fields'];
    control.removeAt(i);
    this.step2CurRow--;
    console.log(this.step2CurRow)
  }

  checkProposalID(){
    if(localStorage.getItem("proposalID")){
      this.proposalID = localStorage.getItem("proposalID");
    }
  }

  checkSteps(){
    this.step = this.step+1;
    this.proposalID = localStorage.getItem("proposalID")
  }

  clickStep(val: any){
    this.step = val;
  }

  changeProductSKU(){
    this.selectedProductSKU = this.step1Form.controls['productSKU'].value;
  }

  proposalend(event: any){
    this.open(this.contentRef);
  }
  resetCloseModal2(){
    this.step1Form.controls['patientBenefit'].setValue('Yes');
  }

  setRadioValueForm3(val:any, formElem: any){
    this.step3Form.controls[formElem].setValue(val);
  }

  specificAccount(){
    if(this.step3Form.controls['specificAccount'].value == 'No'){
      this.step3Form.controls['accountName'].setValue('ALL');
    }else{
      this.step3Form.controls['accountName'].setValue('');
    }
  }
  specificSof(){
    if(this.step3Form.controls['specificSof'].value == 'No'){
      this.step3Form.controls['sof'].setValue('ALL');
      this.clearForm3All();
      this.validateForm3All();
    }else{
      this.step3Form.controls['sof'].setValue('');
      this.clearForm3All();
      this.validateForm3RemoveAll();
    }
    this.step3Form.updateValueAndValidity();
  }
  onChangeSOF(){
    console.log(this.step3Form.controls['sof'].value);
    this.updateFormStep3();
  }

  
  
  updateDate(){
    alert()
  }

  onStep1Submit(){
    this.step1Submitted = true;    
    if (this.step1Form.valid) {      
      this.api.httpPostObservable('Step1.php?method=1&token='+this.token, JSON.stringify(this.step1Form.value)).subscribe(response =>{
        console.log(response);
        if(response.status == true){
          this.step1Message = response.message;
          this.step1Next = true;
          this.proposalID = (response.ID).toString();
          localStorage.setItem('proposalID', this.proposalID);          
        }
      });
    } else {
      this.step1Form.markAllAsTouched();
      this.scrollToFirstInvalidControl();
    }
  }

  onStep2Submit(){
    this.step2Submitted = true;
    this.step2Form.controls['step2Fields'].controls[0].controls['proposalID'].setValue(this.proposalID);
    if (this.step2Form.valid) {
      console.log(this.step2Form.value);
      this.api.httpPostObservable('Step2.php?method=1&token='+this.token, JSON.stringify(this.step2Form.value)).subscribe(response =>{
        //console.log('1 Record Added!');
        if(response.status == true){
          this.step2Message = response.message;
          this.step2Next = true;
        }
        console.log(response);
      });
    } else {
      this.step2Form.markAllAsTouched();
      this.scrollToFirstInvalidControl();
    }
  }

  onStep3Submit(){    
    this.step3Form.controls['proposalID'].setValue(this.proposalID);
    this.step3Submitted = true;
    if (this.step3Form.valid) {
      console.log("SUBMITTED 3>>", this.step3Form.value);
      this.api.httpPostObservable('Step3.php?method=1&token='+this.token, JSON.stringify(this.step3Form.value)).subscribe(response =>{
        console.log(response);
        if(response.status == true){
          this.step3Message = response.message;
          this.step3Next = true;
        }
      });
    } else {
      this.step3Form.markAllAsTouched();
      this.scrollToFirstInvalidControl();
    }
  }

  onStep4Submit(){
    this.step4Form.controls['proposalID'].setValue(this.proposalID);
    this.step4Submitted = true;
    
    if (this.step4Form.valid) {
      console.log(this.step4Form.value);
      this.api.httpPostObservable('Step4.php?method=1&token='+this.token, JSON.stringify(this.step4Form.value)).subscribe(response =>{
        if(response.status == true){
          this.step4Message = response.message;
          this.step4Next = true;
        }//console.log('1 Record Added!');
        console.log(response);
      });
    } else {
      this.step4Form.markAllAsTouched();
      this.scrollToFirstInvalidControl();
    }
  }

  onStep5Submit(){
    this.step5Form.controls['proposalID'].setValue(this.proposalID);
    this.step5Submitted = true;
    if (this.step5Form.valid) {
      console.log(this.step5Form.value);
      this.api.httpPostObservable('Step5.php?method=1&token='+this.token, JSON.stringify(this.step5Form.value)).subscribe(response =>{
        if(response.status == true){
          this.step5Message = response.message;
          this.step5Next = true;
        }
        console.log(response);
      });
    } else {
      this.step5Form.markAllAsTouched();
      this.scrollToFirstInvalidControl();
    }
  }


  onProposalStartSubmit(){
    this.proposalStartSubmitted = true;
    if (this.proposalStartForm.valid) {
      this.modalRef.close();
      if(this.proposalStartForm.controls['proposalRequire'].value == 'Yes'){        
        this.router.navigate(['initiator']);
      }
    }
  }

  changeDate(date:any){
    this.updateFromDate = date;
    this.step1Form.controls['proposedPilotToDate'].setValue('');
  }

  updateDuration(date:any){
    const startDate = this.step1Form.controls['proposedPilotFromDate'].value;
    const endDate = this.step1Form.controls['proposedPilotToDate'].value;
    this.step1Form.controls['proposedPilotPriceAction'].setValue(endDate.month - startDate.month + 12 * (endDate.year - startDate.year));
  }
 


  /* Modal */
  open(content: any) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  closeModal(content: any) {
    this.modalRef.close();
    this.router.navigate(['initiator']);
  }
  /* END Modal */

  /* Form Alpha Numeric */
  isNumberKey(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  }
  isAlphaKey(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    return (
      (charCode > 64 && charCode < 91) ||
      (charCode > 96 && charCode < 123) ||
      charCode == 32
    );
  }
  /* END Form Alpha Numeric */

  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      "form .ng-invalid"
    );
    firstInvalidControl.scrollIntoView({ behavior: 'smooth'});
  }

  updateFormStep1(formElem:any){
    if(formElem == 'proposalIndication'){
      if(this.step1Form.controls[formElem].value == 'Yes'){
        this.step1Form.get('proposalSpecific').setValue('');
        this.step1Form.get('proposalSpecific').setValidators([Validators.required]);
        this.step1Form.get('proposalSpecific').updateValueAndValidity();
      }else{
        this.step1Form.get('proposalSpecific').clearValidators();
        this.step1Form.get('proposalSpecific').updateValueAndValidity();
      }
    }else if(formElem == 'higherPatient'){
      this.step1Form.get('higherPatientYes1').setValue('');
      this.step1Form.get('higherPatientYes2').setValue('');
      this.step1Form.get('higherPatientNo1').setValue('');
      this.step1Form.get('higherPatientNo2').setValue('');
      if(this.step1Form.controls[formElem].value == 'Yes'){
        this.step1Form.get('higherPatientYes1').setValidators([Validators.required]);
        this.step1Form.get('higherPatientYes1').updateValueAndValidity();
        this.step1Form.get('higherPatientYes2').setValidators([Validators.required]);        
        this.step1Form.get('higherPatientYes2').updateValueAndValidity();

        this.step1Form.get('higherPatientNo1').clearValidators();
        this.step1Form.get('higherPatientNo1').updateValueAndValidity();
        this.step1Form.get('higherPatientNo2').clearValidators();
        this.step1Form.get('higherPatientNo2').updateValueAndValidity();
      }else{
        this.step1Form.get('higherPatientNo1').setValidators([Validators.required]);
        this.step1Form.get('higherPatientNo1').updateValueAndValidity();
        this.step1Form.get('higherPatientNo2').setValidators([Validators.required]);        
        this.step1Form.get('higherPatientNo2').updateValueAndValidity();

        this.step1Form.get('higherPatientYes1').clearValidators();
        this.step1Form.get('higherPatientYes1').updateValueAndValidity();
        this.step1Form.get('higherPatientYes2').clearValidators();
        this.step1Form.get('higherPatientYes2').updateValueAndValidity();
      }
    }else if(formElem == 'proposedPilot'){  
      this.step1Form.get('proposedPilotFromDate').setValue('');
      this.step1Form.get('proposedPilotToDate').setValue('');
      this.step1Form.get('proposedPilotPriceAction').setValue('');
      if(this.step1Form.controls[formElem].value == 'Yes'){   
        this.step1Form.get('proposedPilotFromDate').setValidators([Validators.required]);
        this.step1Form.get('proposedPilotFromDate').updateValueAndValidity();
        this.step1Form.get('proposedPilotToDate').setValidators([Validators.required]);
        this.step1Form.get('proposedPilotToDate').updateValueAndValidity();
        this.step1Form.get('proposedPilotPriceAction').setValidators([Validators.required]);
        this.step1Form.get('proposedPilotPriceAction').updateValueAndValidity();
      }else{
        this.step1Form.get('proposedPilotFromDate').setValidators([Validators.required]);
        this.step1Form.get('proposedPilotFromDate').updateValueAndValidity();
        this.step1Form.get('proposedPilotToDate').clearValidators();
        this.step1Form.get('proposedPilotToDate').updateValueAndValidity();
        this.step1Form.get('proposedPilotPriceAction').clearValidators();
        this.step1Form.get('proposedPilotPriceAction').updateValueAndValidity();
      }
    }
  }

  updateFormStep3(){
    this.clearForm3All();
    this.validateForm3RemoveAll();
    

    if(this.step3Form.controls['specificSof'].value == 'No'){
        this.validateForm3All;        
    }else if(this.step3Form.controls['specificSof'].value == 'Yes' && this.step3Form.controls['sof'].value == 'ESIC/ESIS'){    
      for(let i=1; i<=4; i++){  
        this.step3Form.get('totalPatientESIC'+i).setValidators([Validators.required]);
        this.step3Form.get('totalPatientESIC'+i).updateValueAndValidity();
      }

    }else if(this.step3Form.controls['specificSof'].value == 'Yes' && this.step3Form.controls['sof'].value == 'CGHS'){
      for(let i=1; i<=4; i++){
        this.step3Form.get('totalPatientCGHS'+i).setValidators([Validators.required]);
        this.step3Form.get('totalPatientCGHS'+i).updateValueAndValidity();
      }

    }else if(this.step3Form.controls['specificSof'].value == 'Yes' && this.step3Form.controls['sof'].value == 'Army'){
      for(let i=1; i<=4; i++){
        this.step3Form.get('totalPatientArmy'+i).setValidators([Validators.required]);
        this.step3Form.get('totalPatientArmy'+i).updateValueAndValidity();
      }

    }else if(this.step3Form.controls['specificSof'].value == 'Yes' && this.step3Form.controls['sof'].value == 'Railways'){
      for(let i=1; i<=4; i++){
        this.step3Form.get('totalPatientRailways'+i).setValidators([Validators.required]);
        this.step3Form.get('totalPatientRailways'+i).updateValueAndValidity();
      }

    }else if(this.step3Form.controls['specificSof'].value == 'Yes' && this.step3Form.controls['sof'].value == 'PSU'){
      for(let i=1; i<=4; i++){
        this.step3Form.get('totalPatientPSU'+i).setValidators([Validators.required]);
        this.step3Form.get('totalPatientPSU'+i).updateValueAndValidity();
      }

    }else if(this.step3Form.controls['specificSof'].value == 'Yes' && this.step3Form.controls['sof'].value == 'State Government'){
      for(let i=1; i<=4; i++){
        this.step3Form.get('totalPatientSG'+i).setValidators([Validators.required]);
        this.step3Form.get('totalPatientSG'+i).updateValueAndValidity();
      }

    }else if(this.step3Form.controls['specificSof'].value == 'Yes' && this.step3Form.controls['sof'].value == 'OOP Affluent'){
      for(let i=1; i<=4; i++){
        this.step3Form.get('totalPatientOOPAFF'+i).setValidators([Validators.required]);
        this.step3Form.get('totalPatientOOPAFF'+i).updateValueAndValidity();
      }

    }else if(this.step3Form.controls['specificSof'].value == 'Yes' && this.step3Form.controls['sof'].value == 'OOP Elite'){
      for(let i=1; i<=4; i++){
        this.step3Form.get('totalPatientOOPELI'+i).setValidators([Validators.required]);
        this.step3Form.get('totalPatientOOPELI'+i).updateValueAndValidity();
      }

    }else if(this.step3Form.controls['specificSof'].value == 'Yes' && this.step3Form.controls['sof'].value == 'OOP'){
      for(let i=1; i<=4; i++){
        this.step3Form.get('totalPatientOOPAfford'+i).setValidators([Validators.required]);
        this.step3Form.get('totalPatientOOPAfford'+i).updateValueAndValidity();
      }

    }else if(this.step3Form.controls['specificSof'].value == 'Yes' && this.step3Form.controls['sof'].value == 'OOP APL/BPL'){
      for(let i=1; i<=4; i++){
        this.step3Form.get('totalPatientOOPAPL'+i).setValidators([Validators.required]);
        this.step3Form.get('totalPatientOOPAPL'+i).updateValueAndValidity();
      }

    }else if(this.step3Form.controls['specificSof'].value == 'Yes' && this.step3Form.controls['sof'].value == 'BPL Population'){
      for(let i=1; i<=4; i++){
        this.step3Form.get('totalPatientBPL'+i).setValidators([Validators.required]);
        this.step3Form.get('totalPatientBPL'+i).updateValueAndValidity();
      }

    }
  }

  validateForm3All(){    
    
    for(let i=1; i<=4; i++){
      this.step3Form.get('totalPatientESIC'+i).setValidators([Validators.required]);
      this.step3Form.get('totalPatientESIC'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientCGHS'+i).setValidators([Validators.required]);
      this.step3Form.get('totalPatientCGHS'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientArmy'+i).setValidators([Validators.required]);
      this.step3Form.get('totalPatientArmy'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientRailways'+i).setValidators([Validators.required]);
      this.step3Form.get('totalPatientRailways'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientPSU'+i).setValidators([Validators.required]);
      this.step3Form.get('totalPatientPSU'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientSG'+i).setValidators([Validators.required]);
      this.step3Form.get('totalPatientSG'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientOOPAFF'+i).setValidators([Validators.required]);
      this.step3Form.get('totalPatientOOPAFF'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientOOPELI'+i).setValidators([Validators.required]);
      this.step3Form.get('totalPatientOOPELI'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientOOPAfford'+i).setValidators([Validators.required]);
      this.step3Form.get('totalPatientOOPAfford'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientOOPAPL'+i).setValidators([Validators.required]);
      this.step3Form.get('totalPatientOOPAPL'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientBPL'+i).setValidators([Validators.required]);
      this.step3Form.get('totalPatientBPL'+i).updateValueAndValidity();
    }
  }

  clearForm3All(){
    for(let i=1; i<=4; i++){
      this.step3Form.get('totalPatientESIC'+i).setValue('');
      this.step3Form.get('totalPatientCGHS'+i).setValue('');
      this.step3Form.get('totalPatientArmy'+i).setValue('');
      this.step3Form.get('totalPatientRailways'+i).setValue('');
      this.step3Form.get('totalPatientPSU'+i).setValue('');
      this.step3Form.get('totalPatientSG'+i).setValue('');
      this.step3Form.get('totalPatientOOPAFF'+i).setValue('');
      this.step3Form.get('totalPatientOOPELI'+i).setValue('');
      this.step3Form.get('totalPatientOOPAfford'+i).setValue('');
      this.step3Form.get('totalPatientOOPAPL'+i).setValue('');
      this.step3Form.get('totalPatientBPL'+i).setValue('');
    }
  }

  validateForm3RemoveAll(){
    for(let i=1; i<=4; i++){
      this.step3Form.get('totalPatientESIC'+i).clearValidators();
      this.step3Form.get('totalPatientESIC'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientCGHS'+i).clearValidators();
      this.step3Form.get('totalPatientCGHS'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientArmy'+i).clearValidators();
      this.step3Form.get('totalPatientArmy'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientRailways'+i).clearValidators();
      this.step3Form.get('totalPatientRailways'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientPSU'+i).clearValidators();
      this.step3Form.get('totalPatientPSU'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientSG'+i).clearValidators('');
      this.step3Form.get('totalPatientSG'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientOOPAFF'+i).clearValidators();
      this.step3Form.get('totalPatientOOPAFF'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientOOPELI'+i).clearValidators();
      this.step3Form.get('totalPatientOOPELI'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientOOPAfford'+i).clearValidators();
      this.step3Form.get('totalPatientOOPAfford'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientOOPAPL'+i).clearValidators();
      this.step3Form.get('totalPatientOOPAPL'+i).updateValueAndValidity();
      this.step3Form.get('totalPatientBPL'+i).clearValidators();
      this.step3Form.get('totalPatientBPL'+i).updateValueAndValidity();
    }
  }
}
