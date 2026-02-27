// Referencias
const slider = document.querySelector("#length-slider");
const lengthLabel = document.querySelector("#length-value");
const btnGenerate = document.querySelector("#generate-btn");
const display = document.querySelector("#password-display");

// Actualizar el número del largo en tiempo real
slider.addEventListener("input", () => {
    lengthLabel.textContent = slider.value;
});

const generatePassword = () => {
    const length = parseInt(slider.value);
    const hasUpper = document.querySelector("#uppercase").checked;
    const hasLower = document.querySelector("#lowercase").checked;
    const hasNumber = document.querySelector("#numbers").checked;
    const hasSymbol = document.querySelector("#symbols").checked;

    const chars = {
        lower: "abcdefghijklmnopqrstuvwxyz",
        upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        number: "0123456789",
        symbol: "!@#$%^&*()_+[]{}|;:,.<>?"
    };

    let charPool = "";
    if (hasLower) charPool += chars.lower;
    if (hasUpper) charPool += chars.upper;
    if (hasNumber) charPool += chars.number;
    if (hasSymbol) charPool += chars.symbol;

    if (charPool === "") return "Select Option";

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }
    return password;
};

btnGenerate.addEventListener("click", () => {
    display.textContent = generatePassword();
});