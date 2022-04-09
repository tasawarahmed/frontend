import { ForwardRefHandling } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Ikeyvaluepair } from 'src/app/model/Ikeyvaluepair';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('formTabs') formTabs: TabsetComponent;

  addPropertyForm: FormGroup;
  nextClicked: boolean = false;
  property = new Property();
  cityList: any[];
  propertyTypes: Ikeyvaluepair[];
  furnishingTypes: Ikeyvaluepair[];

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
    city: '',
    readyToMove: null,
    estPossessionOn: null,
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private housingService: HousingService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      this.alertify.error('You must be logged in to add a property.');
      (<any>this.router).navigate(['/user/login']);
    }
    this.CreateAddPropertyForm();
    this.housingService.getAllCities().subscribe((data) => {
      this.cityList = data;
      // console.log(data);
    });
    this.housingService.getFurnishingTypes().subscribe((data) => {
      this.furnishingTypes = data;
      // console.log(data);
    });

    this.housingService.getPropertyTypes().subscribe((data) => {
      this.propertyTypes = data;
      // console.log(data);
    });
  }

  CreateAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1', Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required],
      }),

      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [0],
        Maintenance: [0],
      }),

      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null, Validators.required],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null],
      }),
    });
  }

  onBack() {
    // this.router.navigate(['/']);
    (<any>this.router).navigate(['/']);
  }

  //Getter Methods
  get BasicInfo() {
    return this.addPropertyForm.controls.BasicInfo as FormGroup;
  }

  get PriceInfo() {
    return this.addPropertyForm.controls.PriceInfo as FormGroup;
  }

  get AddressInfo() {
    return this.addPropertyForm.controls.AddressInfo as FormGroup;
  }

  get OtherInfo() {
    return this.addPropertyForm.controls.OtherInfo as FormGroup;
  }
  // #endregion

  // #region <Form Controls>
  get SellRent() {
    return this.BasicInfo.controls.SellRent as FormControl;
  }

  get BHK() {
    return this.BasicInfo.controls.BHK as FormControl;
  }

  get PType() {
    return this.BasicInfo.controls.PType as FormControl;
  }

  get FType() {
    return this.BasicInfo.controls.FType as FormControl;
  }

  get Name() {
    return this.BasicInfo.controls.Name as FormControl;
  }

  get City() {
    return this.BasicInfo.controls.City as FormControl;
  }

  get Price() {
    return this.PriceInfo.controls.Price as FormControl;
  }

  get BuiltArea() {
    return this.PriceInfo.controls.BuiltArea as FormControl;
  }

  get CarpetArea() {
    return this.PriceInfo.controls.CarpetArea as FormControl;
  }

  get Security() {
    return this.PriceInfo.controls.Security as FormControl;
  }

  get Maintenance() {
    return this.PriceInfo.controls.Maintenance as FormControl;
  }

  get FloorNo() {
    return this.AddressInfo.controls.FloorNo as FormControl;
  }

  get TotalFloor() {
    return this.AddressInfo.controls.TotalFloor as FormControl;
  }

  get Address() {
    return this.AddressInfo.controls.Address as FormControl;
  }

  get LandMark() {
    return this.AddressInfo.controls.LandMark as FormControl;
  }

  get RTM() {
    return this.OtherInfo.controls.RTM as FormControl;
  }

  get PossessionOn() {
    return this.OtherInfo.controls.PossessionOn as FormControl;
  }

  get AOP() {
    return this.OtherInfo.controls.AOP as FormControl;
  }

  get Gated() {
    return this.OtherInfo.controls.Gated as FormControl;
  }

  get MainEntrance() {
    return this.OtherInfo.controls.MainEntrance as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls.Description as FormControl;
  }
  onSubmit() {
    this.nextClicked = true;

    if (this.allTabsValid()) {
      this.mapProperty();
      console.log(this.property);
      this.housingService.addProperty(this.property).subscribe(() => {
        this.alertify.success(
          'Congrats! your property listed successfully on our website.'
        );
        this.nextClicked = false;

        if (this.SellRent.value === '2') {
          (<any>this.router).navigate(['/rent-property']);
        } else {
          (<any>this.router).navigate(['/']);
        }
      });
    } else {
      this.alertify.error(
        'Please review the form and provide all valid entries.'
      );
    }
  }

  mapProperty(): void {
    this.property.id = this.housingService.newPropID();
    this.property.sellRent = +this.SellRent.value;//
    this.property.bhk = this.BHK.value;//
    this.property.propertyTypeId = this.PType.value;//
    this.property.name = this.Name.value;//
    this.property.cityId = this.City.value;//
    this.property.furnishingTypeId = this.FType.value;//
    this.property.price = this.Price.value;//
    this.property.builtArea = this.BuiltArea.value;//
    //using datepipe in this case is explained in video 61
    this.property.estPossessionOn = this.PossessionOn.value;//

    this.property.security = this.Security.value;
    this.property.maintenance = this.Maintenance.value;
    this.property.carpetArea = this.CarpetArea.value;
    this.property.floorNo = this.FloorNo.value;
    this.property.totalFloors = this.TotalFloor.value;
    this.property.address = this.Address.value;
    this.property.address2 = this.LandMark.value;
    this.property.readyToMove = this.RTM.value;
    this.property.gated = this.Gated.value;
    this.property.mainEntrance = this.MainEntrance.value;
    this.property.description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }

    if (this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }

  selectTab(tabId: number, isCurrentTabValid?: boolean) {
    this.nextClicked = true;
    if (isCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
      this.nextClicked = false;
    }
  }
}

// We can also use this way in html to disable the button after its getter method
// [disabled] = BasicInfo.invalid
