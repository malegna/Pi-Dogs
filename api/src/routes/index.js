const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const router = require('.');
//const Dog = require('../models/Dog');
const axios = require('axios');
const { Dog, Temperaments } = require ('../db');
const { json } = require('body-parser');
const {
    API_KEY,
  } = process.env;

const router = Router();

const getInfoApi = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`); 
    const apiInfo = await apiUrl.data.map(element => { 
        return {
            name: element.name,
            id: element.id,
            img: element.image.url,
            height: element.height,
            weight: element.weight.metric,
            life_span: element.life_span,
            temperament:element.temperament,
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Dog.findAll({
        include: 
            {
              model: Temperaments,
              attributes:['name'],
            }
          
    })
}

const getAllDog = async () => {
    const apiInfo = await getInfoApi();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
     return infoTotal
}

router.get('/dogs', async (req, res)=>{
    //aqui van las dos rutas la de dogs y http://localhost:3001/dogs?name=
    const name = req.query.name
    let dogsTotal = await getAllDog();
    if(name){
        let dogsName = await dogsTotal.filter(element => element.name.toLowerCase().includes(name.toLowerCase()))
        dogsName.length ?
        res.status(200).send(dogsName) :
        res.status(404).send('No existe el Perro');
    } else {
        res.status(200).send(dogsTotal);
    }
});

router.get ('/dogs/:id', async (req,res)=>{
    const id = req.params.id;
    const razasTotales = await getAllDog()
    if(id){
      let razasId = await razasTotales.filter(element => element.id == id)
      razasId.length ?
      res.status(200).json(razasId) :
      res.status(404).send ('No existe esa raza')
    }
  
  }) 

router.get('/temperament', async (req, res)=>{
    const  temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    let temperamentosfinal = [];
    const temperaments = temperamentApi.data.map(element => element.temperament) //sacamos la informacion de los temperamentos en un nuevo array
    const newTemperaments = temperaments.map((element) => element && element.split(", ")).flat()
    const temperamentsfilter = newTemperaments.filter(Boolean);
    temperamentsfilter.forEach(element => {
            if(temperamentosfinal.indexOf(element) < 0 ) temperamentosfinal.push(element)
        })
    temperamentosfinal.forEach(el => {
        Temperaments.findOrCreate({
            where : { name: el }
        })
    })
    let getTemperaments = await Temperaments.findAll();
    if(getTemperaments.length !==0){
        res.send(getTemperaments);
    }  
})

router.post('/dog', async (req,res)=>{
    let {
        name,
        img,
        height,
        weight,
        life_span,
        temperament,
        create
    } = req.body;

    let dogCreated = await Dog.create ({
        name,
        img,
        height,
        weight,
        life_span,
        create
    });
    let temperamentDB = await Temperaments.findAll({
        where :{name : temperament}
    })
    dogCreated.addTemperaments(temperamentDB)
    res.send ('Perro creado con ??xito')
})
    


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
