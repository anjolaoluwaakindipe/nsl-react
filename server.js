const app = require("./server/app");

const https = require("https")
const http = require("http");
const { NODE_ENV, NODE_PORT } = require("./server/environments");
const fs = require("fs")
const path = require("path")



if(NODE_ENV === "production"){
    https.createServer(
        {
            cert: fs.readFileSync(
                path.resolve("/ssl/nigerianstockbrokersltd.com-crt.pem")
            ),
            key: fs.readFileSync(
                path.resolve("/ssl/nigerianstockbrokersltd.com-key.pem")
            ),
            passphrase: "nsl24"
        },
        app
    ).listen(NODE_PORT, ()=>{
        console.log("Production Application Ready, Listening on port ", NODE_PORT)
    });
}else{
    http.createServer(app).listen(NODE_PORT, () => {
        console.log(
            "Development Application Ready, Listening on port ",
            NODE_PORT
        );
    });
}



