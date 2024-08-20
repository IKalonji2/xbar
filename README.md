# xbar

## xbar is an embedded dex on X, that allows any user that has the browser extension to launch or trade a token pair based on the unique identifier that is added to a twitter post.

### Design:
- The Design: [Canva](https://www.canva.com/design/DAGNkfNizzE/qRpThh7ZfYnDRnHE2wHC2w/view?utm_content=DAGNkfNizzE&utm_campaign=designshare&utm_medium=link&utm_source=editor)

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
