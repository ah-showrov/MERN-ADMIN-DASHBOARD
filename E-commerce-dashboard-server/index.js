const express = require("express");
require("./db/config");
const cors = require("cors");
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");
const { response } = require("express");
const jwtKey = "e-commerce";

const app = express();

// middle ware.....................

app.use(express.json());
app.use(cors());

// Register Route..................

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({
        result: "something went wrong,Please try after sometime",
      });
    }
    res.send({ result, auth: token });
  });
});

// Login Route......................

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    const user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({
            result: "something went wrong,Please try after sometime",
          });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
});

// Add Product Route..................

app.post("/add-product", VerifyToken, async (req, res) => {
  const product = await new Product(req.body);
  const result = await product.save();
  res.send(result);
});

// Get Products Route..................

app.get("/products", VerifyToken, async (req, res) => {
  const products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Products Found" });
  }
});

// Delete Product Route..................

app.delete("/product/:id", VerifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

// Get Single Product Route................

app.get("/product/:id", VerifyToken, async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No record found." });
  }
});

// Update Single Product..................

app.put("/product/:id", VerifyToken, async (req, res) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

// Search Products Route..................

app.get("/search/:key", VerifyToken, async (req, res) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

// JWT Verification middleware function........

function VerifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        response.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add token with header" });
  }
}

app.listen(5000);
