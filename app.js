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
let saveQty = document.getElementById("saved-qty");

/* functionality left add:
refresh saved items data
show timestamp on the saved items 
pull in images for the coin icons
update the number of items saved qty
ability to search coin symbols e.g. BTC
fix "undefined" if search button is clicked field is empty */

let searchedData = {
    name: '',
    symbol: '',
    price: '',
    marketCap: '',
    supply: '',
    id: ''
}

let savedList = [];

resultsMsg.innerHTML = defaultResultMsg;
saveMsg.innerHTML = defaultSaveMsg;

// pull searched crypto currency data and display it
async function search() {
    try {
        let inputValue = searchBar.value;
        //adds dashed in between multi-name currencies
        let searchValue = inputValue.split(" ").join("-");
        let response = await fetch(`https://api.coincap.io/v2/assets/${searchValue}`);
        let asset = await response.json();
        if (asset.error === `${searchValue} not found`) {
            // remove hyphens from "asset not found message"
            let msgText = `${searchValue.replace(/-/g," ")} not found`; 
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
                    <button class="btn" onclick="save()">Save</button>
                </div>
                </div>
            `;
            resultsMsg.innerHTML = `${searchedData.name} Data`;
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
        resultsMsg.innerHTML = defaultResultMsg;
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
                <button class="save-btn ${searchedData.id}">Remove</button>
            </div>
            </div>
        `;
    savedItems.innerHTML += savedContent;
    resultsMsg.innerHTML = defaultResultMsg;
    results.innerHTML = "";
    saveMsg.innerHTML = "";
    //save the id of the recently saved item and add it to the Saved List
    let saveItem = searchedData.id;
    savedList.push(saveItem);
    //update saved qty
    updateSaveQty();
    //delete functionality
    deleteItem();
}

//update the quantity of saved assets 

function updateSaveQty() {
    saveQty.innerHTML = savedList.length;
}

//delete saved items from the list

function deleteItem() {
console.log(savedList)
    for (let i = 0; i <= savedList.length - 1; i++) {
        console.log(savedList[i])
        let el = document.getElementsByClassName(savedList[i])[0];
        console.log(el);
        el.addEventListener('click', () => {
            let del = document.getElementById(savedList[i]);
            console.log(del)
            del.remove();
            
            saveQty.innerHTML = savedList.length;
        })
    } 
}