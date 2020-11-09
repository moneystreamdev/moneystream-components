import { newSpecPage } from '@stencil/core/testing';
import { MoneystreamVideo } from '../moneystream-video';

describe('moneystream-video', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MoneystreamVideo],
      html: `<moneystream-video></moneystream-video>`,
    });
    expect(page.root).toEqualHtml(`
      <moneystream-video>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </moneystream-video>
    `);
  });
});
