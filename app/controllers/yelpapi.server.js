'use strict';
 
const yelp = require('yelp-fusion');
function Yelp(){
	const client = yelp.client(process.env.YelpApiKey);
	this.getResult = function(req,res){
		var loc = req.body.loc; 
		client.search({
			term : 'bars',
		  location: loc
		}).then(response => {
		  //console.log(response.jsonBody.businesses);
		  res.json(response.jsonBody.businesses);
		}).catch(e => {
		  console.log(e);
		});
}
}
module.exports = Yelp;