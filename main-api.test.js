const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('Express Route Test', function () {
    
	it('POST', async () => {
		return request
			.post('/create')
			.send({title: 'Petter Pan', isbn: "51651118", author: "A.W. Toomer"})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual({
                    isbn: "51651118", 
                    title: 'Petter Pan',
                    author: "A.W. Toomer"
				})
			})
	});

	it('POST', async () => {
		return request
			.post('/create')
			.send({title: 'Harry Petter', isbn: "987654321", author: "Steven Dwager"})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual({
                    isbn: "987654321", 
                    title: 'Harry Petter',
                    author: "Steven Dwager"
				})
			})
	});
	
	it('POST', async () => {
		return request
			.post('/create')
			.send({title: 'Harry Potter', isbn: "123456789", author: "J.K. Rowling"})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual({
                    isbn: "123456789", 
                    title: 'Harry Potter',
                    author: "J.K. Rowling"
				})
			})
	});

	it('GET', async () => {
		return request
			.get('/read')
			.send({title: 'Harry Potter'})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual({
                    title: 'Harry Potter',
                    isbn: "123456789", 
                    author: "J.K. Rowling"
				})
			})
	});


	it('DELETE', async () => {
		return request
			.delete('/delete')
			.send({title: 'Harry Petter'})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual({
					message: expect.any(String),
					title: 'Harry Petter',
                    isbn: "987654321", 
                    author: "Steven Dwager"
				});
			})
	})

	it('PATCH', async () => {
		return request
			.patch('/update')
			.send({title: 'Harry Potter', isbn: "6481561561", author: "Mc Craig"})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual({
					message: expect.any(String),
                    title: 'Harry Potter',
                    isbn: "123456789 to 6481561561", 
                    author: "J.K. Rowling to Mc Craig"
				});
			})

	 })
})