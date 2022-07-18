import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-director',
  templateUrl: './access-director.component.html',
  styleUrls: ['./access-director.component.css']
})
export class AccessDirectorComponent implements OnInit {
  isUser = true;
  constructor() { }

  ngOnInit(): void {
  }

}
