import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subject, Subscription } from 'rxjs';
import { BikeDataServiceService } from './service/bike-data-service.service';

import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'City Bike';
  lat = 59.9139; // oslo city position
  lon = 10.7522;
  destroy$: Subject<boolean> = new Subject<boolean>();
  bikeStations: any;
  availableBikeData: any;
  subscription1$: Subscription;
  isBikeSelected = true;

  constructor(private bikeDataServiceService: BikeDataServiceService) {
  }

  ngOnInit(): void {
    this.getAllStationBikeDetails();
  }

  configureStationData(): void {
    this.bikeStations.map((station) => {
      const stationIndex = this.availableBikeData.findIndex(data => data.station_id === station.station_id);
      station.bikeAvaialble = this.availableBikeData[stationIndex].num_bikes_available;
      station.parkingAvailable = this.availableBikeData[stationIndex].num_docks_available;
      station.imageUrlBlue = {
        url: 'assets/blue-circle.svg',
        scaledSize: { height: 20, width: 20 }
      };
      station.imageUrlGrey = {
        url: 'assets/grey-circle.svg',
        scaledSize: { height: 20, width: 20 }
      };
    });
  }

  getAllStationBikeDetails(): void {
    this.subscription1$ = forkJoin([
      this.bikeDataServiceService.getAllStationInformation(),
      this.bikeDataServiceService.getAllBikeAndDocAvailability()
    ])
      .pipe()
      .subscribe((response) => {
        this.bikeStations = response[0]?.data?.stations;
        this.availableBikeData = response[1]?.data?.stations;
        this.configureStationData();
      });

  }

  onMouseOver(infoWindow, $event: MouseEvent): void {
    infoWindow.open();
  }

  onMouseOut(infoWindow, $event: MouseEvent): void {
    infoWindow.close();
  }


  ngOnDestroy(): void {
    if (this.subscription1$) {
      this.subscription1$.unsubscribe();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
