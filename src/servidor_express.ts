import express from 'express';
import {spawn} from 'child_process';

const app = express();
  

app.get('/execmd', (req, res) => {
    if(!req.query.cmd) {
        return res.send({
            error: 'A comand has to be provided',
        });
    } else {
        const arg = req.query.args?.toString();
        const cat = spawn(req.query.cmd.toString(), arg?.split(/\s+/));
        let error = '';
        let catOutput = '';
        
        cat.stdout.on('data', (piece) => { 
            catOutput += piece;
        });
        cat.on('error', (err) => {
            error += err.message.toString();
        });
        cat.stderr.on('data', (err) => {
            error += err.toString();
        });   
        cat.on('close', () => {
            if(error) {
                res.send({error: error});
            } else if (catOutput) {
                res.send({output: catOutput.toString()});
            }
        }); 
    }
});

app.get('*', (_, res) => {
    res.send('<h1>404</h1>');
});
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
