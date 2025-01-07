const express = require('express');
const app = express();
const port = 3000;

// root
app.get('/', (req, res) => {
   //   res.send('Hello World!')

    // jika ingin mengambil file HTML
    res.sendFile('./index.html', {root: __dirname});
});

// ini adalah halaman about
app.get('/about', (req, res) => {
    res.sendFile('./about.html', {root: __dirname});
});

// ini adalah halaman contact
app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', {root: __dirname});
});

// ini ada params
app.get('/product/:id', (req, res) => {
    res.send(`Product ID: ${req.params.id} <br> Category : ${req.query.category}`);
});

// Simpan ini paling bawah
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})