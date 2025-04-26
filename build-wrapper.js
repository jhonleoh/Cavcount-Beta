// Simple build wrapper that sets environment variables for Next.js build
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Process environment variables
process.env.NEXT_DISABLE_TYPESCRIPT_CHECK = 'true';
process.env.NEXT_SKIP_LINT = 'true';
process.env.NEXT_IGNORE_TYPESCRIPT_ERRORS = 'true';
process.env.NEXT_TYPESCRIPT_CHECK = 'false';

// Function to copy HTML files from public to out directory
const copyHtmlFiles = () => {
  console.log('Copying HTML files from public to out directory...');
  const publicDir = path.resolve(process.cwd(), 'public');
  const outDir = path.resolve(process.cwd(), 'out');

  // Ensure out directory exists
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Read public directory
  try {
    const files = fs.readdirSync(publicDir);

    // Find and copy HTML files
    let htmlCount = 0;
    files.forEach(file => {
      if (file.endsWith('.html')) {
        const srcPath = path.join(publicDir, file);
        const destPath = path.join(outDir, file);
        fs.copyFileSync(srcPath, destPath);
        htmlCount++;
        console.log(`Copied ${file} to out directory`);
      }
    });

    console.log(`Copied ${htmlCount} HTML files successfully`);
  } catch (error) {
    console.error('Error copying HTML files:', error);
  }
};

// Run the Next.js build command
const buildArgs = ['build', '--no-lint'];
const buildProcess = spawn('next', buildArgs, {
  stdio: 'inherit',
  env: { ...process.env }
});

// Exit with the same code as the build process
buildProcess.on('close', (code) => {
  if (code === 0) {
    // Copy HTML files after successful build
    copyHtmlFiles();
  }
  process.exit(code);
});

// Handle process termination signals
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    process.exit(0);
  });
});
