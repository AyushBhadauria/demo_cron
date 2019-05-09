import app from "./app";
import {fetchData} from './controller/fetch.controller';

var schedule = require('node-schedule');
const port = 8000;
import * as mongoose from 'mongoose';
app.listen(port, function(err, req, res, next) {
  schedule.scheduleJob('*/1 * * * *', function(){
  mongoose.connect('mongodb://localhost:27017/work').then(()=>{
    console.log('Database Connected')
      console.log('The answer to life, the universe, and everything!');
      fetchData();
    }).catch((ex)=>{
      next(ex);
  });;
  
})
  console.log('Express server listening on port ' + port);

});