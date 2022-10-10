let searchBar = document.querySelector("#search-bar");
let resultCard = document.querySelector(".result-card");
let defaultResultsMsg = document.querySelector(".default-results-msg");
let resultName = document.querySelector(".name");
let resultSymbol = document.querySelector(".symbol");
let resultPrice = document.querySelector(".price");
let resultMarketCap = document.querySelector(".market-cap");
let resultSupply = document.querySelector(".supply");

resultCard.style.display = "none";

async function search() {
    try {
        let searchValue = searchBar.value;
        let response = await fetch(`https://api.coincap.io/v2/assets/${searchValue}`);
        let asset = await response.json();
        generateCard(asset);
        resultCard.style.display = "block";
        defaultResultsMsg.style.display = "none";
    }
    catch {
        console.error(error);
    }
}

function generateCard(searchResult) {
    let cardData = {
        name: searchResult.data.name,
        symbol: searchResult.data.symbol,
        priceUSD: searchResult.data.priceUsd,
        marketCap: searchResult.data.marketCapUsd,
        supply: searchResult.data.supply
    };
    /* console.log(cardData); */
    resultName.innerHTML = cardData.name;
    resultSymbol.innerHTML = cardData.symbol;
    resultPrice.innerHTML = cardData.priceUSD;
    resultMarketCap.innerHTML = cardData.marketCap;
    resultSupply.innerHTML = cardData.supply;
}