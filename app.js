let searchBar = document.querySelector("#search-bar");
let results = document.querySelector(".results");
let resultCard = document.querySelector(".result-card");
let defaultResultsMsg = document.querySelector(".default-results-msg");
let resultName = document.querySelector(".name");
let resultSymbol = document.querySelector(".symbol");
let resultPrice = document.querySelector(".price");
let resultMarketCap = document.querySelector(".market-cap");
let resultSupply = document.querySelector(".supply");
let savedItems = document.querySelector(".saved");

let searchedData = {
    name: '',
    symbol: '',
    price: '',
    marketCap: '',
    supply: ''
}

// Create dynamic search result card

const card = document.createElement("div");
card.classList = "result-card";

// append search result card to container

/* results.innerHTML += cardContent; */

async function search() {
    try {
        let searchValue = searchBar.value;
        let response = await fetch(`https://api.coincap.io/v2/assets/${searchValue}`);
        let asset = await response.json();
        searchedData.name = asset.data.name;
        searchedData.symbol = asset.data.symbol;
        searchedData.price = asset.data.priceUsd;
        searchedData.marketCap = asset.data.marketCapUsd;
        searchedData.supply = asset.data.supply;
        const cardContent = `
            <div class="info">
                <div class="card-title">
                    <img src=".">
                    <div>
                        <p class="name">${searchedData.name}</p>
                        <p class="symbol">${searchedData.symbol}</p>
                    </div>
                </div>
                <p><b>Price:</b> <span class="price">${searchedData.price}</span></p>
                <p><b>Market Cap:</b> <span class="market-cap">${searchedData.marketCap}</span></p>
                <p><b>Supply:</b> <span class="supply">${searchedData.supply}</span></p>
            </div>
            <div class="links">
                <button class="save-btn" onclick="saveItem()">Save</button>
            </div>
        `;
        results.innerHTML += cardContent;
        /* generateCard(asset); */
    }
    catch {
        console.error(error);
    }
}

/* function generateCard(result) {
    results.innerHTML += cardContent;
} */