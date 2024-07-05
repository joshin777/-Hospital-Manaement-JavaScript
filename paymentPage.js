import { renderHomePage } from './app.js';
import { renderDoctorSupportPage } from './doctorSupportPage.js';
import log from './Log.js';

const medicinesList = [
    { name: 'Paracetamol', price: 5 },
    { name: 'Amoxicillin', price: 10 },
    { name: 'Ibuprofen', price: 8 },
    { name: 'Aspirin', price: 6 },
    { name: 'Emeset', price: 16 },
    { name: 'Pantop', price: 60 },
    { name: 'Mox 500', price: 22 },
    { name: 'Metsormin', price: 26 },
];

// Download as Txt
function downloadLog() {
    const logs = log.getLogs();
    const blob = new Blob([logs.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const hospitalLog = document.createElement('a');
    hospitalLog.href = url;
    hospitalLog.download = 'hospital_log.txt';
    hospitalLog.click();
    URL.revokeObjectURL(url);
    log.clearLogs();
}

export function renderPaymentPage(selectedMedicines, scanSelected) {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const formElement = document.createElement('form');

    let billAmount = 0;
    let taxableBillAmount = 0;

    const medicinesContainer = document.createElement('div');
    const medicinesLabel = document.createElement('label');
    medicinesLabel.textContent = 'Selected Medicines:';
    medicinesContainer.appendChild(medicinesLabel);

    selectedMedicines.forEach(medicineId => {
        const medicine = medicinesList.find(med => med.name.toLowerCase() === medicineId);
        if (medicine) {
            const label = document.createElement('label');
            label.textContent = `${medicine.name} (RS.${medicine.price})`;
            medicinesContainer.appendChild(label);
            medicinesContainer.appendChild(document.createElement('br'));
            billAmount += medicine.price;
            taxableBillAmount += medicine.price;
            log.addLog(`Medicine selected: ${medicine.name} (RS.${medicine.price})`);
        }
    });

    formElement.appendChild(medicinesContainer);

    if (scanSelected) {
        const scanLabel = document.createElement('label');
        scanLabel.textContent = 'Scan (RS.1000)';
        formElement.appendChild(scanLabel);
        formElement.appendChild(document.createElement('br'));
        billAmount += 1000;
        taxableBillAmount += 1000;
        log.addLog('Scan selected: RS.1000');
    }

    // Consultation Checkbox
    const consultationLabel = document.createElement('label');
    consultationLabel.textContent = 'Consultation (RS.350):';
    const consultationCheckbox = document.createElement('input');
    consultationCheckbox.type = 'checkbox';
    consultationCheckbox.id = 'consultation';
    consultationCheckbox.name = 'consultation';
    consultationCheckbox.value = 350;

    formElement.appendChild(consultationLabel);
    formElement.appendChild(consultationCheckbox);
    formElement.appendChild(document.createElement('br'));

    // Calculate Button
    const calculateButton = document.createElement('button');
    calculateButton.textContent = 'Calculate Bill';
    calculateButton.addEventListener('click', (e) => {
        e.preventDefault();
        let totalBillAmount = billAmount;

        if (consultationCheckbox.checked) {
            totalBillAmount += parseFloat(consultationCheckbox.value);
            log.addLog(`Consultation selected: RS.${consultationCheckbox.value}`);
        }

        // Add tax to taxable bill amount
        const tax = taxableBillAmount * 0.12;
        totalBillAmount += tax;
        log.addLog('12% tax added to taxable bill');

        // Show the total bill amount
        const totalBillAmountLabel = document.createElement('p');
        totalBillAmountLabel.textContent = `Total Bill Amount: RS.${totalBillAmount.toFixed(2)}`;

        const taxableBillAmountLabel = document.createElement('p');
        taxableBillAmountLabel.textContent = `Taxable Bill Amount: RS.${taxableBillAmount.toFixed(2)}`;

        formElement.appendChild(taxableBillAmountLabel);
        formElement.appendChild(totalBillAmountLabel);

        log.addLog(`Taxable Bill Amount calculated: RS.${taxableBillAmount.toFixed(2)}`);
        log.addLog(`Total Bill Amount calculated: RS.${totalBillAmount.toFixed(2)}`);
    });

    // Back Button
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        renderDoctorSupportPage();
    });

    // Submit Button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        downloadLog();
        renderHomePage();
    });

    formElement.appendChild(calculateButton);
    formElement.appendChild(backButton);
    formElement.appendChild(submitButton);

    document.getElementById('app').appendChild(formElement);
}
