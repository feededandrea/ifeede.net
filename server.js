const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());

app.get('/chats', (req,res)=>{
  const data = fs.readFileSync('chats.json');
  res.json(JSON.parse(data));
});

app.post('/chats', (req,res)=>{
  fs.writeFileSync('chats.json', JSON.stringify(req.body));
  res.send({status:'ok'});
});

app.listen(3000, ()=>console.log('Server running'));