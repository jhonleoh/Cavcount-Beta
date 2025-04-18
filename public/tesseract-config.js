// Configuration for Tesseract.js in static builds
window.TESSERACT_CONFIG = {
  workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@6.0.1/dist/worker.min.js',
  corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@6.0.0/dist/tesseract-core.wasm.js',
  langPath: 'https://tessdata.projectnaptha.com/4.0.0'
};

// Add basic debug info to help diagnose issues
window.TESSERACT_DEBUG_INFO = {
  loadedAt: new Date().toISOString(),
  environment: {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language
  }
};

// Log the configuration
console.log('Tesseract configuration loaded:', window.TESSERACT_CONFIG);
