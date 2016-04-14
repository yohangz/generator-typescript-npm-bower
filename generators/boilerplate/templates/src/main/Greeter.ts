import * as _ from 'lodash';
import Wish,{IGiftHolder}  from './Wish';

/**
 * @Class representing a Greeter.
 */
export default class Greeter {

    wish: Wish;

    /** Create an Greeter. */
    constructor() {
        this.wish = new Wish();
    }

    /**
     * Check input is a string and Prints the input.
     * @param title  string.
     */
    greet(title : string): string {

        let myObj : IGiftHolder;

        /** Check title is string using lodash. */
        if(_.isString(title)) {
            myObj = {
                title: title
            };
        } else {
            myObj = {
                title: 'Hello World'
            };
        }

        return this.wish.printGiftTitle(myObj);
    }
}
