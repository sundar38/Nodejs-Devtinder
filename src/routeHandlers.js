const express = require("express");
const app = express();
const port = process.env.PORT || 3000;


app.post("/user", (req, res) => {
  res.send("Route handler for POST /user");
});



app.use("/route", (req, res) => {
  res.send("Route handler for /route");
});

app.use("/route/123", (req, res) => {
  res.send("Route handler for /route/123");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
