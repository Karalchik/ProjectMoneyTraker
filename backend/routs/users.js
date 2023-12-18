const router=require('express').Router();
let User=require('../models/user.model');

router.route('/').get((req,res)=>{
    User.find().then(users=>res.json(users)).catch(err=>res.statusMessage(400).json('Error: '+err));
});

router.route('/register').post( async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  
  const hashedPassword = await bcrypt.hash(String(password), 10);
  const user = new User({ username: String(username), password: hashedPassword });
  console.log(user);
  await user.save();
  res.status(201).send('User registered successfully.');

});

router.route('/login').post(async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username: String(username)});
      console.log(user);
      if (!user) {
        return res.status(401).send('Invalid username or password.');
      }
  
      const passwordMatch = await bcrypt.compare(String(password), user.password);
  
      if (!passwordMatch) {
        return res.status(401).send('Invalid username or password.');
      }
  
      const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).send('Error logging in.');
    }
  });

router.route('/add').post((req,res)=>{
    console.log(req.body);
    const username=req.body.username;
    const password=req.body.password;
    const email=req.body.email;
    const walletIDs=req.body.walletIDs;
    const newUser=new User({username,password,email,walletIDs});
    newUser.save().then(()=>res.json('User added!')).catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res)=>{
    User.findById(req.params.id).then(user=>res.json(user)).catch(err=>res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username=req.body.username;
      user.password=req.body.password;
      user.email=req.body.email;
      user.walletIDs=req.body.walletIDs;

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports=router;