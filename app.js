let searchBar = document.querySelector("#search-bar");
let searchBtn = document.querySelector("#search-btn");
let clearBtn = document.querySelector("#clear-btn");
let refreshBtn = document.querySelector("#refresh-btn");
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
let saveQty = document.getElementById("saved-qty");
let saveQtyValue = 0;


/* functionality left add:
refresh saved items data
show timestamp on the saved items 
ability to search coin symbols e.g. BTC*/

let searchedData = {
    name: '',
    symbol: '',
    price: '',
    marketCap: '',
    supply: '',
    id: '',
    timestamp: ''
}

let savedList = [];

// default states
resultsMsg.innerText = defaultResultMsg;
saveMsg.innerText = defaultSaveMsg;
clearBtn.disabled = true;

// pull searched crypto currency data and display it
async function search() {
    try {
        let inputValue = searchBar.value;
        //adds dashed in between multi-name currencies
        let searchValue = inputValue.split(" ").join("-").toLowerCase();
        let response = await fetch(`https://api.coincap.io/v2/assets/${searchValue}`);
        let asset = await response.json();
        if (asset.error === `${searchValue} not found`) {
            // remove hyphens from "asset not found message"
            let msgText = `${searchValue.replace(/-/g," ")} not found`; 
            resultsMsg.innerText = msgText;
            results.innerText = "";
            searchBar.value = "";
            console.log(`${searchValue} not found`);
        } else if (inputValue === "") {
            resultsMsg.innerText = "Enter a currency name"
        }
        else {
            resultsMsg.innerText = defaultResultMsg;
            searchedData.name = asset.data.name;
            searchedData.symbol = asset.data.symbol;
            searchedData.price = asset.data.priceUsd;
            searchedData.marketCap = asset.data.marketCapUsd;
            searchedData.supply = asset.data.supply;
            searchedData.id = asset.data.id;
            const searchContent = `
                <div class="result-card" id="${searchedData.id}">
                <div class="info">
                    <div class="card-title">
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
                    <button class="btn" onclick="save()">Save</button>
                </div>
                </div>
            `;
            resultsMsg.innerText = `${searchedData.name} Data`;
            searchBar.value = "";
            results.innerHTML = searchContent;
    }
        }
    catch {
        console.log("error");
    }
}

// clears search result and sets default search message when enter new crypto coin
searchBar.addEventListener("keyup", () => {
    if (results.innerHTML != "" && searchBar.value != "") {
        results.innerHTML = "";
        resultsMsg.innerText = defaultResultMsg;
    } else {
        return;
    }
})

// search via pressing enter when search input is active
searchBar.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        search();
    }
    return
  });

// save the search crypto asset
function save() {
    const savedContent = `
            <div class="result-card" id="${searchedData.id}">
            <div class="info">
                <div class="card-title">
                    <div>
                        <p class="name">${searchedData.name}</p>
                        <p class="symbol">${searchedData.symbol}</p>
                    </div>
                </div>
                <p><b>Price:</b> <span class="price">${searchedData.price}</span></p>
                <p><b>Market Cap:</b> <span class="market-cap">${searchedData.marketCap}</span></p>
                <p><b>Supply:</b> <span class="supply">${searchedData.supply}</span></p>
            </div>
            </div>
        `;
    savedItems.innerHTML += savedContent;
    resultsMsg.innerText = defaultResultMsg;
    results.innerHTML = "";
    saveMsg.innerText = "";
    //save the id of the recently saved item and add it to the Saved List
    let saveItem = {
        id: `${searchedData.id}`,
        name: `${searchedData.name}`,
        symbol: `${searchedData.symbol}`,
        price: `${searchedData.price}`,
        marketCap: `${searchedData.marketCap}`,
        supply: `${searchedData.supply}`
    }
    savedList.push(saveItem);
    increaseSaveQty();
    clearBtn.disabled = false;
}

//update the quantity of saved assets 

function increaseSaveQty() {
    saveQty.innerText = saveQtyValue += 1;
}

function decreaseSaveQty() {
    saveQty.innerHTML = saveQtyValue -= 1;
}

//delete saved items from the list

clearBtn.addEventListener("click", function clearSave(){
    savedList = [];
    saveQty.innerHTML = 0;
    while (savedItems.firstChild) {
        savedItems.firstChild.remove();
    }
    clearBtn.disabled = true;
})

//refresh saved data

async function refresh() {
    try {
        for (let i = 0; i <= savedList.length - 1; i++) {
            let response = await fetch(`https://api.coincap.io/v2/assets/${savedList[i].id}`);
            let asset = await response.json();
            console.log(asset);
        }
    } catch {
        console.log("refresh error");
    }
}