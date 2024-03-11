import { Request, Response } from 'express';
import { Account } from '../../database/models/account';

export async function Register(req: Request, res: Response) {
    try { 
        let { lat, lng, login, username } = req.body;

        if(username == "" || username.length < 2 || username.length > 32) return res.status(206).json({
            message: "Invalid username data"
        })

        if(login == "" || login.length < 6 || login.length > 32) return res.status(206).json({
            message: "Invalid password data"
        })

        if(isNaN(lat) || lat == "" || isNaN(lng) || lng == "") return res.status(206).json({
            message: "Invalid marker data"
        })

        const acc = await Account.findOne({
            where: {
                login
            }
        })

        if(acc) return res.status(206).json({
            message: "Account with this login is already in our databse"
        })

        let newAcc = new Account()
        newAcc.username = username;
        newAcc.login = login;
        newAcc.password_lat = lat;
        newAcc.password_lng = lng;

        Account.save(newAcc)

        return res.status(201).json({
            message: "Account created"
        })
    } catch (e) {
        console.error(e)
    }
}