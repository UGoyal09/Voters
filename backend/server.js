import express, { static } from 'express';
import { urlencoded, json } from 'body-parser';
import session from 'express-session';
import { join } from 'path';
import service from './services';

const port = 4200;

const app = express();

app.use(urlencoded({extended : false}));
app.use(json());

app.use(static('public'));
app.use(static(join(__dirname,'dist/voterregistration')));
app.use(session({
    secret : '####',
    resave : true ,
    saveUninitialized : false
}))

app.use('',service);

app.listen(port,()=>{
    console.log('server listening');
})