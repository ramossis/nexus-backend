import 'dotenv/config'
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";


const conecctionString=process.env.DATABASE_URL
const pool = new pg.Pool({
    user:'postgres',
    host:'localhost',
    database:'nexus-support',
    password:'Fni71882923',
    port:5432
})
pool.query('SELECT NOW()', (err) => {
    if (err) {
        console.error('❌ Error crítico de Postgres:', err.message);
    } else {
        console.log('✅ Postgres respondió correctamente');
    }
});
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({adapter})

export default prisma