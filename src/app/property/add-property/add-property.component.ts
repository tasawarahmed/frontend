import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from 'src/app/model/iproperty';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('formTabs') formTabs: TabsetComponent;

  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  gatedCommunity: Array<string> = ['Yes', 'No'];
  mainEntrance: Array<string> = ['East', 'West', 'South', 'North'];

  propertyView: IPropertyBase = {
    Id: null,
    Name: null,
    Price: null,
    SellRent: null,
    PType: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onBack(){
    this.router.navigate(['/']);
  }

  onSubmit(Form: NgForm){
    console.log("form submitted");
    console.log(Form);
  }

  selectTab(tabId: number){
    this.formTabs.tabs[tabId].active = true;
  }
}
