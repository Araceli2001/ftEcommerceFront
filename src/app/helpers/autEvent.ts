export const loginEvent = new Event('login');
export const logoutEvent = new Event('logout');

export const triggerLoginEvent = () => {
    window.dispatchEvent(loginEvent);
};



export const triggerLogoutEvent = () => {
    window.dispatchEvent(logoutEvent);
};
