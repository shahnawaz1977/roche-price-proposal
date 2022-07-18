import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() getUser: any;
  username:any = '';

  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem("firstname");
  }
  logout(){
    console.log('Logout');
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    localStorage.setItem('firstname', '');
    localStorage.setItem('lastname', '');
    localStorage.setItem('email', '');
  }
}
