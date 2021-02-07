var nexpect = require('nexpect');

nexpect.spawn("echo", ["hello"])
         .expect("hello")
         .run(function (err, stdout, exitcode) {
           if (!err) {
             console.log("hello was echoed",stdout);
           }
         });
