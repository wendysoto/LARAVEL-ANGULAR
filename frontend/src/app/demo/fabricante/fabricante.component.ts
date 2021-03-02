import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientelaravelService } from 'src/app/service/clientelaravel.service';
import { Fabricante } from 'src/app/service/fabricante';

@Component({
  selector: 'app-fabricante',
  templateUrl: './fabricante.component.html',
  styleUrls: ['./fabricante.component.css']
})
export class FabricanteComponent implements OnInit {

  title:string = "Fabricantes";
  fabricantes:Fabricante[]=[];
  myFormFabricante!:FormGroup;
  actualizar:boolean=false;


  constructor(public servc:ClientelaravelService) { 
    
  }

  ngOnInit(): void {
this.obtenerFabricantes();

//formulario
this.myFormFabricante = new FormGroup({
  idF : new FormControl(''),
  nombreF: new FormControl(''),
  telefonoF: new FormControl(''),
});

   
  }
//OBTENER
  obtenerFabricantes(){
    this.servc.getFabricantes().subscribe(r=>{
      console.log(r);
      return this.fabricantes=r;
    })
  }

  // INSERTAR
  ingresarFabricante() {  
      
    if (this.actualizar==false) {
      let nombre = this.myFormFabricante.value.nombreF;
      let telefono = this.myFormFabricante.value.telefonoF;
      this.servc
        .addFabricante(nombre, telefono)
        .subscribe((r) => {
          this.obtenerFabricantes();
          this.myFormFabricante = new FormGroup({
            idF : new FormControl(''),
            nombreF: new FormControl(''),
            telefonoF: new FormControl(''),
          });
        });
      }
      else
      {
        let id = this.myFormFabricante.value.idF;
        let nombre = this.myFormFabricante.value.nombreF;
      let telefono = this.myFormFabricante.value.telefonoF;
        this.servc
          .editFabricante(nombre,telefono,id)
          .subscribe((r) => {
            this.obtenerFabricantes();
            this.myFormFabricante = new FormGroup({
              idF : new FormControl(''),
              nombreF: new FormControl(''),
              telefonoF: new FormControl('')
            });
          });
        
      }
      
    
  }

  //EDITAR
  editarFabricante(id: number) 
  {
    this.servc.getFabricanteById(id).subscribe((r) => 
    {
      
      this.myFormFabricante = new FormGroup({
        idF : new FormControl(`${r.id}`),
        nombreF: new FormControl(`${r.nombre}`),
        telefonoF: new FormControl(`${r.telefono}`)
      });
      this.actualizar = true;
    });
  }

//ELIMINAR
  eliminarFabricante(id: number) {
    console.warn(id)
    if (
      !confirm(
        'ALERTA!! va a proceder a eliminar este registro, si desea eliminarlo de click en ACEPTAR\n de lo contrario de click en CANCELAR.'
      )
    ) {
      return false;
    } else {
      this.servc.deleteFabricante(id).subscribe((r) => 
      {
        console.log('Datos eliminados');
        this.obtenerFabricantes();
      });
      return true;
    }
  }


}
