"""
Video conversion script to convert MOV to MP4 for web compatibility
Run this script to convert the video file to MP4 format
"""

import os
import sys

def convert_mov_to_mp4():
    input_file = "videos/IMG_0-HBG-Pour.MOV"
    output_file = "videos/IMG_0-HBG-Pour.mp4"
    
    if not os.path.exists(input_file):
        print(f"Error: {input_file} not found!")
        return False
    
    # Try using ffmpeg via subprocess
    try:
        import subprocess
        cmd = [
            'ffmpeg',
            '-i', input_file,
            '-c:v', 'libx264',
            '-preset', 'medium',
            '-crf', '23',
            '-c:a', 'aac',
            '-b:a', '128k',
            '-movflags', '+faststart',
            '-y',  # Overwrite output file
            output_file
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"Successfully converted to {output_file}")
            return True
        else:
            print(f"FFmpeg error: {result.stderr}")
            return False
            
    except FileNotFoundError:
        print("FFmpeg not found. Please install FFmpeg or use an online converter.")
        print("\nAlternative: Use an online converter like:")
        print("1. CloudConvert (https://cloudconvert.com/mov-to-mp4)")
        print("2. FreeConvert (https://www.freeconvert.com/mov-to-mp4)")
        print(f"\nConvert {input_file} to MP4 and save as {output_file}")
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    print("Converting MOV to MP4 for web compatibility...")
    convert_mov_to_mp4()

