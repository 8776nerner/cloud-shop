const express = require('express');
const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.text({ limit: '1mb' }));

let cachedShopData = "";

app.post('/shop', (req, res) => {
    if (req.body && req.body.includes('|||')) {
        cachedShopData = req.body;
        console.log("[CLOUD] New shop configuration received and cached!");
        return res.status(200).send("OK");
    }
    res.status(400).send("Invalid format");
});

app.get('/shop', (req, res) => {
    if (cachedShopData) {
        return res.status(200).send(cachedShopData);
    }
    res.status(404).send("No shop data cached yet");
});

app.listen(PORT, () => {
    console.log(`Server running globally on port ${PORT}`);
});