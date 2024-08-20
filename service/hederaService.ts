import { Client, AccountId, PrivateKey, AccountCreateTransaction, Hbar, TokenCreateTransaction } from "@hashgraph/sdk";
import dotenv from "dotenv";

dotenv.config();

const client = Client.forTestnet();
client.setOperator(
  AccountId.fromString(process.env.HEDERA_TESTNET_ACCOUNT_ID!),
  PrivateKey.fromString(process.env.HEDERA_TESTNET_PRIVATE_KEY!)
);

export const createWallet = async () => {
  const privateKey = PrivateKey.generate();
  const publicKey = privateKey.publicKey;
  
  const transaction = new AccountCreateTransaction()
    .setKey(publicKey)
    .setInitialBalance(new Hbar(10));
  
  const response = await transaction.execute(client);
  const receipt = await response.getReceipt(client);
  const newAccountId = receipt.accountId;

  return { accountId: newAccountId?.toString(), privateKey: privateKey.toString() };
};

export const createToken = async (name: string, symbol: string) => {
  const transaction = new TokenCreateTransaction()
    .setTokenName(name)
    .setTokenSymbol(symbol)
    .setTreasuryAccountId(AccountId.fromString(process.env.HEDERA_TESTNET_ACCOUNT_ID!))
    .setInitialSupply(0)
    .setDecimals(2);
  
  const response = await transaction.execute(client);
  const receipt = await response.getReceipt(client);
  const tokenId = receipt.tokenId;

  return tokenId?.toString();
};


