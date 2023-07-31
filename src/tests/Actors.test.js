const request = require('supertest');
const app = require('../app.js');

let id;

test('Get /actors bring the actors', async() => {
    const res = await request(app).get("/actors");
    expect(res.status).toBe(200);
})

test('Post /actors add new actors', async() => {
    const newActors = {
        firstname: 'CILLIAN',
        lastname: 'MURPHY',
        nationality: 'Irlandés',
        image: 'https://es.web.img2.acsta.net/c_310_420/pictures/15/09/25/11/13/078050.jpg',
        birthday: '1976/05/25',
    };
    const res = await request(app).post("/actors").send(newActors);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstname).toBe(newActors.firstname);
});

test('Get /actors bring the actors for id', async() => {
    const res = await request(app).get(`/actors/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.firstname).toBe("CILLIAN");
})

test("PUT /actors update a actors", async () => {
    const updatedActors = {
        lastname: "update",
    }
    const res = await request(app)
            .put(`/actors/${id}`)
            .send(updatedActors);
    expect(res.status).toBe(200);
    expect(res.body.lastname).toBe(updatedActors.lastname);
})

test('Delete /actors delete actors', async() => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});