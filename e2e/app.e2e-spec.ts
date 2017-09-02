import { NGXDEMOPage } from './app.po';

describe('ngx-demo App', () => {
  let page: NGXDEMOPage;

  beforeEach(() => {
    page = new NGXDEMOPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
