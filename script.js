
function addRow() {
    const table = document.getElementById("invoiceTable").getElementsByTagName("tbody")[0];
    const row = table.insertRow();
    for (let i = 0; i < 4; i++) {
        const cell = row.insertCell();
        const input = document.createElement("input");
        input.type = "text";
        cell.appendChild(input);
    }
}

function generatePDF() {
    alert("La génération de PDF fonctionnera dans une version plus avancée avec une bibliothèque comme html2pdf.");
}
