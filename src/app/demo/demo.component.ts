import { Component, OnInit } from '@angular/core';
import { PropertyError, Errors } from '../validation-messages'

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  errors: Errors = new Errors(
    new PropertyError('name', { key: 'required' }),
    new PropertyError('email', { key: 'minlength', requiredLength: 10, actualLength: 5 })
  )

  constructor() { }

  ngOnInit() {
  }

}
