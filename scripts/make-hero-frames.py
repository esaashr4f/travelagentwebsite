#!/usr/bin/env python3
"""Turn a hero clip into the still frames the scroll-scrubbed hero draws on a canvas.

    python3 scripts/make-hero-frames.py path/to/clip.mp4 [--frames 150] [--balance 0.5]

AI drone clips rarely move at an even speed: they ease in through cloud, then race. Picking
frames evenly in time would leave a long stretch of scrolling where nothing changes, then a
rush. So frames are picked along a blend of time and on-screen motion:
    --balance 0  evenly in time (the clip's own pacing)
    --balance 1  evenly in motion (every scroll step changes the picture equally)
Writes public/hero-sequence/f000.webp ... and prints the count for heroSequence.count in
src/data/site.ts. Needs ffmpeg.
"""
import argparse, pathlib, shutil, subprocess, tempfile

ap = argparse.ArgumentParser()
ap.add_argument('clip')
ap.add_argument('--frames', type=int, default=150)
ap.add_argument('--balance', type=float, default=0.5)
ap.add_argument('--quality', type=int, default=70)
a = ap.parse_args()
out = pathlib.Path(__file__).resolve().parent.parent / 'public' / 'hero-sequence'

# 1. How much does the picture change from each frame to the next? (small greyscale copy)
w, h = 160, 90
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', a.clip, '-vf', f'scale={w}:{h},format=gray',
                      '-f', 'rawvideo', '-'], capture_output=True, check=True).stdout
n = w * h
frames = [raw[i:i + n] for i in range(0, len(raw), n)]
total = len(frames)
diff = [0.0] + [sum(abs(x - y) for x, y in zip(frames[i], frames[i - 1])) / n for i in range(1, total)]

# 2. Blend cumulative time and cumulative motion, then pick frames at even steps along it.
motion, acc = [], 0.0
for d in diff:
    acc += d
    motion.append(acc)
curve = [(1 - a.balance) * i / (total - 1) + a.balance * motion[i] / motion[-1] for i in range(total)]
picks, j = [], 0
for k in range(a.frames):
    target = k / (a.frames - 1)
    while j < total - 1 and curve[j] < target:
        j += 1
    picks.append(j)

# 3. Export the picked frames as WebP, numbered in order.
with tempfile.TemporaryDirectory() as tmp:
    subprocess.run(['ffmpeg', '-v', 'error', '-i', a.clip, '-vf', "scale='min(1600,iw)':-2",
                    '-c:v', 'libwebp', '-quality', str(a.quality), '-start_number', '0',
                    f'{tmp}/a%04d.webp'], check=True)
    shutil.rmtree(out, ignore_errors=True)
    out.mkdir(parents=True)
    for k, i in enumerate(picks):
        shutil.copy(f'{tmp}/a{i:04d}.webp', out / f'f{k:03d}.webp')

size = sum(f.stat().st_size for f in out.iterdir()) / 1e6
print(f'frames: {len(picks)} from {total} (unique {len(set(picks))})  size: {size:.1f} MB')
