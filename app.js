const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

// Gunakan EJS dan Express Layouts
app.set('view engine', 'ejs');
// third-party middleware
app.use(expressLayouts);
app.use(morgan('dev'));


// Buildin Middleware
app.use(express.static('public'));

// Aplikasi level middle were
app.use((req, res, next) => {
  console.log('Time', Date.now());
  next();
});

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
app.get('/about', (req, res, next) => {
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