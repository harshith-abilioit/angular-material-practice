import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http:HttpClient,private snackBar: MatSnackBar,private router: Router) { }
  showSnackbar(message: string, config?: MatSnackBarConfig): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top', 
      ...config,
    });
  }

  // @ViewChild('register') registerForm:any;
  private apiUrl = ' http://localhost:8000/login';

  passwordType:any = 'password';

  showHidePassword(){
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  submit(login:any) {
    console.log('form submitted');
    console.log(login)
    this.http.post<any>(`${this.apiUrl}`, login.value)
      .subscribe(
        response => {
          if(response.status===200){
            this.showSnackbar(response.message);
            this.router.navigate(['/products']);
          }
        },
        error => {
          this.showSnackbar(error.error.message);
        
        }
      );
  }

}
