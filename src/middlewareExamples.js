const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware with different routes
// app.use("/", (req, res, next) => {
//     next();
//     res.send("Route handler for /");
// });
// app.use("/user", (req, res) => {
//     res.send("Route handler for /user12");
// });

//Middleware with single route handler

// app.use(
//   "/route",
//   (req, res, next) => {
//     next();
//     res.send("Route handler for /route");
//   },
//   [
//     (req, res, next) => {
//       console.log("Middleware 1 executed");
//       next();
//       res.send("Route handler for /route123");
//     },
//     (req, res, next) => {
//         console.log("Middleware 2 executed");
//       next();
//       res.send("Route handler for /route1234");
//     },
//   ],
// );

//middleware with multiple route handlers

const { adminAuth, userAuth } = require("../middleeWare/auth.js");

app.use("/admin", adminAuth);
app.use("/user", userAuth, (req, res) => {
  res.send("Route handler for /user");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
