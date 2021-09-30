import { Component, OnInit } from '@angular/core';
import {Book} from "../../model/book";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../service/book.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {


  book: Book[] = [];
  books: Book = {
    id: 0,
    title: '',
    author: '',
    description: ''
  };
  bookForm: FormGroup = new FormGroup({
    title: new FormControl(),
    author: new FormControl(),
    description: new FormControl(),
  });

  constructor(private bookService: BookService,  private router: Router) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.bookService.getAllBook().subscribe((data: Book[]) => {
      this.book = data;

    });
  }

  createBook() {
    this.books.title = this.bookForm.value.title;
    this.books.author = this.bookForm.value.author;
    this.books.description = this.bookForm.value.description;
    this.bookService.saveBook(this.books).subscribe(data => {
      this.getAll(); this.router.navigate(['']);
    });
  }

}
