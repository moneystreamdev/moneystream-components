import { newSpecPage } from '@stencil/core/testing';
import { MoneystreamDash } from '../moneystream-dash';

describe('moneystream-dash', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MoneystreamDash],
      html: `<moneystream-dash></moneystream-dash>`,
    });
    expect(page.root).toEqualHtml(`
      <moneystream-dash>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </moneystream-dash>
    `);
  });
});
