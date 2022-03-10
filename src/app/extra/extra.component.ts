import { Component, OnInit, Input } from '@angular/core';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css']
})
export class ExtraComponent implements OnInit {
  @Input() valor: string="";

  constructor(private detalle:ApisService) { }

  ngOnInit(): void {
    console.log(this.valor)
    this.detalle.llamarApi(this.valor).subscribe(
      result=>{
        console.log(result)
      }
    )
  }

}
