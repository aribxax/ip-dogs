const { Router } = require('express');
const { Temperament } = require('../db');
const { getAllTemperaments } = require('../controllers/temperamentController');



const router = Router();

router.get('/', async (req,res)=> {
    try{
        const dbTemperaments = await Temperament.findAll();
        if(dbTemperaments.length) return res.status(200).json(dbTemperaments);
        const temperamentList = await getAllTemperaments();
        await Temperament.bulkCreate(temperamentList);
        console.log('Created Temperaments list BULK on DB');
        res.status(200).json(temperamentList);
    }catch(err){
        console.log(err);
    }
})

module.exports = router;