import express from "express";
import fs from "fs/promises";

const app = express();

app.use(express.static("public"));

// When JSON sent, turns it into a JavaScript object.
app.use(express.json());

app.post("/api/characters", async (req, res) => {

    const character = (req.body);
    
    console.log(character);

    await fs.writeFile(
        `characters/${character.name}.json`,
        JSON.stringify(character, null, 4)
    );

    res.json({
        message: "Character received!"
    });

});

app.listen(3000, () => {
    console.log("Server is Running");
})