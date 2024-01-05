import express from 'express';
import cors from 'cors';
const server = express().disable('x-powered-by');

server.use(cors)
