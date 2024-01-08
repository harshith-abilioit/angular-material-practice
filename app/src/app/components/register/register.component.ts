import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent{

  constructor(private http:HttpClient,private snackBar: MatSnackBar,private router: Router) { }

  showSnackbar(message: string, config?: MatSnackBarConfig): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top', 
      ...config,
    });
  }

  // @ViewChild('register') registerForm:any;
  private apiUrl = ' http://localhost:8000/register';
  passwordType:any = 'password';

  showHidePassword(){
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  submit(register:any) {
    console.log('form submitted');
    this.http.post<any>(`${this.apiUrl}`, register.value)
      .subscribe(
        response => {
          if(response.status===200){
            this.router.navigate(['/login']);
          }
        },
        error => {
          this.showSnackbar(error.error.message);
        
        }
      );
      // this.registerForm.setValue({
      //   username:"",
      //   email:"",
      //   password:""
      // })
  }

}
