import { newSpecPage } from '@stencil/core/testing';
import { MoneystreamWatchdog } from '../moneystream-watchdog';

describe('moneystream-watchdog', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MoneystreamWatchdog],
      html: `<moneystream-watchdog></moneystream-watchdog>`,
    });
    expect(page.root).toEqualHtml(`
      <moneystream-watchdog>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </moneystream-watchdog>
    `);
  });
});
