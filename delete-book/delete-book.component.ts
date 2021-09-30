import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Book} from "../../model/book";
import {BookService} from "../../service/book.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {

  id: any;
  // @ts-ignore
  bookForm: FormGroup;
  book: Book = {
    id: 0,
    title: '',
    author: '',
    description: '',
  };

  constructor(private bookService: BookService,
              private activeRouter: ActivatedRoute,
              private router: Router) {
    this.activeRouter.paramMap.subscribe((paraMap: ParamMap) => {
      this.id = paraMap.get('id');
    });
  }

  ngOnInit(): void {
    this.getBook(this.id);
  }

  getBook(id: number) {
    this.bookService.findByIdBook(id).subscribe(data => {
      this.bookForm = new FormGroup({
        id: new FormControl(data.id),
        title: new FormControl(data.title),
        author: new FormControl(data.author),
        description: new FormControl(data.description),
      });
    });
  }

  deleteBook(id: number) {
    console.log(id);
    this.bookService.deleteBook(id).subscribe(data => {
      this.router.navigate(['']);
    });
  }
}
