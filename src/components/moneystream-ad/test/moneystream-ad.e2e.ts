import { newE2EPage } from '@stencil/core/testing';

describe('moneystream-ad', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<moneystream-ad></moneystream-ad>');

    const element = await page.find('moneystream-ad');
    expect(element).toHaveClass('hydrated');
  });
});
