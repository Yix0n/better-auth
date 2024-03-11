import { Request, Response } from 'express';
import { Account } from '../../database/models/account';
import { getDistance } from 'geolib';

export async function Login(req: Request, res: Response) {
    let { lat, lng, login } = req.body;

    if(isNaN(lat) || isNaN(lng)) return res.status(206).json({
        message: "Invalid marker position"
    })

    let acc = await Account.findOne({
        where: {
            login
        }
    })

    if(!acc) return res.status(206).json({
        message: "Invalid login data"
    })

    console.log({
        latitude: lat,
        longitude: lng
    },
    {
        latitude: acc.password_lat,
        longitude: acc.password_lng
    })

    const distance = getDistance(
        {
            latitude: lat,
            longitude: lng
        },
        {
            latitude: acc.password_lat,
            longitude: acc.password_lng
        }
    )

    console.log(distance)

    if(distance > 10) return res.status(206).json({
        message: "Invalid login data"
    })

    res.status(200).json({
        message: "Account Found"
    })
}