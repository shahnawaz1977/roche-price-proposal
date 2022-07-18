import {Component, OnInit} from '@angular/core';
/* import { PROPOSALS } from './proposals'; */
import { AppService } from '../../app.service';


@Component({
  selector: 'app-initiator',
  templateUrl: './initiator.component.html',
  styleUrls: ['./initiator.component.css']
})
export class InitiatorComponent implements OnInit {
  isUser = true;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  proposalList = new Array;
  searchKey = '';
  isLoading = false;
  userID:any = 0;
  token = '';
  proposerName = '';
  

  constructor(private api:AppService) {
    //this.refreshCountries();
  }

  ngOnInit(): void {
    //this.proposalList = PROPOSALS;
    
    let tempToken:any = localStorage.getItem("token");
    this.token = tempToken;

    let proposer:any = localStorage.getItem("firstname")+' '+localStorage.getItem("lastname");
    this.proposerName = proposer;
    this.userID = localStorage.getItem("user");
    const userDetail = {userID:this.userID};

    this.api.httpPostObservable('getProposals.php?&token='+this.token, JSON.stringify(userDetail)).subscribe(response =>{
      if(response.status == true){        
        this.proposalList = JSON.parse(response.data);
        this.collectionSize = this.proposalList.length;

        console.log("SHANu", this.proposalList);
      }
      
    });
        
  }
  
  refreshCountries() {
    //
  }
  applyProgress(val:any){
    const styles = {'width' : Math.floor((val/6)*100)+'%'};
    return styles;
  }
  getProgress(val:any){
    return Math.floor((val/6)*100);
  }
  proposalView(id:any){
    console.log(id);
  }
  proposalEdit(id:any){
    console.log(id);
  }
  proposalDownload(id:any){
    console.log(id);
  }
  proposalDelete(id:any){
    console.log(id);
  }
  splitCreateAtDate(date:any){
    const tempDate = date.split(" ");
    return tempDate[0];
  }
  getYear(date:any){
    let tempDate = date.split(" ");
    tempDate = tempDate[0].split("-");
    return tempDate[0];
  }
  search(){
    this.isLoading = true;
    if(this.searchKey == ''){
      this.isLoading = false;
      this.ngOnInit();
    }else{
      //this.proposalList = PROPOSALS;
      
      /* this.proposalList = this.proposalList.filter(res =>{
        this.isLoading = false;
        return res.proposalNo.toLocaleLowerCase().match(this.searchKey.toLocaleLowerCase())
      }) */
    }
  }
}
