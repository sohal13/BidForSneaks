import express from 'express'
import isMiddleWare from '../middleware/isMiddleware.js';
import { getAllBidsForShoe, getHighestBidForShoe, getMyBids, placeBid } from '../RoutsControler/bidRoutControler.js';
const router = express.Router();

router.post('/place/:id',isMiddleWare,placeBid)

router.get('/shoe/:id',isMiddleWare,getAllBidsForShoe)

router.get('/highest/:id',isMiddleWare,getHighestBidForShoe);

router.get('/my',isMiddleWare,getMyBids)

export default router