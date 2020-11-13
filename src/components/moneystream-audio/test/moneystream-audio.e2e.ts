import { newE2EPage } from '@stencil/core/testing';

describe('moneystream-audio', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<moneystream-audio></moneystream-audio>');

    const element = await page.find('moneystream-audio');
    expect(element).toHaveClass('hydrated');
  });
});
