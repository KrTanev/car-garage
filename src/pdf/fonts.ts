import { Font } from '@react-pdf/renderer';
// Noto Sans (Cyrillic subset) bundled locally so generated PDFs render
// Bulgarian text correctly. The default PDF fonts (Helvetica etc.) only
// cover Latin characters — Cyrillic text with them renders as blank boxes.
import notoSansRegular from '@fontsource/noto-sans/files/noto-sans-cyrillic-400-normal.woff';
import notoSansBold from '@fontsource/noto-sans/files/noto-sans-cyrillic-700-normal.woff';

export const PDF_FONT_FAMILY = 'NotoSans';

let registered = false;

export function registerPdfFonts() {
  if (registered) return;
  Font.register({
    family: PDF_FONT_FAMILY,
    fonts: [
      { src: notoSansRegular, fontWeight: 400 },
      { src: notoSansBold, fontWeight: 700 },
    ],
  });
  registered = true;
}
