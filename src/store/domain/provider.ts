import { Book } from './book.js'
import { SearchFilter } from './search-filter.js'


export interface Provider {
(filter: SearchFilter): Promise<Book[]>
  getById(id: string): Promise<Book>
}
