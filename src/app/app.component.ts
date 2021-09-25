import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private fb: FormBuilder,

  ) { }
  public createUserForm: FormGroup;
  public isSubmit = false;
  public users = [];


  ngOnInit(): void {
    this.initForm();
    this.getUsers();

  }

  getUsers() {
    let users = JSON.parse(localStorage.getItem('userList'))
    if (users != null) {
      this.users = users
    }
  }

  deleteUser(index) {
    this.users.splice(index, 1);
    const storage = localStorage
    storage.setItem('userList', JSON.stringify(this.users));

  }



  //////////////////////////////////////////add users



  private initForm() {
    this.createUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.minLength(2)]],
      salary: ['', [Validators.required, Validators.minLength(2)]],
    });
  }


  submitForm() {
    this.isSubmit = true;
    if (this.createUserForm.invalid) {
      alert('please fill all the details')
      return false;
    }
    this.users.push(this.createUserForm.value)
    const storage = localStorage
    storage.setItem('userList', JSON.stringify(this.users));
    this.createUserForm.reset()
    alert('user added successfully')
  }


}
