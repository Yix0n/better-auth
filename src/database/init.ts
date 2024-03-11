import { DataSource } from "typeorm";
import { Account } from "./models/account";

export const initalizeDatabase = async (silent = false) => {
    const connection = new DataSource({
        type: "better-sqlite3",
        database: "database.sql",
        synchronize: true,
        entities: [
            Account
        ]
    })

    await connection.initialize().then(() => {
        if(!silent) console.log("Database initealized")
    }).catch((e) => {
        console.error(e)
    })
}