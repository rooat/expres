const { exec } = require('child_process');
var cmdjson = require('../cmdexec/cmdjson.json')

const execIfconfig = (req,res,next)=>{
    let cmd = req.body.cmds;
    exec(cmdjson[cmd], (error, stdout, stderr) => {
        if (error) {
            return res.send(error)
        }
        return res.send(stdout)
    });
}

module.exports = {
    execIfconfig
}