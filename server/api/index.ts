import express from "express";
import fs from "fs";
import cors from "cors";
import { v4 as uuidV4 } from "uuid";

import { createClient } from '@supabase/supabase-js';
import { hash, verify } from 'argon2';
import * as jwt from "jsonwebtoken";

const jwtKey = "f35d9546e33446c427701a47ae2702e9a59e4d2807683dd4dd88f0ef05fb085a75142dad5e2a3ca9fcd14ce888cb3e01537e4ec6d5c834f47ba3f4397a6f4ec2";

type User = {
  uuid: string;
  username: string;
  email: string;
  password: string;
}

const supabaseUrl = 'https://wpvnbefbwiteogcwdbye.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwdm5iZWZid2l0ZW9nY3dkYnllIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxNjg4MDAsImV4cCI6MTk5Mzc0NDgwMH0.J6fTdkRx3dDc6UHZ34mvhkV_5tovRaPYjJ4H_Qbg3uE';
const supabase = createClient(supabaseUrl, supabaseKey);


const app = express();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'false');
  next();
});

app.options('*', cors({ credentials: false }));

app.use(express.json());


app.post("/test", async function(req, res){
    
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashed = await hash(password);

    const user:User ={
      uuid: uuidV4(),
      username: username,
      email: email,
      password: hashed,
    };

    const { error } = await supabase
    .from('test')
    .insert(user);
    res.send(hashed);
    
});

async function getUserById(supabase, uuid){
  console.log(uuid);
  const { data, error } = await supabase
  .from('test')
  .select()
  .eq('uuid', uuid);
  return data;
}

async function changeUsername(supabase, uuid, newUsername) {
  const { data, error } = await supabase
  .from('test')
  .update({username: newUsername})
  .eq('uuid', uuid)
  .select();
  return data;
};



app.put("/changeuser/:uuid", async function (req, res){
  const authHeader = req.headers.authorization;
  console.log(req.headers);
  console.log(authHeader);
    if(!authHeader){
      return res.status(400).send({error: "no auth header"});
    };

    const token = authHeader.split(" ")[1];
    jwt.verify(token, jwtKey, async function (err, decodedUser){
      if (err) {
        return res.status(400).send({error: "invalid token"});
      };
      const newUsername = req.body.newUsername;
  const data = await changeUsername(supabase, req.params.uuid, newUsername);
  res.send(data);
    })
  
});

app.get("/changeuser/:uuid", async function (req, res){
  console.log(req.params.uuid);
  const data = await getUserById(supabase, req.params.uuid);
  res.send(data);
});

app.post("/changeuser", async function (req, res){
  console.log(req.headers);
  
  res.send("hello");
})

async function getUserByEmail(supabase, email){
  const { data, error } = await supabase
  .from('test')
  .select()
  .eq('email', email);
  return data;
}

app.post("/login", async function (req, res){
  const email = req.body.email;
  const password = req.body.password;
  const user = await getUserByEmail(supabase, email);
  const isPasswordCorrect = await verify(user[0].password, password);
  if (!isPasswordCorrect){
    console.log("wrong password");
    res.status(400).send("wrong password");
  } else {
    const token = jwt.sign({ id: user.uuid }, jwtKey, { expiresIn: "1800s" });
    console.log(token, user);
    res.status(200).send({token, user});
  }
});

app.post("/changeuser", async function (req, res){
  console.log("posting auth header");
  res.status(200).send("stuff");
})

app.get("/test", async function (req, res) {
    const { data, error } = await supabase
  .from('test')
  .select();
res.send(data);
    
});

app.listen("3002");