import { RegistrationForm } from './registrationForm.js';
import { renderHomePage } from './app.js';
import log from './Log.js';
 
export class DoctorRegistrationForm extends RegistrationForm {
    constructor() {
        super(['name', 'age', 'sex', 'specialization', 'qualification']);
    }
 
    submit() {
        const doctor = {
            name: this.state.name,
            specialization: this.state.specialization
        };
 
        // Get existing doctors from localStorage
        const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
        doctors.push(doctor);
 
        // Save updated list back to localStorage
        localStorage.setItem('doctors', JSON.stringify(doctors));
 
        log.addLog(`Doctor registered: ${JSON.stringify(this.state)}`);
        console.log('Doctor registered:', this.state);
        alert('Doctor registered successfully');
        renderHomePage();
    }
 
    back() {
        renderHomePage();
    }
}