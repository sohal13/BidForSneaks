import express from 'express'
import isMiddleWare from '../middleware/isMiddleware.js';
import { allCategory, createCategory, deleteCategory, singleCategory, updateCategory } from '../RoutsControler/categoryroutControler.js';


const router = express.Router();

router.post('/create-category',isMiddleWare,createCategory)

router.put('/update-category/:id',isMiddleWare,updateCategory)

router.get('/',allCategory)

router.get('/:slug',singleCategory)

router.delete('/delete/:id',isMiddleWare,deleteCategory)



export default router