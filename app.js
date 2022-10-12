let searchBar = document.querySelector("#search-bar");
let searchBtn = document.querySelector("#search-btn")
let results = document.querySelector(".results");
let resultCard = document.querySelector(".result-card");
let resultsMsg = document.querySelector(".results-msg");
let defaultResultMsg = "Searched crypto currencies will display here";
let resultName = document.querySelector(".name");
let resultSymbol = document.querySelector(".symbol");
let resultPrice = document.querySelector(".price");
let resultMarketCap = document.querySelector(".market-cap");
let resultSupply = document.querySelector(".supply");
let savedItems = document.querySelector(".saved");
let saveMsg = document.querySelector(".save-msg");
let defaultSaveMsg = "Saved crypto currencies will display here";

/* functionality left add:
remove saved items
refresh saved items data
show timestamp on the saved items 
pull in images for the coin icons
update the number of items saved qty*/

let searchedData = {
    name: '',
    symbol: '',
    price: '',
    marketCap: '',
    supply: '',
    id: ''
}

resultsMsg.innerHTML = defaultResultMsg;
saveMsg.innerHTML = defaultSaveMsg;

async function search() {
    try {
        let searchValue = searchBar.value;
        let response = await fetch(`https://api.coincap.io/v2/assets/${searchValue}`);
        let asset = await response.json();
        if (asset.error === `${searchValue} not found`) {
            let msgText = `${searchValue} not found`; 
            resultsMsg.innerHTML = msgText;
            results.innerHTML = "";
            searchBar.value = "";
            console.log(`${searchValue} not found`);
        } else {
            searchedData.name = asset.data.name;
            searchedData.symbol = asset.data.symbol;
            searchedData.price = asset.data.priceUsd;
            searchedData.marketCap = asset.data.marketCapUsd;
            searchedData.supply = asset.data.supply;
            searchedData.id = asset.data.id;
            const searchContent = `
                <div class="result-card">
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
                    <button class="save-btn" onclick="save()">Save</button>
                </div>
                </div>
            `;
            resultsMsg.innerHTML = `${searchedData.name} Data`;
            searchBar.value = "";
            results.innerHTML = searchContent;
    }
        }
    catch {
        console.error(error);
    }
}

searchBar.addEventListener("keyup", () => {
    if (results.innerHTML != "" && searchBar.value != "") {
        results.innerHTML = "";
        resultsMsg.innerHTML = defaultResultMsg;
    } else {
        return;
    }
})

if (results.innerHTML != "" && searchBar.value != "") {
    results.innerHTML = "";
}

searchBar.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        search();
    }
    return
  });


function save() {
    const savedContent = `
            <div class="result-card" id="${searchedData.id}">
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
                <button class="save-btn-${searchedData.id}" onclick="remove(${searchedData.id})">Remove</button>
            </div>
            </div>
        `;
    savedItems.innerHTML += savedContent;
    resultsMsg.innerHTML = defaultResultMsg;
    results.innerHTML = "";
    saveMsg.innerHTML = "";
/*     document.getElementsByClassName(`save-btn-${searchedData.id}`).addEventListener("click", function() {
        remove(searchedData.id);
    }); */
}

function remove(id) {
    console.log(id);
    let toRemove = document.getElementById(id);
    toRemove.remove();
}