// Configuration for Tesseract.js in static builds
window.TESSERACT_CONFIG = {
  workerPath: '/tesseract/worker.min.js',
  corePath: '/tesseract/tesseract-core.wasm.js',
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
