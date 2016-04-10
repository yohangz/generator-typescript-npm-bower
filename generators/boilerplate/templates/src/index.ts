import Greeter from './main/Greeter';

/**
 * Export Greeter to public as typescript modules.
 */
export {
    Greeter
};

/**
 * Export Greeter to public by binding them to the window property.
 */
window['App'] = {
    'Greeter':Greeter
};
