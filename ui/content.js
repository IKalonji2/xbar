/**
* This function fetches API OHLC data (temp : Bitstamp)
* @param { string } pair - token (e.g btcusd)
* @param { number } interval - time or period
*/
async function fetchBitstampData(pair, interval) {
    const response = await fetch(`https://www.bitstamp.net/api/v2/ohlc/${pair}/?step=${interval}&limit=100`);
    const data = await response.json();
    return data.data.ohlc;
}

/**
* This function fetches API market cap and liquidity cap data (temp : CoinGecko)
*/
async function fetchCoinGeckoData() {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin');
    const data = await response.json();
    return {
        marketCap: data.market_data.market_cap.usd,
        liquidityCap: data.market_data.total_volume.usd
    };
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

/**
* This function generate the content for the card that is being added to the extension
* @param { element } targetElement - where the card will be placed in the dom
*/
async function addCustomCard(targetElement) {
    if (document.querySelector('.custom-card')) return;

    const card = document.createElement('div');
    card.className = 'custom-card';

    card.innerHTML = `
        <div class="card-content">
            <div id="chart-bg">
                <h3>Dex On X</h3>
                <div id="chart-container">
                    <canvas id="chart" width="400" height="200"></canvas>
                    <div id="y-axis"></div>
                    <div id="x-axis"></div>
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
                    <span class="form-label">Sell</span>
                    <div class="input-container">
                        <input type="text" placeholder="0" class="form__input" id="tokenAVal" />
                        <div id="tokenA" class="form-token">
                            tokenA
                        </div>
                    </div>
                </label>
            </div>
            <div class="form-group">
                <label class="input-label">
                    <span class="form-label">Buy</span>
                    <div class="input-container">
                        <input type="text" placeholder="0" class="form__input" id="tokenBVal" />
                        <div id="tokenB" class="form-token">
                            tokenB
                        </div>
                    </div>
                </label>
            </div>
            <div class="transact-container">
                <button class="transact">Swap</button>
            </div>
        </div>
    `;

    if (targetElement) {
        targetElement.parentNode.insertBefore(card, targetElement.nextSibling);
    }

    // Add CSS for the card
    const style = document.createElement('style');
    style.textContent = `
        .custom-card {
            border: 2.5px solid #050505;
            padding: 16px;
            margin: 16px 0;
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        #chart-container {
            position: relative;
            width: 410px;
            height: 200px;
            margin: 20px auto;
            
        }
        #chart-bg{
            background-color: #ddd;
            border: 1.5px solid #000;
            box-shadow: 1.5px 1.5px #000;
            padding-right: 20px;
        }
        #chart {
            border: 1px solid #000;
            margin-left: 60px; 
            margin-bottom: 50px;
            width: 330px;
            height: 150px;
        }
        #y-axis {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 50px;
            width: 60px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;
        }
        #y-axis .price-label {
            padding-right: 5px;
            font-size: 0.625rem;
        }
        #x-axis {
            position: absolute;
            left: 60px;
            right: 0;
            bottom: 0;
            height: 30px;
            display: flex;
            justify-content: space-between;
        }
        #x-axis .date-label {
            font-size: 0.625rem;
            text-align: center;
            transform: translateX(-50%);
        }
        h3 {
            display : flex;
            flex-direction : column;
            justify-content : center;
            align-items : center;
        }
        .form-group {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            background-color: #ddd;
            padding: 20px;
            border: 1.5px solid #000;
            box-shadow: 1.5px 1.5px #000;
            margin-bottom: 8px;
        }
        .input-label {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
        }

        .form-label {
            font-size: 0.625rem;
            margin-bottom: 5px;
            color: #555;
        }

        .input-container {
            display: flex;
            align-items: center;
            width: 100%;
        }

        .form__input {
            flex: 1;
            padding: 10px;
            border: 1px solid #000;
            font-size: 1rem;
            background-color: white;
        }

        .form-token {
            margin-left: 10px;
            font-size: 1rem;
            color: #555;
        }
        .transact{    
            display : flex;
            flex-direction : column;
            justify-content : center;
            align-items : center;

            background-color: #fc3aac;
            border: 2px solid black;

            padding: 5px;
            width:25%;
            box-shadow: 5px 5px #050505;
            margin-top: 10px;
        }
        .transact:hover{
    
            background-color: #ffff24;
        }
        .transact-container{
            display : flex;
            flex-direction : column;
            justify-content : center;
            align-items : center;
        }
        #market-data {
            margin-top: 10px;
            text-align: center;
            width: 100%
        }
        .inline { 
            display: inline-block; 
            margin:10px;

            border: 1.5px solid #000;
            padding-right: 5px;
            padding-left: 5px;

            background-color: #ffffff;
        }
    `;
    document.head.appendChild(style);

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
            priceLabel.textContent = price.toFixed(2);
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

        // const collectionDay = document.getElementById('chart-bg');
        // const markDay = document.createElement('div');
        // markDay.className = 'calender-day';
        // markDay.innerHTML = dateLabel;
        // collectionDay.appendChild(markDay);

    
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
}

// Function to observe and add the card
function observeAndAddCard() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const firstTweet = document.querySelector('div[data-testid="cellInnerDiv"] article');
            if (firstTweet) {
                addCustomCard(firstTweet);
                observer.disconnect();  
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    setTimeout(() => {
        const firstTweet = document.querySelector('div[data-testid="cellInnerDiv"] article');
        if (firstTweet) {
            addCustomCard(firstTweet);
        }
    }, 3000);
}

window.addEventListener('load', observeAndAddCard);
