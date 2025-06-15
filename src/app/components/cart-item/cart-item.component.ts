import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { Food } from 'src/app/model/food';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

 cartList: Cart[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartList$.subscribe(list => {
      this.cartList = list;
      this.totalPrice = this.calculateTotal(list);
    });
  }

  calculateTotal(list: Cart[]): number {
    return list.reduce((acc, item) => acc + Number(item.price), 0);
  }

  removeCartItem(itemId: number) {
    this.cartService.removeItem(itemId);
  }


  increaseQuantity(id: number) {
    this.cartService.updateQuantity(id, 1);
    this.totalPrice = this.cartService.getTotal();
  }

  decreaseQuantity(id: number) {
    this.cartService.updateQuantity(id, -1);
    this.totalPrice = this.cartService.getTotal();
  }

  showPaymentModal: boolean = false;
  selectedPayment: string | null = null;

  proceedToCheckout() {
    if (!this.validateCustomerInfo()) {
      alert('Please fill all required customer information');
      return;
    }
    this.showPaymentModal = true;
  }

  validateCustomerInfo(): boolean {
    // TODO: Remplace cette logique avec une vraie vérification (ex: this.customerForm.valid)
    const isValid = true; // Simulé ici
    if (!isValid) {
      return false;
    }
    return true;
  }

  selectPayment(method: string): void {
    this.selectedPayment = method;
  }

  closePaymentModal(): void {
    this.showPaymentModal = false;
    this.selectedPayment = null;
  }

  email: string = '';
  phone: string = '';

  confirmPayment(): void {
  if (!this.selectedPayment) return;

  // Si paiement en espèces, vérifier email & téléphone
  if (this.selectedPayment === 'cash') {
    if (!this.email || !this.phone) {
      alert('Please enter both email and phone number.');
      return;
    }

    // Exemple d'envoi d'email de confirmation (à remplacer par ton service réel)
    const message = `
      Order Confirmation
      -------------------
      Payment Method: Cash on Delivery
      Total: ${this.totalPrice + 5} TND
      Email: ${this.email}
      Phone: ${this.phone}
    `;

    console.log('Sending email confirmation:\n', message);
  }

  const paymentData = {
    paymentMethod: this.selectedPayment,
    amount: this.totalPrice + 5,
    items: this.cartList,
    email: this.email,
    phone: this.phone
  };

  console.log('Payment confirmed:', paymentData);

  this.closePaymentModal();
  alert('Payment successful! Confirmation sent to your email.');
  // this.router.navigate(['/order-confirmation']);
}

}
