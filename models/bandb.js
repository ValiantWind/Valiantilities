const mongoose = require('mongoose');



module.exports = mongoose.model('Bans', 
    new mongoose.Schema({
    userId: String,
    guildId: String, 
    moderatorId: String,
    reason: String,
    timestamp: Number
  })                        
)

