const request = require('supertest');
const app = require('../app.js');

let id;

test('Get /genres bring the Genres', async() => {
    const res = await request(app).get("/genres");
    expect(res.status).toBe(200); 
})

test('Post /genres add new Genres', async() => {
    const newGenres = {
        name: 'OPPENHEIMER',
    };
    const res = await request(app).post("/genres").send(newGenres);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newGenres.name);
});

test('Get /genres bring the Genre for id', async() => {
    const res = await request(app).get(`/genres/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("OPPENHEIMER");
})

test("PUT /genres update a Genres", async () => {
    const updatedGenres = {
        name: "updated OPPENHEIMER",
    }
    const res = await request(app)
            .put(`/genres/${id}`)
            .send(updatedGenres);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedGenres.name);
})

test('Delete /genres delete Genre', async() => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});

