const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Form page
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, reg, dob, email } = req.body;
  
  db.run(
    "INSERT INTO users (name, reg, dob, email) VALUES (?, ?, ?, ?)",
    [name, reg, dob, email],
    function(err) {
      if (err) {
        res.send("Error: " + err.message);
      } else {
        res.send(`
          <h1>Data Submitted Successfully!</h1>
          <p>Name: ${name}</p>
          <p>Registration: ${reg}</p>
          <p>DOB: ${dob}</p>
          <p>Email: ${email}</p>
          <a href="/form">Add Another</a> | <a href="/">Home</a>
        `);
      }
    }
  );
});

// View all users
app.get('/users', (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.send("Error: " + err.message);
    } else {
      let html = '<h1>User Database</h1><table border="1"><tr><th>ID</th><th>Name</th><th>Reg#</th><th>DOB</th><th>Email</th></tr>';
      rows.forEach(row => {
        html += `<tr><td>${row.id}</td><td>${row.name}</td><td>${row.reg}</td><td>${row.dob}</td><td>${row.email}</td></tr>`;
      });
      html += '</table><br><a href="/">Home</a>';
      res.send(html);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});