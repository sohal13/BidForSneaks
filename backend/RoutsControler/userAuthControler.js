import otpGenerator from 'otp-generator'
import twilio from 'twilio'
import bcryptjs from 'bcryptjs'
import User from '../Schema/userSchema.js';
import OTP from '../Schema/userOtpSchema.js';
import JWt from '../utils/jwttooken.js';

export const userRegister = async (req, res) => {

    try {
        const { username, useremail, password, userphoto, usernumber } = req.body;
        if (!username || !useremail || !password || !usernumber) {
            return res.status(404).send({ message: "Fill The Form Properly", success: false })
        }
        const userPresent = await User.findOne({ useremail })
        if (userPresent) {
            return res.status(200).send({ message: `User Exist With This Email`, success: false })
        }
        const UserNumber = "+91"+usernumber;
        const usernumberPresent = await User.findOne({UserNumber})
        if (usernumberPresent) {
            return res.status(200).send({ message: `User Exist With This Number`, success: false })
        }
        
        const hashPassword = bcryptjs.hashSync(password, 10)
        const userAvtarphoto = userphoto || `https://avatar.iran.liara.run/public/boy?username=${useremail}`

        const newUser = new User({
            username,
            useremail,
            userphoto: userAvtarphoto,
            password: hashPassword,
            usernumber:UserNumber
        })

        if (newUser) {
            await newUser.save();
            JWt(newUser._id, res)
        }

        res.status(201).send({
            success: true,
            message: "User Register Succesfull",
            useris: {
                _id:newUser._id,
                name: newUser.username,
                email: newUser.useremail,
                photo: newUser.userphoto,
                number: newUser.usernumber
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Internal Server Error ${error}`, success: false })
    }
}


export const userNumberVerify = async (req, res) => {

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioClient = new twilio(accountSid, authToken);

    try {
        const { usernumber } = req.body;
        const userPresent = await User.findById(usernumber)
        if (!usernumber) return res.status(500).send({ message: `Number Required`, success: false })
        if (usernumber !== req.user.usernumber) return res.status(500).send({ message: `User Registered Numbers`, success: false })
        if (!userPresent) return res.status(500).send({ message: `Register First`, success: false })

        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })
        try {
            const response = await twilioClient.messages.create({
                body: `BidForSneaks Number Verification OTP is ${otp}`,
                to: usernumber,
                from: process.env.OTP_SEND_NUMBER
            });
            console.log('SMS sent successfully:', response.sid);

            const currentDate = new Date().getTime();
            const Otp = await OTP.findOneAndUpdate(
                { usernumber },
                {
                    otp,
                    otpExpiration: currentDate,
                    userID: req.user._id
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            userPresent.userotpID = Otp._id
            await userPresent.save()

            return res.status(200).send({
                success: true,
                msg: 'OTP send Successfully!!'
            })


        } catch (error) {
            if (error.code === 21608) {
                console.error('Twilio error: The number is unverified. Please verify the number at twilio.com.');
            } else {
                console.error('Twilio API error:', error.message);
            }
            throw error;
        }

        

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Internal Server Error ${error}`, success: false })
    }
}

export const otpVerify = async (req, res) => {
    try {
        const { otp } = req.body;
        const usernumber = req.user.usernumber
        console.log(usernumber);
        const userPresent = await User.findOne({usernumber})
        if (!userPresent) return res.status(500).send({ message: `Regsiter First`, success: false })
        if (!otp) return res.status(500).send({ message: `OTP Required`, success: false })
        const verifyOtp = await OTP.findOne({ otp })
        if (!verifyOtp) return res.status(404).send({ success: false, message: "Invalid OTP" });
        if (usernumber !== verifyOtp.usernumber) return res.status(500).send({ message: `Invalid OTP For This Number`, success: false })
        const prsntUser = await User.findOne(verifyOtp.userID).select("-password");
        if (!prsntUser) return res.status(404).send({ success: false, message: "No user Find with this Number" })
        res.status(200).send({
            message: "OTP Verifyed", success: true, useris: {
                name: userPresent.username,
                email: userPresent.useremail,
                photo: userPresent.userphoto,
                number: userPresent.usernumber
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Internal Server Error ${error}`, success: false })
    }
}


export const userLogin = async (req, res) => {
    try {
        const { useremail, password } = req.body;
        if (!useremail || !password) {
            return res.status(404).send({ success: false, message: 'fill all the boxes' })
        }
        const user = await User.findOne({ useremail });
        if (!user) return res.status(404).send({ success: false, message: "User Dosent exist with this Email" });
        const comparePass = bcryptjs.compareSync(password, user.password);
        if (!comparePass) return res.status(404).send({ success: false, message: "Email or Password is Wrong" });
        await JWt(user._id, res)
        res.status(200).send({
            success: true,
            message: "User Login Succesfull",
            useris: {
                name: user.username,
                email: user.useremail,
                photo: user.userphoto,
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Internal Server Error ${error}`, success: false })
    }
}

export const userLogout = async (req, res) => {
    try {
        res.cookie("Jwt", "", {
            maxAge: 0,
        })
        res.status(201).send({ message: "User LogOut", success: true })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Internal Server Error ${error}`, success: false })
    }
}