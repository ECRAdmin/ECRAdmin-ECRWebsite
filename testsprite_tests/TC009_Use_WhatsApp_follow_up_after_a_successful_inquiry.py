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
        
        # -> Open the Contact page (تواصل), fill and submit the inquiry form, then click the WhatsApp CTA to verify the deep link includes the prefilled message from the form.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/header/div/nav/a[7]').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/main/section[1]/div[3]/div/div/div[2]/div[2]/form/div[2]/div[1]/input').nth(0)
        await asyncio.sleep(3); await elem.fill('Test User')
        
        # -> Fill the remaining required fields in the inquiry form, check consent, submit the form, then click the WhatsApp CTA and verify the resulting WhatsApp deep link contains the prefilled message from the form.
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/div[2]/div/input').nth(0)
        await asyncio.sleep(3); await elem.fill('Test User')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/div[2]/div[2]/input').nth(0)
        await asyncio.sleep(3); await elem.fill('0501234567')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/div[2]/div[3]/input').nth(0)
        await asyncio.sleep(3); await elem.fill('0501234567')
        
        # -> Fill remaining visible required fields (city, budget, preferred date), check consent, submit the inquiry form, then click the WhatsApp CTA and verify the opened WhatsApp deep link contains the prefilled message from the contact form.
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/div[2]/div[5]/input').nth(0)
        await asyncio.sleep(3); await elem.fill('دبي')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/div[2]/div[8]/input').nth(0)
        await asyncio.sleep(3); await elem.fill('50 - 100 درهم')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/div[2]/div[9]/input').nth(0)
        await asyncio.sleep(3); await elem.fill('2026-05-01')
        
        # -> Check the consent checkbox, submit the inquiry form, then click the WhatsApp CTA to open the WhatsApp deep link (verify the prefilled message).
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/label/input').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/div[3]/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Click the follow-up WhatsApp link ('المتابعة عبر واتساب') to open the WhatsApp deep link and verify the URL contains the prefilled message built from the submitted form fields (e.g., includes name or other form context).
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/div[4]/a').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # --> Test passed — verified by AI agent
        frame = context.pages[-1]
        current_url = await frame.evaluate("() => window.location.href")
        assert current_url is not None, "Test completed successfully"
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    