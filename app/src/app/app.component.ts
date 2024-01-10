import { Component,OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private cartService:ApiService, private authService: AuthService, private router:Router, private dialog:MatDialog){
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cart = items;
      this.itemsCount=this.cart.length;
      console.log(this.cart.length,);
    });

  }

  isAuthenticated() : boolean{
    if(this.authService.isAuthenticated()){
      return true
    }else{
      return false
    }
  }

  cart:any=[]
  itemsCount:number=this.cart.length;

  openDialog(){
    this.dialog.open(DialogComponent);
  }
  
}
