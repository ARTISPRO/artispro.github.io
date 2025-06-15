
function addRow() {
    const table = document.getElementById('itemsTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.innerHTML = `
        <td><input type="text" placeholder="Désignation"></td>
        <td><input type="text" placeholder="Quantité"></td>
        <td><input type="number" placeholder="Prix HT" onchange="updateTotals()"></td>
        <td><span class="montant-ttc">0 €</span></td>
        <td><button onclick="deleteRow(this)">Supprimer</button></td>
    `;
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTotals();
}

function updateTotals() {
    const rows = document.querySelectorAll("#itemsTable tbody tr");
    let totalHT = 0;
    rows.forEach(row => {
        const htInput = row.cells[2].querySelector('input');
        const montantTTC = row.cells[3].querySelector('.montant-ttc');
        const ht = parseFloat(htInput.value) || 0;
        totalHT += ht;
        montantTTC.textContent = ht.toFixed(2) + " €";
    });
    document.getElementById('totalHT').textContent = totalHT.toFixed(2) + " €";
    document.getElementById('totalTVA').textContent = "0 €";
    document.getElementById('totalTTC').textContent = totalHT.toFixed(2) + " €";
}

function generatePDF() {
    const element = document.body;
    const opt = {
        margin:       0.5,
        filename:     'document.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
}
