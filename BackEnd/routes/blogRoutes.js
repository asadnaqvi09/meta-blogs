import express from "express";
import * as blogController from "../controllers/blogController.js";
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

router.post("/create", isAuthenticated, isAdmin("nasad8569@gmail.com"), blogController.createBlog);
router.post("/getAllBlogs", blogController.getAllBlogs);
router.post("/deleteBlog/:id", isAuthenticated, isAdmin("nasad8569@gmail.com"), blogController.deleteBlog);
router.post("/myBlogs/:id", isAuthenticated, isAdmin("nasad8569@gmail.com"), blogController.getMyBlogs);
router.post("/getSingleBlog", blogController.getSingleBlogs);
router.post("/updateBlog:id", isAuthenticated, isAdmin("nasad8569@gmail.com"), blogController.updateBlog);

export default router;