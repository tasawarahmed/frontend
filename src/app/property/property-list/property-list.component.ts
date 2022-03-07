import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  Properties: Array<any> = [
    {
      Id: 1,
      Name: 'Birla House',
      Type: 'House',
      Price: 120000,
    },
    {
      Id: 2,
      Name: 'Shazia House',
      Type: '1BHK',
      Price: 240000,
    },
    {
      Id: 3,
      Name: 'Tasawar House',
      Type: '2BHK',
      Price: 360000,
    },
    {
      Id: 4,
      Name: 'Jazib House',
      Type: '3BHK',
      Price: 480000,
    },
    {
      Id: 5,
      Name: 'Ahmed House',
      Type: '4BHK',
      Price: 600000,
    },
    {
      Id: 6,
      Name: 'Zuha House',
      Type: '5BHK',
      Price: 720000,
    },
    {
      Id: 7,
      Name: 'Aunt House',
      Type: '6BHK',
      Price: 840000,
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
