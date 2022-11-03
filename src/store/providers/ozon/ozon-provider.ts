import { Author } from '../../domain/author.js'
import { Book } from '../../domain/book.js'
import { Genre } from '../../domain/genre.js'
import { Provider } from '../../domain/provider.js'
import { SearchFilter } from '../../domain/search-filter.js'
import { HttpHelper } from '../../utils/http-helper.js'
import { BookResponse, BookListResponse, Book as OzonBook } from './response.js'

export class OzonProvider implements Provider {
  
  public static provider = 'ozon'

  private static apiUrl = 'https://fake-api.ozon.ru/v1'

  public find(filter: SearchFilter): Promise<Book[]> {
    return HttpHelper.fetchAsJson<BookListResponse>(
      OzonProvider.apiUrl + '/book?' +
      this.convertFilterToQueryString(filter)
    )
      .then((response) => {

        this.assertIsValidResponse(response)

        return this.convertBookListResponse(response)
      })
  }

  public getById(id: string): Promise<Book> {
    return HttpHelper.fetchAsJson<BookResponse>(OzonProvider.apiUrl + '/book/' + id)
      .then((response) => {

        this.assertIsValidResponse(response)

        return this.convertBookResponse(response.item)
      })
  }


  private assertIsValidResponse(response: BookListResponse | BookResponse): void {
    if (response.errorMessage != null) {
      throw new Error(response.errorMessage)
    }
  }


  private convertFilterToQueryString(filter: SearchFilter): string {
    return `search=${filter.name}` +
      `&author=${filter.author.firstName} ${filter.author.lastName}`
  }

  private convertBookListResponse(response: BookListResponse): Book[] {
    return response.items.map((item) => {
      return this.convertBookResponse(item)
    })
  }


  private convertBookResponse(item: OzonBook): Book {
    return new Book(
      OzonProvider.provider,
      String(item.id),
      item.title,
      this.mapGenre(item.genre),
      item.description,
      item.pageCount,
      item.price,
      new Author(
        item.author[0].name,
        item.author[0].surname,
      )
    )
  }

  private mapGenre(genre: string): Genre {
    const map: {[key: string]: Genre} = {
      'HORRORS': Genre.Horror,
      'FICTIONS': Genre.Fantasy,
      'COMEDIES': Genre.Comedy,
      'DRAMAS': Genre.Drama
    }

    let mappedGenre = map[genre]

    if (mappedGenre == null) {
      mappedGenre = Genre.Unknown
    }

    return mappedGenre
  }
}
