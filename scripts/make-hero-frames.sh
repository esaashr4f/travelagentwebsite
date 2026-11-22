#!/usr/bin/env bash
# Turn a hero clip into the still frames the scroll-scrubbed hero draws on a canvas.
#   scripts/make-hero-frames.sh path/to/clip.mp4 [step]
# step: keep every Nth frame (default 2; 24fps clip -> 12 stills per second of footage).
# Writes public/hero-sequence/f000.webp ... and prints the frame count to put in
# heroSequence.count in src/data/site.ts.
set -euo pipefail
clip="$1"; step="${2:-2}"
out="$(dirname "$0")/../public/hero-sequence"
rm -rf "$out" && mkdir -p "$out"
ffmpeg -v error -i "$clip" -vf "select=not(mod(n\,$step)),scale='min(1600,iw)':-2" -vsync vfr \
  -c:v libwebp -quality 72 -start_number 0 "$out/f%03d.webp"
count=$(ls "$out" | wc -l)
echo "frames: $count  size: $(du -sh "$out" | cut -f1)"
