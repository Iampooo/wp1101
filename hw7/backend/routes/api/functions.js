import scoreCard from '../../models/ScoreCard';

const deleteDB = async() =>{
        await scoreCard.deleteMany({});
        console.log("Database deleted");
}
const createCard = async(name, subject, score) =>{

    let existing = await scoreCard.find({name: name, subject: subject});
    if(existing.length !== 0){
        await scoreCard.update({name: name, subject: subject}, {score: score});
        return false;
    }else{
        const newCard = new scoreCard({name,subject,score});
        newCard.save();
        return true;
    }
}
const queryCard = async(key, value) =>{
    let result = [];
    if(key === 'name'){
        result = scoreCard.find({name: value});
    }
    if(key === 'subject'){
        result = scoreCard.find({subject: value});
    }
    return result;
}

export {deleteDB, createCard, queryCard}