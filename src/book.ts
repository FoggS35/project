import { Ratingable } from './ratingable.js'
import { Product } from './product.js'
import { Genre, Review, BookAuthor } from './types.js'
import { PurchaseContext } from './purchase-context.js'

export class Book extends Product implements Ratingable {
  private static itemsForIncreasedDiscount = 3
  private static sumForIncreasedDiscount = 3000
  private reviews: Review[]
  private _rating: number

  constructor (
    public name: string,
    public genre: Genre,
    price: number,
    public author: BookAuthor,
    reviews?: Review[]
  ) {
    super(price)

    if (reviews) {
      this.reviews = reviews
    } else {
      this.reviews = []
    }

    this.calculateRating()
  }

  public get rating(): number {
    return this._rating
  }

  public getProductDescription(): string {
    return `Book "${this.name}" by ${this.author.firstName} ${this.author.lastName}`
  }

  public getReviews(): Readonly<Review[]> {
    return this.reviews
  }

  public addReview(review: Review): void {
    this.reviews.push(review)
    this.calculateRating()
  }

  public removeReview(review: Review): void {
    const index = this.reviews.indexOf(review)

    if (index > -1) {
      this.reviews.splice(index, 1)
      this.calculateRating()
    }
  }

  protected calculateDiscount(context: PurchaseContext): number {
    if (
      context.cart.items >= Book.itemsForIncreasedDiscount &&
      context.cart.totalSum >= Book.sumForIncreasedDiscount
    ) {
      return this.price * 35 / 100
    } else {
      return super.calculateDiscount(context)
    }
  }

  private calculateRating(): void {
    if (this.reviews.length > 0) {
      const reviewSum = this.reviews.reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue[1]
        },
        0
      )

      this._rating = reviewSum / this.reviews.length
    } else {
      this._rating = null
    }
  }
}
