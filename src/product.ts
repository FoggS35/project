import { PurchaseContext } from './purchase-context.js'

export abstract class Product {
  constructor(public price: number) {}

  public abstract getProductDescription(): string

  public getDiscountPrice(context: PurchaseContext): number {
    return this.price - this.calculateDiscount(context)
  }

  protected calculateDiscount(context: PurchaseContext): number {
    return this.price * (context.user.clientLevel * 10) / 100
  }
}
