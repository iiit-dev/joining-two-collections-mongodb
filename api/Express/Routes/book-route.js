import { Router } from 'express';
import Book from '../Models/book-model.js'
import Author from '../Models/author-model.js'
const router = Router();
// CREATE BOOKS -->  http://localhost:8080/api/books/:id/create-book
router.post('/:id/create-book', async (req, res, next) => {
    try {
        const { book_title, publication_date, genre, page_count, publisher, language, isbn, price } = req.body;
        const authorId = req.params.id;
        const newBook = new Book({
            book_title,
            author: authorId,
            publication_date,
            genre,
            page_count,
            publisher,
            language,
            isbn,
            price
        });

        await newBook.save();
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({ message: 'Author not found!' });
        }
        await Author.findByIdAndUpdate(
            authorId,
            { $push: { books: newBook._id } },
            { new: true }
        );
        const authorWithBooks = await Author.findById(authorId).populate('books');

        res.status(200).json(authorWithBooks);

    } catch (err) {
        next(err);
    }
});
export default router;
// 66bcdd0afbfe13e3c5c92ae8
