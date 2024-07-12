// Function to verify if the user is authenticated
export const isAuthenticated = () => {
    const userData = localStorage.getItem('userData');
    return userData ? true : false;
};

// Function to get user data including role_id and role_name
export const getUserData = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData;
};

// Function to get the role ID of the user
export const getUserRoleId = () => {
    const userData = getUserData();
    return userData ? userData.role_id : null;
};

// Function to get the role name of the user
export const getUserRoleName = () => {
    const userData = getUserData();
    return userData ? userData.role_name : null;
};

// Function to remove user data from localStorage
export const removeUserData = () => {
    localStorage.removeItem('userData');
};