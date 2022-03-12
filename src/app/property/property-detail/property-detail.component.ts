import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
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
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.propertyId = Number(this.route.snapshot.params['id']) ;
    this.propertyId = +this.route.snapshot.params['id'];
    //You can select either of the two lines to convert string to number.

    //using the resolver to get data
    this.route.data.subscribe(
      (data: Property) => {
        this.property = data['prp'];
      }
    );

    // this.route.params.subscribe((params) => {
    //   this.propertyId = +params['id'];
    //   this.housingService.getProperty(this.propertyId).subscribe(
    //     (data: Property) => {
    //       this.property = data;
    //     }
    //   )
    // });
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/images/interior-1.jpg',
        medium: 'assets/images/interior-1.jpg',
        big: 'assets/images/interior-1.jpg'
      },
      {
        small: 'assets/images/interior-2.jpg',
        medium: 'assets/images/interior-2.jpg',
        big: 'assets/images/interior-2.jpg'
      },
      {
        small: 'assets/images/interior-3.jpg',
        medium: 'assets/images/interior-3.jpg',
        big: 'assets/images/interior-3.jpg'
      },
      {
        small: 'assets/images/interior-4.jpg',
        medium: 'assets/images/interior-4.jpg',
        big: 'assets/images/interior-4.jpg'
      },
      {
        small: 'assets/images/interior-5.jpg',
        medium: 'assets/images/interior-5.jpg',
        big: 'assets/images/interior-5.jpg'
      }
    ];
  }

  // onSelectNext() {
  //   this.propertyId += 1;
  //   this.router.navigate(['property-detail', this.propertyId]);
  // }
}
