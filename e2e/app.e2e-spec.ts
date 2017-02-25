import { KobiAngMaterialPage } from './app.po';

describe('kobi-ang-material App', () => {
  let page: KobiAngMaterialPage;

  beforeEach(() => {
    page = new KobiAngMaterialPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
