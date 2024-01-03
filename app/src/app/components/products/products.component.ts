import { Component,OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor( private api:ApiService ){
    // this.searchedProducts(value)
  }

  productsList:any = [];
  searchedProductsList:any = [];

  ngOnInit(): void {
      this.api.fetchData().subscribe({
        next: (response => {
          this.productsList = response
          console.log(this.productsList)
        }),
        error : (error =>{
          console.log(error)
        })
      })

  }

  searchedProducts(value:any){
    this.searchedProductsList = this.productsList.filter((eachItem:any)=>{
      eachItem.title.toLowerCase().includes(value.toLowerCase())
    })
  }

}
