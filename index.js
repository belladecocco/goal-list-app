(async () => {
    const express = require("express");
    const mongo = require("mongodb");

    const app = express();
    const MongoClient = mongo.MongoClient;
    const url = "mongodb://localhost:27017/";
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db("goalSetter");
    const allGoals = db.collection("AllGoals");

    app.use(express.json());

    app.get("/goals", async (req, res) => {
        res.send(await allGoals.find({}).toArray());
    });

    app.post("/goals", async (req, res) => {
        if (!req.body.name || !req.body.why || !req.body.resource) {
            return res.status(404).send("An objective must have a name, why and resource.");
        };
        await allGoals.insertOne({
            name: req.body.name,
            why: req.body.why,
            resource: req.body.resource
        });
        res.send(await allGoals.find({}).toArray())
    });

    app.get("/goals/:objName", async (req, res) => {
        try {
            res.send(await allGoals.findOne({ name: req.params.objName }));
        }
        catch (e) {
            res.status(404).send("Objective not found. Please try a different name.");
        }
    });

    app.put("/goals/:objId", async (req, res) => {
        try {
            let foundObj = await allGoals.findOneAndUpdate({ _id: mongo.ObjectId(req.params.objId) }, {
                $set: {
                    name: req.body.name,
                    why: req.body.why,
                    resource: req.body.resource
                }
            })
            res.send(foundObj);
        } catch (e) {
            res.status(404).send("Objective not found. Please try a different ID.");
        }
    });

    app.delete("/goals/:objId", async (req, res) => {
        let deleted = await allGoals.deleteOne({ _id: mongo.ObjectId(req.params.objId) });
        if (deleted == undefined) return res.status(404).send("Objective not found. Please try a different name.");
        else res.send(deleted);
    });

    app.listen(3000, console.log("Listening on Port 3000"));
})();