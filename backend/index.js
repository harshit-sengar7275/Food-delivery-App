const express = require('express');
const mongo = require("./db");
const app = express();

mongo(); // Call the function to connect to MongoDB

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept"
    );
    next();
})

app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.listen(4000, () => {
    console.log("The port is running on localhost 4000");
}); 