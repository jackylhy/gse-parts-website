"""Extended verification: finder / xref / featured / brands + full regression."""
import json, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright

URL = "http://localhost:8091/index.html"
results = {"pass": [], "fail": []}
def record(name, ok, detail=""):
    results["pass" if ok else "fail"].append(f"{name}" + (f" — {detail}" if detail and not ok else ""))

console_errors, page_errors, external = [], [], []

with sync_playwright() as pw:
    b = pw.chromium.launch()
    page = b.new_page(viewport={"width":1360,"height":900})
    page.on("console", lambda m: console_errors.append(m.text) if m.type=="error" else None)
    page.on("pageerror", lambda e: page_errors.append(str(e)))
    page.on("request", lambda r: external.append(r.url) if "localhost" not in r.url and "data:" not in r.url else None)
    page.goto(URL, wait_until="networkidle")
    time.sleep(0.3)

    record("boot: no JS errors", not page_errors and not console_errors, "; ".join((page_errors+console_errors)[:2]))
    record("boot: zero external requests", not external, "; ".join(external[:2]))
    record("finder default visible", page.locator("#modeFinder").is_visible())
    record("featured: 8 cards", page.locator("#featuredGrid .part-card").count() == 8, str(page.locator("#featuredGrid .part-card").count()))
    record("brand wall: 12 chips", page.locator("#brandWall .brand-chip").count() == 12, str(page.locator("#brandWall .brand-chip").count()))

    # --- Equipment Finder ---
    oems = page.locator("#fOem option").count()
    record("finder: OEM options populated", oems >= 9, str(oems))
    record("finder: model disabled initially", page.locator("#fModel").is_disabled())
    page.select_option("#fOem", "TLD")
    time.sleep(0.2)
    record("finder: model enabled after OEM", not page.locator("#fModel").is_disabled())
    models = page.locator("#fModel option").count()
    record("finder: TLD models listed", models == 5, str(models))  # 4 TLD models + placeholder
    page.select_option("#fModel", "TLD TMX")
    page.click("#finderGo")
    time.sleep(0.4)
    n = page.locator("#partGrid .part-card").count()
    record("finder: TMX filter applies", 0 < n < 30, str(n))
    page.click("#modelClear"); time.sleep(0.2)

    # OEM + category combo (no model)
    page.select_option("#fOem", "TLD")
    page.select_option("#fPartCat", "tow")
    page.click("#finderGo")
    time.sleep(0.4)
    n2 = page.locator("#partGrid .part-card").count()
    record("finder: OEM+cat combo filters", 0 < n2 <= n, f"n2={n2}")
    page.click("#clearFilters"); time.sleep(0.2)

    # --- Cross-reference ---
    page.click("[data-mode=xref]")
    time.sleep(0.2)
    record("xref panel visible", page.locator("#modeXref").is_visible())
    page.fill("#xrefInput", "TLD 4812-201")
    page.click("#xrefGo")
    time.sleep(0.3)
    rows = page.locator(".xref-row").count()
    record("xref: finds interchange", rows >= 1, str(rows))
    our_pn = page.text_content(".xref-row .xref-ours")
    record("xref: maps to our PN", our_pn == "TL-4812-201", our_pn)
    # add to RFQ from xref
    page.click(".xref-row [data-act=add]")
    time.sleep(0.2)
    record("xref: add to RFQ works", page.text_content("#cartBadge") == "1")

    # xref chip quick-fill
    page.click("[data-xref='BAL 815111']")
    time.sleep(0.3)
    rows2 = page.locator(".xref-row").count()
    our2 = page.text_content(".xref-row .xref-ours") if rows2 else ""
    record("xref: chip fills + Baldwin lookup", rows2 >= 1 and our2 == "AS-FILT-12", f"{rows2} rows, ours={our2}")

    # no-match fallback
    page.fill("#xrefInput", "ZZZ-999-NOMATCH")
    page.click("#xrefGo")
    time.sleep(0.3)
    record("xref: no-match shows sourcing CTA", page.locator(".xref-none").count() == 1)

    # XSS canary in xref input
    page.fill("#xrefInput", '<img src=x onerror="window.__xr=1">')
    page.click("#xrefGo")
    time.sleep(0.3)
    xr = page.evaluate("() => window.__xr || null")
    record("xref: XSS canary inert", xr is None, str(xr))

    # --- mode switching back to search ---
    page.click("[data-mode=search]")
    time.sleep(0.2)
    record("search mode panel visible", page.locator("#modeSearch").is_visible())
    page.fill("#heroSearch", "GPU")
    time.sleep(0.2)
    sug = page.locator("#suggest .sug").count()
    record("search: suggestions still work", sug >= 1, str(sug))

    # --- language switch preserves finder state ---
    page.click("[data-mode=finder]")
    time.sleep(0.2)
    page.select_option("#fOem", "Goldhofer")
    time.sleep(0.2)
    page.click(".lang-btn[data-lang=zh]")
    time.sleep(0.3)
    zh_opt = page.locator("#fOem option:checked").text_content()
    models_zh = page.locator("#fModel option").count()
    record("lang switch: finder state preserved", "Goldhofer" in zh_opt and models_zh == 3, f"opt={zh_opt!r}, models={models_zh}")
    zh_placeholder = page.text_content("#fModel option:first-child") if models_zh else ""
    record("lang switch: finder labels translated", "先揀" in (zh_placeholder or ""), zh_placeholder)
    page.click(".lang-btn[data-lang=en]"); time.sleep(0.2)

    # mobile geometry
    mob = b.new_page(viewport={"width":390,"height":844})
    mob.goto(URL, wait_until="networkidle"); time.sleep(0.3)
    geo = mob.evaluate("""(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth + 2,
      docW: document.documentElement.scrollWidth, vp: window.innerWidth
    }))()""")
    record("mobile: no horizontal overflow", not geo["overflow"], str(geo))
    # finder usable on mobile
    mob.select_option("#fOem", "TUG"); time.sleep(0.2)
    mob.select_option("#fModel", "TUG 660"); time.sleep(0.1)
    mob.click("#finderGo"); time.sleep(0.4)
    record("mobile: finder flow works", mob.locator("#partGrid .part-card").count() < 30)
    mob.screenshot(path="/Users/jackyleung/Desktop/gse-parts-website/tests/mobile_v2.png")
    mob.close()

    page.screenshot(path="/Users/jackyleung/Desktop/gse-parts-website/tests/desktop_hero_v2.png",
                    clip={"x":0,"y":0,"width":1360,"height":900})
    b.close()

print(json.dumps({"passed": len(results["pass"]), "failed": len(results["fail"]),
                  "failures": results["fail"], "passes": results["pass"]}, indent=1, ensure_ascii=False))
sys.exit(1 if results["fail"] else 0)
