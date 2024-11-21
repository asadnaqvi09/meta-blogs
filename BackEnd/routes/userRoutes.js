import express from 'express'; // Changed to import
import * as userController from '../controllers/userController.js'; // Changed to import
import { isAdmin, isAuthenticated } from '../middleware/authUser.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', isAuthenticated, userController.login);
router.get('/logout', isAuthenticated, userController.logout);
router.get("/admins", userController.getAdmin);
export default router; // Changed to export default