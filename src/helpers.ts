import { Book } from './book.js'
import { Product } from './product.js'
import { Ratingable } from './ratingable.js'
import { Genre } from './types.js'

export function serialize(value: unknown) {
  if (value == null) {
    return value + ''
  }


  if (value instanceof Book) {
    return `${value.name}, ${value.genre}, ${value.price}`
  }


  return value.toString()
}

export function getGenreName(genre: Genre) {
  const genreMapping = {
    [Genre.Adventure]: 'adventure',
    [Genre.Fantasy]: 'fantasy',
    [Genre.Horror]: 'horror'
  }
  
  return genreMapping[genre]
}

export function showRating(entity: Ratingable) {
  if (entity.rating == null) {
    return 'not rated yet'
  }

  const roundedRating = Math.round(entity.rating)
  let rating = ''

  for (let i = 0; i < roundedRating; i++) {
    rating += '⭐'
  }

  return rating + ` (${entity.rating.toFixed(2)})`
}

export function showCart(products: Product[]) {
  let totalPrice = 0
  products.forEach((product) => {
    totalPrice += product.price
    console.log(`${product.getProductDescription()} x ${product.price} rub.`)
  })

  console.log(`\nTotal items: ${products.length}, total cost: ${totalPrice}`)
}

function haveNewBooks(genres: Genre[]): boolean {
  return true
}

export function watchForNewBook(genres: Genre[]): never {
  while (true) {
    if (haveNewBooks(genres)) {
      console.log('There are new books!')
    }
  }
}

export function addToShelf(book: Book, shelfName = 'favorite'): void {

}

export function addToShelfBunch(shelfName, ...books: Book[]): void {
  books.forEach((book) => {
    addToShelf(book, shelfName)
  })
}


export function markAsRead(...books: Book[]): void {
  console.log(books.length)
}

export interface BuyCallback {
  (error?: Error, transactionId?: string): void
}

export function buyRequest(book: Book) {
  const transactionId = Math.random().toString()
  return Promise.resolve(transactionId)
}

export function buy(book: Book, callback: BuyCallback): void {
  buyRequest(book)
  .then((id) => {
    callback(null, id)
  })
  .catch((error) => {
    callback(error)
  })
}
