
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;

    // Hide all tab content
    document.querySelectorAll(".tab-content").forEach(c => c.classList.add("hidden"));

    // Remove active from ALL tabs
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));

    // Show selected tab
    document.getElementById(`tab-${tab}`).classList.remove("hidden");

    // ✅ THIS LINE WAS MISSING
    btn.classList.add("active");
  });
});

document.querySelectorAll(".downloadTemplate").forEach(button => {
  button.addEventListener("click", () => {
    const templateFile = button.dataset.template;

    const link = document.createElement("a");
    link.href = `assets/templates/${templateFile}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

document.querySelectorAll(".tab-content").forEach(tab => {
  let uploadedFile = null;

  const fileInput = tab.querySelector(".fileInput");
  const modal = tab.querySelector(".configModal");

  fileInput.addEventListener("change", (event) => {
    uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    modal.classList.remove("hidden");

    event.target.value = "";
  });

  tab.querySelector(".runCalc")?.addEventListener("click", () => {
    const pricingType = tab.querySelector(".pricingType").value;
    const pricingValue = Number(tab.querySelector(".pricingValue").value) || 0;
    const fileNameInput = tab.querySelector(".fileName").value;

    const outputFileName = fileNameInput || "Output.xlsx";

    modal.classList.add("hidden");

    processFile(uploadedFile, pricingType, pricingValue, outputFileName);
  });
});
    

 

  document.getElementById("runCalc").addEventListener("click", () => {
    const pricingType = document.getElementById("pricingType").value;
    const pricingValue = Number(document.getElementById("pricingValue").value) || 0;
    const fileNameInput = document.getElementById("fileName").value;

    const outputFileName = fileNameInput || "Output.xlsx";

    document.getElementById("configModal").classList.add("hidden");

    processFile(uploadedFile, pricingType, pricingValue, outputFileName);
  });


function getLineDiscount(pricingType, percent, lineDiscount, unitCost, unitList) {
  const pct = percent / 100;
  const baseDiscount = lineDiscount / 100;

  switch (pricingType.toLowerCase()) {
    case "holdback":
      return baseDiscount - pct;

    case "markup":
      return 1 - ((unitCost * (pct + 1)) / unitList);

    case "margin":
      return 1 - ((unitCost / (1 - pct)) / unitList);

    default:
      return 0;
  }
}

function getUnitNetPrice(pricingType, percent, lineDiscount, unitCost, unitList) {
  const pct = percent / 100;
  const baseDiscount = lineDiscount / 100;

  switch (pricingType.toLowerCase()) {
    case "holdback":
      return unitList - (unitList * (baseDiscount - pct));

    case "markup":
      return unitCost * (pct + 1);

    case "margin":
      return unitCost / (1 - pct);

    default:
      return unitList;
  }
}

function applyPricing(net, type, value) { // MARKUP, MARGIN, OR HOLDBACK CALCULATIONS
  const pct = value / 100;

  switch (type) {
    case "markup":
      return net * (1 + pct);

    case "margin":
      return net / (1 - pct);

    case "holdback":
      return net * (1 - pct);

    default:
      return net;
  }
}

function round(num) {
  return Math.round(num * 100) / 100;
}

function processFile(file, pricingType, pricingValue, outputFileName) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);

    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    let jsonData = XLSX.utils.sheet_to_json(worksheet);

    jsonData.forEach(row => {
    const unitList = Number(row["MONTHLY_UNIT_MSRP"]) || 0;
    const discount = Number(row["DISCOUNT"]) || 0;
    const months = Number(row["MONTHS"]) || 0;
    const qty = Number(row["QTY"]) || 0;

    const unitCost = unitList * (1 - (discount / 100));

    const resellerUnitPrice = getUnitNetPrice(
        pricingType,
        pricingValue,
        discount,
        unitCost,
        unitList
    );

    const lineDiscount = getLineDiscount(
        pricingType,
        pricingValue,
        discount,
        unitCost,
        unitList
    );

    const extendedNet = resellerUnitPrice * months * qty;

    row["LINE_DISCOUNT"] = round(lineDiscount * 100);
    row["MONTHLY_UNIT_NET_PRICE"] = round(resellerUnitPrice);
    row["EXTENDED_NET_PRICE"] = round(extendedNet);
    });

    const newWorksheet = XLSX.utils.json_to_sheet(jsonData);

    workbook.Sheets[sheetName] = newWorksheet;

    XLSX.writeFile(workbook, outputFileName.endsWith(".xlsx") ? outputFileName : outputFileName + ".xlsx");

    alert("Calculation Complete 🚀");
  };

  reader.readAsArrayBuffer(file);
}


// ================= MODAL ==================

document.getElementById('someTriggerBtn')?.addEventListener('click', () => {
  const modal = document.getElementById('configModal');
  modal.classList.remove('hidden');
  setTimeout(() => document.getElementById('pricingType').focus(), 100);
});

document.querySelectorAll(".configModal").forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.querySelectorAll(".configModal").forEach(m => m.classList.add("hidden"));
  }
});