import { Component } from '@angular/core';
import {PostsService} from '../services/posts.service';


@Component({
  moduleId: module.id,
  selector: 'list',
  templateUrl: 'list.component.html',
  providers: [PostsService]
})
export class ListComponent  {
    header_title: string;
    posts:Post[];

  constructor(private postsService: PostsService){
  	this.header_title = "This is LIst page!";
    this.postsService.getPosts().subscribe(posts => {
        this.posts = posts;
    });
  }
 }
interface address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}

interface company {
    name: string;
    catchPhrase: string;
    city: string;
    bs: string;
}

interface Post{
    id: number;
    name: string;
    website: string;
    address: address;
    company: company;
}