import { DoctorRegistrationForm } from './doctorRegistration.js';
import { PatientRegistrationForm } from './patientRegistration.js';

 
export function renderHomePage() {
    const app = document.getElementById('app');
    app.innerHTML = '';
 
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';

//  Doctor Card

    const doctorCard = document.createElement('div');
    doctorCard.className = 'card';
    doctorCard.addEventListener('click', () => {
        const doctorForm = new DoctorRegistrationForm();
        doctorForm.render();
    });
 
    const doctorCardTitle = document.createElement('div');
    doctorCardTitle.className = 'card-title';
    doctorCardTitle.textContent = 'Doctor Registration';
 
    const doctorCardDescription = document.createElement('div');
    doctorCardDescription.className = 'card-description';
    doctorCardDescription.textContent = 'Register a new doctor.';
 
    doctorCard.appendChild(doctorCardTitle);
    doctorCard.appendChild(doctorCardDescription);
 
// Patient Card

    const patientCard = document.createElement('div');
    patientCard.className = 'card';
    patientCard.addEventListener('click', () => {
        const patientForm = new PatientRegistrationForm();
        patientForm.render();
    });
 
    const patientCardTitle = document.createElement('div');
    patientCardTitle.className = 'card-title';
    patientCardTitle.textContent = 'Patient Registration';
 
    const patientCardDescription = document.createElement('div');
    patientCardDescription.className = 'card-description';
    patientCardDescription.textContent = 'Register a new patient.';
 
    patientCard.appendChild(patientCardTitle);
    patientCard.appendChild(patientCardDescription);
 
    cardContainer.appendChild(doctorCard);
    cardContainer.appendChild(patientCard);
 
    app.appendChild(cardContainer);
}
 
document.addEventListener('DOMContentLoaded', () => {
    renderHomePage();
});