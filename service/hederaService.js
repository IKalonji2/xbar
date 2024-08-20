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
exports.createToken = exports.createWallet = void 0;
const sdk_1 = require("@hashgraph/sdk");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = sdk_1.Client.forTestnet();
client.setOperator(sdk_1.AccountId.fromString(process.env.HEDERA_TESTNET_ACCOUNT_ID), sdk_1.PrivateKey.fromString(process.env.HEDERA_TESTNET_PRIVATE_KEY));
const createWallet = () => __awaiter(void 0, void 0, void 0, function* () {
    const privateKey = sdk_1.PrivateKey.generate();
    const publicKey = privateKey.publicKey;
    const transaction = new sdk_1.AccountCreateTransaction()
        .setKey(publicKey)
        .setInitialBalance(new sdk_1.Hbar(10));
    const response = yield transaction.execute(client);
    const receipt = yield response.getReceipt(client);
    const newAccountId = receipt.accountId;
    return { accountId: newAccountId === null || newAccountId === void 0 ? void 0 : newAccountId.toString(), privateKey: privateKey.toString() };
});
exports.createWallet = createWallet;
const createToken = (name, symbol) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = new sdk_1.TokenCreateTransaction()
        .setTokenName(name)
        .setTokenSymbol(symbol)
        .setTreasuryAccountId(sdk_1.AccountId.fromString(process.env.HEDERA_TESTNET_ACCOUNT_ID))
        .setInitialSupply(0)
        .setDecimals(2);
    const response = yield transaction.execute(client);
    const receipt = yield response.getReceipt(client);
    const tokenId = receipt.tokenId;
    return tokenId === null || tokenId === void 0 ? void 0 : tokenId.toString();
});
exports.createToken = createToken;

