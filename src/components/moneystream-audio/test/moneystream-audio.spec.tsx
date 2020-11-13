import { newSpecPage } from '@stencil/core/testing';
import { MoneystreamAudio } from '../moneystream-audio';

describe('moneystream-audio', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MoneystreamAudio],
      html: `<moneystream-audio></moneystream-audio>`,
    });
    expect(page.root).toEqualHtml(`
      <moneystream-audio>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </moneystream-audio>
    `);
  });
});
