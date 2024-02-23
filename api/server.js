// Load env variable
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

// import dependencies
const express = require('express');
const app = express();
const connectToDb = require('./config/connectToDb')
const Note = require('./models/note');
app.use(express.json());
const notesController = require('./controllers/notesController.js')
const cors = require('cors');
const userController = require('./controllers/UserController.js')
const cookieParser = require('cookie-parser');
const requireAuth = require('./Middleware/RequireAuth.js');
// db
connectToDb();
app.use(cors(
    {
        origin: true,
        credentials: true
    }
));
app.use(cookieParser());

// app.get('/', (req, res) =>{
//     res.json({hello: "world"})
// });

// Routing
app.post('/signup', userController.signUp)
app.post('/login', userController.login)
app.get('/logOut', userController.logOut)
app.get('/notes', notesController.fetchNotes)
app.get('/notes/:id', notesController.fetchSingleNote)
app.post('/notes', notesController.createNote)
app.put('/notes/:id', notesController.updateNote)
app.delete('/notes/:id', notesController.deleteNote);
app.get('/check-auth', requireAuth, userController.checkAuth);

//start our server
app.listen(process.env.PORT)