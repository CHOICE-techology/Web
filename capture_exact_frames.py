import asyncio, base64, time
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'])
        pg = await b.new_page(viewport={'width':1920,'height':1080}, device_scale_factor=1)
        await pg.goto('http://localhost:8811/index.html#capture-clean-mat-a')
        await pg.wait_for_function('window.studioFrame', timeout=120000)
        t=time.time()
        for n in range(210):
            url = await pg.evaluate(f'window.studioFrame({n})')
            open(f'./frames/f{n:03d}.png','wb').write(base64.b64decode(url.split(',')[1]))
            if n%30==0: print(n, round(time.time()-t), flush=True)
        await b.close()
asyncio.run(main())
