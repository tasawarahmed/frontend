import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../iProperty.interface';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  SellRent: number = 1;
  PropertyType: string = '';
  Properties: Array<IProperty> = [];

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) {}

  ngOnInit(): void {
    this.PropertyType = this.route.snapshot.url.toString();
    //console.log(this.PropertyType);

    switch (this.PropertyType) {
      // case "":
      //     this.SellRent = 0;
      //     break;
      case 'rent-property':
        this.SellRent = 2;
        break;
      case 'buy-property':
        this.SellRent = 1;
        break;
      default:
        this.SellRent = 0;
        break;
    }
    //console.log(this.SellRent);

    if (this.SellRent == 0) {
      this.housingService.getUnfilteredProperties().subscribe(
        (data) => {
          this.Properties = data;
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.housingService.getAllProperties(this.SellRent).subscribe(
        (data) => {
          this.Properties = data;
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
