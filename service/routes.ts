import express from "express";
import { createWallet, createToken } from "./hederaService";
import { calculatePrice, getMarketCap } from "./bondingCurve";

const router = express.Router();

router.post("/create-wallet", async (req, res) => {
  const wallet = await createWallet();
  res.json(wallet);
});

router.post("/create-token", async (req, res) => {
  const { name, symbol } = req.body;
  const tokenId = await createToken(name, symbol);
  res.json({ tokenId });
});

router.post("/swap-hbar-to-token", (req, res) => {
  // Implement swap logic
  res.json({ success: true });
});

router.post("/swap-token-to-hbar", (req, res) => {
  // Implement swap logic
  res.json({ success: true });
});

router.get("/get-marketcap/:tokenId", (req, res) => {
  const supply = 1000; // Placeholder for actual supply
  const marketCap = getMarketCap(supply);
  res.json({ marketCap });
});

export default router;
