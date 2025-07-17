import { Request, Response, NextFunction } from 'express';
import { BookService } from './book.service';

const service = new BookService();

// GET /books
export async function getAllBooks(req: Request, res: Response, next: NextFunction) {
  try {
    const books = await service.getAllBooks();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
}

// GET /books/:id
export async function getBookById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const book = await service.getBookById(id);
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
}

// POST /books
export async function createBook(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }
    const newBook = await service.createBook(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
}

// PATCH /books/:id/status
export async function updateBookStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedBook = await service.updateBookStatus(id, status);
    res.status(200).json(updatedBook);
  } catch (err) {
    next(err);
  }
}

// DELETE /books/:id
export async function deleteBook(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await service.deleteBook(id);
    res.status(204).send(); // No content
  } catch (err) {
    next(err);
  }
}


// SEARCH /get /books/search?text=""
export async function searchBook(req: Request, res: Response, next: NextFunction) {
    const searchText = req.query.text as string;
    if(!searchText || !searchText.trim()){
         return res.status(400).json({ error: "missing query" });
    }
    try {        
        const books = await service.searchBook(searchText);
        res.status(200).json(books)
    }
    catch(e){
        next(e)
    }
}


export async function getAllBooksBystatus(req:Request, res:Response, next:NextFunction){
    const status = req.query.status as string;
     if (!status || (status !== 'Read' && status !== 'Unread')) {
        return res.status(401).json({error:'invalid status. use read or unread'});
     }
     try {
        const books = await service.getAllBooksBystatus(status);
        return res.status(200).json(books)
     } catch(e){
        next(e)
     }
}