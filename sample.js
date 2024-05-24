const fs = require("fs");

const requestHandler = (req,res)=>{
    const url = req.url;
    const method = req.method;

    if(url==="/"){

        fs.readFile("message.txt", "utf-8", (error,data)=>{
            if(error){
                console.log(error);
            }
        //console.log("data from file :", data);
        res.setHeader("Content-Type", "text/html");
        res.write(`<html>`);
        res.write(`<head><title>Enter Message </title></head>`);
        res.write(`<body>`);
        res.write('<form action="/message" method="POST">');
        res.write(`<h1>Enter Message : </h1>`);
        res.write(`<h6>${data}</h6>`);
        res.write(`<input type="text" name="message">`);
        res.write(`<button type="submit">Send</button>`);
        res.write('</form>');
        res.write(`</body>`);
        res.write(`</html>`);
        return res.end();
        });
    
    }
    
    if(url==="/message" && method==="POST"){
    
        const body = [];
        req.on("data", (chunk)=>{
        
            body.push(chunk);
        });
    
        return req.on("end", ()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFile("message.txt", message, (error) =>{
                res.statusCode =302;
                res.setHeader("Location","/");
                return res.end();
    
            });
            
        });  
    }
    
    // res.setHeader("Content-Type", "text/html");
    // res.write(`<html><h1>Hello from my node.js server!!</h1></html>`);
    // res.end();

};

module.exports = requestHandler;