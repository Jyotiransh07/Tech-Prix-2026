const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(process.cwd(), 'tech-prix-app/public/Ferrari_F1_Keyframes_Lossless/frames');
const tempDir = path.join(process.cwd(), 'tech-prix-app/public/Ferrari_F1_Keyframes_Lossless/temp_frames');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

async function enhanceImages() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} images to enhance.`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(tempDir, file);

    await sharp(inputPath)
      // Sharpen to enhance edge details
      .sharpen({ sigma: 1.2, m1: 1.0, m2: 0.7 })
      // Increase saturation, contrast and brightness slightly for high-end feel
      .modulate({
        brightness: 1.08,
        saturation: 1.25
      })
      .png()
      .toFile(outputPath);

    if (i % 20 === 0) {
      console.log(`Processed ${i} / ${files.length} images...`);
    }
  }

  // Replace old images with enhanced ones
  fs.rmSync(inputDir, { recursive: true, force: true });
  fs.renameSync(tempDir, inputDir);

  console.log('Successfully enhanced all F1 frames!');
}

enhanceImages().catch(err => {
  console.error("Error enhancing images:", err);
});
