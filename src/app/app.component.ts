import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MustMatch } from './Myvalidators/must-match.validator/must-match.validator.module';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  submitted = false;
  title = 'An Angular Reactive Example with Validators';
  myForm: FormGroup;
  constructor(private formbuilder: FormBuilder) {
    this.reactiveForm();
  }
  reactiveForm() {
    this.myForm = this.formbuilder.group({ // construct a new instance of FormGroup that contains one value 'name'
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: this.formbuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
  }),

  birthDate: [null, Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(7)]],
  confirmPassword: ['', Validators.required],
  acceptTerms: [false, Validators.requiredTrue]
        }, {
            validator: MustMatch('password', 'confirmPassword')

});

  }
    submitForm() {
      this.submitted = true;

        // stop here if form is invalid
      if (this.myForm.invalid) {
            return;
        }

        // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.myForm.value, null, 4));

      console.log(this.myForm.value);
      // Use EventEmitter with form value
      // console.warn(this.myForm.value);
    }


    // get f() { return this.myForm.controls; }

    onReset() {
      this.submitted = false;
      this.myForm.reset();
  }
  }

