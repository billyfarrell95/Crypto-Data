let searchBar = document.querySelector("#search-bar");
let body = document.body;

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
    let name = searchResult.data.name;
    let symbol = searchResult.data.symbol;
    let priceUSD = searchResult.data.priceUSD;
    let marketCap = searchResult.data.marketCapUsd;
    let supply = searchResult.data.supply;
    console.log(marketCap);
    console.log(searchResult)
}

// https://cryptoicons.org/