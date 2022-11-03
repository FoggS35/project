import { Author } from './author.js'
import { Genre } from './genre.js'

export interface SearchFilter {
  name: string
  author?: Author
  genre?: Genre
}
