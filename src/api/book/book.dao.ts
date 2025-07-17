import { Book } from '@prisma/client';
import prisma from '../../prisma/client';
import { BookMessages } from '../../constants/message';

export class BookDao {
  async getAllBooks(): Promise<Book[]> {
    try {
      return await prisma.book.findMany({
        orderBy: { addedAt: 'desc' },
      });
    } catch (err) {
      throw new Error(BookMessages.FETCH_FAILED);
    }
  }

  async getAbook(id: string): Promise<Book> {
    const bookId = Number(id);
    if (isNaN(bookId)) throw new Error(BookMessages.INVALID_ID);

    try {
      return await prisma.book.findUniqueOrThrow({
        where: { id: bookId },
      });
    } catch (err) {
      throw new Error(BookMessages.NOT_FOUND);
    }
  }

  async createBook(data: Omit<Book, 'id'>): Promise<Book> {
    try {
      return await prisma.book.create({ data: {
        title : data.title,
        author: data.author,
        status: data.status || 'Unread',
        description: data.description ?? null
      } });
    } catch (err) {
      throw new Error(BookMessages.CREATE_FAILED);
    }
  }

  async updateBookStatus(id: number, status: string): Promise<Book> {
    try {
      return await prisma.book.update({
        where: { id },
        data: { status },
      });
    } catch (err) {
      throw new Error(BookMessages.UPDATE_FAILED);
    }
  }

  async deleteBook(id: string): Promise<void> {
    const bookId = Number(id);
    if (isNaN(bookId)) throw new Error(BookMessages.INVALID_ID);

    try {
      await prisma.book.delete({
        where: { id: bookId },
      });
    } catch (err) {
      throw new Error(BookMessages.DELETE_FAILED);
    }
  }

 async searchBooks(query: string): Promise<Book[]> {
    try {
      return await prisma.book.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { author: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          title: true,
          author: true,
          status: true,
          description:true,
          addedAt:true
        },
        take: 10,
        orderBy: { addedAt: 'desc' },
      });
    } catch (error) {
      console.error('Error searching books in DAO:', error);
      throw new Error('Failed to search books');
    }
  }

  async getAllBooksBystatus(status:string): Promise<Book[]> {
    try{
        return await prisma.book.findMany({
            where: {
                status: {equals: status, mode:'insensitive'}
            },
            orderBy : {
                addedAt : 'desc'
            }
        })

    } catch(e){
        throw new Error('Failed to search books');
    }
}
}


