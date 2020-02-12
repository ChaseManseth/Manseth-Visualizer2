import { observable, decorate } from 'mobx';

// Global State
const appState = {
    jwt: null,
    user: null
};

// Decorating Global State
decorate(appState, {
    jwt: observable,
    user: observable
});


// Global State
export const globalState = {
    appState: appState,
};