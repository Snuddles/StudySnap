const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://RickLeinecker:COP4331Rocks@cluster0-
4pisv.mongodb.net/COP4331?retryWrites=true&w=majority';
const client = new MongoClient(url);
client.connect();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) =>
{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PATCH, DELETE, OPTIONS'
        );
        next();
    });
app.post('/api/addcard', async (req, res, next) =>
{
        // incoming: userId, color
        // outgoing: error
        var error = '';
        const { userId, card } = req.body;
        // TEMP FOR LOCAL TESTING.
        cardList.push( card );
        var ret = { error: error };
        res.status(200).json(ret);
    });
app.post('/api/login', async (req, res, next) =>
{
        // incoming: login, password
        // outgoing: id, firstName, lastName, error
        var error = '';
        const { login, password } = req.body;
        const db = client.db();
        const results = await
        db.collection('Users').find({Login:login,Password:password}).toArray();
        var id = -1;
        var fn = '';
        var ln = '';
        if( results.length > 0 )
        {
            id = results[0].UserId;
            fn = results[0].FirstName;
            ln = results[0].LastName;
        }
        var ret = { id:id, firstName:fn, lastName:ln, error:error};
        res.status(200).json(ret);
    });
app.post('/api/searchcards', async (req, res, next) =>
{
        // incoming: userId, search
        // outgoing: results[], error
        var error = '';
        const { userId, search } = req.body;
        var _search = search.toLowerCase().trim();
        var _ret = [];
        for( var i=0; i<cardList.length; i++ )
    {
            var lowerFromList = cardList[i].toLocaleLowerCase();
            if( lowerFromList.indexOf( _search ) >= 0 )
        {
                _ret.push( cardList[i] );
            }
        }
        var ret = {results:_ret, error:''};
        res.status(200).json(ret);
    });
app.listen(5000); // start Node + Express server on port 5000
