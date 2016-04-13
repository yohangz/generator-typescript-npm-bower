import Wish,{IGiftHolder} from '../../src/main/Wish';

describe('Wish Test ', () => {

    let consoleSpy: any;
    let wish: Wish;
    let myObj: IGiftHolder;

    beforeEach(function () {
        consoleSpy = spyOn(console,'log');
        myObj = {title: 'hello'};
        wish = new Wish();
    });
    it('Should return the gift title', () => {
        wish.printGiftTitle(myObj);
        expect(consoleSpy).toHaveBeenCalledWith('hello');
    });
 });
