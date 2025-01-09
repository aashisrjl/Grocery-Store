import express, { Router } from 'express';
import errorHandler from '../services/catchAsyncError';
import categoryController from '../controller/categoryController';
import { Role } from '../types/authRequest';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router: Router = express.Router();

router
    .route('/category')
    .get(errorHandler(categoryController.getAllCategory))
    .post(
        AuthMiddleware.isAuthenticated, 
        // authMiddleware.restrictTo(Role.Admin), 
        errorHandler(categoryController.addCategory)
    );

router
    .route('/category/:id')
    .get(errorHandler(categoryController.getCategoryById))
    .delete(
        AuthMiddleware.isAuthenticated,
        // authMiddleware.restrictTo(Role.Admin), 
        errorHandler(categoryController.deleteCategory)
    )
    .patch(
        AuthMiddleware.isAuthenticated, 
        // authMiddleware.restrictTo(Role.Admin), +
        errorHandler(categoryController.updateCategory)
    );

export default router;
