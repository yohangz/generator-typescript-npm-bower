import Wish,{IGiftHolder} from '../../src/main/Wish';
<% if (testFramework === 'mocha') { -%>
import {expect} from 'chai';
<% } -%>

<% switch (testFramework) {
  case 'jasmine': -%>
describe('Wish Test ', () => {
  let wish: Wish;
  let myObj: IGiftHolder;

  beforeEach(function () {
    myObj = {title: 'hello'};
    wish = new Wish();
  });
  it('Should return the gift title', () => {
    expect(wish.printGiftTitle(myObj)).toBe('hello');
  });
});
<% break;
  case 'mocha':-%>
describe('Wish Test ', () => {

  let wish: Wish;
  let myObj: IGiftHolder;

  beforeEach(function () {
    myObj = {title: 'hello'};
    wish = new Wish();
  });
  it('Should return the gift title', () => {
    expect(wish.printGiftTitle(myObj)).to.equal('hello');
  });
});
<% break;
} -%>
