import { NgcoffeePage } from './app.po';

describe('ngcoffee App', () => {
  let page: NgcoffeePage;

  beforeEach(() => {
    page = new NgcoffeePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
