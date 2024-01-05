import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable,BehaviorSubject } from 'rxjs';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient,private snackBar: MatSnackBar) { }

  fetchData(): Observable<any> {
    return  this.http.get<any>('https://fakestoreapi.com/products');
  }

  // cartList:any = [ 
    // {category
    // : 
    // "men's clothing",
    // description
    // : 
    // "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    // id
    // : 
    // 1,
    // image
    // : 
    // "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    // price
    // : 
    // 109.95,
    // rating
    // : 
    // {rate: 3.9, count: 120},
    // title
    // : 
    // "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"},
    // {category
    //   : 
    //   "men's clothing",
    //   description
    //   : 
    //   "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    //   id
    //   : 
    //   1,
    //   image
    //   : 
    //   "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    //   price
    //   : 
    //   109.95,
    //   rating
    //   : 
    //   {rate: 3.9, count: 120},
    //   title
    //   : 
    //   "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"}
    // ];

  // addCartItem(item:any){
  //   this.cartList.push(item)
  // }

  // removeCartItem(id:any){
  //   console.log(this.cartList)
  //   console.log(id,'rfc api service')
  //   // this.updatedCartList = this.cartList.filter((item:any)=>{
  //   //   console.log(item)
  //   //   item.id!==id
  //   // })
  //   console.log(this.updatedCartList)
  // }

  showSnackbar(message: string, config?: MatSnackBarConfig): void {
    this.snackBar.open(message, 'Close', {
      duration: 1000,
      verticalPosition: 'top', 
      ...config,
    });
  }

  private cartItems: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  getCartItems() {
    return this.cartItems.asObservable();
  }

  addItemToCart(item: any) {
    const currentCart = this.cartItems.value;
    // console.log(currentCart,'curr cart in service')
    let newItem = {...item,quantity:1}
    let addItem = (currentCart.find((ci:any)=>ci.id=== newItem.id)) 
    if(addItem===undefined){
      this.cartItems.next([...currentCart, newItem]);
      this.showSnackbar('Item added to cart!');
    } else{
      alert('Item already added to cart')
    }
  }

  removeItemFromCart(itemId: string) {
    const currentCart = this.cartItems.value;
    const updatedCart = currentCart.filter((item: any) => item.id !== itemId);
    this.cartItems.next(updatedCart);
  }

}
