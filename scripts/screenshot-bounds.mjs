// A screenshot is diagnostic evidence, not a prerequisite for a WCAG check.
// Firefox cannot capture full-page images taller than 32,767 pixels.
// Preserve viewport evidence only for that exact protocol limitation.
const FIREFOX_HEIGHT_LIMIT = /Cannot take screenshot larger than 32767/i;

export async function captureScreenshotWithSizeFallback(page, options, onFallback = () => {}) {
  try {
    await page.screenshot(options);
    return "requested";
  } catch (error) {
    if (options.fullPage !== true || !FIREFOX_HEIGHT_LIMIT.test(String(error?.message ?? error))) {
      throw error;
    }
    await page.screenshot({ ...options, fullPage: false });
    onFallback();
    return "viewport-fallback";
  }
}
