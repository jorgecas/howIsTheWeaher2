import { HowIsTheWeatherPage } from './app.po';

describe('how-is-the-weather App', function() {
  let page: HowIsTheWeatherPage;

  beforeEach(() => {
    page = new HowIsTheWeatherPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
