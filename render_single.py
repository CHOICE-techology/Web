import asyncio, sys, base64, json
from playwright.async_api import async_playwright
# usage: shot.py out.png "#hash" [w h] [mode: still|frame]
async def main():
    out, h = sys.argv[1], sys.argv[2]
    w, hh = (int(sys.argv[3]), int(sys.argv[4])) if len(sys.argv) > 4 else (1920, 1080)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'])
        pg = await b.new_page(viewport={'width': w, 'height': hh}, device_scale_factor=1)
        logs=[]; pg.on('console', lambda m: logs.append(m.text)); pg.on('pageerror', lambda e: logs.append('ERR '+str(e)))
        await pg.goto('http://localhost:8811/index.html' + h)
        await pg.wait_for_function('window.studioFrame', timeout=120000)
        n = int(h.split('frame-')[1].split('-')[0]) if 'frame-' in h else 210
        url = await pg.evaluate(f'window.studioFrame({n})')
        open(out,'wb').write(base64.b64decode(url.split(',')[1]))
        print(json.dumps(await pg.evaluate('window.studioStats()'))); print('\n'.join([l[:600] for l in logs if 'ERROR' in l or 'ERR' in l][:3]))
        await b.close()
asyncio.run(main())
