import express from 'express';
import { RefreshToken } from '../controller/token.controller.js';

const router = express.Router();

router.post('/refresh-token',  RefreshToken)


export default router;
