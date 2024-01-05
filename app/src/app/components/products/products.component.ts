import { Component,OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor( private api:ApiService ){};

  productsList:any = [];
  searchedProductsList:any = [];
  searchInput:any='';
  sortProductsBy:any='';

  ngOnInit(): void {
      this.api.fetchData().subscribe({
        next: (response => {
          this.productsList = response;
          this.searchedProductsList=response;
        }),
        error : (error =>{
          console.log(error)
        })
      })

  }

  addToCart(item:any){
    this.api.addItemToCart(item)
   }

  searchedProducts(){
      this.searchedProductsList = this.productsList.filter((eachItem:any)=>{
        return eachItem.title.toLowerCase().includes(this.searchInput.toLowerCase())
      })
      // console.log(this.searchedProductsList)

  }
    
  sortProducts(){
      if(this.sortProductsBy=='asc'){
        this.searchedProductsList.sort((a:any, b:any) => a.price - b.price);
      }
      else if(this.sortProductsBy=='desc'){
        this.searchedProductsList.sort((a:any, b:any) => b.price - a.price)
      } 
      else{
        // console.log(this.searchedProductsList,"before")
        // this.searchedProductsList = this.productsList;
        // console.log(this.searchedProductsList,"after")
      }
  }

     

}
