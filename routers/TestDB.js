const express=require("express")
const TestDB = require("../model/TestDB")
const router=express.Router()


router.get('/',async(req,res)=>{
    try{
        const testdb=await TestDB.find()
        res.json(testdb)
    }catch(err){
        res.send('Error')
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const testdb=await TestDB.findById(req.params.id)
        res.json(testdb)
    }catch(err){
        res.send('Error')
    }
})

router.patch('/:id',async(req,res)=>{
    try{
        const testdb=await TestDB.findById(req.params.id)
        testdb.sub=req.body.sub
        const c1=await testdb.save()
        res.json(c1)
    }catch(err){
        res.send('Error')
    }
})



router.post('/',async(req,res)=>{
    const testdb=new TestDB({
        name:req.body.name,
        tech:req.body.tech,
        sub:req.body.sub
    })
    try{
        const a1=await testdb.save()
        res.json(a1)
    }catch(err){
        res.send("error")
    }
});




router.delete('/:id',async(req,res)=>{
    try{
        const testdb=await TestDB.findByIdAndRemove(req.params.id)
        res.json(testdb)
    }catch(err){
        res.send("error")
    }
})

//serach with name
router.get("/search/:name",(req,res)=>{

var regex=new RegExp(req.params.name,"i");
TestDB.find({name:regex}).then((result)=>{
    res.status(200).json(result)
})

})

//serach with tech
router.get("/searchtech/:tech",(req,res)=>{
    var regex=new RegExp(req.params.tech,"i")
    TestDB.find({tech:regex}).then((result)=>{
        res.status(200).json(result)
    })
})

module.exports=router