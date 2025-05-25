import request from 'supertest';
import server from '../src/index.js';

const app = request.agent(server)
export const token = {token:""};

export default app;