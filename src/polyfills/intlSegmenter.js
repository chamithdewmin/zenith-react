if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'undefined') {
  class BasicSegmenter {
    constructor(locale = 'en', options = {}) {
      this.locale = locale;
      this.options = options;
    }

    segment(input = '') {
      const text = String(input);
      return [
        {
          segment: text,
          index: 0,
          input: text,
          isWordLike: true
        }
      ][Symbol.iterator]();
    }

    resolvedOptions() {
      return {
        locale: this.locale,
        granularity: this.options.granularity || 'grapheme'
      };
    }
  }

  Intl.Segmenter = BasicSegmenter;
}




