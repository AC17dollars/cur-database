var rows = [];
fetchTable();

function addSortOption() {
    let addButton = document.getElementById("addSortOptionButton");
    let removeButton = document.getElementById("removeSortOptionButton");
    let sortContainer = document.getElementById("selectContainer");
    let selectMenu = document.getElementById("sortOption");

    addButton.style = "display: none;";
    removeButton.style = "display: block";
    sortContainer.style = "display: block;";

    selectMenu.selectedIndex = 0;
}

async function removeSortOption() {
    let addButton = document.getElementById("addSortOptionButton");
    let removeButton = document.getElementById("removeSortOptionButton");
    let sortContainer = document.getElementById("selectContainer");
    let selectMenu = document.getElementById("sortOption");

    addButton.style = "display: block;";
    removeButton.style = "display: none";
    sortContainer.style = "display: none;";

    selectMenu.selectedIndex = 2;
    await fetchTable();
    updateTable();
}

function showTable() {
    let tableDiv = document.getElementById("data-table");
    let viewTableBtn = document.getElementById("view-table");
    let hideTableBtn = document.getElementById("hide-table");

    viewTableBtn.style = "display: none;";
    hideTableBtn.style = "display: block;";

    tableDiv.style = "display:block;"
    updateTable();

}

function hideTable() {
    removeSortOption();
    let tableDiv = document.getElementById("data-table");
    let viewTableBtn = document.getElementById("view-table");
    let hideTableBtn = document.getElementById("hide-table");

    viewTableBtn.style = "display: block;";
    hideTableBtn.style = "display: none;";

    tableDiv.style = "display: none;"

}

async function fetchTable() {
    let result = await fetch("/api/table"); //fetch some data
    rows = await result.json();
}

function updateTable() {
    let table = document.getElementById("table");

    while (table.childElementCount > 1) {
        table.removeChild(table.lastChild);
    }

    rows.forEach((element, index) => {
        let tr = document.createElement("tr");
        tr.setAttribute("id", `tr-${index + 1}`);
        Object.values(element).forEach(column => {
            let td = document.createElement("td");
            td.innerText = column;
            tr.appendChild(td);
        })
        table.appendChild(tr);
    })
}

function sortTable() {
    let sortValue = document.getElementById('sortOption').selectedOptions[0].value;
    rows.sort((a, b) => {
        return (a[sortValue] > b[sortValue]) ? 1 : -1;
    })
    updateTable();
}

async function insertAPI(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    e.target.reset();
    try {
        await fetch("/insert", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        })
    } catch (err) {
        console.error("Error on fetch request");
    }
    fetchTable();
    updateTable();
}

const form = document.getElementById("details-form");
form.addEventListener('submit', (e) => { insertAPI(e) })
