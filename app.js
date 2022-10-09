let searchBar = document.querySelector("#search-bar");


async function search() {
    try {
        let searchValue = searchBar.value;
        let response = await fetch(`https://api.coincap.io/v2/assets/${searchValue}`);
        let asset = await response.json();
        generateAsset(asset);
    }
    catch {
        console.error(error);
    }
}


function generateAsset(param) {
    console.log(param);
}

search();