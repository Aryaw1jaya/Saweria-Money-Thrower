const express = require("express");
const app = express();

// Middleware untuk membaca JSON dari body request
app.use(express.json());

// Endpoint webhook dari Saweria
app.post("/webhook", (req, res) => {
    console.log("Webhook diterima dari Saweria:");
    console.log(req.body); // Cetak data webhook ke terminal

    // Ambil nominal donasi
    const { amount_raw, donator_name, message } = req.body;

    console.log(`Donasi dari: ${donator_name}`);
    console.log(`Nominal: Rp${amount_raw}`);
    console.log(`Pesan: ${message}`);

    res.sendStatus(200); // Kirim respons OK ke Saweria
});

// Jalankan server
app.listen(PORT, () => console.log(`Server berjalan...`));
