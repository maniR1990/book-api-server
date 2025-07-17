import { Router } from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBookStatus,
  deleteBook,
  searchBook,
  getAllBooksBystatus
} from './book.controller';

const router = Router();

// GET /books
router.get('/getAllBooks', getAllBooks);

// POST /books
router.post('/', createBook);

// PATCH /books/:id/status
router.patch('/:id/status', updateBookStatus);

// DELETE /books/:id
router.delete('/:id', deleteBook);

// GET /books/search?text=""
router.get('/search', searchBook)

//GET /books/readStatus?status=read || unread
router.get('/readStatus', getAllBooksBystatus)

// GET /books/:id
router.get('/:id', getBookById);

export default router;
