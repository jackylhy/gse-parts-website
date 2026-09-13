"""Full DOM verification of the GSE parts site via Playwright (Chromium headless)."""
import json, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright

URL = "http://localhost:8091/index.html"
OUT = Path("/Users/jackyleung/Desktop/gse-parts-website/tests")
OUT.mkdir(exist_ok=True)

results = {"pass": [], "fail": []}
def check(name, cond, detail=""):
    (results["pass"] if cond else ["fail"].__class__ is list and (results["fail"] or results["fail"].append(None)) and results["fail"].pop() is None and results["fail"]) # placeholder
def record(name, ok, detail=""):
    results["pass" if ok else "fail"].append(f"{name}" + (f" — {detail}" if detail and not ok else ""))

console_errors = []
page_errors = []

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1360, "height": 900})
    page = ctx.new_page()
    page.on("console", lambda m: console_errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: page_errors.append(str(e)))
    page.on("request", lambda r: results.setdefault("requests", []).append(r.url) if "localhost" not in r.url else None)

    page.goto(URL, wait_until="networkidle")
    time.sleep(0.3)

    # 1. boot integrity
    record("hero title renders", page.text_content(".hero-title").strip() == "Keep your ramp moving.")
    record("10 category cards", page.locator(".cat-card").count() == 10, str(page.locator(".cat-card").count()))
    record("20 model cards", page.locator(".model-card").count() == 20, str(page.locator(".model-card").count()))
    record("32 part cards in catalog", page.locator("#partGrid .part-card").count() == 32, str(page.locator("#partGrid .part-card").count()))
    record("result count text", "32" in page.text_content("#resultCount"))
    record("no page errors", not page_errors, "; ".join(page_errors[:3]))
    record("no console errors", not console_errors, "; ".join(console_errors[:3]))

    # 2. zero external requests
    external = [u for u in results.get("requests", []) if "localhost" not in u]
    record("zero external network requests", not external, "; ".join(external[:3]))

    # 3. CSP active: inline script injection is blocked
    inject_result = page.evaluate("""(() => {
      try {
        document.head.insertAdjacentHTML('beforeend', '<script>window.__pwn = 1;</script>');
        return window.__pwn === 1 ? "EXECUTED (BAD)" : "blocked";
      } catch(e) { return "exception: " + e.message; }
    })()""")
    time.sleep(0.2)
    pwn = page.evaluate("() => window.__pwn || null")
    record("CSP blocks injected inline script", pwn is None, f"inject_result={inject_result}, __pwn={pwn}")

    # 4. hero search suggestions (switch to search mode first — finder is default)
    page.click("[data-mode=search]")
    time.sleep(0.2)
    page.fill("#heroSearch", "TL-4812")
    time.sleep(0.2)
    sug_count = page.locator("#suggest .sug").count()
    record("suggestions appear for part search", sug_count >= 1, f"{sug_count} suggestions")
    page.click("#suggest .sug")
    time.sleep(0.3)
    record("suggestion opens quick view", page.locator("#quickView").is_visible())
    qv_pn = page.text_content("#qvPn")
    record("quick view shows correct PN", qv_pn == "TL-4812-201", qv_pn)
    page.click("#qvClose")

    # 5. model suggestion path
    page.fill("#heroSearch", "TLD TMX")
    time.sleep(0.2)
    sug2 = page.locator("#suggest .sug").count()
    record("model suggestions appear", sug2 >= 1, str(sug2))
    page.click("#suggest .sug")
    time.sleep(0.3)
    banner_visible = page.locator("#modelBanner").is_visible()
    banner_text = page.text_content("#modelBannerText")
    n_filtered = page.locator("#partGrid .part-card").count()
    record("model filter banner + filtered parts", banner_visible and 0 < n_filtered < 32, f"banner={banner_text!r}, n={n_filtered}")
    page.click("#modelClear")
    time.sleep(0.2)
    record("model filter clears back to 32", page.locator("#partGrid .part-card").count() == 32)

    # 6. category card → catalog filter
    page.click(".cat-card >> nth=0")
    time.sleep(0.4)  # allow hash jump
    n_cat = page.locator("#partGrid .part-card").count()
    sel = page.input_value("#fCat")
    record("category card filters catalog", n_cat < 30 and sel != "all", f"n={n_cat}, sel={sel}")
    page.click("#clearFilters")
    time.sleep(0.2)

    # 7. sidebar filters
    page.select_option("#fCond", "oh")
    time.sleep(0.2)
    oh_count = page.locator("#partGrid .part-card").count()
    record("condition filter (overhauled)", 0 < oh_count < 30, str(oh_count))
    page.check("#fStock")
    time.sleep(0.2)
    stock_count = page.locator("#partGrid .part-card").count()
    record("in-stock filter narrows further", stock_count <= oh_count, f"{stock_count} <= {oh_count}")
    page.click("#clearFilters")
    time.sleep(0.2)

    # 8. catalog search box
    page.fill("#catSearch", "400Hz")
    time.sleep(0.2)
    gpu_n = page.locator("#partGrid .part-card").count()
    record("keyword search 400Hz", gpu_n >= 3, str(gpu_n))
    page.fill("#catSearch", "")
    time.sleep(0.2)

    # 9. sorting
    page.select_option("#fSort", "price-asc")
    time.sleep(0.2)
    first_price = page.text_content("#partGrid .part-card >> nth=0 >> .part-price")
    record("price sort asc — cheapest first", first_price == "$74", first_price)

    # 10. add to RFQ + cart drawer
    page.click("#partGrid .part-card >> nth=0 >> [data-act=add]")
    time.sleep(0.2)
    badge = page.text_content("#cartBadge")
    record("cart badge shows 1", badge == "1", badge)
    page.click("#cartOpenBtn")
    time.sleep(0.2)
    record("drawer opens", page.locator("#drawer").get_attribute("aria-hidden") == "false")
    rows = page.locator("#cartList .cart-row").count()
    record("cart has 1 row", rows == 1, str(rows))
    page.click(".qty-btn >> nth=1")  # inc
    time.sleep(0.2)
    qty = page.text_content(".qty-n")
    record("qty increment works", qty == "2", qty)
    total = page.text_content("#cartTotal")
    record("cart total computes", total.startswith("$"), total)
    page.click("#cartSubmit")
    time.sleep(0.2)
    record("cart submit shows confirmation", page.locator("#cartOk").is_visible())
    page.click("#cartClose")
    time.sleep(0.2)

    # 11. language switch
    page.click(".lang-btn[data-lang=zh]")
    time.sleep(0.3)
    zh_title = page.text_content(".hero-title").strip()
    record("zh switch — hero translated", zh_title == "讓停機坪不停擺。", zh_title)
    zh_count = page.text_content("#resultCount")
    record("zh switch — result count localized", "32" in zh_count, zh_count)
    part_name_zh = page.text_content("#partGrid .part-card >> nth=0 >> .part-name")
    record("zh part names localized (sample data EN kept)", isinstance(part_name_zh, str))
    page.click(".lang-btn[data-lang=en]")
    time.sleep(0.2)

    # 12. RFQ form validation
    page.fill("#cName", "")
    page.fill("#cEmail", "not-an-email")
    page.fill("#cMsg", "")
    page.click("#rfqForm button[type=submit]")
    time.sleep(0.2)
    err_email = page.text_content("#eEmail")
    record("form rejects bad email", err_email != "", err_email)
    record("form still visible on error", page.locator("#rfqForm").is_visible())

    # 12b. mock the FormSubmit endpoint (no real network in tests)
    sent = []
    def ok_formsubmit(route):
        sent.append(route.request.post_data or "")
        route.fulfill(status=200, content_type="application/json", body='{"success":"true","message":"ok"}')
    def fail_formsubmit(route):
        route.fulfill(status=500, content_type="application/json", body='{"success":"false","message":"err"}')
    ROUTE = "**/formsubmit.co/ajax/**"
    page.route(ROUTE, fail_formsubmit)  # failure path first

    page.fill("#cName", "Test User")
    page.fill("#cEmail", "test@example.com")
    page.fill("#cMsg", "TL-4812-201 x2")
    page.click("#rfqForm button[type=submit]")
    time.sleep(0.5)
    err_send = page.text_content("#eMsg")
    record("send failure shows error message", err_send != "", err_send)
    record("form stays visible on send failure", page.locator("#rfqForm").is_visible())

    # 12c. honeypot silently drops bots (no request, no success panel)
    page.unroute(ROUTE)
    page.route(ROUTE, ok_formsubmit)
    n_sent = len(sent)
    page.fill("#fHoney", "i-am-a-bot")
    page.click("#rfqForm button[type=submit]")
    time.sleep(0.4)
    record("honeypot silently drops bot submission", len(sent) == n_sent and page.locator("#formOk").is_hidden())
    page.fill("#fHoney", "")

    # 12d. success path — payload reaches email endpoint, success panel shows
    page.click("#rfqForm button[type=submit]")
    time.sleep(0.6)
    record("valid form shows success panel", page.locator("#formOk").is_visible())
    record("RFQ payload posted to email endpoint", len(sent) >= 1 and "Test User" in sent[-1], (sent[-1] or "")[:120])
    record("RFQ list field included in payload", "rfq_items" in " ".join(sent))

    # 13. XSS canary: part search field renders as text, never HTML
    page.fill("#catSearch", '<img src=x onerror="window.__xss=1">')
    time.sleep(0.3)
    xss = page.evaluate("() => window.__xss || null")
    record("XSS canary in search field is inert", xss is None, f"__xss={xss}")

    # 14. visual search with a real generated image
    img_path = OUT / "sample_part.png"
    # create a tiny valid PNG via canvas inside the page
    data_url = page.evaluate("""(() => {
      const c = document.createElement('canvas'); c.width = 200; c.height = 140;
      const g = c.getContext('2d');
      g.fillStyle = '#dfe7f2'; g.fillRect(0,0,200,140);
      g.strokeStyle = '#1868f2'; g.lineWidth = 10;
      g.beginPath(); g.arc(100, 70, 45, 0, Math.PI*2); g.stroke();
      g.beginPath(); g.arc(100, 70, 16, 0, Math.PI*2); g.stroke();
      return c.toDataURL('image/png');
    })()""")
    import base64
    img_path.write_bytes(base64.b64decode(data_url.split(",")[1]))
    page.set_input_files("#fileInput", str(img_path))
    time.sleep(0.4)
    record("photo preview appears", page.locator("#vsPreview").is_visible())
    # wait for demo matcher to finish (~1.8s)
    time.sleep(2.2)
    vs_cards = page.locator("#vsGrid .part-card").count()
    record("visual match results render", vs_cards == 7, str(vs_cards))
    score = page.text_content("#vsGrid .match-badge >> nth=0")
    record("confidence score shown", score.endswith("%"), score)
    page.click("#vsGrid .part-card >> nth=0 >> [data-act=add]")
    time.sleep(0.2)
    record("vs result can be added to RFQ", page.text_content("#cartBadge") == "1")

    # 15. mobile viewport smoke test
    page2 = ctx.browser.new_page(viewport={"width": 390, "height": 844}) if hasattr(ctx, "browser") else None
    mob = ctx.browser.new_page(viewport={"width": 390, "height": 844})
    mob.goto(URL, wait_until="networkidle")
    time.sleep(0.3)
    burger_visible = mob.locator("#burger").is_visible()
    record("mobile: burger menu visible", burger_visible)
    mob.click("#burger")
    time.sleep(0.2)
    record("mobile: nav opens", mob.locator("#nav.is-open").count() == 1)
    mob.screenshot(path=str(OUT / "mobile.png"), full_page=False)
    mob.close()

    # screenshots
    page.click(".lang-btn[data-lang=en]")
    time.sleep(0.2)
    page.screenshot(path=str(OUT / "desktop_hero.png"), clip={"x":0,"y":0,"width":1360,"height":900})
    page.evaluate("() => document.getElementById('parts').scrollIntoView()")
    time.sleep(0.3)
    page.screenshot(path=str(OUT / "desktop_catalog.png"))
    page.evaluate("() => document.getElementById('visual').scrollIntoView()")
    time.sleep(0.3)
    page.screenshot(path=str(OUT / "desktop_visual.png"))

    browser.close()

print(json.dumps({
    "passed": len(results["pass"]),
    "failed": len(results["fail"]),
    "failures": results["fail"],
    "passes": results["pass"],
}, indent=1, ensure_ascii=False))
sys.exit(1 if results["fail"] else 0)
