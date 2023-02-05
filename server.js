const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = process.env.DB_NAME
MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log('Connected to ${dbName} Database')
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (request, response) => {
    db.collection('artworks').find().sort({likes: -1}).toArray()
        .then(data => {
            console.log(data)
            response.render('index.ejs', {info: data})
        })
        .catch(error => console.error(error))
})



app.post('/addArtwork', (request, response) => {
    db.collection('artworks').insertOne({
        artistName: request.body.artistName,
        artworkName: request.body.artworkName,
        likes: 0
    })
        .then(result => {
            console.log('Artwork added')
            response.redirect('/')
        })
        .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('artworks').updateOne({
            artistName: request.body.artistName,
            artworkName: request.body.artworkName, likes: request.body.likes
        }, {

            $set: {
                likes: request.body.likes + 1
            }
        }, {
            sort: {_id: -1},
            upsert: false
        }
    )
        .then(result => {
            console.log('Added one like')
            response.json('Like added')
        })
        .catch(error => console.error('error'))
})

app.delete('/deleteArtwork', (request, response) => {
    db.collection('artworks').deleteOne({artistName: request.body.artistName})
        .then(result => {
            if (result.deletedCount === 0) {
                return response.json('No piece to delete')
            }
            console.log('Artwork deleted')
            response.json('Artwork deleted')
        })
        .catch(error => console.error(error))
})

