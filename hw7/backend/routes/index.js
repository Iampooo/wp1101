import express from 'express';
const router = express.Router();
import scoreCard from '../models/ScoreCard';
let bodyParser = require('body-parser');
let Parser = bodyParser.json();
import {deleteDB, createCard, queryCard} from './api/functions'

router.delete('/clear-db', async(req, res) => {
    console.log('bbb');
    await deleteDB();
    res.json({message: 'Database cleared'})
})
router.post('/create-card', Parser,async (req, res) => {

    const name = req.body.name;
    const subject = req.body.subject;
    const score = req.body.score;
    let fuck = await createCard(name, subject, score);
    if(fuck){
        res.json({message: `Updating (${name}, ${subject}, ${score})`, card : true} );
    }else{
        res.json({message: `Adding (${name}, ${subject}, ${score})`, card: true});
    }

})
router.get('/query-cards', async (req, res) => {
    let type = req.query.type;
    let value = req.query.queryString;
    let result = await queryCard(type, value);
    let finalResult = [];
    if(result.length ==  0) res.json({message: `${type}(${value}) not found`, messages: ''})
    else{
        for(let i = 0; i < result.length; i++){
            let buffer = "(" + result[i].name + "," + "," +result[i].subject +"," + "," +result[i].score+")" + '';
            finalResult = [...finalResult, buffer];
        }
        res.json({message: finalResult})
    }
})


export default router;