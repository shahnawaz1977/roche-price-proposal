import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cluster-head',
  templateUrl: './cluster-head.component.html',
  styleUrls: ['./cluster-head.component.css']
})
export class ClusterHeadComponent implements OnInit {
  isUser = true;
  constructor() { }

  ngOnInit(): void {
  }

}
