
let messageForm = document.querySelector("#messageForm");

function validateForm(inputs, textarea) {
    for (let input of inputs) {
        if (input.type == 'text') {
            if (input.value.length < 5 || input.value == "") {
                alert("A név nem megfelelő formátumú!")
            }
        }
    }
    if (textarea && textarea.value.length < 20) {
        alert("Az üzenet nem megfelelő formátumú!")
    }
}

messageForm.addEventListener("submit", function (ev) {
    ev.preventDefault();
    console.log(this);
    let inputs = this.querySelectorAll("input");
    let textarea = this.querySelector("textarea");
    let values = {};
    for (let i = 0; i < inputs.length; i++) {
        values[inputs[i].name] = inputs[i].value;
    }        
    validateForm(inputs, textarea);
})
