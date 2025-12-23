# Video Conversion Instructions

The video background requires an MP4 file for proper browser compatibility. The current `.MOV` file needs to be converted.

## Quick Conversion Options:

### Option 1: Online Converter (Easiest)
1. Go to https://cloudconvert.com/mov-to-mp4 (or https://www.freeconvert.com/mov-to-mp4)
2. Upload `videos/IMG_0-HBG-Pour.MOV`
3. Convert to MP4 format
4. Download the converted file
5. Save it as `videos/IMG_0-HBG-Pour.mp4` (replace the existing file if prompted)

### Option 2: Using FFmpeg (If Installed)
If you have FFmpeg installed, run:
```bash
ffmpeg -i videos/IMG_0-HBG-Pour.MOV -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart videos/IMG_0-HBG-Pour.mp4
```

### Option 3: Using Python Script
Run the provided conversion script:
```bash
python convert_video.py
```
(Note: Requires FFmpeg to be installed)

## After Conversion:
Once you have `videos/IMG_0-HBG-Pour.mp4`, the video should automatically play in the background with:
- ✅ Continuous loop
- ✅ Same fade/transparency effects
- ✅ Same size and positioning
- ✅ Sepia filter applied

The code is already set up to use the MP4 file first, then fall back to MOV if needed.

