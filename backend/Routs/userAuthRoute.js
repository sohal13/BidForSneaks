import express from 'express'
import { otpVerify, userLogin, userLogout, userNumberVerify, userRegister } from '../RoutsControler/userAuthControler.js';
import isMiddleWare from '../middleware/isMiddleware.js';

const router = express.Router();

router.post('/register',userRegister)
router.post('/number-verify',isMiddleWare,userNumberVerify)
router.post('/number-verify/otp',isMiddleWare,otpVerify)
router.post('/login',userLogin)
router.post('/logout',userLogout)


export default router