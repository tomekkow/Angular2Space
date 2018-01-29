import { AngularspacePage } from './app.po';

xdescribe('angularspace App', () => {
  let page: AngularspacePage;

  beforeEach(() => {
    page = new AngularspacePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
