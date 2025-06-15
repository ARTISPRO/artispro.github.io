
function addRow() {
    const row = document.createElement("tr");
    row.innerHTML = \`
        <td><input type="text" placeholder="Désignation"></td>
        <td><input type="number" value="1" min="1" class="qty"></td>
        <td><input type="number" value="0" step="0.01" class="ht"></td>
        <td><span class="ttc">0.00 €</span></td>
        <td><button onclick="this.parentElement.parentElement.remove(); updateTotals();">🗑</button></td>
    \`;
    document.getElementById("tableBody").appendChild(row);
    updateTotals();
    bindInputs();
}

function bindInputs() {
    document.querySelectorAll(".qty, .ht").forEach(input => {
        input.oninput = updateTotals;
    });
}

function updateTotals() {
    const rows = document.querySelectorAll("#tableBody tr");
    rows.forEach(row => {
        const qty = parseFloat(row.querySelector(".qty").value) || 0;
        const ht = parseFloat(row.querySelector(".ht").value) || 0;
        const ttc = (qty * ht).toFixed(2);
        row.querySelector(".ttc").innerText = \`\${ttc} €\`;
    });
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const docType = document.getElementById("docType").value;
    const docNumber = document.getElementById("docNumber").value || "XXX";

    doc.setFontSize(12);
    doc.text("ARTIS'PRO", 10, 10);
    doc.text("33 Impasse Guynemer", 10, 16);
    doc.text("SIRET : 93016190600019", 10, 22);
    doc.text("alexis.marc.pro@outlook.fr – 0776010229", 10, 28);
    doc.text(\`\${docType} n°\${docNumber}\`, 150, 10);

    let y = 40;
    doc.text("Désignation | Quantité | Prix HT | Montant TTC", 10, y);
    y += 6;

    document.querySelectorAll("#tableBody tr").forEach(row => {
        const cols = row.querySelectorAll("td");
        const des = cols[0].querySelector("input").value;
        const qty = cols[1].querySelector("input").value;
        const ht = cols[2].querySelector("input").value;
        const ttc = cols[3].innerText;
        doc.text(\`\${des} | \${qty} | \${ht} € | \${ttc}\`, 10, y);
        y += 6;
    });

    y += 10;
    doc.text("BON POUR ACCORD", 10, y);
    doc.text("TVA non applicable, article 293 B du CGI", 10, y + 6);
    doc.text("Pénalités de retard : Taux légal en vigueur", 10, y + 12);
    doc.text("Conditions de règlement : Paiement fin des travaux", 10, y + 18);
    doc.text("Mode de paiement : Espèces, chèque, virement", 10, y + 24);

    doc.save(\`\${docType}_\${docNumber}.pdf\`);
}
