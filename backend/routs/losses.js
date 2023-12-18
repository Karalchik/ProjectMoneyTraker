const router=require('express').Router();
let Losses=require('../models/losses.model');

router.route('/').get((req,res)=>{
    Losses.find().then(losses=>res.json(losses)).catch(err=>res.statusMessage(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const downByMonth=req.body.downByMonth;
    const type=req.body.type;

    const newLosses=new Losses({
        downByMonth,
        type,
    });

    newLosses.save().then(()=>res.json('Losses added!')).catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res)=>{
    Losses.findById(req.params.id).then(losses=>res.json(losses)).catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res)=>{
    Losses.findByIdAndDelete(req.params.id).then(()=>res.json('Losses deleted.')).catch(err=>res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req, res) => {
    Losses.findById(req.params.id)
      .then(losses => {
        losses.downByMonth=req.body.downByMonth;
        losses.type=req.body.type;
  
        losses.save()
          .then(() => res.json('Losses updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports=router;