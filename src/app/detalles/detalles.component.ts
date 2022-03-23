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
genInfo:any;

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
            }
          )
        }
        )
      },
      error: (error)=>{
        this.Router.navigateByUrl("/**")
      }
      }
    )
  }

}
