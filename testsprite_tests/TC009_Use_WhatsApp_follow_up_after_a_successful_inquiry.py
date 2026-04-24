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
        
        # -> Open the contact page by clicking the 'تواصل' (Contact) link in the nav.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/header/div/nav/a[7]').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Fill the remaining form fields (WhatsApp number, pickup city, budget band, preferred date, notes), toggle the consent checkbox, and submit the inquiry form.
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/div[2]/div[4]/input').nth(0)
        await asyncio.sleep(3); await elem.fill('05551234567')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/div[2]/div[6]/input').nth(0)
        await asyncio.sleep(3); await elem.fill('دبي')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/div[2]/div[9]/input').nth(0)
        await asyncio.sleep(3); await elem.fill('50 - 100')
        
        # -> Fill the preferred date and notes fields, toggle the consent checkbox, and submit the inquiry form.
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/div[2]/div[10]/input').nth(0)
        await asyncio.sleep(3); await elem.fill('2026-05-01')
        
        frame = context.pages[-1]
        # Input text
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/div[2]/div[11]/textarea').nth(0)
        await asyncio.sleep(3); await elem.fill('اختبار: أحتاج السيارة لمدة 3 أيام. شكراً.')
        
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/label/input').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Click the form submit button (إرسال الطلب) to submit the inquiry. After submission the next step will be to click the WhatsApp CTA and verify the opened deep link contains the prefilled message from the contact form.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/div[3]/button').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # -> Click the WhatsApp CTA on the contact page to open the WhatsApp deep link and verify the opened URL or new tab includes the prefilled message with contact context (name, city, notes).
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=/html/body/main/section[2]/div/form/div[3]/a').nth(0)
        await asyncio.sleep(3); await elem.click()
        
        # --> Assertions to verify final state
        frame = context.pages[-1]
        assert await frame.locator("xpath=//*[contains(., 'اختبار: أحتاج السيارة لمدة 3 أيام. شكراً.')]").nth(0).is_visible(), "The WhatsApp message should include the inquiry notes from the contact form after submitting and clicking the WhatsApp CTA"
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    