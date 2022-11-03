export interface PurchaseContext {
  user: {
    clientLevel: 1 | 2 | 3
  },
  cart: {
    items: number
    totalSum: number 
  }
}
