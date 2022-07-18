import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-manager',
  templateUrl: './general-manager.component.html',
  styleUrls: ['./general-manager.component.css']
})
export class GeneralManagerComponent implements OnInit {
  isUser = true;
  constructor() { }

  ngOnInit(): void {
  }

}
