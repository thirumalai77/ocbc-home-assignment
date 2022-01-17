//getting user data from session storage
export const getUser = () => {
    const userDetails = sessionStorage.getItem('userInfo');
    if(userDetails) return JSON.parse(userDetails); else return null;
}

//removing token and userinfo from session storage
export const userLogout = () => {
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('authorizationToken');
}

//getting token from session storage
export const getToken = () => {
    return sessionStorage.getItem('authorizationToken') || null;
}

// setting logged in user details in session storage
export const setUserSession = (token,userDetails) => {
    sessionStorage.setItem('authorizationToken',token);
    sessionStorage.setItem('userInfo',JSON.stringify(userDetails));
}

//Formatting date
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('de-DE', { day: 'numeric', year:"numeric", month:"short"}).
    split('.').join(' ');
}

  //format number
export const formatNumber = (number) => {
    return number.toLocaleString('en-US', {minimumFractionDigits:2})
}
