import express from "express";

const router = express.Router();

router.get("/send", (req, res) => {
  res.send("Message Send Route");
});

router.get("/receive", (req, res) => {
  res.send("Message Receive Route");
});

export default router;
