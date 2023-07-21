import { PORT } from './config.js'
import express from 'express'
import { emailsender } from './emailsender.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded(
    {extended: true}
))

app.post('/', (req, res)=>{
    //console.log(req.headers.origin)
    emailsender({
        firstname: req.body.firstName, 
        lastname: req.body.lastName,
        telephone: req.body.telephone,
        emailfrom: req.body.email,
        message: req.body.message
    })
    .then((response) => res.json({response: response}))
})

app.listen(PORT, ()=>{
    console.log('listening..')
})