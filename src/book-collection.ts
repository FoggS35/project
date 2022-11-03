import { Book } from './book.js'
import { Collection } from './collection.js'
import { Product } from './product.js'


export class ProductCollection<T extends Product> extends Collection<T> {
  public get price(): number {
    let totalPrice = 0
    const keys = Object.getOwnPropertyNames(this.items)

    for (const key of keys) {
      const item = this.items[key]
      totalPrice += item.price
    }
    
    return totalPrice
  }
}

export class BookCollection extends ProductCollection<Book> {
}
