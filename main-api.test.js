const supertest = require('supertest');
const request = supertest('http://localhost:3000');

const Book = [
	{
		title : "Computer Networks: An Open Source Approach",
		author : "Lin, Ying-Dar - Hwang, Ren-Hung - Baker, Fred",
		isbn : "978-0-0733-7624-0",
	},
	{
		title : "Practical Packet Analysis, 3E: Using Wireshark to Solve Real-World Network Problems",
		author : "Sanders, Chris",
		isbn : "978-1-5932-7802-1",
	},
	{
		title : "802.11ac: A Survival Guide: Wi-Fi at Gigabit and Beyond",
		author : "J.K. Rowling",
		isbn : "978-1-1156-4314-9",
	},
]
	
describe('Express Route Test', function () {
    for(let i = 0; i < Book.length; i++) {
		it('POST', async () => {
			return request
				.post('/create')
				.send({title: Book[i].title, isbn: Book[i].isbn, author: Book[i].author})
				.expect('Content-Type', /json/)
				.expect(200).then(res => {
					expect(res.body).toEqual({
						isbn: Book[i].isbn, 
						title: Book[i].title,
						author: Book[i].author
					})
				})
		});
	}	

	it('GET', async () => {
		return request
			.get('/read')
			.send({title: 'Computer Networks: An Open Source Approach'})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual({
                    title: 'Computer Networks: An Open Source Approach',
                    isbn: "978-0-0733-7624-0", 
                    author: "Lin, Ying-Dar - Hwang, Ren-Hung - Baker, Fred"
				})
			})
	});

	it('DELETE', async () => {
		return request
			.delete('/delete')
			.send({title: 'Practical Packet Analysis, 3E: Using Wireshark to Solve Real-World Network Problems'})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual({
					message: expect.any(String),
					title: 'Practical Packet Analysis, 3E: Using Wireshark to Solve Real-World Network Problems',
                    isbn: "978-1-5932-7802-1", 
                    author: "Sanders, Chris"
				});
			})
	})

	it('PATCH', async () => {
		return request
			.patch('/update')
			.send({title: '802.11ac: A Survival Guide: Wi-Fi at Gigabit and Beyond', isbn: "978-1-4493-4314-9", author: "Gast, Matthew S"})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual({
					message: expect.any(String),
                    title: '802.11ac: A Survival Guide: Wi-Fi at Gigabit and Beyond',
                    isbn: "978-1-1156-4314-9 to 978-1-4493-4314-9", 
                    author: "J.K. Rowling to Gast, Matthew S"
				});
			})

	 })

	 it('GET', async () => {
		return request
			.get('/getall')
			.send({})
			.expect('Content-Type', /json/)
			.expect(200).then(res => {
				expect(res.body).toEqual({
				})
			})
	});

})