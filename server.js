const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}
const express = require('express')
const app = express()
const path = require('path')
const urllib = require('urllib')
const body = require('body-parser')
const { json } = require('body-parser')
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.get('/team/:teamName', function (req, res) {
    const team = req.params.teamName
    const players = []
    urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (err, response) 
    {
        let find = JSON.parse(response.toString())
        const activePlayres =
            find.league.standard.filter(p => p.isActive == true)
        const inSameTeam = activePlayres.filter(p => p.teamId === teamToIDs[team])
        for (p of inSameTeam) {
            players.push({
                name: `${p.firstName} ${p.lastName}`,
                jerseyNum: `${p.jersey}`,
                position: `${p.pos}`,
                urlImage: `https://nba-players.herokuapp.com/players/${p.lastName}/${p.firstName}`,
            })
        }
        res.send(players)
    });
})

const port = 3001
app.listen(port, function () {
    console.log('Running the server :)')
})