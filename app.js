const express = require('express')
const app = express()
const port = 3000

require('dotenv').config()

const ads = require('./data/ads.json')

app.get('/ads', function (req, res) {
    if(!req.query.url) return res.status(404).json({ success: false, reason: "NO_DOMAIN_SPECIFIED"})

    let advertiser = ads.sites[req.query.url.toLowerCase()]?.advertiser
    if(!advertiser) return res.status(404).json({ success: false, reason: "NO_ADVERTISER_FOUND"})

    return res.json(advertiser)
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
