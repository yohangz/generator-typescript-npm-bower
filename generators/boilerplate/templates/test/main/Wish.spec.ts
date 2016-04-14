import Wish,{IGiftHolder} from '../../src/main/Wish';

<% if ((browser && (testFramework === 'mocha')) || !browser) { -%>
import {expect} from 'chai';
<% } -%>

<% if (browser) { -%>
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
<% } else { -%>
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
<% } -%>
