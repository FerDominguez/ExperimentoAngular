import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ApisService } from './../apis.service'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-studio-gibli',
  templateUrl: './studio-gibli.component.html',
  styleUrls: ['./studio-gibli.component.css']
})
export class StudioGibliComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  obs!: Observable<any>; 
  dataSource:any;
  DATAS: Card[] = [];
  films:any;
  peoples:any;
  species:any;
  locations:any;
  vehicles:any;
  data:any;

  constructor( private StudiogibliService: ApisService, private changeDetectorRef: ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.traerFilms();
    this.traerPeoples();
    this.traerSpecies();
    this.traerLocations();
    this.traerVehicles();
    setTimeout(() => {
      this.dataSource= new MatTableDataSource<Card>(this.DATAS)
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    }, 5000); 
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  traerFilms(){
    this.StudiogibliService.llamarApi("https://ghibliapi.herokuapp.com/films")
    .subscribe(
      result => {
        this.films=result;
      }
    )
  }

  traerPeoples(){
    this.StudiogibliService.llamarApi("https://ghibliapi.herokuapp.com/people")
    .subscribe(
      result => {
        this.peoples=result;
        this.peoples.forEach((element:any) => {
          element.films.forEach((newelement:any, i:number) => {
            this.StudiogibliService.llamarApi(newelement).subscribe(
              result=>{
                element.films[i]=result;
                element.films[i]=element.films[i].title;
              }
              )
            });

          this.StudiogibliService.llamarApi(element.species).subscribe(
            result=>{
              element.species=result
              if(element.species.length === undefined){
                element.species=element.species.name
              }
              else{
                element.species="unidentified"
              }
              this.DATAS.push(new Card (element.name, element.hair_color, element.species, 
                element.films, element.gender, element.age, element.eye_color))
            }
          )
          });
      }
    )
  }

  traerSpecies(){
    this.StudiogibliService.llamarApi("https://ghibliapi.herokuapp.com/species")
    .subscribe(
      result => {
        this.species=result;
      }
    )
  }

  traerLocations(){
    this.StudiogibliService.llamarApi("https://ghibliapi.herokuapp.com/locations")
    .subscribe(
      result => {
        this.locations=result;
        this.locations.forEach((element:any) => {
          element.films.forEach((newelement:any,index:number) => {
            this.StudiogibliService.llamarApi(newelement).subscribe(
              result=>{
                this.data=result;
                element.films[index]=`${this.data.title}`;
              }
            )
          });
          
          element.residents.forEach((newelement:any,i:number) => {    
            if(newelement!=0 && newelement!="TODO"){
              this.StudiogibliService.llamarApi(newelement).subscribe(
                result=>{
                  this.data=result;
                  element.residents[i]=this.data.name;
                }
              )
            }
          });
        });
      }
    )
  }

  traerVehicles(){
    this.StudiogibliService.llamarApi("https://ghibliapi.herokuapp.com/vehicles")
    .subscribe(
      result => {
        this.vehicles=result;
        this.vehicles.forEach((element:any) => {
          this.StudiogibliService.llamarApi(element.pilot).subscribe(
            result => {
              element.pilot=result
              element.pilot=element.pilot.name
            }
          )
          
          this.StudiogibliService.llamarApi(element.films).subscribe(
            result => {
              element.films=result
              element.films=element.films.title
            }
          )

        });

      }
    )
  }
}

export class Card {
  constructor(
    public name: any, public hair_color: any, public species: any, 
    public films:Array<any>, public gender: any, public age: any, 
    public eye_color: any) {
  }
}