import { newE2EPage } from '@stencil/core/testing';

describe('moneystream-dash', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<moneystream-dash></moneystream-dash>');

    const element = await page.find('moneystream-dash');
    expect(element).toHaveClass('hydrated');
  });
});
