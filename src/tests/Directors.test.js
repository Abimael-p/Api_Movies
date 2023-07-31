const request = require('supertest');
const app = require('../app.js');

let id;

test('Get /directors bring the directors', async() => {
    const res = await request(app).get("/directors");
    expect(res.status).toBe(200);
})

test('Post /directors add new directors', async() => {
    const newDirectors = {
        firstname: 'CHRISTOPHER',
        lastname: 'NOLAN',
        nationality: 'Británico',
        image: 'https://es.web.img2.acsta.net/c_310_420/pictures/14/10/30/10/59/215487.jpg',
        birthday: '1970/07/30',
    };
    const res = await request(app).post("/directors").send(newDirectors);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstname).toBe(newDirectors.firstname);
});

test('Get /directors bring the directors for id', async() => {
    const res = await request(app).get(`/directors/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.firstname).toBe("CHRISTOPHER");
})

test("PUT /directors update a directors", async () => {
    const updatedDirectors = {
        lastname: "update",
    }
    const res = await request(app)
            .put(`/directors/${id}`)
            .send(updatedDirectors);
    expect(res.status).toBe(200);
    expect(res.body.lastname).toBe(updatedDirectors.lastname);
})

test('Delete /directors delete Directors', async() => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});