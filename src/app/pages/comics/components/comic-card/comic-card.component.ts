import { ComicsService } from 'src/app/services/comics.service';
import { ComicInterface } from './../../../../models/comicInterface';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-comic-card',
  templateUrl: './comic-card.component.html',
  styleUrls: ['./comic-card.component.scss']
})
export class ComicCardComponent implements OnInit {
  @Input() public comic!: any;
  constructor(private comicsService: ComicsService, private router: Router) { }

  ngOnInit(): void {
  }

  public editComic(comic: any) {
    this.comicsService.editItem(comic);
    this.router.navigate(["/gestion"])
  }
}
