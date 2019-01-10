const express = require("express");

const app = express();
const learnObj = [];

app.use(express.json());

app.get("/learnObj", (req, res) => {
    res.send(learnObj);
});

app.post("/learnObj", (req, res) => {
    if(!req.body.name || !req.body.description || !req.body.resource) {
        return res.status(404).send("An objective must have a name, description and resource.");
    };
    const objective = {
        name: req.body.name, 
        description: req.body.description,
        resource: req.body.resource
    };
    learnObj.push(objective);
    res.send(objective);
});

app.get("/learnObj/:objName", (req, res) => {
    let foundObj = learnObj.find(obj => obj.name === req.params.objName);
    if(!learnObj.includes(foundObj)) return res.status(404).send("Objective not found. Please try a different name.");
    res.send(foundObj);
});

app.put("/learnObj/:objName", (req, res) => {
    let foundObj = learnObj.find(obj => obj.name === req.params.objName);
    if(!learnObj.includes(foundObj)) return res.status(404).send("Objective not found. Please try a different name.");
    foundObj.name = req.body.name;
    foundObj.description = req.body.description; 
    foundObj.resource = req.body.resource;
    res.send(foundObj);
});

app.delete("/learnObj/:objName", (req, res) => {
    let foundIdx = learnObj.findIndex(obj => obj.name === req.params.objName);
    if(foundIdx == undefined) return res.status(404).send("Objective not found. Please try a different name.");
    learnObj.splice(foundIdx, 1);
    res.send(learnObj);
});

app.listen(3000, console.log("Listening on Port 3000"));
