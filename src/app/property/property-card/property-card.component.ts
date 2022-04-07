import { Component, Input, OnInit } from '@angular/core';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

@Input() property: IPropertyBase;
@Input() hideIcons: boolean;
public rtm: boolean;

  constructor() { }

  ngOnInit() {
    // if (this.property.readyToMove == 1){
    //   this.rtm = true;
    // } else{
    //   this.rtm = false;
    // }
    // console.log(this.property.readyToMove);
  }
}
