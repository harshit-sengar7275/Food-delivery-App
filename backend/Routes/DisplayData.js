const express = require("express");
const router = express.Router();

router.post('/foodData', (req,res) => {
    try{
        // console.log(global.sample);
        res.send([global.sample, global.type])

    } catch(error){
        console.error(error.message);
        res.send("server Error");   
    }
})

module.exports = router;