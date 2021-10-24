

const firestore = require('firebase/firestore')
const express = require('express')
const cors = require('cors');
const { query } = require('express');


database = require('./config')
const ingrediente = database.ingrediente;
const producto = database.producto;
const familia =database.familia;
const cliente = database.cliente;
const pedido = database.pedido;

//const { async } = require('@firebase/util')
const app = express()
app.use(express.json())
app.use(cors())

app.get("/getIngredientes", async (req, res) => {
    const snapshot = await ingrediente.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
  });

app.get("/getProductos", async (req, res) => {
    const snapshot = await producto.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
  });

app.get("/getClientes", async (req, res) => {
    const snapshot = await cliente.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
  });
app.get("/getPedidos", async (req, res) => {
    const snapshot = await pedido.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
  });


app.post("/postIngrediente", async(req,res)=> 
{
    const data = req.body
    console.log("Info Ingredientes ",data)
    await ingrediente.add(data)
    res.send({msg: "Ingrediente added"})
})

app.post("/postCliente", async(req,res)=> 
{
    const data = req.body
    const nit = data.NIT
    var respuesta = null;
    
    let query = cliente.where('NIT', '==', nit);
    let querySnapshot = await query.get();

    if (querySnapshot.empty) {
        console.log(`No encontramos al NIT: ${nit}, lo creamos`);
        await cliente.add(data)
        respuesta = data
    } else {
        console.log('Encontramos al NIT: ',nit);
        querySnapshot.forEach(documentSnapshot => {
            console.log(`Found document at ${documentSnapshot.ref.path}`);
            respuesta = `El NIT ${nit} ya existe en ${documentSnapshot.ref.path}`
        });
    }

    res.send(respuesta)
})

app.get("/getIngrediente/:nombre", async (req, res) => {
    var nombreIng =req.params.nombre 
    console.log('Nombre:', nombreIng)
    let query = ingrediente.where('Nombre', '==', nombreIng);
    let querySnapshot = await query.get();
    let respuesta = null;

    if (querySnapshot.empty) {
        console.log(`No encontramos al Ingrediente: ${nombreIng}`);
       
    } else {
        console.log('Encontramos al ingrediente: ',nombreIng);
        const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        respuesta = list
    }


    res.send(respuesta);
  });

  

app.listen(4000,()=>console.log("Up and Running on 40000"))
