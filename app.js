const express= require('express');

const mysql=require('mysql');

//Create connection

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'nodemysql'
});

//Connect db

db.connect((err)=>{
if(err){
    throw err;
}
console.log('Mysql connection was successful');
});

const app=express();

//Create Database

app.get('/createdb',(req,res) =>{
let sql='CREATE DATABASE nodemysql';
db.query(sql,(err,result)=>{
if(err) throw err;
console.log(result);
res.send('Database created.');
})
})


//Creating a Table

app.get('/createposttable',(req,res)=>{
    let sql= 'CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';

    db.query(sql,(err,result)=>{
        if(err)
        throw err;
        console.log(result);
        res.send('Posts Table Created');
    })

});

//Insert First Post

app.get('/addpost1',(req,res)=>{
    let post={
        title: 'Post One',
        body: 'This is the first Post'
    };

    let sql= 'INSERT INTO posts SET ?';

    let query= db.query(sql,post,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('First Post has been Added Scuccesfully');

    })
})

app.get('/addpost2',(req,res)=>{
    let post={
        title: 'Post Two',
        body: 'This is the second Post'
    };

    let sql= 'INSERT INTO posts SET ?';

    let query= db.query(sql,post,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Second Post has been Added Scuccesfully');

    })
})


//Select Posts

app.get('/getPosts',(req,res)=>{
   

    let sql= 'SELECT * FROM posts';

    let query= db.query(sql,(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched...');

    })
});

//Fetching an Individual Post

app.get('/getPost/:id',(req,res)=>{
   

    let sql= `SELECT * FROM posts WHERE id = ${req.params.id}`;

    let query= db.query(sql,(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.send('Post Fetched...');

    })
})

app.get('/updatePost/:id',(req,res)=>{

    let newTitle='Updated Title';
   

    let sql= `UPDATE posts SET title= '${newTitle}' WHERE id = ${req.params.id}`;

    let query= db.query(sql,(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.send('Post Fetched...');

    })
});

app.get('/deletePost/:id',(req,res)=>{

   // let newTitle='Updated Title';
   

    let sql= `DELETE FROM posts WHERE id = ${req.params.id}`;

    let query= db.query(sql,(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.send('Post Deleted...');

    })
})



app.listen('3000',()=>{
    console.log('Server Started on Port 3000');
});