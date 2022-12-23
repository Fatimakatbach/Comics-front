import { Component, OnInit } from '@angular/core';
import { ComicsService } from 'src/app/services/comics.service';
import { ComicInterface } from 'src/app/models/comicInterface';
@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {
  public comics: ComicInterface[] = [];

  constructor(private comicsService: ComicsService) { }

  ngOnInit(): void {
    this.comicsService.getComics().subscribe((data: any) => {
      this.comics = data
    })
  }

}
