import { Router } from 'express';
import Author from '../Models/author-model.js';
const router = Router()
// CREATE AUTHOR --> http://localhost:8080/api/authors/create-author
router.post(
    '/create-author', async (req, res, next) => {
        const newAuthor = new Author(req.body)
        try {
            const savedAuthor = await newAuthor.save()
            res.status(200).json(savedAuthor)
        }
        catch (err) {
            next()
        }
    }
)
// GET AUTHOR BY ID --> http://localhost:8080/api/authors/:id
router.get(
    '/:id', async (req, res, next) => {
        const { id } = req.params;
        try {
            const author = await Author.findById(id).populate('books');
            if (!author) {
                return res.status(404).json({ message: 'Author not found' });
            }
            res.status(200).json(author);
        } catch (err) {
            next(err);
        }
    }
);
export default router