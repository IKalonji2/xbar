# xbar

## XBAR is an embedded dex on X, that allows any user that has the browser extension to launch or trade a token pair based on the unique identifier that is added to a twitter post.

### Design:
- The Design: [Canva](https://www.canva.com/design/DAGNkfNizzE/qRpThh7ZfYnDRnHE2wHC2w/view?utm_content=DAGNkfNizzE&utm_campaign=designshare&utm_medium=link&utm_source=editor)

### Tech Stack
- HTML
- JS
- CSS
- Hedera Token Service
- sqlite

### Track
- DeFi
- Hashgraph Trailblazers

### Demo
- Loom: [Video](https://www.loom.com/share/72ec89dc5725425489cf7ef143a7339d?sid=82b24a64-2a8e-4afe-bb8b-0632d0fb5870)

### Features
- **In-Post Token Trading:** Trade tokens directly within a tweet.
- **Hedera Integration:** Low-cost, fast transactions.
- **Simple and Intuitive UI:** Lightweight design that blends into the Twitter experience.

### How to Install the Extension (Source Code)

Since the extension is not yet deployed to the Chrome Store, follow these steps to install it manually from the source code:

#### Prerequisites
- Ensure you have Google Chrome installed.

### Installation Steps
1. **Download the Source Code:**
   - Clone or download the project repository to your local machine.

   ```bash
   git clone https://github.com/IKalonji2/xbar.git
   ```
2. **Enable Developer Mode in Chrome:**

   - Open Chrome and navigate to chrome://extensions/
   - Toggle the “Developer mode” switch on (located at the top right of the page).

3. Load the Unpacked Extension:

   - Click the "Load unpacked" button.
   - Select the folder containing the source code.

4. Activate the Extension:

   - Once loaded, you’ll see the extension icon in your Chrome toolbar.
   - Click the icon to confirm the extension is active.

### Usage Instructions

1. Log in to your Twitter account.
2. Navigate to the demo test handle [XBAR_TEST_HANDLE_ON_X](https://x.com/xbartest) tweet, ensure the extension is active.
3. Scroll through the tweets and notice the injected DEX
3. Use the embedded “Launch Token” or “SWAP” buttons within the tweet to interact with the DEX.
4. Connect your wallet when prompted for transactions (Hedera-compatible wallets) - This feature is not enabled for the submission for security reasons, for now an embedded wallet is created in the extension and preloaded with test hbar for testing and signing.

### User stories.

#### Launch token:
- The extension should inject where it finds the following identifier in the post: chain/xbar/v1/launch/token
- The user is required to provide the: token name, symbol, supply, upload logo and liquidity amount.
- Users should be able to connect to metamask and execute the transaction by paying the fee.
- the unique trading swap identifier should then be displayed in an alert so the user can start posting the swap on their feed.

#### Swap token:
- The extension should inject where it finds the following identifier in the post: chain/xbar/v1/swap/{name of base token e.g. TokenA}/{name of token that was created e.g. TokenB}
- The chart of trading history should be displayed based on data received from the API
- the market cap and liquidity amounts should be provided to the user
- the user should be able to stipulate how much of token A they would like to swap, the number of token B they receive should be calculated based on the price of TokenA vs TokenB.
- The user should connect their wallet and execute the trade and pay the fee.

### create wallet

- Create a cryto-wallet ui on the extension keeping the retro box theme
- User should be able to sign up for the cryto-wallet account
- User should be able to download an extesion.
- The injection of the extension card should only happen when the user has the account with xBar, otherwise a link to the webpage where the account can be created or the wallet can be downloaded will be shared. 

## License
- LiddX Labs
