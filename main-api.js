const MongoClient = require("mongodb").MongoClient;
const Book = require("./book");

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://Group13:p%4055w0rd@cluster0.ft7ws.mongodb.net/test",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	Book.injectDB(client);
})

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/read', async (req, res) => {
	console.log(req.body)
    const search = await Book.search(req.body.title);
    if (search != null){
        console.log("Book found!")
        res.status(200).json({
			isbn: search[0].isbn,
			title: search[0].title,
			author: search[0].author
		})
    } else {
        console.log("Book not found!")
        res.status(404).json()
    }
});

app.post('/create', async (req, res) => {
	console.log(req.body);
	const book = await Book.register(req.body.title, req.body.isbn, req.body.author);
	if (book != null ) {
		console.log("Book registered");
		res.status(200).json({
			isbn: book[0].isbn,	
			title: book[0].title,
            author: book[0].author
		})
	} else {
		console.log("Book not registered");
		res.status(401).send({
			error: "Book not registered"
		})
	}
})

app.delete('/delete', async (req, res) => {
	console.log(req.body);
	const book = await Book.delete(req.body.title);
	if (book != null) {
		console.log("Book deleted");
		res.status(200).json({
			message: "Book with these details is deleted:",
			title: book[0].title,
            isbn: book[0].isbn, 
            author: book[0].author
		})
	} else {
		console.log("Book not found");
		res.status(404).json({
			message: "No book is deleted"
		})
	}
})

app.patch('/update', async (req, res) => {
	console.log(req.body);
	const book = await Book.update(req.body.title, req.body.isbn, req.body.author);
	if (book != null) {
		console.log("Book updated");
		res.status(200).json({
			message: "Book with these details is updated:",
			title: book[0].title,
			isbn: book[0].isbn+" to "+req.body.isbn,
			author: book[0].author+" to "+req.body.author
		})
	} else {
		console.log("Book not found");
		res.status(404).json({
			message: "No book is updated"
		})
	}
})

			
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
