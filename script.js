const inputs = document.querySelectorAll("input, textarea");
const errors = document.querySelectorAll(".error")
const form = document.querySelector("form");
const customAlert = document.querySelector(".alert")

inputs.forEach((item) => {
    listener("blur", item);
    listener("input", item);
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    for (item of inputs) {
        // if the email field is invalid
        if (!item.validity.valid) {
            // display an appropriate error message
            showError(item);
        }
    }
    if (form.checkValidity()) {
        customAlert.style.display = "flex";
        setTimeout(() => {
            customAlert.style.display = "none";
        }, 3000);
    }
});

function showError(input) {
    if (!input.validity.valid) {
        if (nextErrorSpan(input) == null)
            return;
        if (input.validity.valueMissing) {
            // If empty
            nextErrorSpan(input).textContent = "This field is required";
        } if (input.validity.valueMissing && input.type === 'radio') {
            nextErrorSpan(input).textContent = "Please select a query type";
        }
        if (input.validity.valueMissing && input.type === 'checkbox') {
            nextErrorSpan(input).textContent = "To submit this form, please consent to being contacted";
        }
        else if (input.validity.typeMismatch) {
            // If it's not an email address,
            nextErrorSpan(input).textContent = "Entered value needs to be an email address.";
        }
        // Add the `active` class
        nextErrorSpan(input).className = "error active";
    }
}

function nextErrorSpan(input) {
    let item = input;
    do {
        item = item.nextElementSibling;
        if (item == null) {
            item = input.parentElement;
        }
    }
    while (item && !(item.tagName === "BODY") && !(item.tagName === "SPAN" && item.classList.contains("error")));
    return item;
}

function listener(type, item) {
    item.addEventListener(type, (event) => {
        if (item.validity.valid) {
            if (nextErrorSpan(item) == null)
                return;
            nextErrorSpan(item).textContent = "";
            nextErrorSpan(item).className = "error";
            if (type === "blur") {
                item.classList.remove("invalid");
            }
        } else {
            showError(item);
            if (type === "blur") {
                item.classList.add("invalid");
            }
        }
    });
}