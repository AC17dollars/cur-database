function addSortOption(){
    let addButton = document.getElementById("addSortOptionButton");
    let removeButton = document.getElementById("removeSortOptionButton");
    let sortContainer = document.getElementById("selectContainer");
    let selectMenu = document.getElementById("sortOption");


    addButton.style = "display: none;";
    removeButton.style = "display: block";
    sortContainer.style = "display: block;";

    selectMenu.selectedIndex = 0;


}

function removeSortOption(){
    let addButton = document.getElementById("addSortOptionButton");
    let removeButton = document.getElementById("removeSortOptionButton");
    let sortContainer = document.getElementById("selectContainer");
    let selectMenu = document.getElementById("sortOption");

    addButton.style = "display: block;";
    removeButton.style = "display: none";
    sortContainer.style = "display: none;";

    selectMenu.selectedIndex = 2;

}

function showTable(){
    let tableDiv = document.getElementById("data-table");
    let viewTableBtn = document.getElementById("view-table");
    let hideTableBtn = document.getElementById("hide-table");

    viewTableBtn.style = "display: none;";
    hideTableBtn.style = "display: block;";

    tableDiv.style = "display:block;"
    updateTable();

}

function hideTable(){
    let tableDiv = document.getElementById("data-table");
    let viewTableBtn = document.getElementById("view-table");
    let hideTableBtn = document.getElementById("hide-table");

    viewTableBtn.style = "display: block;";
    hideTableBtn.style = "display: none;";

    tableDiv.style = "display: none;"

}

async function updateTable(){
    let table = document.getElementById("table");

    while(table.childElementCount >1){
        table.removeChild(table.lastChild);
    }

    let result = await fetch("/api/table"); //fetch some data
    let rows = await result.json();
    rows.forEach( element => {
        let tr = document.createElement("tr");
        Object.values(element).forEach( column => {
            let td = document.createElement("td");
            td.innerText = column;
            tr.appendChild(td);
        })
        table.appendChild(tr);
    })
    
}