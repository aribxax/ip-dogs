const { API_KEY } = process.env;
const axios = require("axios");
const e = require("express");
const { Dog, Temperament } = require('../db');



// -----------------------------------API related operations:
const getAllDogs = async () => {
    try{
        const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        return data;
    }catch(err){
        console.log(err + '///getAllDogs, controllers');
    }
};
const processedAllDogs = async () => {
    try{
        const api = await getAllDogs();
        const obj = api.map((o) => {
            return{
                id:o.id,
                name:o.name,
                height: o.height.metric,
                weight: o.weight.metric,
                life_span:o.life_span,
                image:o.image.url,
                temperament:o.temperament
            }
        })
        return obj;
    }catch(err){
        console.log(err);
    }
}
const allDogsDb = async () => {
    try{
        const dbDogs = await Dog.findAll({
            include:{
                model:Temperament,
                attributes: ["name"],
                through:{
                    attributes:[]
                }
            }
        })
        console.log(dbDogs);
        return dbDogs;
    }catch(err){
        console.log(err);
    }
}
const processedDbDogs = async () => {
    try{
        const dataDb = await allDogsDb();
        let obj = dataDb.map(o => ({
            id:o.id,
            name:o.name,
            height:o.height,
            weight:o.weight,
            life_span:o.life_span,
            image: o.image,
            temperament: o.temperaments.map(t => {return t.name}).join(", ")
        }))
        return obj;
    }catch(err){
        console.log(err);
    }
}
// -----------------------------------Middle ground:
const apiDb = async () => {
    try{

        const api = await processedAllDogs();
        const db = await processedDbDogs();

        const all = [...api,...db];
        return all
    }catch(err){
        console.log(err + '///apiDb() error');
    }
}
const searchById = async (id) => {
    try{
        const queryById = await apiDb();
        const found = queryById.find(e => e.id == id)
        /* if(!found.length) return 'Not found'; */
        return found;
    }catch(err){
        console.log(err);
    }
}
const searchByName = async (name) => {
    try{
        name = name.toLowerCase()
        const allDogs = await apiDb();
        const filter = allDogs.filter(e => e.name.toLowerCase().replace(/\s+/g, '').includes(name.replace(/\s+/g, '')));
        if(!filter) return 'Dog not found'
        return filter
    }catch(err){
        console.log(err);
    }
}
const searchEndPoint = async(query)=>{
    try{
        const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${query}&api_key=${API_KEY}`)
        return data
    }catch(err){
        console.log(err + '//-- searchEndPoint() error')
    }
}
const handleNewDog = async ({name, image, height, weight, life_span, temperament}) =>{
    try{
        const newDog = await Dog.create({
            name,
            image,
            height,
            weight,
            life_span 
          })
          const temperamentCreate = await Temperament.findAll({
            where:{ name: temperament },
          })
          await newDog.addTemperament(temperamentCreate)
          return 'Your dog has been succesfully created'
    }catch(err){
        console.log(err);
        return 'A problem ocurred while creating your dog'
    }
}


module.exports = {
    getAllDogs,
    apiDb,
    searchByName,
    searchById,
    handleNewDog,
    searchEndPoint,
    allDogsDb
}