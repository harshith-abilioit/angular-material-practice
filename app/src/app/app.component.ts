import { Component,OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private cartService:ApiService){}

  cart:any=[]
  itemsCount:number=this.cart.length;

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cart = items;
      this.itemsCount=this.cart.length;
      console.log(this.cart.length,);
    });
  }
}
