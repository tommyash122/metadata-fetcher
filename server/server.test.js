const request = require('supertest');
const app = require('./server');
let server;

beforeAll((done) => {
  server = app.listen(8080, done); // Start the server before running the tests
});

afterAll((done) => {
  server.close(done); // Stop the server after all tests are complete
});

describe('Express Server API', () => {

  it('should return welcome message on GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Welcome to the Metadata Fetcher Application');
  });

  it('should handle a case where the client sends less than 1 URLs due to client-side validation miss', async () => {
    const urls = []; //0 URLs, should not happen normally due to client-side validation

    const res = await request(app).post('/fetch-metadata').send({ urls });

    // Check that the status code is 400, indicating a bad request
    expect(res.statusCode).toBe(400);

    // Check that the error message reflects the requirement for at least 3 URLs
    expect(res.body.message).toContain('Invalid input');
  });



  it('should return metadata for valid URLs provided on POST /fetch-metadata', async () => {
    const urls = [
      'https://youtube.com',
      'https://google.com',
      'https://apple.com',
    ];

    const res = await request(app).post('/fetch-metadata').send({ urls });

    // Check that the status code is 200, indicating success
    expect(res.statusCode).toBe(200);

    // Check that metadata is returned and is not empty
    expect(res.body.metadata.length).toBe(3);
    expect(res.body.metadata[0]).toHaveProperty('title');
    expect(res.body.metadata[0]).toHaveProperty('description');
  });


  it('should return an error for invalid URL input on POST /fetch-metadata', async () => {
    const invalidUrls = [
      'not-a-url',
      'https://another-example.com',
      'https://third-example.com',
    ];

    const res = await request(app).post('/fetch-metadata').send({ urls: invalidUrls });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('Invalid input');
  });

});
