import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {


  constructor(private httpClient: HttpClient) { }

  public comicData = {
    author: "",
    company: "",
    cover: "",
    id: "",
    title: ""
  }

  public clearComic() {
    this.comicData = {
      author: "",
      company: "",
      cover: "",
      id: "",
      title: ""
    }
  }
  
  public editItem(item: any) {
    this.comicData = item;
  }
  public getComics() {
    return this.httpClient.get("http://localhost:3000/comics")
  }

  public postComic(newComic: any) {
    return this.httpClient.post("http://localhost:3000/comics", newComic)
  }

  public putComic(comicID: any, editedComic: any) {
    return this.httpClient.put("http://localhost:3000/comics/" + comicID, editedComic)
  }

  public deleteComic(comicID: any){
    return this.httpClient.delete("http://localhost:3000/comics/" + comicID)
  }


}
