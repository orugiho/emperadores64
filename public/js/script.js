document.addEventListener('DOMContentLoaded', function() {
    // 1. Inicializar autenticación de Firebase
    let auth;
    try {
        auth = firebase.auth();
    } catch (e) {
        console.error("Error al inicializar Firebase Auth:", e);
        return;
    }

    const provider = new firebase.auth.GoogleAuthProvider();

    // 2. Referencias a elementos del DOM
    const btnGoogle = document.getElementById('btn-google');
    const btnLogout = document.getElementById('btn-logout');
    const loggedOutView = document.getElementById('logged-out-view');
    const loggedInView = document.getElementById('logged-in-view');
    
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const userPhoto = document.getElementById('user-photo');

    // 3. Evento: Iniciar Sesión con Google Popup
    if (btnGoogle) {
        btnGoogle.addEventListener('click', function() {
            auth.signInWithPopup(provider)
                .then((result) => {
                    console.log("Sesión iniciada con:", result.user.displayName);
                })
                .catch((error) => {
                    console.error("Error en autenticación:", error.code, error.message);
                });
        });
    }

    // 4. Evento: Cerrar Sesión
    if (btnLogout) {
        btnLogout.addEventListener('click', function() {
            auth.signOut()
                .then(() => {
                    console.log("Sesión finalizada correctamente.");
                })
                .catch((error) => {
                    console.error("Error al cerrar sesión:", error);
                });
        });
    }

    // 5. Listener de cambio de estado (Login / Logout dinámico)
    auth.onAuthStateChanged((user) => {
        if (user) {
            // Usuario en sesión
            userName.textContent = user.displayName || "Usuario registrado";
            userEmail.textContent = user.email || "";
            userPhoto.src = user.photoURL || "images/logo_emperadores_ajustado.png";

            loggedOutView.classList.add('hidden');
            loggedInView.classList.remove('hidden');
        } else {
            // Sin sesión
            loggedOutView.classList.remove('hidden');
            loggedInView.classList.add('hidden');
        }
    });
});