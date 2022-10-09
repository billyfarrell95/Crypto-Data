let searchBar = document.querySelector("#search-bar");
let resultCard = document.querySelector(".results");
let resultName = document.querySelector("")

async function search() {
    try {
        let searchValue = searchBar.value;
        let response = await fetch(`https://api.coincap.io/v2/assets/${searchValue}`);
        let asset = await response.json();
        generateCard(asset);
    }
    catch {
        console.error(error);
    }
}


function generateCard(searchResult) {
    let cardData = {
        name: searchResult.data.name,
        symbol: searchResult.data.symbol,
        priceUSD: searchResult.data.priceUSD,
        marketCap: searchResult.data.marketCapUsd,
        supply: searchResult.data.supply
    };
}