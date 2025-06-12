const express = require('express');
const router = express.Router();
const { createNote, getNote, getNoteById, updateNote, deleteNote } = require('./Controllers/controllers');
const Login = require('./Controllers/LoginContollers');

router.post('/note', createNote);
router.post('/login', Login);
router.get('/getnote', getNote);
router.get('/note/:id', getNoteById);
router.put('/note/:id', updateNote);
router.delete('/note/:id', deleteNote);

module.exports = router;
