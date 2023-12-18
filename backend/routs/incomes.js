const router=require('express').Router();
let Income=require('../models/income.model');

router.route('/').get((req,res)=>{
    Income.find().then(income=>res.json(income)).catch(err=>res.statusMessage(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const upByMonth=req.body.upByMonth;
    const type=req.body.type;

    const newIncome=new Income({
        upByMonth,
        type,
    });

    newIncome.save().then(()=>res.json('Income added!')).catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res)=>{
    Income.findById(req.params.id).then(income=>res.json(income)).catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res)=>{
    Income.findByIdAndDelete(req.params.id).then(()=>res.json('Income deleted.')).catch(err=>res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req, res) => {
    Income.findById(req.params.id)
      .then(income => {
        income.upByMonth=req.body.upByMonth;
        income.type=req.body.type;
  
        income.save()
          .then(() => res.json('Income updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports=router;