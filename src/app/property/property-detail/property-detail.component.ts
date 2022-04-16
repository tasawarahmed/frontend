import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxGalleryImage,
  NgxGalleryOptions,
  NgxGalleryAnimation,
} from '@kolkov/ngx-gallery';
import { isDate } from 'ngx-bootstrap/chronos';
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
  public sellRentType: string;
  public mainPhotoUrl: string = null;
  public firstPhotoUrl: string = null;
  public imageUrls: string[] = [];

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
    this.route.data.subscribe((data: Property) => {
      this.property = data['prp'];
      // console.log(this.property.photos);
    });

    this.property.age = this.housingService.getPropertyAge(
      this.property.estPossessionOn
    );
    this.sellRentType = this.housingService.getPropertySellRentString(
      this.property.sellRent
    );

    // if(isDate(this.property.estPossessionOn)){
    //   this.property.age = this.housingService.getPropertyAge(this.property.estPossessionOn);
    // }else{
    //   this.property.age = this.housingService.getPropertyAgeString(+this.property.age);
    // }

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
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];

    this.galleryImages = this.getPropertyPhotos();
    for (let image of this.galleryImages)
    {
      console.log(image.small);
    }
  }

  getPropertyPhotos(): NgxGalleryImage[] {
    const photoUrls: NgxGalleryImage[] = [];

    for (const photo of this.property.photos) {
      if (photo.isPrimary) {
        this.mainPhotoUrl = photo.imageUrl;
      } else {
        this.imageUrls.push(photo.imageUrl);
        this.firstPhotoUrl = photo.imageUrl;
        photoUrls.push({
          small: photo.imageUrl,
          medium: photo.imageUrl,
          big: photo.imageUrl,
        });
      }
    }
    // console.log(photoUrls);
    return photoUrls;
  }

  // onSelectNext() {
  //   this.propertyId += 1;
  //   this.router.navigate(['property-detail', this.propertyId]);
  // }
}
