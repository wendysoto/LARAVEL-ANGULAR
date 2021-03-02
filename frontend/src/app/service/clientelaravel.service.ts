import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fabricante } from './fabricante';

@Injectable({
  providedIn: 'root'
})
export class ClientelaravelService {
URL:string= "https://restlaravel.herokuapp.com/api/fabricante";

  constructor(private httpc:HttpClient) { 
    

  }
//GET
  getFabricantes(): Observable<Fabricante[]> {

    return this.httpc.get<Fabricante[]>(this.URL); 
  }

  //A;ADIR

  addFabricante(nombreF:string, telefonoF:string)
  {
    let objetoFabricante = {nombre: nombreF,telefono:telefonoF}
     return this.httpc.post(this.URL,objetoFabricante);
  }
//EDITAR
  editFabricante(nombreF:string, telefonoF:string,idFabricante:number)
  {
      let obj ={nombre:nombreF,telefono:telefonoF}
      
      return this.httpc.put(`${this.URL}/${idFabricante}`,obj)
      
  }
//ELIMINAR
  deleteFabricante(idFabricante:number)
  { 
    return this.httpc.delete(`${this.URL}/${idFabricante}`)
  }

  //OBTENER FABRICANTE CON ID
  getFabricanteById(idFabricante:number)
  {
    
    return this.httpc.get<Fabricante>(`${this.URL}/${idFabricante}`);
  }



}
