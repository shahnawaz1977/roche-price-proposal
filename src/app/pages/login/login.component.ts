import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupName } from '@angular/forms';
import { AppService } from '../../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  submitted = false;
  showLoader = false;
  errorMessage = '';

  isUser = false;
  loginFailed = false;

  constructor(private fb: FormBuilder, private api:AppService, private router: Router,) { }

  ngOnInit(): void {
    let tempToken:any = localStorage.getItem("token");
    if(tempToken == '' || tempToken == null){
      localStorage.setItem('token', '');
    }    
    this.loginForm = this.fb.group({
      email: ['initiator@roche.com', [Validators.required, Validators.email]],
      password: ['admin123', Validators.required],
    });
  }

  onLogin(){
    localStorage.setItem('token', '');
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    //this.showLoader = true;
    this.api.httpPostObservable('Login.php', JSON.stringify(this.loginForm.value)).subscribe(response =>{
      this.showLoader = false;
      if(response.status == true){
        this.errorMessage = '';
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.data[0].ID);
        localStorage.setItem('firstname', response.data[0].FirstName);
        localStorage.setItem('lastname', response.data[0].LastName);
        localStorage.setItem('email', response.data[0].Email);
        
        if(response.data[0].ProfileType == '1'){
          this.router.navigate(['/initiator']);
        }else if(response.data[0].ProfileType == '2'){
          this.router.navigate(['/cluster-head']);
        }else if(response.data[0].ProfileType == '3'){
          this.router.navigate(['/price-lead']);
        }else if(response.data[0].ProfileType == '4' || response.data[0].ProfileType == '5'){
          this.router.navigate(['/marketing-lead']);
        }else if(response.data[0].ProfileType == '6' || response.data[0].ProfileType == '7'){
          this.router.navigate(['/general-manager']);
        }
      }else{
        localStorage.setItem('token', '');
        this.errorMessage = 'Invalid username or password!';
        this.loginFailed = true;
      }
      console.log(response);
    })
  }

}
