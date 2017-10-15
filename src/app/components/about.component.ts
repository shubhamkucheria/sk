import { Component, ViewChild } from '@angular/core';
import { films } from './table.data';

@Component({
  moduleId: module.id,
  selector: 'about',
  templateUrl: 'about.component.html',
})

export class AboutComponent  {
	film:fl[]=[];
  showDes: boolean;
  constructor(){
    this.showDes = false;
  }

	showFilms(){
    this.showDes = false;
		this.film = films;
  	}
  showMore(){
    this.showDes = true;
  }
 }


interface fl{
    title: string;
    year: number;
    rating: number;
    director: string;
    description: string;
}