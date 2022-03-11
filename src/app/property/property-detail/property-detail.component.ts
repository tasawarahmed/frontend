import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {
  public propertyId: number;
  property = new Property();

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.propertyId = Number(this.route.snapshot.params['id']) ;
    this.propertyId = +this.route.snapshot.params['id'];
    //You can select either of the two lines to convert string to number.
    this.route.params.subscribe((params) => {
      this.propertyId = +params['id'];
      this.housingService.getProperty(this.propertyId).subscribe(
        (data: Property) => {
          this.property = data;
        }
      )
    });
  }

  onSelectNext() {
    this.propertyId += 1;
    this.router.navigate(['property-detail', this.propertyId]);
  }
}
