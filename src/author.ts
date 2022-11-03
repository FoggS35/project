import { Ratingable } from './ratingable.js'

export interface Author extends Ratingable {
  firstName: string
  lastName: string
}
