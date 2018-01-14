'use strict'
var Users = require('../models/users.js');
//var Places = require('../models/places.js');

function eventController(){
    this.addEvent = (req,res)=>{
        console.log(req.body)
        
       /* Users.findOne({'github.id':req.user.github.id},function(err,user){
            user.events.push(event);
            user.save();
        })
      /*  Places.findOneAndUpdate({'name':event.name},{$inc:{'peoples':1}},function(err,place){
            res.json('done');
        })*/
        Users.findOne({'github.id':req.user.github.id},function(err,user){
            user.place = req.body.place == user.place ? "" : req.body.place;
            user.save();
        });
    },
    
    this.getEvents = (req,res)=>{
        res.send("asdasd")
    },
    this.deleteEvent = (req,res)=>{
        res.send("lalalala")
    }    
}

module.exports = eventController;