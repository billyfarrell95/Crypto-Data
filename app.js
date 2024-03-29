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
let checkIfSaved;
let globalTimestamp;
let savedList = [];

// default states for UI messages and buttons
resultsMsg.innerText = defaultResultMsg;
saveMsg.innerText = defaultSaveMsg;
clearBtn.disabled = true;
refreshBtn.disabled = true;

// check for previous session storage
let localSaved = localStorage.getItem('savedItems');
let localSavedList = localStorage.getItem('savedList');
let localSavedQty = localStorage.getItem('savedQTY');

// Update the saved list if there are any saved items
if (localSaved) {
    savedItems.innerHTML = localSaved;
    refreshBtn.disabled = false;
    clearBtn.disabled = false;
    saveMsg.innerText = "";
}

// set savedList equal to the data from local storage
 if (localSavedList) {
    savedList = JSON.parse(localSavedList);
 }
// update the save quantity from local save

 if (localSavedQty) {
    saveQty.innerText = localSavedQty;
 }

let searchedData = {
    name: '',
    symbol: '',
    price: '',
    marketCap: '',
    supply: '',
    id: '',
    timestamp: ''
}

function getDate() {
    let timestamp = new Date().getTime();
    let date = new Date(timestamp);
    // Format date and time
    globalTimestamp = date.toLocaleString('en-US');
}

// pull searched crypto currency data and display it
async function search() {
    try {
        let inputValue = searchBar.value.trim();
        //adds dashed in between multi-name currencies
        let searchValue = inputValue.replace(/\s+/g, '-').toLowerCase();
        let response = await fetch(`https://api.coincap.io/v2/assets/${searchValue}`);
        let asset = await response.json();
        if (asset.error === `${searchValue} not found`) {
            // remove hyphens from "asset not found message"
            let msgText = `"${searchValue.replace(/-/g," ")}" not found`; 
            resultsMsg.innerText = msgText;
            results.innerText = "";
            searchBar.value = "";
            console.log(`${searchValue} not found`);
        } else if (inputValue === "") {
            resultsMsg.innerText = "Enter a currency name"
        } else {
            getDate();
            resultsMsg.innerText = defaultResultMsg;
            searchedData.name = asset.data.name;
            searchedData.symbol = asset.data.symbol;
            // unary plus operator
            let price = +asset.data.priceUsd;
            searchedData.price = price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            let cap = +asset.data.marketCapUsd;
            searchedData.marketCap = cap.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            let supply = +asset.data.supply;
            searchedData.supply = supply.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            searchedData.id = asset.data.id;
            /* searchedData.timestamp = asset.timestamp; */
            const searchContent = `
                <div class="result-card" id="${searchedData.id}">
                <div class="info">
                    <div class="card-title">
                        <div>
                            <p class="name">${searchedData.name}</p>
                            <p class="symbol">${searchedData.symbol}</p>
                        </div>
                    </div>
                    <p><b>Price:</b> <span class="price">$${searchedData.price}</span></p>
                    <p><b>Market Cap:</b> <span class="market-cap">$${searchedData.marketCap}</span></p>
                    <p><b>Supply:</b> <span class="supply">${searchedData.supply}</span></p>
                    <p><b>Timestamp:</b> <span class="timestamp">${globalTimestamp}</span></p>
                </div>
                <div class="links">
                    <button class="btn save-btn" onclick="save()">Save</button>
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

// clears search result and sets default search message when entering new search
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
    checkIfSaved = document.getElementById(`${searchedData.id}-save`);
    console.log(checkIfSaved);
        if (checkIfSaved === null) {
            console.log("item saved");
            const savedContent = `
                <div class="result-card" id="${searchedData.id}-save">
                <div class="info">
                    <div class="card-title">
                        <div>
                            <p class="name">${searchedData.name}</p>
                            <p class="symbol">${searchedData.symbol}</p>
                        </div>
                    </div>
                    <p><b>Price:</b> <span class="price" id="${searchedData.id}-price">$${searchedData.price}</span></p>
                    <p><b>Market Cap:</b> <span class="market-cap" id="${searchedData.id}-market-cap">$${searchedData.marketCap}</span></p>
                    <p><b>Supply:</b> <span class="supply" id="${searchedData.id}-supply">${searchedData.supply}</span></p>
                    <p><b>Timestamp:</b> <span class="timestamp" id="${searchedData.id}-timestamp">${globalTimestamp}</span></p>
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
        refreshBtn.disabled = false;
        } else {
            refresh();
            results.innerHTML = "";
            resultsMsg.innerText = `"${searchedData.name}" is already saved. Saved data has been refreshed.`;
        } 
        //save data to local storage
        localStorage.setItem('savedItems', savedItems.innerHTML);
        localStorage.setItem('savedList', JSON.stringify(savedList));
}

//update the quantity of saved assets 
function increaseSaveQty() {
    saveQty.innerText = saveQtyValue += 1;
    //save the quantity to local storage
    localStorage.setItem('savedQTY', saveQty.innerText);
}

//delete saved items from the list
clearBtn.addEventListener("click", function clearSave(){
    savedList = [];
    saveQtyValue = 0;
    saveQty.innerText = 0;
    while (savedItems.firstChild) {
        savedItems.firstChild.remove();
    }
    clearBtn.disabled = true;
    refreshBtn.disabled = true;
    saveMsg.innerText = defaultSaveMsg;
    localStorage.clear();
})

//refresh saved data
async function refresh() {
    let refreshPrice;
    let refreshCap;
    let refreshSupply;
    let refreshTimestamp;
    getDate();
    try {
        for (let i = 0; i <= savedList.length - 1; i++) {
            let refreshAsset = savedList[i].id;
            let response = await fetch(`https://api.coincap.io/v2/assets/${refreshAsset}`);
            let asset = await response.json();
            console.log(asset);
            refreshPrice = document.getElementById(`${refreshAsset}-price`);
            refreshCap = document.getElementById(`${refreshAsset}-market-cap`);
            refreshSupply = document.getElementById(`${refreshAsset}-supply`);
            refreshTimestamp = document.getElementById(`${refreshAsset}-timestamp`);
            let price = +asset.data.priceUsd;
            refreshPrice.innerText = "$" + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            let cap = +asset.data.marketCapUsd;
            refreshCap.innerText = "$" + cap.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            let supply = +asset.data.supply;
            refreshSupply.innerText = supply.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            refreshTimestamp.innerText = globalTimestamp;
        }
    } catch {
        console.log("refresh error");
    }
    // on saved items refresh, update the local storage with the new data
    localStorage.setItem('savedItems', savedItems.innerHTML);
}