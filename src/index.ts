import express from 'express';
import { createServer } from 'http';
import { join } from 'path'
import bodyParser from 'body-parser';

import { initalizeDatabase } from './database/init';
import { Login } from './modules/auth/login';
import { Register } from './modules/auth/register';

const port = 2137
const publicFile = join(__dirname, "/public/")

const f =  async() => {
    const app = express()
    const server = createServer(app)

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    await initalizeDatabase().then(() => {
        // Everything that uses DB goes here
        app.post("/auth/register", Register)
        app.post("/auth/login", Login)
    })

    app.get("/register", (req, res) => {
        res.sendFile(join(publicFile, "register.html"))
    })

    app.get("/login", (req, res) => {
        res.sendFile(join(publicFile, "login.html"))
    })

    server.listen(port, () => {
        console.log("Server is listening on localhost:" + port)
    })
}

f().catch((e) => {
    console.log(e)
})