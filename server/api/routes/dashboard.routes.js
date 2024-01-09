import express from 'express';
import { getTotalsDashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get('/', getTotalsDashboard);

export default router;