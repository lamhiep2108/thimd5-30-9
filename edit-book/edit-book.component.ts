import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Book} from "../../model/book";
import {BookService} from "../../service/book.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  id: any;
  // @ts-ignore
  bookForm: FormGroup
  book: Book = {
    id: 0,
    title: '',
    author: '',
    description: '',
  };

  constructor(private bookService: BookService,
              private activateRouter: ActivatedRoute,
              private router: Router) {
    this.activateRouter.paramMap.subscribe((paraMap: ParamMap) => {
      this.id = paraMap.get('id');
      this.getBook(this.id);
    });
  }

  ngOnInit() {
  }

  edit() {
    this.book.title = this.bookForm.value.title;
    this.book.author = this.bookForm.value.author;
    this.book.description = this.bookForm.value.description;
    this.bookService.updateBook(this.id, this.book).subscribe(data => {
      this.router.navigate(['']);
    });

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
}
