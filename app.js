const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

// Gunakan EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

// root
app.get('/', (req, res) => {
  const mahasiswa = [{
      nama: 'Aziz Alhadiid',
      email: 'aziz@gmail.com',
    },
    {
      nama: 'Agus Bagus',
      email: 'agus@gmail.com'
    }
  ];

  res.render('index', {
    layout: 'layouts/main-layout',
    nama: 'Aziz Alhadiid',
    title: 'Ini adalah Home',
    mahasiswa,
  });
});

// ini adalah halaman about
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'Halaman About'
  });
});

// ini adalah halaman contact
app.get('/contact', (req, res) => {
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Contact'
  });
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
});