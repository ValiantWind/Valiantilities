const mongoose = require('mongoose');



module.exports = mongoose.model('Mutes', 
    new mongoose.Schema({
    userId: String,
    guildId: String, 
    moderatorId: String,
    duration: String,
    reason: String,
    timestamp: Number
  })                        
)

