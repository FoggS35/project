import { Book } from '../../domain/book.js'
import { Provider } from '../../domain/provider.js'
import { SearchFilter } from '../../domain/search-filter.js'

export class BukvoedProvider implements Provider {
  find(filter: SearchFilter): Promise<Book[]> {
    throw new Error('Method not implemented.')
  }
  getById(id: string): Promise<Book> {
    throw new Error('Method not implemented.')
  }
}
