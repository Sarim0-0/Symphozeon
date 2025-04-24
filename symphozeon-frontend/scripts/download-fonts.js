// This script downloads the required font files for local usage
// Run this script with: node scripts/download-fonts.js

const fs = require("fs")
const path = require("path")
const https = require("https")

const FONTS_DIR = path.join(__dirname, "../public/fonts")

// Create fonts directory if it doesn't exist
if (!fs.existsSync(FONTS_DIR)) {
  fs.mkdirSync(FONTS_DIR, { recursive: true })
}

// Font files to download
const fontFiles = [
  {
    url: "https://fonts.gstatic.com/s/cinzeldecorative/v16/daaCSScvJGqLYhG8nNt8KPPswUAPni7TTMw.woff2",
    path: path.join(FONTS_DIR, "CinzelDecorative-Regular.woff2"),
  },
  {
    url: "https://fonts.gstatic.com/s/cinzeldecorative/v16/daaHSScvJGqLYhG8nNt8KPPswUAPniZQa-lK.woff2",
    path: path.join(FONTS_DIR, "CinzelDecorative-Bold.woff2"),
  },
  {
    url: "https://fonts.gstatic.com/s/cinzeldecorative/v16/daaHSScvJGqLYhG8nNt8KPPswUAPniZQXelK.woff2",
    path: path.join(FONTS_DIR, "CinzelDecorative-Black.woff2"),
  },
]

// Download function
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath)
    https
      .get(url, (response) => {
        response.pipe(file)
        file.on("finish", () => {
          file.close(resolve)
          console.log(`Downloaded: ${filePath}`)
        })
      })
      .on("error", (err) => {
        fs.unlink(filePath, () => {}) // Delete the file if there's an error
        reject(err)
      })
  })
}

// Download all fonts
async function downloadAllFonts() {
  try {
    for (const font of fontFiles) {
      await downloadFile(font.url, font.path)
    }
    console.log("All fonts downloaded successfully!")
  } catch (error) {
    console.error("Error downloading fonts:", error)
  }
}

downloadAllFonts()
