import { newE2EPage } from '@stencil/core/testing';

describe('moneystream-video', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<moneystream-video></moneystream-video>');

    const element = await page.find('moneystream-video');
    expect(element).toHaveClass('hydrated');
  });
});
