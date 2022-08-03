const app = require("./server/app");
const { NODE_PORT } = require("./server/environments");
const greenlock = require("greenlock-express");



greenlock
    .init({
        packageRoot: __dirname,

        // where to look for configuration
        configDir: "./greenlock.d",

        maintainerEmail: "devops@isslng.com",

        // whether or not to run at cloudscale
        cluster: false,
    })
    // .serve(app);
    // Serves on 80 and 443
    // Get's SSL certificates magically!
    .ready(httpsWorker);



function httpsWorker(glx) {
    console.log(glx);

    const httpsServer = glx.httpsServer(null, app);

    httpsServer.listen(
       4000,
        "0.0.0.0",
        () => {
            console.log(
                "https server starting on port: ",
                4000
            );
        }
    );

     var httpServer = glx.httpServer();

     httpServer.listen(4001, "0.0.0.0", function () {
         console.info("Listening on ", httpServer.address());
     });

}
