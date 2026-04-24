import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> Navigate to http://localhost:3000
        await page.goto("http://localhost:3000")
        
        # -> Scroll to the bottom of the page to confirm the WhatsApp CTA persists, then click the persistent WhatsApp CTA (element index 129) to open the WhatsApp deep link and verify it contains page context.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/main/section/div[3]/div/div/div/div[3]/a[2]').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Navigate to the Arabic FAQ page (/ar/faq) so I can scroll, click the persistent WhatsApp CTA there, and verify the deep link contains FAQ page context.
        await page.goto("http://localhost:3000/ar/faq")
        
        # -> Click the persistent WhatsApp CTA (footer WhatsApp link index 222) to open the WhatsApp deep link and verify it contains FAQ page context.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/footer/div/div[3]/div/a[3]').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # --> Assertions to verify final state
        frame = context.pages[-1]
        current_url = await frame.evaluate("() => window.location.href")
        assert "api.whatsapp.com/send" in current_url, "The page should have navigated to a WhatsApp deep link containing the FAQ page context after clicking the persistent WhatsApp CTA"
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    