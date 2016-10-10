/**
 * Breakpoint threshold measurements in pixels.
 */
const THRESHOLDS = {
  mobile: 414,
  tablet: 768,
  smallDesktop: 1023,
  largeDesktop: 1440
};

/**
 * Breakpoint mapping
 *
 *  - In rendered markup, these are converted to dasherized element classes
 *    and prefaced with "media-".
 *  - In interpolated HTMLBars contexts, these are prefaced with "is",
 *    camelized, and available on the `media` object
 *      - for example, "{{#if media.isMobile}}"
 */
export default {
  mobile: `(max-width: ${THRESHOLDS.mobile}px)`,
  tablet: `(min-width: ${THRESHOLDS.mobile + 1}px) and (max-width: ${THRESHOLDS.tablet}px)`,
  smallDesktop: `(min-width: ${THRESHOLDS.tablet + 1}px) and (max-width: ${THRESHOLDS.smallDesktop}px)`,
  largeDesktop: `(min-width: ${THRESHOLDS.smallDesktop + 1}px)`,  // AKA "monitor"

  // meta semantic helpers
  greaterThanMobile: `(min-width: ${THRESHOLDS.mobile + 1}px)`,
  greaterThanTablet: `(min-width: ${THRESHOLDS.tablet + 1}px)`,
  greaterThanSmallDesktop: `(min-width: ${THRESHOLDS.smallDesktop + 1}px)`,
  greaterThanLargeDesktop: `(min-width: ${THRESHOLDS.largeDesktop + 1}px)`,

  lessThanTablet: `(max-width: ${THRESHOLDS.tablet}px)`,
  lessThanSmallDesktop: `(max-width: ${THRESHOLDS.tablet}px)`,
  lessThanLargeDesktop: `(max-width: ${THRESHOLDS.smallDesktop}px)`
};
