const express = require('express')
const app=express()
const cors =require('cors');
const bodyParser = require('body-parser')
app.use(cors());
// app.use(bodyParser());
const admin = require('firebase-admin');
var serviceAccount = require('./key/key.json')

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:"https://fir-reactnative-7453c.firebaseio.com"
})

var port_number = process.env.PORT || 3000;

const port=3000;
app.get('/',(req,res)=>{
    res.send('Hello')
})



//endpoint get data
app.get("/questions",async (req,res)=>{
    try{
        //Get Details

        // const Questiondata =(await admin.firestore().collection('Quiz').doc('1').get()).data();
        
        // console.log('Hello'+Questiondata)
        // // .then(querySnapshot=>{
        // //     querySnapshot.docs.map(doc=>{
        // //         return doc.data();
        // //     })
        // // })
        // res.send({
        //     Quiz: Questiondata
        // })

        //Get All
        let ListQuiz = await admin.firestore().collection("Quiz").listDocuments();
        let ListQuestion =[];
        for(i =0;i<ListQuiz.length;i++){
            ListQuestion.push((await ListQuiz[i].get()).data());
        }
        res.send({
            Quiz: ListQuestion,
        })
    }
    catch(err){
        res.send("Failed to get data")
    }
})

// var server = http.createServer((req,res)=>{

// })
// server.listen(process.env.PORT||80,()=>{
//     console.log("Listening on port 80");
// })

app.listen(port_number,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`Port is running on localhostL:${port_number}`)
    }
    
})