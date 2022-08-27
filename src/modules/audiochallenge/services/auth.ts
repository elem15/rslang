export const isAuthenticated = (): boolean => {
    if (localStorage.getItem('email')) return true;
    return false;
};
