import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const personas = [
    { id: 1, nombre: 'juan' },
    { id: 2, nombre: 'anita' }
]

let siguienteId = personas.length + 1

app.get('/', (req, res) => {
    res.send('api rest ejemplo')
})

app.get('/personas', (req, res) => {
    res.json(personas)
})

app.get('/personas/:id', (req, res) => {
    const persona = personas.find(p => p.id === Number(req.params.id))
    persona ? res.json(persona) : res.status(404).send('persona no existe')
})

app.post('/personas', (req, res) => {
    const { nombre, edad } = req.body ?? {}
    if (!nombre) {
        return res.status(400).send('el campo nombre es obligatorio')
    }
    const nuevaPersona = { id: siguienteId++, nombre, edad }
    personas.push(nuevaPersona)
    res.status(201).json(nuevaPersona)
})

app.put('/personas/:id', (req, res) => {
    const persona = personas.find(p => p.id === Number(req.params.id))
    if (!persona) {
        return res.status(404).send('no se encontro')
    }
    const { nombre, edad } = req.body ?? {}
    if (!nombre) {
        return res.status(400).send('el campo nombre es obligatorio')
    }
    persona.nombre = nombre
    persona.edad = edad
    res.json(persona)
})

app.delete('/personas/:id', (req, res) => {
    const indice = personas.findIndex(p => p.id === Number(req.params.id))
    if (indice === -1) {
        return res.status(404).send('no existe')
    }
    personas.splice(indice, 1)
    res.status(204).send()
})

app.use((req, res) => {
    res.status(404).send('la pag no existe')
})

app.listen(port, () => {
    console.log(`servidor en http://localhost:${port}`)
})
