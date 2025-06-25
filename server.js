const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;



app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
