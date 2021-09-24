const express=require("express")
const TestDB = require("../model/TestDB")
const router=express.Router()


router.get('/',async(req,res,next)=>{
    // try{
    //     const testdb=await TestDB.find()
    //     res.json(testdb)
    // }catch(err){
    //     res.send('Error')
    // }
    try{
        let{page,size}=req.query;
        if(!page){
            page=1;
        }
        if(!size){
            size=10;
        }
        const limit=parseInt(size);
        const skip=(page-1)*size;
        const testdb=await TestDB.find().limit(limit).skip(skip);
        res.send(testdb);
    }catch(error){
        res.status(500).send(error.message);
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


router.get('/my/sort',async(req,res)=>{
    //console.log("/sort")
//const getsort=async()=>{
    try{
        const result=await TestDB.find({name:"Akshay"}).select({tech:1}).sort({tech:-1});
        console.log(result);
        res.json(result)

    }catch(err){
        res.send(err)
        console.log(err);
    }
//}
//getsort();

})
module.exports=router