export class FormValidator {
    constructor(configs, form) {
        this._configs = configs;
        this._form = form;
        this._inputList = this._form.querySelectorAll(this._configs.inputSelector);
        this._submitBtn = this._form.querySelector(this._configs.sbmtBtnSelector);
    }

    _checkInputValid(input) {
        const errorEl = this._form.querySelector(`#${input.id}-error`);
        errorEl.textContent = input.validationMessage;

        if (!input.validity.valid) {
            input.classList.add(this._configs.inputErrorClass);
            errorEl.classList.remove(this._configs.errorClass);
        } else {
            input.classList.remove(this._configs.inputErrorClass);
            errorEl.classList.add(this._configs.errorClass);
        }
    }

    _toggleButtonState() {
        if ([...this._inputList].map((i) => i.validity.valid).includes(false)) {
            this._submitBtn.classList.add(this._configs.btnInactiveSelector);
            this._submitBtn.disabled = true;
        } else {
            this._submitBtn.classList.remove(this._configs.btnInactiveSelector);
            this._submitBtn.disabled = false;
        }
    }

    enableValidation() {
        this._form.addEventListener("formIsOpened", () => {
            this._toggleButtonState();
            this._inputList.forEach((i) => {
                if (i.value) this._checkInputValid(i);
            });
        });

        this._inputList.forEach((i) => {
            i.addEventListener("input", (evt) => {
                this._toggleButtonState();
                this._checkInputValid(i);
            });
            i.addEventListener("blur", (evt) => {
                this._toggleButtonState();
                this._checkInputValid(i);
            });
            i.addEventListener("focus", (evt) => {
                this._toggleButtonState();
                this._checkInputValid(i);
            });
        });
    }
}