const express = require('express')
const cors = require('cors')

database = require('./config')
const ingrediente = database.ingrediente;
const producto = database.producto;
//const { async } = require('@firebase/util')
const app = express()
app.use(express.json())
app.use(cors())

app.get("/getIngrediente", async (req, res) => {
    const snapshot = await ingrediente.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
  });
app.get("/getProducto", async (req, res) => {
    const snapshot = await producto.get();
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
app.listen(4000,()=>console.log("Up and Running on 40000"))
