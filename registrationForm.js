export class RegistrationForm {
    constructor(fields) {
        this.fields = fields;
        this.state = {};
        this.formElement = document.createElement('form');
    }
 
    render() {
        this.fields.forEach(field => {
            const input = document.createElement('input');
            input.name = field;
            input.placeholder = field.charAt(0).toUpperCase() + field.slice(1);
            input.addEventListener('input', (e) => this.state[field] = e.target.value);
            this.formElement.appendChild(input);
        });
 
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.submit();
        });
 
        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.back();
        });
 
        this.formElement.appendChild(submitButton);
        this.formElement.appendChild(backButton);
 
        document.getElementById('app').innerHTML = '';
        document.getElementById('app').appendChild(this.formElement);
    }
 
    submit() { 
    }
 
    back() {
    }
}