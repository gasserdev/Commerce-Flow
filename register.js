import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

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

const form = document.getElementById('registerForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if(password !== confirmPassword){
        alert("Passwords do not match!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {
            displayName: `${firstName} ${lastName}`
        });

        alert("User registered successfully!");
        form.reset();
    } catch (error) {
        alert(error.message);
    }
});
