const swapID = 'chain/xbar/v1/swap/tokenA/tokenB';
const launchID = 'chain/xbar/v1/launch/token';

let getTokenNames = swapID.split('/');

let postID;

let xbarUrl = '';


/**
* This function fetches API OHLC data (temp : Bitstamp)
* @param { string } pair - token (e.g btcusd)
* @param { number } interval - time or period
*/
async function fetchBitstampData(pair, interval) {
    try {
        const response = await fetch(`https://www.bitstamp.net/api/v2/ohlc/${pair}/?step=${interval}&limit=100`);
        const data = await response.json();
        return data.data.ohlc;
    } catch (error) {
        console.error('Error fetching Bitstamp data:', error);
    }
}

/**
* This function fetches API market cap and liquidity cap data (temp : CoinGecko)
*/
async function fetchCoinGeckoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin');
        const data = await response.json();
        return {
            marketCap: data.market_data.market_cap.usd,
            liquidityCap: data.market_data.total_volume.usd
        };
    } catch (error) {
        console.error('Error fetching CoinGecko data:', error);
    }
}

/**
* This function transforms raw OHLC data
* @param { object } data - data 
*/
function transformData(data) {
    return data.map(item => ({
        timestamp: new Date(item.timestamp * 1000),
        open: parseFloat(item.open),
        high: parseFloat(item.high),
        low: parseFloat(item.low),
        close: parseFloat(item.close),
    }));
}

function checkPostsForStrings() {
    const posts = document.querySelectorAll('article');
    
    posts.forEach(post => {
        if (post.innerText.includes(swapID)) {
            if (!post.querySelector('.swap-card')) {
                swapOnXCard(post);
            }
        }
        if (post.innerText.includes(launchID)) {
            if (!post.querySelector('.launch-card')) {
                launchOnXCard(post);
            }
        }
    });
}

/**
* This function generate the content for the card that is being added to the extension
* @param { element } targetElement - where the card will be placed in the dom
*/
async function swapOnXCard(targetElement) {
    if (document.querySelector('.swap-card')) return;

    const card = document.createElement('div');
    card.className = 'swap-card';

    const logo = document.createElement('img');
    logo.className = 'xLogo';
    logo.src = chrome.runtime.getURL('../src/assets/xBarLogo.png');
    logo.alt = "xBar logo";
    
    card.innerHTML =  `
    <div class="card-content">
        <div id="title-container"></div>
        <div id="chart-bg">
            <div id="chart-container">
                <canvas id="chart" width="400" height="200"></canvas>
                <div id="y-axis">
                    <div id="y-price-label" class="price-label"></div>
                </div>
                <div id="x-axis">
                    <div id="x-date-label" class="date-label"></div>
                </div>
            </div>
        </div>
        
        <div id="market-data">
            <div class="inline">
                <p>Market Cap</p>
                <span id="market-cap">$0</span>
            </div>
            <div class="inline">
                <p>Liquidity Cap</p>
                <span id="liquidity-cap">$0</span>
            </div>
        </div>
        <div class="form-group">
            <label class="input-label">
                <span class="form-label">Swap</span>
                <div class="input-container">
                    <input type="text" placeholder="0" class="form__input" id="tokenAVal" />
                    <div id="tokenA" class="form-token">
                        ${getTokenNames.at(-2)}
                    </div>
                </div>
            </label>
            <span class="error-message" id="token-a"></span>

        </div>
        <div class="form-group">
            <label class="input-label">
                <span class="form-label">Receive</span>
                <div class="input-container">
                    <input type="text" class="form__input" id="tokenBVal" value="" readonly />
                    <div id="tokenB" class="form-token">
                        ${getTokenNames.at(-1)}
                    </div>
                </div>
            </label>
            <span class="error-message" id="token-b"></span>
        </div>
        <div class="transact-container">
            <button id="swap" class="transact">Swap</button>
        </div>
    </div>`

    const titleContent = card.querySelector('#title-container');
    
    if (titleContent) {
        titleContent.appendChild(logo);
    } else {
        console.error('title-container not found in the card');
    }


    if (targetElement) {
        targetElement.parentNode.insertBefore(card, targetElement.nextSibling);
    }

    
    // Fetch and render chart and market data
    async function renderChart() {
        const rawData = await fetchBitstampData('btcusd', 3600); 
        const chartData = transformData(rawData);


        const now = Math.floor(Date.now() / 1000);
        const eightHoursAgo = now - (8 * 3600);
        const recentData = chartData.filter(d => d.timestamp.getTime() / 1000 >= eightHoursAgo);

        const chart = document.getElementById('chart');
        const ctx = chart.getContext('2d');
        const chartWidth = chart.width;
        const chartHeight = chart.height;
        const candleWidth = 20;
        const candleSpacing = (chartWidth - recentData.length * candleWidth) / (recentData.length - 1);

        const maxPrice = Math.max(...recentData.flatMap(d => [d.high]));
        const minPrice = Math.min(...recentData.flatMap(d => [d.low]));
        const priceRange = maxPrice - minPrice;

        ctx.clearRect(0, 0, chartWidth, chartHeight);

    
        const yAxis = document.getElementById('y-axis');
        yAxis.innerHTML = '';
        for (let i = 0; i <= 5; i++) {
            const price = minPrice + (priceRange * i / 5);
            const priceLabel = document.createElement('div');
            priceLabel.className = 'price-label';
            priceLabel.innerHTML = price.toFixed(2);
            priceLabel.style.bottom = `${(i / 5) * 100}%`;
            yAxis.appendChild(priceLabel);
        }


        const xAxis = document.getElementById('x-axis');
        xAxis.innerHTML = '';
        // let date = '';
        // let dateLabel = '';
        recentData.forEach((d, i) => {
            // date = new Date(d.timestamp * 1000);
            // dateLabel = date.toLocaleDateString();
            const time = d.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const labelContainer = document.createElement('div');
            labelContainer.className = 'date-label';
            labelContainer.innerHTML = time;
            labelContainer.style.left = `${i * (candleWidth + candleSpacing) + candleWidth / 2}px`;
            xAxis.appendChild(labelContainer);
        });
    
        recentData.forEach((d, i) => {
            const x = i * (candleWidth + candleSpacing);
            const candleY = chartHeight - (Math.max(d.close, d.open) - minPrice) / priceRange * chartHeight;
            const candleHeight = Math.abs(d.close - d.open) / priceRange * chartHeight;
            
            const color = d.close > d.open ? '#00b300' : '#ff3300';
            ctx.fillStyle = color;
            ctx.fillRect(x, candleY, candleWidth, candleHeight);

            const wickY1 = chartHeight - (d.high - minPrice) / priceRange * chartHeight;
            const wickY2 = chartHeight - (d.low - minPrice) / priceRange * chartHeight;
            ctx.fillRect(x + candleWidth / 2 - 1, wickY1, 2, wickY2 - wickY1);
        });
    }

    async function renderMarketData() {
        const { marketCap, liquidityCap } = await fetchCoinGeckoData();
        document.getElementById('market-cap').textContent = `$${marketCap.toLocaleString()}`;
        document.getElementById('liquidity-cap').textContent = `$${liquidityCap.toLocaleString()}`;
    }

    await renderChart();
    await renderMarketData();
    simpleCal();
    swapToken();
}

async function launchOnXCard(targetElement) {
    if (document.querySelector('.launch-card')) return;

    const card = document.createElement('div');
    card.className = 'launch-card';
    
    const logo = document.createElement('img');
    logo.className = 'xLogo';
    logo.src = chrome.runtime.getURL('../src/assets/xBarLogo.png');
    logo.alt = "xBar logo";
    
    card.innerHTML = `
     <div class="card-content">
        <div id="title-container">
        </div>
        <div class="form-group">
            <label class="input-label">
                <div class="input-container">
                    <input type="text" placeholder="x-token" class="form__input" id="x-token"/>
                    <div id="xToken" class="form-token">
                        Token Name
                    </div>
                </div>
            </label>
            <span class="error-message" id="req-token-name"></span>
        </div>
        <div class="form-group">
            <label class="input-label">
                <div class="input-container">
                    <input type="text" placeholder="x-token-symbol" class="form__input" id="x-token-symbol"/>
                    <div id="xTokenSymbol" class="form-token">
                        Token Symbol
                    </div>
                </div>
            </label>
            <span class="error-message" id="req-token-symbol"></span>
        </div>
        <div class="form-group">
            <label class="input-label">
                <div class="input-container">
                    <input type="text" placeholder="0" class="form__input" id="supply"/>
                    <div id="xTokenSupply" class="form-token">
                        Supply
                    </div>
                </div>
            </label>
            <span class="error-message" id="req-supply"></span>
        </div>
        <div class="form-group">
            <label class="input-label">
                <div class="input-container">
                    <input type="text" placeholder="x-png" class="form__input" id="x-png" accept="image/*"/>
                    <div id="xPng" class="form-token">
                        Upload Logo
                    </div>
                </div>
            </label>
            <span class="error-message" id="req-token-icon"></span>
        </div>
        <div class="transact-container">
            <button id="launch" class="transact">Launch</button>
        </div>
    </div>`;

    const titleContent = card.querySelector('#title-container');
    
    if (titleContent) {
        titleContent.appendChild(logo);
    } else {
        console.error('title-container not found in the card');
    }

    if (targetElement) {
        targetElement.parentNode.insertBefore(card, targetElement.nextSibling);
    } else {
        console.error('Target element not provided');
    }
    launchToken();
}

function simpleCal() {
    const tokenA = document.getElementById('tokenAVal');
    const tokenB = document.getElementById('tokenBVal');
    const swapButton = document.getElementById('swap');

    function calculateAndSet() {
        const aValue = parseFloat(tokenA.value);
        if (!isNaN(aValue)) {
            tokenB.value = aValue * 1500;
        } else {
            tokenB.value = '';
            console.error('Input is not a valid number');
        }
    }

    if (swapButton) {
        swapButton.addEventListener('click', calculateAndSet);
    } else {
        console.error('Swap button not found');
    }

    if (tokenA && tokenB) {
        tokenA.addEventListener('input', calculateAndSet);

        tokenA.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                calculateAndSet();
                tokenA.blur();
            }
        });

        tokenA.addEventListener('focusout', calculateAndSet);
    } else {
        console.error('Elements not found');
    }
};


function launchToken() {
    const launch = document.getElementById('launch');
    launch.addEventListener('click',function( event) {
        event.preventDefault();
        console.log('You have hit launch');

        const apiUrl = xbarUrl+'/launch';

        const tokenVal = document.getElementById('tokenAVal').value.trim();
        const file = tokenIcon.files[0];
        if (!file) {
            alert('Please select a file.');
            return;
        }
        const dataToSend = {
            'token name': 'value1',
            'token symbol': 'value2',
            'supply' : 'value3',
            'file' : file
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data successfully sent:', data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    });
}

function swapToken() {
    const swap = document.getElementById('swap');
    swap.addEventListener('click',function( event) {
        event.preventDefault();
        console.log('You have hit swap');

        let isValid = true;

        const apiUrl = xbarUrl+'/swap';

        const tokenVal = document.getElementById('tokenAVal');

        clearErrors();

        if (tokenVal === '') {
            showError('token-a','required')
            isValid = false;
        }
        const dataToSend = {
            'swap': 'value1',
            'receive': 'value2',
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data successfully sent:', data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    });
}
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.color = 'red';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.textContent = '');
}

function observeAndAddCard() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            checkPostsForStrings();
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    setTimeout(() => {
        checkPostsForStrings();
    }, 3000);
}

function setupEventListeners() {
    window.addEventListener('load', observeAndAddCard);
    window.addEventListener('scroll', observeAndAddCard);
    document.addEventListener('click', observeAndAddCard);
    
}

setupEventListeners();
