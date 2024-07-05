import { RegistrationForm } from './registrationForm.js';
import { renderHomePage } from './app.js';
import { renderDiseaseDoctorSelection } from './diseaseDoctorSelection.js';
import log from './Log.js';
 
export class PatientRegistrationForm extends RegistrationForm {
    constructor() {
        super(['name', 'age', 'sex']);
    }
 
    submit() {
        log.addLog(`Patient registered: ${JSON.stringify(this.state)}`);
        alert('Patient registered successfully');
        this.enableNextButton();
    }
 
    enableNextButton() {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            renderDiseaseDoctorSelection();
        });
        this.formElement.appendChild(nextButton);
    }
 
    back() {
        renderHomePage();
    }
}