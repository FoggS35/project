
export interface BookResponse {
  kind: string
  totalItems: number
  items: Book[]
}


export interface Book {
  id: string
  kind: string
  etag: string
  volumeInfo: {
    title: string
    authors: string[]
    description: string
    publishedDate: string
  }
}


export function getBookInfo(isbn: string) {
  return fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
  .then((response) => {
    return response.text()
  })

  .then<BookResponse>((responseText) => {
    return JSON.parse(responseText)
  })
  .then((data) => {

    if (data.totalItems === 0) {
      throw Error(`There is no book with isbn ${isbn}.`)
    }


    return data.items[0]
  })
}
