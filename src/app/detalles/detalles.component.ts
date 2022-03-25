import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApisService } from '../apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
pkemon:any;
genInfo:any
abiliti: any[] = [];
moves: any[] = [];

  constructor(private _route:ActivatedRoute, private detalle:ApisService, private Router:Router) {
  }

  ngOnInit(): void {
    let x=this._route.snapshot.paramMap.get('id');

    this.traerDetalles(x);
  }

  traerDetalles(x:any){
    this.detalle.llamarApi(`https://pokeapi.co/api/v2/pokemon/${x}`).subscribe({
      next: (result) =>{

        this.pkemon=result;
        
        this.pkemon.types.forEach((element:any,i:number) => {
          this.pkemon.types[i]=element.type.name;
        });
        this.pkemon.forms.forEach((element:any,i:number) => {
          this.pkemon.forms[i]=element.name;
        });
        this.detalle.llamarApi(this.pkemon.species.url).subscribe(
          resultado=>{
            this.genInfo=resultado;
          }
        )
        this.pkemon.abilities.forEach((element:any) => {
          this.detalle.llamarApi(element.ability.url).subscribe(
            resultadoss=>{
              element.ability.url=resultadoss;
              element.ability.url.effect_entries.forEach((newelement:any)=>{
                if(newelement.language.name=="en"){
                  element.ability.url.effect_entries=newelement.effect
                }
              })
              this.abiliti=[];
              var bandera=" ";
              element.ability.url.flavor_text_entries.forEach((newelement:any)=>{
                if(newelement.language.name=="es" && newelement.flavor_text!==bandera){
                  bandera=newelement.flavor_text;
                  this.abiliti.push(newelement.flavor_text);
                }
              })
              element.ability.url.flavor_text_entries=this.abiliti
            }
          )
        }
        )
        this.pkemon.moves.forEach((element:any)=>{
          this.detalle.llamarApi(element.move.url).subscribe(
            resultss=>{
              element.move.url=resultss;
              element.move.url.names.forEach((newelement:any) => {
                if(newelement.language.name=="es"){
                  element.move.url.name=newelement.name
                }
              });
              element.move.url.effect_entries.forEach((newelement:any)=>{
                element.move.url.effect_entries=newelement.effect+", "+newelement.short_effect;
              })
              this.moves=[];
              var bandera=" ";
              element.move.url.flavor_text_entries.forEach((newelement:any)=>{
                if(newelement.language.name=="es" && newelement.flavor_text!==bandera){
                  bandera=newelement.flavor_text;
                  this.moves.push(newelement.flavor_text);
                }
              })
              element.move.url.flavor_text_entries=this.moves
            }
          )
        })
      },
      error: (error)=>{
        this.Router.navigateByUrl("/**")
      }
      }
    )
  }

}
