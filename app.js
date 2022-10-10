let searchBar = document.querySelector("#search-bar");
let resultCard = document.querySelector(".result-card");
let defaultResultsMsg = document.querySelector(".default-results-msg");
let resultName = document.querySelector(".name");
let resultSymbol = document.querySelector(".symbol");
let resultPrice = document.querySelector(".price");
let resultMarketCap = document.querySelector(".market-cap");
let resultSupply = document.querySelector(".supply");
let savedItems = document.querySelector(".saved");

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
    resultName.innerHTML = searchResult.data.name;
    resultSymbol.innerHTML = searchResult.data.symbol;
    resultPrice.innerHTML = searchResult.data.priceUsd;
    resultMarketCap.innerHTML = searchResult.data.marketCapUsd;
    resultSupply.innerHTML = searchResult.data.supply;

    let newResultCard = document.querySelector(".result-card");
    saveResult(newResultCard);
}

function saveResult(saveResult) {
    let newSave = document.createElement("div");
    newSave.classList.add("result-card");
    newSave.innerHTML = saveResult.innerHTML;
    savedItems.append(newSave);
}