document.getElementById("fileInput").addEventListener("change", handleFile);

function handleFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);

    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    let jsonData = XLSX.utils.sheet_to_json(worksheet);

    jsonData.forEach(row => {
      const price = Number(row["MONTHLY_UNIT_MSRP"]) || 0;
      const discount = Number(row["DISCOUNT"]) || 0;
      const months = Number(row["MONTHS"]) || 0;
      const qty = Number(row["QTY"]) || 0;

      const monthlyNet = price - (price * (discount / 100));
      const extendedNet = monthlyNet * months * qty;

      row["MONTHLY_UNIT_NET"] = monthlyNet;
      row["EXTENDED_NET"] = extendedNet;
    });

    const newWorksheet = XLSX.utils.json_to_sheet(jsonData);
    const range = XLSX.utils.decode_range(newWorksheet["!ref"]);

    for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });

    if (!newWorksheet[cellAddress]) continue;

    newWorksheet[cellAddress].s = {
        font: {
        bold: true,
        color: { rgb: "000000" }
        },
        fill: {
        patternType: "solid",
        fgColor: { rgb: "C4B5FD" }
        },
        border: {
        bottom: {
            style: "double",
            color: { rgb: "000000" }
        }
        },
        alignment: {
        horizontal: "center",
        vertical: "center"
        }
    };
    }

    newWorksheet["!cols"] = [
    { wch: 15 }, // SKU
    { wch: 8 },  // QTY
    { wch: 20 }, // MSRP
    { wch: 10 }, // MONTHS
    { wch: 12 }, // DISCOUNT
    { wch: 20 }, // NET
    { wch: 20 }  // EXTENDED
    ];

    workbook.Sheets[sheetName] = newWorksheet;
    XLSX.writeFile(workbook, "Output.xlsx");
    alert("Calculation Complete 🚀");
  };

  reader.readAsArrayBuffer(file);
}