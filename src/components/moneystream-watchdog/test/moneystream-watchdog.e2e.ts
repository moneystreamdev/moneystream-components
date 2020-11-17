import { newE2EPage } from '@stencil/core/testing';

describe('moneystream-watchdog', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<moneystream-watchdog></moneystream-watchdog>');

    const element = await page.find('moneystream-watchdog');
    expect(element).toHaveClass('hydrated');
  });
});
