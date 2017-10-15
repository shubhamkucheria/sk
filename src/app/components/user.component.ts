import { Component } from '@angular/core';
import {PostsService} from '../services/posts.service';

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: 'user.component.html',
    providers: [PostsService]
})
export class UserComponent  {
  name: string;
  email: string;
  address: address;
  hobbies: string[];
  showHobbies: boolean;
  posts:Post[];

  constructor(){
    this.name = 'Shubham kucheria';
    this.email = 'shubham@gmail.com',
    this.address = {
        street: 'near powai',
        city: 'Mumbai',
        state: 'MH'
    }
    this.hobbies = ['Music', 'Movies', 'Sports'];
    this.showHobbies = false;
  }


  toggleHobbies(){
      this.showHobbies = !this.showHobbies;
  }

  addHobby(hobby: any){
      this.hobbies.push(hobby);
  }

  deleteHobby(i: any){
      this.hobbies.splice(i, 1);
  }
}

interface address {
    street: string;
    city: string;
    state: string;
}


interface Post{
    id: number;
    name: string;
    email: string;
}