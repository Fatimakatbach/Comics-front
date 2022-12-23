import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComicsService } from 'src/app/services/comics.service';
@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {

  public comicForm!: FormGroup;
  public submmited: boolean = false;
  public newComic = this.comicsService.comicData;
  public comicID = this.comicsService.comicData.id;


  constructor(private formBuilder: FormBuilder, private comicsService: ComicsService, private router: Router) { }

  ngOnInit(): void {

    //Con esta función siempre tendremos el formulario desde el comienzo.
    this.comicsService.clearComic();

    this.comicForm = this.formBuilder.group({
      title: [this.newComic.title, [Validators.required, Validators.minLength(1)]],
      author: [this.newComic.author, [Validators.required, Validators.minLength(4)]],
      cover: [this.newComic.cover, [Validators.required]],
      company: [this.newComic.company, [Validators.required, Validators.minLength(1)]]
    });

    //De esta forma añadimos al objeto por defecto de newComic los valores del formulario automaticamente según vayan cambiando.
    this.comicForm.valueChanges.subscribe((changes) => {
      this.newComic = changes;
    })
  }

  public onSubmit() {
    //Si el comicID que he almacenado al principio es diferente que string vacio
    if (this.comicID !== "") {
      //Apuntas con el comicID al que quieres modificar, si estoy en el 1 es al 1, y le envio el contenido de mi formulario
      this.comicsService.putComic(this.comicID, this.newComic).subscribe()
      alert("Comic edited");
    } else {
      //Le mando newComic a través de la funcion postComic de mi servicio y me suscribo para que mande el nuevo comic
      this.comicsService.postComic(this.newComic).subscribe();
      alert("Comic created");
    }
    //Reseteamos el formulario
    this.comicForm.reset();
    //Sacamos un mensaje por alerta de que hemos creado un comic.
    //Con el router que hemos importado en el constructor podemos indicarle como si fuera un routerLink que navegue a /comics para que nos saque del formulario.
    this.router.navigate(["/comics"]);

  }

  public delete() {
    //Borramos el comic
    this.comicsService.deleteComic(this.newComic.id).subscribe();
    //Reseteamos los datos del comicData
    this.comicsService.clearComic();
    alert("Comic deleted");
    //Volvemos a comics
    this.router.navigate(["/comics"]);
  }
}
