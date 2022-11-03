import { Product } from './product.js'

export class Notepad extends Product {

  constructor(public name: string, price: number) {
    super(price)
  }

  public getProductDescription(): string {
    return `Notepad "${this.name}"`
  }

  protected calculateDiscount(): number {
    return 0
  }
}
