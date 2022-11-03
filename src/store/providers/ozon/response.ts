
export interface BookListResponse {
  errorMessage?: string
  items: Book[]
}


export interface BookResponse {
  errorMessage?: string
  item: Book
}


export interface Book {
  id: number
  title: string
  author: Author[]
  price: number
  genre: string
  pageCount: number
  description: string
}


export interface Author {
  name: string
  surname: string
}
