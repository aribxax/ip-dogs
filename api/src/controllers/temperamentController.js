const axios = require("axios");
const { Dog, Temperament } = require('../db');
const { getAllDogs, apiDb } = require('./dogController');


const getAllTemperaments = async () => {
    try{
        let stored = [];
        const query = await apiDb();
        const raw_temperaments = query.map(e => e.temperament)
        const processed = raw_temperaments.toString().split(/[ ,]+/)
        for(let i = 0; i < processed.length; i++){
            if(!stored.includes(processed[i])) stored.push(processed[i]);
        }
        const temperaments = stored.map(e => {
            return {name: e}
        })
        return temperaments;
    }catch(err){
        console.log(err);
    }
}

const createTemperamentBulk = async () => {
    try{
        const dbTemperaments = await Temperament.findAll();
        if(dbTemperaments.length) return console.log('No need to re-bulk DB')

        const temperamentList = await getAllTemperaments();
        await Temperament.bulkCreate(temperamentList);
        console.log('Created Temperaments list BULK on DB');
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    getAllTemperaments,
    createTemperamentBulk
}