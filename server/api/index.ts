import express from "express";
import fs from "fs";
import cors from "cors";
import { v4 as uuidV4 } from "uuid";

import { createClient } from '@supabase/supabase-js';

type User = {
  uuid: string;
  username: string;
  email: string;
}

const supabaseUrl = 'https://wpvnbefbwiteogcwdbye.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwdm5iZWZid2l0ZW9nY3dkYnllIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxNjg4MDAsImV4cCI6MTk5Mzc0NDgwMH0.J6fTdkRx3dDc6UHZ34mvhkV_5tovRaPYjJ4H_Qbg3uE';
const supabase = createClient(supabaseUrl, supabaseKey);


const app = express();
app.use(express.json());
app.use(cors());

app.post("/test", async function(req, res){
    
    const username = req.body.username;
    const email = req.body.email
    const user:User ={
      uuid: uuidV4(),
      username: username,
      email: email
      
    };
    const { error } = await supabase
    .from('test')
    .insert(user);
    res.send("testing post");
    
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


app.put("/test/:uuid", async function (req, res){
  const newUsername = req.body.newUsername;
  const data = await changeUsername(supabase, req.params.uuid, newUsername);
  res.send(data);
});

app.get("/test/:uuid", async function (req, res){
  console.log(req.params.uuid);
  const data = await getUserById(supabase, req.params.uuid);
  res.send(data);
});

app.get("/test", async function (req, res) {
    const { data, error } = await supabase
  .from('test')
  .select();
res.send(data);
    
});

app.listen("3002");