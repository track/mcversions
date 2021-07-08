const express = require('express')
const app = express()
const port = 3000

require('dotenv').config()

const ads = require('./data/ads.json')
const mcVersions = require('./data/versions.json')

app.get('/ads', function (req, res) {
    if(!req.query.url) return res.status(404).json({ success: false, reason: "NO_DOMAIN_SPECIFIED"})

    let advertiser = ads.sites[req.query.url.toLowerCase()]?.advertiser
    if(!advertiser) return res.status(404).json({ success: false, reason: "NO_ADVERTISER_FOUND"})

    return res.json(advertiser)
})

app.get('/v1/mc/versions', function (req, res) {
    let versionData = {
        success: true,
        versions: mcVersions
    }

    if(req.query.version) {
        let filteredVersions = mcVersions.filter(version => version.version_name === req.query.version)

        if(filteredVersions.length > 0) {
            versionData.version = filteredVersions[0]
            delete versionData['versions']
        } else {
            versionData.success = false
            versionData.error = "INVALID_VERSION"
            versionData.versions = mcVersions.map(version => version.version_name)
        }
    }

    if(!versionData.success) {
        res.status(404)
    }
    return res.json(versionData)
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
