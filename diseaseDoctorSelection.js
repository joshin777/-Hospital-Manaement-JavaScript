import { renderDoctorSupportPage } from './doctorSupportPage.js';
import log from './Log.js';
 
export function renderDiseaseDoctorSelection() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    const formElement = document.createElement('form');
 
    // Specialization Dropdown
    const specializationLabel = document.createElement('label');
    specializationLabel.textContent = 'Specialization:';
    const specializationSelect = document.createElement('select');
    specializationSelect.innerHTML = '<option value="">Select Specialization</option>';
    formElement.appendChild(specializationLabel);
    formElement.appendChild(specializationSelect);
 
    // Doctor Dropdown
    const doctorLabel = document.createElement('label');
    doctorLabel.textContent = 'Doctor:';
    const doctorSelect = document.createElement('select');
    doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
    formElement.appendChild(doctorLabel);
    formElement.appendChild(doctorSelect);
 
    // Body Parts Dropdown
    const bodyPartLabel = document.createElement('label');
    bodyPartLabel.textContent = 'Body Part:';
    const bodyPartSelect = document.createElement('select');
    bodyPartSelect.innerHTML = '<option value="">Select Body Part</option>';
    bodyPartSelect.addEventListener('change', (e) => {
        loadBodyPartImage(e.target.value);
    });
    formElement.appendChild(bodyPartLabel);
    formElement.appendChild(bodyPartSelect);
 
    // Image Area
    const imageArea = document.createElement('div');
    const imageStatus = document.createElement('p');
    imageStatus.textContent = 'Loading...';
    imageArea.appendChild(imageStatus);
    const imageElement = document.createElement('img');
    imageElement.style.display = 'none';
    imageArea.appendChild(imageElement);
    formElement.appendChild(imageArea);
 
    // Next Button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        const specialization = specializationSelect.value;
        const doctor = doctorSelect.value;
        const bodyPart = bodyPartSelect.value;
        log.addLog(`Specialization selected: ${specialization}, Doctor selected: ${doctor}, Body part selected: ${bodyPart}`);
        renderDoctorSupportPage();
    });
    formElement.appendChild(nextButton);
 
    document.getElementById('app').appendChild(formElement);
 
    // Specialization Dropdown
    function populateSpecializations() {
        const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
        const specializations = new Set(doctors.map(doctor => doctor.specialization));
        specializationSelect.innerHTML = '<option value="">Select Specialization</option>';
        specializations.forEach(spec => {
            const option = document.createElement('option');
            option.value = spec;
            option.textContent = spec;
            specializationSelect.appendChild(option);
        });
    }
 
    //  Doctor Dropdown based on selected specialization
    function populateDoctorOptions(specialization) {
        const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
        doctors.filter(doctor => doctor.specialization === specialization).forEach(doctor => {
            const option = document.createElement('option');
        option.value = doctor.name;
        option.textContent = doctor.name;
            doctorSelect.appendChild(option);
        });
    }
 
    // Body Parts based on selected specialization
    function populateBodyParts(specialization) {
        const bodyParts = {
            ortho: ['hand', 'leg', 'neck', 'knee'],
            cardio: ['heart', 'chest'],
            neuro: ['brain', 'spine'],
        };
        bodyPartSelect.innerHTML = '<option value="">Select Body Part</option>';
        (bodyParts[specialization] || []).forEach(part => {
            const option = document.createElement('option');
            option.value = part;
            option.textContent = part;
            bodyPartSelect.appendChild(option);
        });
    }
 
    // Load body part image
    function loadBodyPartImage(part) {
     imageStatus.style.display = 'block';
     imageElement.style.display = 'none';
        setTimeout(() => {
            imageElement.src = `images/${part}.jpg`;
     imageElement.style.display = 'block';
     imageStatus.style.display = 'none';
        }, 1000);
    }
 
    specializationSelect.addEventListener('change', (e) => {
        populateDoctorOptions(e.target.value);
        populateBodyParts(e.target.value);
    });
 
    populateSpecializations();
}