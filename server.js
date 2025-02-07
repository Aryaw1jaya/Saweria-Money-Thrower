const express = require("express");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const app = express();
app.use(express.json());

const port = new SerialPort({
    path: "COM4", // Sesuaikan dengan port Arduino
    baudRate: 9600
});
const parser = port.pipe(new ReadlineParser());

app.post("/webhook", (req, res) => {
    const { amount_raw, donator_name } = req.body;
    
    console.log(`Terima Kasih ${donator_name}`);
    console.log(`Donasi masuk: Rp.${amount_raw}`);
    
    if (amount_raw >= 1000) {
        port.write("FIRE\n"); // Kirim perintah ke Arduino
        console.log("Mengaktifkan Money Gun Thrower!");
    }

    res.sendStatus(200);
});

// Jalankan server di PORT dari Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webhook listening on port ${PORT}`));
