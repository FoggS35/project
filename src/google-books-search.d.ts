declare module 'google-books-search' {
  export type ISBN = 'ISBN_10' | 'ISBN_13' | 'ISSN' | 'OTHER'
  export type PrintType = 'BOOK' | 'MAGAZINE'
  export type MaturityRating = 'NOT_MATURE' | 'MATURE' | string
  export type LanguageCode = 'en' | 'ru' | string
  export type SearchField = 'title' | 'author' | 'publisher' | 'subject' | 'isbn'
  export type SearchOrder = 'relevance' | 'newest'
  export type SearchType = 'all' | 'magazines' | 'books'

  export interface IndustryIdentifier {
    type: ISBN
    identifier: string
  }

  export interface Book {
    title: string
    authors: string[]
    publishedDate: string
    description: string
    industryIdentifiers: IndustryIdentifier[]
    pageCount: number
    printType: PrintType
    categories: string[]
    averageRating: number
    ratingsCount: number
    maturityRating: MaturityRating
    language: string
    id: string
    link: string
    thumbnail: string
  }
  export interface Callback<R> {
    (error?: Error, result?: R)
  }

  export interface SearchOptions {
    key?: string
    field?: SearchField
    offset?: number
    limit?: number
    type?: SearchType
    order?: SearchOrder
    lang?: string
  }
  
  export function search(query: string, callback: Callback<Book[]>): void
  export function search(query: string, options: SearchOptions, callback: Callback<Book[]>): void

  export function lookup(id: string, callback: Callback<Book>): void
}
