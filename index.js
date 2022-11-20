
import  express from  'express';
import cors from 'cors';
import morgan from 'morgan';
import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node';
import SwaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import booksRouter from './routes/books.js';
const PORT=process.env.PORT|| 4000;
const db = new LowSync(new JSONFileSync('db.json'))
db.read();
//db.write();

const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Library API",
            version:"1.0.0",
            description:"A simple Express Library API"
        },
        servers:[
            {
                url:"http://localhost:4000"
            }
        ],
    
    },
    apis:['./routes/*.js']
}

const specs=swaggerJSDoc(options);
const app=express();
app.use('/api-docs',SwaggerUI.serve,SwaggerUI.setup(specs))
app.db=db;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/books",booksRouter);
app.listen(PORT,()=>console.log(`The server is running on port ${PORT}`))