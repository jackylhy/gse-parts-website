"""E2E: live site RFQ submission -> FormSubmit -> Gmail. Then verify email arrives."""
import time, re, json
from playwright.sync_api import sync_playwright

URL = "https://jackylhy.github.io/gse-parts-website/"
results = []
def record(name, ok, detail=""):
    results.append((name, ok, detail))

with sync_playwright() as pw:
    b = pw.chromium.launch()
    page = b.new_page(viewport={"width": 1360, "height": 900})
    page.goto(URL, wait_until="networkidle")
    time.sleep(0.5)

    # scroll to form, fill like a real customer
    page.fill("#cName", "E2E Live Test")
    page.fill("#cCompany", "Hermes QA")
    page.fill("#cEmail", "qa.probe@jackylhy.dev")
    page.fill("#cPhone", "+852 2000 0000")
    page.fill("#cMsg", "Please quote: TR-1142L x2, TR-1142R x2 — delivered to HKG.")
    page.click("#rfqForm button[type=submit]")
    # wait for the real network round-trip
    for _ in range(30):
        time.sleep(1)
        if page.locator("#formOk").is_visible():
            break
    record("live submission shows success", page.locator("#formOk").is_visible())
    err = page.text_content("#eMsg")
    record("no error shown", err == "", err)
    b.close()

print(json.dumps([{"check": n, "ok": o, "d": d} for n, o, d in results], ensure_ascii=False, indent=1))
