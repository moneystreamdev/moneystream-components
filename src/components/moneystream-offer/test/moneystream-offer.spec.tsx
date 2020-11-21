import { newSpecPage } from '@stencil/core/testing';
import { MoneystreamOffer } from '../moneystream-offer';

describe('moneystream-offer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MoneystreamOffer],
      html: `<moneystream-offer></moneystream-offer>`,
    });
    expect(page.root).toEqualHtml(`
      <moneystream-offer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </moneystream-offer>
    `);
  });
});
