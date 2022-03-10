import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ApisService } from './../apis.service'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  obs!: Observable<any>;
  DATA: Card[] = [];
  dataSource:any;
  pokemons:any;

  constructor( private PokemonService: ApisService, private changeDetectorRef: ChangeDetectorRef ) {  }

  ngOnInit() {
    this.traer_pokemons();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }



  traer_pokemons(){
    this.PokemonService.llamarApi("https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0").subscribe(
      result=>{
        this.pokemons=result;
        this.pokemons=this.pokemons.results;
        this.pokemons.forEach((element:any) => {
          this.PokemonService.llamarApi(element.url).subscribe(
           resultado=>{
              element.url=resultado
              element.url.abilities.forEach((newelement:any,i:number) => {  
                element.url.abilities[i]=newelement.ability.name
              });
              element.url.forms.forEach((newelement:any,i:number) => {  
                element.url.forms[i]=newelement.name
              });
              element.url.moves.forEach((newelement:any,i:number) => {  
                element.url.moves[i]=newelement.move.name
              });
              element.url.types.forEach((newelement:any,i:number) => {
                element.url.types[i]=newelement.type.name
              });
              element.url.species=element.url.species.name
              element.url.sprites=element.url.sprites.front_default
              this.DATA.push(new Card (element.name, 
                element.url.forms, element.url.species,
                element.url.sprites, element.url.types, element.url.weight))
    
              this.dataSource= new MatTableDataSource<Card>(this.DATA)
              this.changeDetectorRef.detectChanges();
              this.dataSource.paginator = this.paginator;
              this.obs = this.dataSource.connect();
            }
          )
        });
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

export class Card {
  constructor(
    public name: any, public forms:Array<any>,
    public species:any, public sprites:Array<any>, 
    public types:Array<any>, public weight:any) {
  }
}
