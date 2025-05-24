import request from 'supertest';
import server from '../src/index.js';

const app = request.agent(server)

export default app;