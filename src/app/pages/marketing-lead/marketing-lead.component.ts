import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marketing-lead',
  templateUrl: './marketing-lead.component.html',
  styleUrls: ['./marketing-lead.component.css']
})
export class MarketingLeadComponent implements OnInit {
  isUser = true;
  constructor() { }

  ngOnInit(): void {
  }

}
