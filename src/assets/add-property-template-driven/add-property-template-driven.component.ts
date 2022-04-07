import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from 'src/app/model/iproperty';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-add-property-template-driven',
  templateUrl: './add-property-template-driven.component.html',
  styleUrls: ['./add-property-template-driven.component.css']
})
export class AddPropertyTemplateDrivenComponent implements OnInit {
  @ViewChild('formTabs') formTabs: TabsetComponent;

  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  gatedCommunity: Array<string> = ['Yes', 'No'];
  mainEntrance: Array<string> = ['East', 'West', 'South', 'North'];

  propertyView: IPropertyBase = {
    id: null,
    name: null,
    price: null,
    sellRent: null,
    propertyType: null,
    furnishingType: null,
    bhk: null,
    builtArea: null,
    city: null,
    readyToMove: null
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onBack(){
    (<any>this.router).navigate(['/']);
  }

  onSubmit(Form: NgForm){
    console.log("form submitted");
    console.log(Form);
  }

  selectTab(tabId: number){
    this.formTabs.tabs[tabId].active = true;
  }
}
