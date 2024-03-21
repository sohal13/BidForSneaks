import express from "express"
import isMiddleWare from "../middleware/isMiddleware.js";
import { deleteShoe, listShoe, sellerShose, shoes, singleShoe, updateShoe } from "../RoutsControler/shoesRoutControler.js";


const router = express.Router();

router.post('/list',isMiddleWare,listShoe)

router.put('/update/:id',isMiddleWare,updateShoe)

router.delete('/delete/:id',isMiddleWare,deleteShoe)

router.get('/',shoes);

router.get('/:id',singleShoe)

router.get('/sellershoes/:id',isMiddleWare,sellerShose)


export default router