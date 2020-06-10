export const set = (hs) => localStorage.setItem('typing-timeout-hs', hs);
export const get = () => { let hs = localStorage.getItem('typing-timeout-hs'); return (hs ? parseInt(hs) : 0) }; 