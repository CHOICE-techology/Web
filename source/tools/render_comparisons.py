import asyncio, sys, base64
from playwright.async_api import async_playwright
# batch.py name=hash ...   renders the 7 s end state (hero) for each
async def one(b, name, h):
    pg = await b.new_page(viewport={'width':1920,'height':1080}, device_scale_factor=1)
    errs=[]; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.goto('http://localhost:8811/index.html#capture-clean-' + h)
    await pg.wait_for_function('window.studioFrame', timeout=120000)
    url = await pg.evaluate('window.studioFrame(210)')
    open(f'./out/{name}.png','wb').write(base64.b64decode(url.split(',')[1])); print(name, errs); await pg.close()
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'])
        for a in sys.argv[1:]:
            n,h=a.split('=',1); await one(b,n,h)
        await b.close()
asyncio.run(main())
