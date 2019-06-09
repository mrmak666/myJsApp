const fs= require('fs');
const path=require('path');

// all call Async, there are other methods for Sync

// create folder
//fs.mkdir(path.join(__dirname,'dirCreatedByNode'),{}, function(err){if(err) throw err; console.log('folder created');} );

// create and write to file, it will overwrite if exist
//fs.writeFile(path.join(__dirname,'dirCreatedByNode','hello.text'),'Hello World! HAHA',err=>{if(err) throw err; console.log('file created');} );
// append
//fs.appendFile(path.join(__dirname,'dirCreatedByNode','hello.text'),'Hello World! HAHA',err=>{if(err) throw err; console.log('file created');} );

// read file

fs.readFile(path.join(__dirname,'dirCreatedByNode','hello.text'),'utf8',(err,data)=>{if(err) throw err; console.log(data);} );


