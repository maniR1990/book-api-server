import { BookDao } from '../book/book.dao';
import { Book } from '@prisma/client';
import { BookMessages } from '../../constants/message';

export class BookService {
  private readonly dao = new BookDao();

  async getAllBooks(): Promise<Book[]> {
    return this.dao.getAllBooks();
  }

  async getBookById(id: string): Promise<Book> {
    return this.dao.getAbook(id);
  }

  async createBook(data: Omit<Book, 'id'>): Promise<Book> {
    // Optionally: Validate required fields here
    if (!data.title || !data.author) {
      throw new Error(BookMessages.CREATE_FAILED);
    }
    return this.dao.createBook(data);
  }

  async updateBookStatus(id: string, status: string): Promise<Book> {
    const bookId = Number(id);
    if (isNaN(bookId)) throw new Error(BookMessages.INVALID_ID);
    return this.dao.updateBookStatus(bookId, status);
  }

  async deleteBook(id: string): Promise<void> {
    return this.dao.deleteBook(id);
  }

  async searchBook(query:string): Promise<Book[]> {
    return this.dao.searchBooks(query)
  }

  async getAllBooksBystatus(status:string): Promise<Book[]>{
    return this.dao.getAllBooksBystatus(status)
  }
}
