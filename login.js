import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ====== Firebase Config ======
const firebaseConfig = {
    apiKey: "AIzaSyBQzMGrl9Twu0euqiU_39DkKjreWlFD6Ok",
    authDomain: "commerceflow-b742b.firebaseapp.com",
    projectId: "commerceflow-b742b",
    storageBucket: "commerceflow-b742b.firebasestorage.app",
    messagingSenderId: "159750863802",
    appId: "1:159750863802:web:926e046a4209d887917b83",
    measurementId: "G-MT0L31KE13"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.auth = auth;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;


const btn = document.getElementById("btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("pass");
const errorDiv = document.getElementById("error");
const checkBox = document.getElementById("check");


btn.addEventListener("click", async function(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        errorDiv.textContent = "Please enter a correct Email";
        errorDiv.style.display = "block";
        return;
    }
    if (email.indexOf("@") === 0) {
        errorDiv.textContent = "Email cannot start with @";
        errorDiv.style.display = "block";
        return;
    }
    if (email.indexOf(" ") !== -1) {
        errorDiv.textContent = "Email cannot contain spaces";
        errorDiv.style.display = "block";
        return;
    }

    if (password.length < 8) {
        errorDiv.textContent = "Password must be at least 8 characters";
        errorDiv.style.display = "block";
        return;
    }
    if (!/[0-9]/.test(password)) {
        errorDiv.textContent = "Password must contain at least one number";
        errorDiv.style.display = "block";
        return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errorDiv.textContent = "Password must contain at least one special character";
        errorDiv.style.display = "block";
        return;
    }
    if (!checkBox.checked) {
        errorDiv.textContent = "You must agree to the terms";
        errorDiv.style.display = "block";
        return;
    }

    errorDiv.style.display = "none";

    // ===== Firebase Login =====
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Successfully logged in 🎉");
        window.location.href = "home.html";
    } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.style.display = "block";
    }
});
