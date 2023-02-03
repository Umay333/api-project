const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 8000


app.use(bodyParser.urlencoded({extended: true}))
app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on ${PORT}`)
})

app.get('/', (request, response) => {
        response.sendFile(__dirname + '/index.html')
    }
)

app.post ('/pieces', (request,response)=>{
    console.log(request.body)
})
