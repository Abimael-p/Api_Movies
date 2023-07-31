const request = require('supertest');
const app = require('../app.js');

let id;
let GenresRes;
let ActorsRes;
let DirectorsRes;

test('Get /movies bring the Movies', async() => {
    const res = await request(app).get("/movies");
    expect(res.status).toBe(200);
});

test('Post /movies add new movie', async() => {
    const newMovies = {
        name: 'OPPENHEIMER',
        image: 'https://es.web.img2.acsta.net/c_310_420/pictures/23/05/25/13/41/1835431.jpg',
        synopsis: `Drama biográfico de corte histórico basado en American Prometheus, la biografía escrita por Kai Bird y Martin J. Sherwin en torno a la figura del científico J. Robert Oppenheimer y su rol en la creación y desarrollo de la bomba atómica. 16 de julio de 1945, en el desierto de Nuevo México se detona en secreto la primera bomba atómica. En tiempos de guerra, el brillante físico estadounidense Julius Robert Oppenheimer (Cillian Murphy), al frente del proyecto Manhattan, lidera los ensayos nucleares para construir la bomba atómica para su país.

        Impactado por su poder destructivo, Oppenheimer se cuestiona las consecuencias morales de su creación. Desde entonces y durante el resto de su vida, se opondría firmemente a la guerra nuclear y a la todavía más destructiva bomba de hidrógeno. Su vida daría así un profundo vuelco, pasando de tener un papel fundamental en el mapa político de la Guerra Fría a ser acusado de comunista en la era McCarthy. Cuestionando su lealtad, Oppenheimer fue tachando de espía de la Unión Soviética y obligado a dimitir de cualquier función pública.`,
        releaseyear: 2023,
    };
    const res = await request(app).post("/movies").send(newMovies);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newMovies.name);
});

test('Get /movies bring the movies for id', async() => {
    const res = await request(app).get(`/movies/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("OPPENHEIMER");
})

test("PUT /movies should update a Movies", async () => {
    const updatedMovies = {
        name: "updated OPPENHEIMER",
    }
    const res = await request(app)
            .put(`/movies/${id}`)
            .send(updatedMovies);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedMovies.name);
})

test('Post /movies/:id/genres add the genres a movies', async() => {
    const genres = {
        name: "suspenso",
    };
    const resGenres = await request(app).post('/genres').send(genres);
    let resAdd = resGenres.body.id;
    const resId = [resAdd];
    GenresRes = resAdd;
    
    const res = await request(app).put(`/movies/${id}/genres`).send(resId);
    expect(res.status).toBe(200);
});

test('post /movies/:id/actors add the genres a movies', async() => {
    const Actors = {
        firstname: 'CILLIAN',
        lastname: 'MURPHY',
        nationality: 'Irlandés',
        image: 'https://es.web.img2.acsta.net/c_310_420/pictures/15/09/25/11/13/078050.jpg',
        birthday: '1976/05/25',
    };
    const resActors = await request(app).post('/actors').send(Actors);
    let resAdd = resActors.body.id;
    const resId = [resAdd]; 
    ActorsRes = resAdd;

    const res = await request(app).put(`/movies/${id}/actors`).send(resId);
    expect(res.status).toBe(200);
});

test('Post /movies/:id/directors add the genres a movies', async() => {
    const directors = {
        firstname: 'CHRISTOPHER',
        lastname: 'NOLAN',
        nationality: 'Británico',
        image: 'https://es.web.img2.acsta.net/c_310_420/pictures/14/10/30/10/59/215487.jpg',
        birthday: '1970/07/30',
    };
    const resDirectors = await request(app).post('/directors').send(directors);
    let resAdd = resDirectors.body.id;
    const resId = [resAdd]; 
    DirectorsRes = resAdd;

    const res = await request(app).put(`/movies/${id}/directors`).send(resId);
    expect(res.status).toBe(200);
});

test('Delete /genres delete Genres a movies', async() => {
    const res = await request(app).delete(`/genres/${GenresRes}`);
    expect(res.status).toBe(204);
})

test('Delete /actors delete Actors a movies', async() => {
    const res = await request(app).delete(`/movies/${ActorsRes}`);
    expect(res.status).toBe(204);
})

test('Delete /directors delete Directors a movies', async() => {
    const res = await request(app).delete(`/directors/${DirectorsRes}`);
    expect(res.status).toBe(204);
})

test('Delete /movies delete film', async() => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});