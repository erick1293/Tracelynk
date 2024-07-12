// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
    const userData = localStorage.getItem('userData');
    return userData ? true : false;
};

// Función para obtener los datos del usuario
export const getUserData = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData;
};

// Función para obtener el ID del rol del usuario
export const getUserRole = () => {
    const userData = getUserData();
    return userData ? userData.role_id : null;
};

// Función para eliminar los datos del usuario del localStorage
export const removeUserData = () => {
    localStorage.removeItem('userData');
};
