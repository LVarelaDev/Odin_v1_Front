import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fuec',
  templateUrl: './fuec.component.html',
  styleUrls: ['./fuec.component.css']
})
export class FuecComponent implements OnInit{

  id?: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtener el parámetro de la ruta
    this.id = this.route.snapshot.paramMap.get('id') ?? "";
    console.log('ID:', this.id);

    // Si necesitas observar los cambios del parámetro (por ejemplo, si la ruta puede cambiar sin recargar el componente)
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? ""
      console.log('ID actualizado:', this.id);
    });

    
  }
}
