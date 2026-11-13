const app = require("express")();
const port = process.env.PORT || 3000;
const express = require("express");
const userModal = require("./src/models/user");
const connectDb = require("./database.Js");
const bcrypt = require("bcrypt");

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });
app.use(express.json());

// app.post("/signup", async (req, res) => {
//   try {
//     console.log(req.body);
//     const user = new userModal(req.body);
//     const savedUser = await user.save();
//     res.status(201).json(savedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

const userData = {
  first_name: "John",
  last_name: "Doe",
  company: "ABC Corp",
  graduation_year: 2020,
  email: "sund@gmail.com",
};

app.post("/signup", async (req, res) => {
  try {
    console.log(userData);
    const user = new userModal(userData);
    const savedUser = await user.save();
    res.send("User created successfully");
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await userModal.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/users", async (req, res) => {
  try {
    const userId = req.body.id;
    // const user= await userModal.findByIdAndDelete({_id: userId});
    const user = await userModal.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch("/user", async (req, res) => {
  try {
    const userId = req.body.id;
    const updatedUser = await userModal.findByIdAndUpdate(userId, req.body, {
      returnDocument: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send("User updated successfully");
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.send("User not found");
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      return res.send("Invalid password");
    }
    res.send("Login successful");
    res.status(200).json(user);
  } catch (error) {
    throw new Error(error.message);
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { password } = req.body;

    //encrypt password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hashSync(password, saltRounds);
    const user = new userModal({
      ...req.body,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    return res.send("User created successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// connectDb()
//   .then(() => {
//     console.log("Database connected successfully");
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Error connecting to the database:", error);
//   });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

console.log(userModal);
