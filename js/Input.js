export default class InputNumber {
    #error;
    #input;
    #length;

    constructor(target, length) {
        this.#error = target.querySelector('.calculator__text--error');
        this.#input = target.querySelector('.calculator__input');
        this.#length = length;
    };

    #characterLimiter() {
        if(this.#input.value.length > this.#length) 
            this.#input.value = this.#input.value.slice(0, this.#length);
    };

    get value() { return parseFloat(this.#input.value); }

    #inputStateChange(state, errorMessage = "") {
        switch (state) {
            case "OK":
                this.#input.classList.add("calculator__input--correct");
                this.#input.classList.remove("calculator__input--fail");
                break;
            case "ERROR":
                this.#input.classList.add("calculator__input--fail"); 
                this.#input.classList.remove("calculator__input--correct");
                break;
            default:
                this.#input.classList.remove("calculator__input--fail"); 
                this.#input.classList.remove("calculator__input--correct");
                break;
        }
        this.#error.textContent = errorMessage;
    }
    
    check() {
        this.#characterLimiter();

        if(this.#input.value === "")
            this.#inputStateChange("ERROR", "empty field");
        else if (this.value <= 0)
            this.#inputStateChange("ERROR", "can´t be zero");
        else {
            this.#inputStateChange("OK");
            return true;
        }
        return false;
    };

    clear() {
        this.#inputStateChange();
        this.#input.value = "";
    }
};