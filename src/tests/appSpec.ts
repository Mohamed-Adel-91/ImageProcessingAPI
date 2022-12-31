import app from '..';
import supertest from 'supertest';
import path from 'path';


const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the / endpoint', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/');
    expect(response.status).toBe(200);
  });
  it('gets the endpoint image without argument ', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/image');
    expect(response.status).toBe(400);
  });
  it('gets right filename and Positive value of arguments /image?filename=fjord&width=200&height=200', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/image?filename=fjord&width=200&height=200'
    );
    expect(response.status).toBe(200);
  });
  it('gets Negative value  /image?filename=fjord&width=200&height=-200', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/image?filename=fjord&width=200&height=-200'
    );
    expect(response.status).toBe(400);
  });
  it('gets right filename and not execute arguments /image?filename=fjord&width=200', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/image?filename=fjord&width=200'
    );
    expect(response.status).toBe(400);
  });
});

describe('Test if the image is resized or not', () => {
  it('gets the existing filename and valid size values (width & height)', async (): Promise<void> => {
    await request.get('/image?filename=palmtunnel&width=200&height=200');
    const resizedImagePath = path.resolve(__dirname,'../../assets/resizedPath');
    expect(resizedImagePath).not.toBeNull();
  });
});
