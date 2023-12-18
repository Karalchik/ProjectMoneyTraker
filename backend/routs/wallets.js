const router=require('express').Router();
let Wallet=require('../models/wallet.model');

router.route('/').get((req,res)=>{
    Wallet.find().then(wallet=>res.json(wallet)).catch(err=>res.statusMessage(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const currency_type=req.body.currency_type;
    const name=req.body.name;
    const incomeId=Number(req.body.incomeId);
    const loosesId=Number(req.body.loosesId);
   

    const newWallet=new Wallet({
        currency_type,
        name,
        incomeId,
        loosesId,
        
    });

    newWallet.save().then(()=>res.json('Wallet added!')).catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res)=>{
    Wallet.findById(req.params.id).then(wallet=>res.json(wallet)).catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res)=>{
    Wallet.findByIdAndDelete(req.params.id).then(()=>res.json('Wallet deleted.')).catch(err=>res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req, res) => {
    Wallet.findById(req.params.id)
      .then(wallet => {
        wallet.currency_type=req.body.currency_type;
        wallet.name=req.body.name;
        wallet.incomeId=Number(req.body.incomeId);
        wallet.loosesId=Number(req.body.loosesId);
        
  
        wallet.save()
          .then(() => res.json('Wallet updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports=router;