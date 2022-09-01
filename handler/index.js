const mongoose = require('mongoose');
const configdb = require('quick.db');

module.exports = async (client, interaction) => {

   const mongooseConnectionString = process.env.mongooseConnectionString;
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }).then(() => console.log('Connected to MongoDB'));

  
}

  