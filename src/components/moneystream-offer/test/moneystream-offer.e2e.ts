import { newE2EPage } from '@stencil/core/testing';

describe('moneystream-offer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<moneystream-offer></moneystream-offer>');

    const element = await page.find('moneystream-offer');
    expect(element).toHaveClass('hydrated');
  });
});
