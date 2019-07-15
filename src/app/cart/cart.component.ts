import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
items;
checkoutForm;
  constructor(
    private cartService:CartService,
    private http: HttpClient,
    private formBuilder: FormBuilder
    
    ) {
this.items = this.cartService.getItems();
this.checkoutForm = this.formBuilder.group({
name : '',
address : '',

})
   }

  ngOnInit() {
  }
  addToCart(product) {
    this.items.push(product);
  }
 
  getItems() {
    return this.items;
  }
 
  clearCart() {
    this.items = [];
    return this.items;
  }
 
  getShippingPrices() {
    return this.http.get('/assets/shipping.json');
  }
  onSubmit(customerData) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData);
 
    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
  }

}