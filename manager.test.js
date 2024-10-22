const request = require('supertest');
const app = require('./manager'); // Your Express app file

const mockSendFile = jest.fn();

const mockResponse = {
  sendFile: mockSendFile,
};

describe('GET /', () => {
  it('should respond with 404', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(404);
    //expect(response.text).toBe('Hello World!');
  });
});
describe('GET /home', () => {
  it('should respond with 200', async () => {
    const response = await request(app).get('/home');
    expect(response.statusCode).toBe(200);
    //expect(response.text).toBe('Hello World!');
  });
});
describe('GET /login/signup', () => {
  it('should respond send correct file', async () => {
    const response = await request(app).get('/login/signup');
    expect(response.mockResponse).toHaveBeenCalledWith('/public/signup.html');
    //expect(response.text).toBe('Hello World!');
  });
});

