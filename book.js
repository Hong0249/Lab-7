let book = [];

class Book {
	static async injectDB(conn) {
		book = await conn.db("Lab7").collection("Books")
	}
    //Register new book
	static async register(title, isbn, author) {
		// TODO: Check if isbn exists
		let booksearch = await book.find({ title : title }).toArray()
			if (booksearch.length > 0) {
				return null
			} else {
				// TODO: Save book to database
				await book.insertOne({ 
                    isbn: isbn, 
                    title: title,
                    author: author
                })
			}
			let result = await book.find({ title : title }).toArray(); 
			return result
	};

	static async delete(title) {
		// TODO: Check if isbn exists
		let booksearch = await book.find({ title : title }).toArray();
		console.log(booksearch);
			if (booksearch.length == 0) {
				return null
			} else {
				await book.deleteOne({title : title});
				return booksearch
			}
		};
		
	static async update(title, isbn, author) {
		let booksearch = this.search(title);
			if (booksearch.length == 0) {
				return null
			} else {
				await book.updateOne(
					{title : title}, {$set: {isbn: isbn, author: author}
				});
				return booksearch
			}
		};

	static async search(title) {
		// TODO: Check if isbn exists
		let booksearch = await book.find({ title : title }).toArray();
		console.log(booksearch);
			if (booksearch.length == 0) {
				return null
			} else {
				return booksearch
			}
		};
			
};

module.exports = Book;