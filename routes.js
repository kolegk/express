"use strict";

const express = require("express");

const routes = express.Router();

const cartItems = [
  {
    id: 1,
    product: "air pods",
    price: 150,
    quantitiy: 1,
  },
  {
    id: 2,
    product: "macbook",
    price: 900,
    quantitiy: 2,
  },
  {
    id: 3,
    product: "iphone",
    price: 600,
    quantitiy: 3,
  },
  {
    id: 2,
    product: "apple watch",
    price: 150,
    quantitiy: 4,
  },
];

let nextId = 5;

routes.get("/cartItems", (req, res) => {
  let filteredCartItems = cartItems;
  let maxPrice = req.query.maxPrice;
  let preFix = req.query.preFix;
  let pageSize = req.query.pageSize;
  if (maxPrice)
    filteredCartItems = filteredCartItems.filter((item) => {
      return item.price <= parseInt(maxPrice);
    });
  if (preFix)
    filteredCartItems = filteredCartItems.filter((item) => {
      return item.product.toLowerCase().includes(preFix.toLowerCase().trim());
    });
  if (pageSize) {
    filteredCartItems = filteredCartItems.slice(0, parceInt(pageSize));
  }
  res.json(filteredCartItems);
});

routes.get("/cartItems/:id", (req, res) => {
  let id = req.params.id;
  let foundCartItems = cartItems.find((item) => {
    return item.id === parseInt(id);
  });
  if (foundCartItems) {
    res.status(200);
    // res.send(`ok`);
    res.jason(foundCartItems);
  } else {
    res.send(`No items with id ${id}`);
    res.status(404);
  }
});

routes.post("/cartItems", (req, res) => {
  let cartItem = req.body;
  cartItem.id = nextId++;
  cartItems.push(cartItem);
  res.status(201);
  res.json(cartItem);
});

routes.put("/cartItems/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let updateCartItem = req.body;
  updateCartItem.id = id;
  let index = cartItems.findIndex((item) => {
    return item.id === id;
  });
  if (index === -1) {
    res.status(404);
    res.send(`No cart items found with id ${id}`);
  } else {
    cartItems[index] = updateCartItem;
    res.json(updateCartItem);
  }
});

routes.delete("/cartItems/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let index = cartItems.findIndex((item) => {
    return item.id === id;
  });
  if (index === -1) {
    res.status(404);
    res.send(`No cart items found with id ${id}`);
  } else {
    movies.splice(index, 1);
    res.sendStatus(204);
  }
});

module.exports = routes;
