const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const personas = [

    {id: 1, nombre: 'juan'},
    {id: 2, nombre: 'anita'}

]

app.listen(port, () =>  {console.log(`server en puerto http://localhost:${port}`)});

app.get('/', (req,res) => {
    res.send("api rest ejemplo");
})

app.get("/personas", (req, res) => {
    res.json(personas);
});

app.get('/personas/:id', (req,res) => {
    const persona = personas.find(p => p.id == req.params.id);
    persona ? res.json(persona) : res.status(404).send('persona no existe')
})

app.post('/personas', (req,res) => {
    console.log(req.body)
    const nvoid = personas.length + 1;
    const nuevaPersona = {
        id : nvoid,
        nombre : req.body.nombre,
        edad : req.body.edad,
    }
    personas.push(nuevaPersona)
    res.status(201).json(nuevaPersona)
})

app.put('/personas/', (req,res) => {
    console.log(req.query)
    console.log(req.body)
    const persona = personas.find(p => p.id == req.query.id)
    if (!persona) { return res.status(404).send('no se encontro')
    persona.nombre = req.body.nombre
    persona.edad = req.body.edad
    }
    res.json(persona)

})

app.delete('/personas', (req,res) => {
    console.log(req.params.id)
    const indice = persona.findIndex (i, i.id == req.params.id)
    if(indide == -1){ return res.status(404).send('no existe') }
    personas.splice(indice, 1)
    res.status(204)

})

app.use((req, res) => {
    res.status(404).send('la pag no existe')
})


