
function addRow() {
    const table = document.querySelector("#itemsTable tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><input type="text" placeholder="Désignation"></td>
        <td><input type="number" placeholder="Qté" value="1" onchange="updateTotals()"></td>
        <td><input type="number" placeholder="Prix HT" value="0" onchange="updateTotals()"></td>
        <td class="montant-ttc">0 €</td>
        <td><button onclick="this.parentElement.parentElement.remove(); updateTotals();">🗑️</button></td>
    `;
    table.appendChild(row);
}

function updateClientInfo() {
    document.getElementById("docType").innerText = document.getElementById("typeSelect").value;
    document.getElementById("docNumber").innerText = document.getElementById("numberInput").value;
    document.getElementById("clientName").innerText = "Nom : " + document.getElementById("inputClientName").value;
    document.getElementById("clientAddress").innerText = "Adresse : " + document.getElementById("inputClientAddress").value;
    document.getElementById("clientPhone").innerText = "Téléphone : " + document.getElementById("inputClientPhone").value;
    document.getElementById("clientEmail").innerText = "Email : " + document.getElementById("inputClientEmail").value;
    document.getElementById("propertyOwner").innerText = "Propriétaire : " + document.getElementById("inputPropertyOwner").value;
    document.getElementById("propertyAddress").innerText = "Adresse du bien : " + document.getElementById("inputPropertyAddress").value;
}

function updateTotals() {
    const rows = document.querySelectorAll("#itemsTable tbody tr");
    let totalHT = 0;
    rows.forEach(row => {
        const qty = parseFloat(row.cells[1].querySelector("input").value) || 0;
        const price = parseFloat(row.cells[2].querySelector("input").value) || 0;
        const montant = qty * price;
        row.cells[3].innerText = montant.toFixed(2) + " €";
        totalHT += montant;
    });
    document.getElementById("totalHT").innerText = totalHT.toFixed(2) + " €";
    document.getElementById("totalTVA").innerText = "0 €";
    document.getElementById("totalTTC").innerText = totalHT.toFixed(2) + " €";
}

function generatePDF() {
    updateClientInfo();
    updateTotals();
    const content = document.getElementById("pdf-content");
    const opt = {
        margin:       0.5,
        filename:     'devis_facture.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(content).set(opt).save();
}
