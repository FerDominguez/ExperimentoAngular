import { Component, OnInit } from '@angular/core';
import { ApisService } from './../apis.service'

@Component({
  selector: 'app-star-wars',
  templateUrl: './star-wars.component.html',
  styleUrls: ['./star-wars.component.css']
})
export class StarWarsComponent implements OnInit {
  films:any;
  peoples:any;
  species:any;
  planets:any;
  vehicles:any;
  starships:any;
  
  constructor( private StarwarsService : ApisService ) { }

  ngOnInit(): void {
    this.StarwarsService.llamarApi("https://swapi.dev/api/films").subscribe(
      result=>{
        this.films=result;
        this.films=this.films.results
      }
    )
    
    this.StarwarsService.llamarApi("https://swapi.dev/api/people/?page=2").subscribe(
      result=>{
        this.peoples=result;
        this.peoples=this.peoples.results;
        this.peoples.forEach((element:any) => {
          if(element.species.length==0){
            element.species="https://swapi.dev/api/species/1/"
          }
          this.StarwarsService.llamarApi(element.species).subscribe(
            resultado=>{
              element.species=resultado;
              element.species=`${element.species.name} - ${element.species.classification}`;
            }
          )
          this.StarwarsService.llamarApi(element.homeworld).subscribe(
            resultado=>{
              element.homeworld=resultado;
              element.homeworld=`${element.homeworld.name} - ${element.homeworld.terrain}`;
            }
          )
          element.vehicles.forEach((newelement:any, i:number) => {
            this.StarwarsService.llamarApi(newelement).subscribe(
              resultado=>{
                newelement=resultado;
                element.vehicles[i]=`${newelement.name} - ${newelement.model}`;
              }
            )
          });
          element.starships.forEach((newelement:any, i:number) => {
            this.StarwarsService.llamarApi(newelement).subscribe(
              resultado=>{
                newelement=resultado
                element.starships[i]=`${newelement.name} - ${newelement.model}`;
              }
            )
          });
        });
        }
    )

    this.StarwarsService.llamarApi("https://swapi.dev/api/species").subscribe(
        result=>{
          this.species=result;
          this.species=this.species.results;
        }
    )

    this.StarwarsService.llamarApi("https://swapi.dev/api/planets").subscribe(
        result=>{
          this.planets=result;
          this.planets=this.planets.results;
        }
    )

    this.StarwarsService.llamarApi("https://swapi.dev/api/vehicles").subscribe(
        result=>{
          this.vehicles=result;
          this.vehicles=this.vehicles.results;
        }
    )

    this.StarwarsService.llamarApi("https://swapi.dev/api/starships").subscribe(
        result=>{
          this.starships=result;
          this.starships=this.starships.results;
        }
    )
  }

}
