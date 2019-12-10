const mongoose = require('mongoose');

const MyDB = 'mongodb+srv://sa:Rambosobalabasuca@cluster0-2lb7o.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(MyDB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

    .then(db => console.log('DB is conected.'))
    .catch(err => console.log(err));
