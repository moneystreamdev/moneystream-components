import { newSpecPage } from '@stencil/core/testing';
import { MoneystreamAd } from '../moneystream-ad';

describe('moneystream-ad', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MoneystreamAd],
      html: `<moneystream-ad></moneystream-ad>`,
    });
    expect(page.root).toEqualHtml(`
      <moneystream-ad>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </moneystream-ad>
    `);
  });
});
