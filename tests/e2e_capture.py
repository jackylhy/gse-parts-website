"""Re-run live RFQ, capture the REAL FormSubmit response the browser receives."""
import time, json
from playwright.sync_api import sync_playwright

URL = "https://jackylhy.github.io/gse-parts-website/"
captured = []

with sync_playwright() as pw:
    b = pw.chromium.launch()
    page = b.new_page(viewport={"width": 1360, "height": 900})

    def on_response(resp):
        if "formsubmit" in resp.url:
            try:
                body = resp.text()
            except Exception as e:
                body = f"<no body: {e}>"
            captured.append({"status": resp.status, "url": resp.url, "body": body[:300]})
    page.on("response", on_response)

    page.goto(URL, wait_until="networkidle")
    time.sleep(0.5)
    page.fill("#cName", "E2E Live Test 3")
    page.fill("#cCompany", "Hermes QA")
    page.fill("#cEmail", "qa.probe@jackylhy.dev")
    page.fill("#cPhone", "+852 2000 0000")
    page.fill("#cMsg", "Response capture run. Marker C-BROWSER.")
    page.click("#rfqForm button[type=submit]")
    for _ in range(30):
        time.sleep(1)
        if page.locator("#formOk").is_visible():
            break
    print("success panel:", page.locator("#formOk").is_visible())
    b.close()

print(json.dumps(captured, indent=1))
