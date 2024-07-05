import { renderPaymentPage } from './paymentPage.js';
import log from './Log.js';

// Dummy medicine list
const medicinesList = [
    { name: 'Paracetamol', id: 'paracetamol' },
    { name: 'Amoxicillin', id: 'amoxicillin' },
    { name: 'Ibuprofen', id: 'ibuprofen' },
    { name: 'Aspirin', id: 'aspirin' },
    { name: 'Emeset', id: 'emeset' },
    { name: 'Pantop', id: 'pantop' },
    { name: 'Mox 500', id: 'mox_500' },
    { name: 'Metsormin', id: 'metsormin' },
];

export function renderDoctorSupportPage() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const formElement = document.createElement('form');

    // Disease Summary Text Area
    const diseaseSummaryLabel = document.createElement('label');
    diseaseSummaryLabel.textContent = 'Disease Summary:';
    const diseaseSummaryTextArea = document.createElement('textarea');
    diseaseSummaryTextArea.name = 'diseaseSummary';

    formElement.appendChild(diseaseSummaryLabel);
    formElement.appendChild(diseaseSummaryTextArea);

    // Medicines Checkboxes
    const medicinesLabel = document.createElement('label');
    medicinesLabel.textContent = 'Medicines:';
    formElement.appendChild(medicinesLabel);

    const medicinesContainer = document.createElement('div');
    medicinesList.forEach(medicine => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = medicine.id;
        checkbox.name = 'medicines';
        checkbox.value = medicine.name;

        const label = document.createElement('label');
        label.htmlFor = medicine.id;
        label.textContent = medicine.name;

        medicinesContainer.appendChild(checkbox);
        medicinesContainer.appendChild(label);
        medicinesContainer.appendChild(document.createElement('br'));
    });

    formElement.appendChild(medicinesContainer);

    // Scan Checkbox
    const scanLabel = document.createElement('label');
    scanLabel.textContent = 'Scan:';
    const scanCheckbox = document.createElement('input');
    scanCheckbox.type = 'checkbox';
    scanCheckbox.id = 'scan';
    scanCheckbox.name = 'scan';
    scanCheckbox.value = 'Scan';

    formElement.appendChild(scanLabel);
    formElement.appendChild(scanCheckbox);

    // Next Button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        log.addLog(`Disease summary: ${diseaseSummaryTextArea.value}`);
        const selectedMedicines = Array.from(formElement.querySelectorAll('input[name="medicines"]:checked')).map(el => el.id);
        log.addLog(`Medicines selected: ${selectedMedicines.join(', ')}`);
        const scanSelected = scanCheckbox.checked;
        log.addLog(`Scan selected: ${scanSelected ? 'Yes' : 'No'}`);
        alert('Information submitted successfully');
        renderPaymentPage(selectedMedicines, scanSelected);
    });

    formElement.appendChild(nextButton);

    document.getElementById('app').appendChild(formElement);
}
