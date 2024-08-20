"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hederaService_1 = require("./hederaService");
const bondingCurve_1 = require("./bondingCurve");
const router = express_1.default.Router();
router.post("/create-wallet", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield (0, hederaService_1.createWallet)();
    res.json(wallet);
}));
router.post("/create-token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, symbol } = req.body;
    const tokenId = yield (0, hederaService_1.createToken)(name, symbol);
    res.json({ tokenId });
}));
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
    const marketCap = (0, bondingCurve_1.getMarketCap)(supply);
    res.json({ marketCap });
});
exports.default = router;
