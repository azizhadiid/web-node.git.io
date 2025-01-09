const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat
} = require("./utils/contacts");
const {
  body,
  validationResult,
  check
} = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

// Gunakan EJS dan Express Layouts
app.set('view engine', 'ejs');
// third-party middleware
app.use(expressLayouts);

// Buildin Middleware
app.use(express.static('public'));
// build-in URL
app.use(express.urlencoded({
  extended: true
}));
// Konfigurasi flash
app.use(cookieParser('secret'));
// Konfigurasi session
app.use(session({
  cookie: {
    maxAge: 6000
  },
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());


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
  const contacts = loadContact();

  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Contact',
    contacts,
    msg: req.flash('msg'),
  });
});

// ini adalah halaman contact/add
app.get('/contact/add', (req, res) => {

  res.render('add-contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Tambah Data Contact',
  });
});

// Proses data kontak
app.post('/contact', [body('nama').custom((value) => {
  const duplikat = cekDuplikat(value);
  if (duplikat) {
    throw new Error('Nama sudah digunakan!');
  }
  return true;
}), check('email', 'Email Tidak Valid').isEmail(), check('nohp', 'No HP tidak valid').isMobilePhone('id-ID')], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({
    //   errors: errors.array()
    // });

    res.render('add-contact', {
      layout: 'layouts/main-layout',
      title: 'Halaman Tambah Data Contact',
      errors: errors.array(),
    })
  } else {
    addContact(req.body);
    // Kirim flash pesan
    req.flash('msg', 'Data baru telah ditambahkan!');
    res.redirect('/contact');
  }

});

// ini adalah halaman contact/nama (deatil data)
app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);

  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'Halaman Detail Contact',
    contact,
  });
});

// Simpan ini paling bawah
app.use('/', (req, res) => {
  res.status(404);
  res.send('<h1>404</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});