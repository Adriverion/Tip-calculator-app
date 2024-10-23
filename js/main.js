import Input from "./Input.js";

const $inputBill = new Input(document.getElementById('input-bill'), 8);
const $inputPercentage = new Input(document.getElementById('input-percentage'), 3);
const $inputPeople = new Input(document.getElementById('input-people'), 3);
const $defaultButton = document.querySelector('button[value="15"]');
const $resultTip = document.getElementById('tip-amount');
const $result = document.getElementById('total');

const check = {
    bill: 0,
    percentage: 15,
    people: 0,
    tip() { return (this.bill * this.percentage) / 100 },
    totalPerson() { return (this.bill + this.tip()) / this.people },
    tipPerson() {return this.tip() / this.people}
}

const defaultPercentage = (elem = null, noSelect = true) => {
    const $parent = (elem === null)? $defaultButton.parentElement : elem.parentElement;
    for (let item of $parent.children) 
        item.classList.remove('calculator__button--cyan');

    if (noSelect) {
        elem.classList.add('calculator__button--cyan');
        check.percentage = parseInt(elem.value);
    }
}

const reset = () => {
    $inputBill.clear();
    $inputPercentage.clear();
    $inputPeople.clear();
    defaultPercentage($defaultButton);
    $result.textContent = '$0.00';
    $resultTip.textContent = '$0.00';
    check.bill = 0;
    check.people = 0;
}

const showResult = () => {
    if (check.bill != 0 && check.people != 0) {
        $result.textContent = `$${check.totalPerson().toFixed(2)}`;
        $resultTip.textContent = `$${check.tipPerson().toFixed(2)}`;
    }
}

window.addEventListener('click', e => {
    if (e.target.matches('button.calculator__form-panel-item')) defaultPercentage(e.target);
    if (e.target.matches('input.calculator__form-panel-item')) defaultPercentage(null, false);
    if (e.target.value === "reset") reset();
    showResult();
})

window.addEventListener('input', e => {
    if (e.target.name === 'bill' && $inputBill.check()) check.bill = $inputBill.value;
    if (e.target.name === 'percentage' && $inputPercentage.check()) check.percentage = $inputPercentage.value;
    if (e.target.name === 'people' && $inputPeople.check()) check.people = $inputPeople.value;
    showResult();
})