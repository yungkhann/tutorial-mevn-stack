const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()

const mongoUrl = `mongodb+srv://user:user@cluster0.advi9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray())
} )


router.post('/', async(req,res) => {
    const posts = await loadPostsCollection()
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })
    res.status(201).send()
})

router.delete('/:id', async(req,res) => {
    const posts = await loadPostsCollection()
    await posts.deleteOne({_id:new mongodb.ObjectId(req.params.id)})
    res.status(201).send() 
})

async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect(mongoUrl, {useNewUrlParser:true})

    return client.db('vue_express').collection('posts')
}




module.exports = router