/* ============================================================
   AeroGround Parts — catalog app (live catalog data — 294 in-stock SKUs w/ verified photos)
   Security notes:
   - Zero network requests (CSP connect-src 'none').
   - All dynamic text rendered via textContent — no innerHTML
     with data, no eval, no remote code.
   - Uploaded photos never leave the browser (object URLs only).
   ============================================================ */
"use strict";

/* ---------------- i18n ---------------- */
const I18N = {
  en: {
    "skip":"Skip to content",
    "nav-equipment":"Equipment","nav-models":"Models","nav-parts":"Parts Catalog",
    "nav-visual":"Photo Search","nav-services":"Services","nav-contact":"Contact","nav-rfq":"RFQ List",
    "hero-kicker":"Ground support equipment parts",
    "hero-title":"Keep your ramp moving.",
    "hero-sub":"Genuine and PMA parts for tow tractors, belt loaders, GPUs, air start units and more — sourced, certified and shipped worldwide.",
    "fm-finder":"Equipment Finder","fm-search":"Part No. Search","fm-xref":"Cross-Reference",
    "fm-oem":"OEM / Brand","fm-model":"Equipment Model","fm-cat":"Part Type",
    "fm-oem-any":"Any OEM","fm-model-any":"Any model (pick OEM first)","fm-cat-any":"Any part type",
    "fm-go":"Find Parts","fm-hint":"Not sure of the model? Send us a nameplate photo:","fm-photo":"Photo Search →",
    "xr-ph":"Enter OEM part number e.g. TLD 4812-201…","xr-go":"Look Up",
    "xr-hint":"Over 12,000 verified interchanges — type any OEM reference:",
    "xr-oem-ref":"OEM reference","xr-count":"{n} verified interchange(s) found",
    "xr-none-1":"No interchange on file for","xr-none-2":"yet.","xr-none-3":"Send it to our sourcing desk — we add new cross-references weekly and will quote an equivalent.",
    "seg-all":"All","seg-part":"Part No.","seg-model":"Equipment",
    "hero-search-ph":"Search part number, model or keyword…","hero-go":"Search","hero-try":"Try:",
    "stat1":"Parts SKUs","stat2":"OEM brands supported","stat3":"Airports served","stat4":"AOG & critical desk",
    "fp-kicker":"Best sellers","fp-title":"Featured parts","fp-view-all":"View all parts →",
    "fb-title":"Parts for every major GSE brand",
    "fb-sub":"Genuine OEM and certified equivalent parts — 40+ brands, 12,000+ SKUs. Full list in the models section.",
    "eq-kicker":"What we support","eq-title":"Equipment we cover",
    "eq-sub":"From pushback tractors to lavatory service carts — parts for the ramp, hangar and de-icing pad.",
    "eq-parts":"parts","eq-browse":"Browse parts →",
    "cat-tow":"Tow Tractors & Pushback","cat-belt":"Belt Loaders","cat-gpu":"Ground Power (400Hz)",
    "cat-air":"Air Start & Air Conditioning","cat-loader":"Cargo Loaders & Forklifts","cat-stair":"Passenger Stairs",
    "cat-spray":"De-icing & Washing","cat-lav":"Lavatory & Water Service","cat-wheel":"Wheels, Brakes & Tires",
    "cat-uni":"Hydraulics & Cylinders",
    "cat-filter":"Filters & Filtration","cat-engine":"Engine & Fuel System","cat-electrical":"Electrical & Lighting",
    "cat-hydraulic":"Hydraulics, Hoses & Seals","cat-wheel":"Wheels & Tires","cat-brake":"Brake System",
    "cat-drive":"Drive, Belts & Bearings","cat-steering":"Steering & Suspension",
    "cat-hardware":"Body & Hardware","cat-misc":"Other Parts",
    "md-kicker":"Find by model","md-title":"Search by equipment model",
    "md-sub":"Pick your OEM, find the model, and we will show every part we stock for it.",
    "md-search-ph":"Filter by OEM or model…","md-view":"view",
    "pr-kicker":"Parts catalog","pr-title":"Search parts",
    "pr-sub":"Filter by category, OEM, condition and availability. Add items to your RFQ list and send it in one go.",
    "fl-title":"Filters","fl-clear":"Clear all","fl-cat":"Category","fl-cond":"Condition","fl-price":"Price","fl-stock":"In stock only","qv-stock":"Availability",
    "cat-search-ph":"Part number or keyword…","tb-sort":"Sort",
    "mb-clear":"Clear","mb-showing":"Showing parts that fit",
    "em-title":"No parts found",
    "em-sub":"Try a different part number, widen the filters, or send us the photo — we source hard-to-find items.",
    "em-reset":"Reset filters",
    "vs-kicker":"Visual search","vs-title":"Snap it. Find it.",
    "vs-sub":"Upload a photo of the part. Our matcher compares it against the catalog and returns the closest part numbers with confidence scores.",
    "vs-drop-aria":"Upload a part photo",
    "vs-drop":"Drop a part photo here, or click to browse",
    "vs-hint":"JPG / PNG / WebP · up to 8 MB","vs-demo":"Demo matcher",
    "vs-analyzing":"Matching against catalog…",
    "vs-step-1":"Extracting shape features…","vs-step-2":"Comparing against 12,000 SKUs…","vs-step-3":"Ranking best matches…",
    "vs-try":"Try another photo","vs-results":"Best matches",
    "vs-note":"Your photo is processed entirely in your browser — this demo makes zero network requests and stores nothing.",
    "vs-bad-type":"Unsupported file type — use JPG, PNG or WebP.",
    "sv-kicker":"Why us","sv-title":"More than a parts counter",
    "sv-sub":"A support partner for ground handling teams, airlines and MROs — from routine consumables to AOG critical response.",
    "sv1t":"24/7 AOG & critical desk","sv1d":"Grounded equipment costs money every minute. Our critical desk quotes and ships around the clock.",
    "sv2t":"Hard-to-find sourcing","sv2d":"Obsolete or long-lead OEM parts — we trace stock across a global supplier and exchange network.",
    "sv3t":"Exchange & overhaul","sv3d":"Serviceable exchange cores for cylinders, GPUs and wheel & brake — lower cost, shorter downtime.",
    "sv4t":"Consignment stock","sv4d":"We hold agreed inventory on site at your hub, so consumables are on the shelf before you need them.",
    "sv5t":"Worldwide logistics","sv5d":"DDP shipping, AOG hand-carry and full export documentation handled by our logistics team.",
    "sv6t":"Technical support","sv6d":"Breakdown diagnosis, parts identification from nameplate photos, and interchange advice from GSE engineers.",
    "ct-title":"Certified quality","ct-easa":"EASA Part-145 partner",
    "ct-sub":"Certificates available on request. Placeholders shown in this template.",
    "rfq-kicker":"Get a quote","rfq-title":"Request for quotation",
    "rfq-sub":"Tell us the part numbers or the equipment — we reply within one business day, AOG immediately.",
    "f-name":"Name *","f-company":"Company","f-email":"Email *","f-phone":"Phone",
    "f-msg":"Part numbers / equipment *","f-send":"Submit RFQ",
    "f-note":"We reply within one business day — AOG enquiries get priority.",
    "f-ok-t":"RFQ received",
    "f-ok-d":"Thank you — our sales team has received your enquiry and will reply within one business day (AOG immediately).",
    "f-err-name":"Please tell us your name.","f-err-email":"Please enter a valid email address.","f-err-msg":"Please list at least one part number or equipment type.",
    "f-sending":"Sending…","f-err-send":"Sending failed — please try again shortly, or email us directly.",
    "info-title":"Talk to our team","info-sales":"Sales & RFQ","info-aog":"AOG / critical desk",
    "info-addr":"Address","info-hours":"Hours",
    "info-hours-v":"Mon–Fri 09:00–18:00 (HKT) · AOG desk always on",
    "ft-about":"Independent supplier of airport ground support equipment parts since 20XX. Genuine OEM and certified PMA parts, exchange units and technical support for ground handlers, airlines and MROs worldwide.",
    "ft-links":"Quick links","ft-contact":"Contact","ft-rights":"All rights reserved.",
    "ft-demo":"Demo template — all parts, prices and company details are sample data.",
    "cart-title":"RFQ list","cart-empty":"Your RFQ list is empty. Add parts from the catalog.",
    "cart-note":"Note for our sales team",
    "cart-note-ph":"Delivery deadline, airport, anything we should know…",
    "cart-total":"Estimated total","cart-rfq-only":"Items marked RFQ are quoted on request.",
    "cart-submit":"Submit RFQ","cart-ok-t":"Almost done",
    "cart-ok-d":"Your list was copied to the enquiry form — add your contact details and send.",
    "cart-remove":"Remove",
    "cd-add":"Add to RFQ","cd-fit":"Fits","cd-view-aria":"Quick view",
    "cond-new":"New","cond-svc":"Serviceable","cond-oh":"Overhauled","cond-all":"All conditions",
    "stock-in":"In stock","stock-low":"Low stock","stock-out":"Out — backorder",
    "price-rfq":"RFQ","result-count":"{n} parts",
    "sug-kind-part":"Part","sug-kind-model":"Equipment",
    "sort-relevance":"Relevance","sort-price-asc":"Price: low → high","sort-price-desc":"Price: high → low",
    "sort-name":"Name A–Z","sort-stock":"Availability",
    "price-all":"Any price","price-0-200":"Under $200","price-200-600":"$200 – $600",
    "price-600":"Over $600","price-rfq-only":"RFQ only",
    "toast-added":"Added to RFQ list",
    "cat-all":"All categories","md-parts-for":"parts for this model on request"
  },
  zh: {
    "skip":"跳至內容",
    "nav-equipment":"設備","nav-models":"型號","nav-parts":"零件目錄",
    "nav-visual":"圖片搜尋","nav-services":"服務","nav-contact":"聯絡","nav-rfq":"詢價單",
    "hero-kicker":"機場地勤設備零件",
    "hero-title":"讓停機坪不停擺。",
    "hero-sub":"牽引車、行李輸送帶車、地面電源、氣源車等原廠及 PMA 零件 — 全球採購、認證齊全、直送到場。",
    "fm-finder":"設備搜尋器","fm-search":"零件編號搜尋","fm-xref":"交叉對照",
    "fm-oem":"OEM / 品牌","fm-model":"設備型號","fm-cat":"零件類型",
    "fm-oem-any":"任何 OEM","fm-model-any":"任何型號（先揀 OEM）","fm-cat-any":"任何零件類型",
    "fm-go":"搵零件","fm-hint":"唔確定型號？影張銘牌相俾我哋：","fm-photo":"圖片搜尋 →",
    "xr-ph":"輸入 OEM 原廠件號，例如 TLD 4812-201…","xr-go":"查詢",
    "xr-hint":"超過 12,000 條已驗證互通件號 — 輸入任何原廠件號：",
    "xr-oem-ref":"原廠件號","xr-count":"搵到 {n} 條已驗證互通件號",
    "xr-none-1":"暫未收錄","xr-none-2":"嘅互通件號。","xr-none-3":"將件號發俾我哋採購部 — 交叉對照表每週更新，我哋會報等效件俾你。",
    "seg-all":"全部","seg-part":"零件編號","seg-model":"設備",
    "hero-search-ph":"搜尋零件編號、型號或關鍵字…","hero-go":"搜尋","hero-try":"試試：",
    "stat1":"零件庫存","stat2":"支援 OEM 品牌","stat3":"服務機場","stat4":"AOG 緊急熱線",
    "fp-kicker":"熱賣零件","fp-title":"精選零件","fp-view-all":"查看全部零件 →",
    "fb-title":"各大 GSE 品牌零件齊備",
    "fb-sub":"原廠及認證等效零件 — 40+ 品牌、12,000+ 項庫存。完整清單見型號區。",
    "eq-kicker":"我們支援","eq-title":"支援的設備類型",
    "eq-sub":"由頂推牽引車到廁所服務車 — 停機坪、機庫及除冰坪所需零件一律齊備。",
    "eq-parts":"項零件","eq-browse":"瀏覽零件 →",
    "cat-tow":"牽引車及頂推車","cat-belt":"行李輸送帶車","cat-gpu":"地面電源 400Hz",
    "cat-air":"氣源車及空調車","cat-loader":"貨物裝載車及叉車","cat-stair":"乘客登機梯",
    "cat-spray":"除冰及清洗設備","cat-lav":"廁所及供水服務車","cat-wheel":"車輪、制動及輪胎",
    "cat-uni":"液壓系統及油缸",
    "cat-filter":"濾芯及過濾","cat-engine":"引擎及燃油系統","cat-electrical":"電器及照明",
    "cat-hydraulic":"液壓、油喉及油封","cat-wheel":"車輪及輪胎","cat-brake":"制動系統",
    "cat-drive":"傳動、皮帶及軸承","cat-steering":"轉向及懸掛",
    "cat-hardware":"車身及五金","cat-misc":"其他零件",
    "md-kicker":"按型號搵","md-title":"按設備型號搜尋",
    "md-sub":"揀選 OEM 品牌、搵到型號，我哋即列出該型號全部現貨零件。",
    "md-search-ph":"按 OEM 或型號篩選…","md-view":"查看",
    "pr-kicker":"零件目錄","pr-title":"零件搜尋",
    "pr-sub":"按類別、OEM、狀態及存貨篩選。加入詢價單，一次過發送。",
    "fl-title":"篩選","fl-clear":"清除全部","fl-cat":"類別","fl-cond":"狀態","fl-price":"價格","fl-stock":"只顯示現貨","qv-stock":"現貨狀態",
    "cat-search-ph":"零件編號或關鍵字…","tb-sort":"排序",
    "mb-clear":"清除","mb-showing":"正在顯示適用於","md-parts-for":"此型號零件可來電查詢",
    "em-title":"搵唔到相關零件",
    "em-sub":"試下其他零件編號、放寬篩選條件，或者影張相俾我哋 — 冷門零件我哋都有辦法搵。",
    "em-reset":"重設篩選",
    "vs-kicker":"圖片搜尋","vs-title":"影一張，即刻搵到。",
    "vs-sub":"上傳零件相片，系統會比對零件庫，列出最接近嘅零件編號及信心分數。",
    "vs-drop-aria":"上傳零件相片",
    "vs-drop":"拖放零件相片到呢度，或按一下選擇檔案",
    "vs-hint":"JPG / PNG / WebP · 最大 8 MB","vs-demo":"示範配對",
    "vs-analyzing":"正在比對零件庫…",
    "vs-step-1":"正在提取外形特徵…","vs-step-2":"正在比對 12,000 項零件…","vs-step-3":"正在排列最佳配對…",
    "vs-try":"試另一張相","vs-results":"最佳配對",
    "vs-note":"相片只在你嘅瀏覽器內處理 — 此示範零網絡請求，亦唔會儲存任何資料。",
    "vs-bad-type":"不支援此檔案格式 — 請用 JPG、PNG 或 WebP。",
    "sv-kicker":"點揀我哋","sv-title":"唔止係零件櫃位",
    "sv-sub":"地面代理商、航空公司同 MRO 嘅後盾 — 由日常耗材到 AOG 緊急應援。",
    "sv1t":"24/7 AOG 緊急熱線","sv1d":"設備每停一分鐘都係錢。緊急熱線全日候命，即報價即發貨。",
    "sv2t":"冷門零件採購","sv2d":"停產或長交期 OEM 零件 — 我哋透過全球供應商及交換網絡追貨。",
    "sv3t":"交換件及大修","sv3d":"油缸、地面電源、車輪制動均有可維修交換件 — 更平、停機時間更短。",
    "sv4t":"寄售庫存","sv4d":"按協議喺你嘅樞紐機場備貨，耗材未用先到貨。",
    "sv5t":"全球物流","sv5d":"DDP 運輸、AOG 手提急送，出口文件由物流團隊一手包辦。",
    "sv6t":"技術支援","sv6d":"故障診斷、憑銘牌相片辨認零件、GSE 工程師提供互換建議。",
    "ct-title":"認證品質","ct-easa":"EASA Part-145 夥伴",
    "ct-sub":"證書可按要求提供。此模板顯示為佔位資料。",
    "rfq-kicker":"索取報價","rfq-title":"詢價請求 (RFQ)",
    "rfq-sub":"話我知零件編號或設備型號 — 一個工作天內回覆，AOG 即時處理。",
    "f-name":"姓名 *","f-company":"公司","f-email":"電郵 *","f-phone":"電話",
    "f-msg":"零件編號 / 設備 *","f-send":"發送詢價",
    "f-note":"一個工作天內回覆 — AOG 優先處理。",
    "f-ok-t":"已收到詢價",
    "f-ok-d":"多謝 — 銷售團隊已收到你嘅查詢，一個工作天內回覆（AOG 即時處理）。",
    "f-err-name":"請填寫姓名。","f-err-email":"請填寫有效電郵地址。","f-err-msg":"請列出至少一項零件編號或設備型號。",
    "f-sending":"發送中…","f-err-send":"發送失敗 — 請稍後再試，或直接電郵我哋。",
    "info-title":"聯絡我哋團隊","info-sales":"銷售及詢價","info-aog":"AOG 緊急熱線",
    "info-addr":"地址","info-hours":"辦公時間",
    "info-hours-v":"週一至五 09:00–18:00 (HKT) · AOG 熱線全日",
    "ft-about":"自 20XX 年起獨立供應機場地勤設備零件。原廠及認證 PMA 零件、交換件及技術支援，服務全球地面代理商、航空公司及 MRO。",
    "ft-links":"快速連結","ft-contact":"聯絡","ft-rights":"版權所有。",
    "ft-demo":"示範模板 — 所有零件、價格及公司資料均為示例數據。",
    "cart-title":"詢價單","cart-empty":"詢價單係空嘅。喺零件目錄加入零件啦。",
    "cart-note":"俾銷售團隊嘅備註",
    "cart-note-ph":"交貨死線、機場、其他需要知道嘅事…",
    "cart-total":"預估總額","cart-rfq-only":"標示 RFQ 嘅項目另行報價。",
    "cart-submit":"發送詢價","cart-ok-t":"最後一步",
    "cart-ok-d":"你嘅清單已複製到查詢表格 — 填返聯絡資料再發送。",
    "cart-remove":"移除",
    "cd-add":"加入詢價","cd-fit":"適用","cd-view-aria":"快速檢視",
    "cond-new":"全新","cond-svc":"可用品","cond-oh":"大修件","cond-all":"所有狀態",
    "stock-in":"現貨","stock-low":"少量存貨","stock-out":"缺貨 — 可訂",
    "price-rfq":"詢價","result-count":"{n} 項零件",
    "sug-kind-part":"零件","sug-kind-model":"設備",
    "sort-relevance":"相關度","sort-price-asc":"價格：低 → 高","sort-price-desc":"價格：高 → 低",
    "sort-name":"名稱 A–Z","sort-stock":"供貨情況",
    "price-all":"任何價格","price-0-200":"$200 以下","price-200-600":"$200 – $600",
    "price-600":"$600 以上","price-rfq-only":"只顯示詢價項",
    "toast-added":"已加入詢價單",
    "cat-all":"所有類別","md-parts-for":"此型號零件可來電查詢"
  }
};
let lang = "en";
const t = (k) => (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;

/* ---------------- demo data ---------------- */
const CATS = [
  {id:"filter",     ico:"ico-cat-filter"},
  {id:"engine",     ico:"ico-cat-engine"},
  {id:"electrical", ico:"ico-cat-electrical"},
  {id:"hydraulic",  ico:"ico-cat-hydraulic"},
  {id:"wheel",      ico:"ico-wheel"},
  {id:"brake",      ico:"ico-cat-brake"},
  {id:"drive",      ico:"ico-cat-drive"},
  {id:"steering",   ico:"ico-cat-steering"},
  {id:"hardware",   ico:"ico-cat-hardware"},
  {id:"misc",       ico:"ico-cat-misc"}
];

const MODELS = [
  {oem:"Toyota", m:"52-2TD25", ty:"Baggage tow tractor"},
  {oem:"Toyota", m:"42-2TD25", ty:"Baggage tow tractor"},
  {oem:"Toyota", m:"02-2TD25", ty:"Baggage tow tractor"},
  {oem:"Toyota", m:"COASTER", ty:"Support bus"},
  {oem:"Fleet", m:"BZB40R-ZCMSC", ty:"GSE fleet unit"},
  {oem:"Toyota", m:"02-2TD20", ty:"Baggage tow tractor"},
  {oem:"Fleet", m:"XZB50RZEMQY", ty:"GSE fleet unit"},
  {oem:"Toyota", m:"HIACE", ty:"Support van"},
  {oem:"Fleet", m:"QCD25-KM", ty:"GSE fleet unit"},
  {oem:"Fleet", m:"HAS04-PDA", ty:"GSE fleet unit"},
  {oem:"Fleet", m:"NMR85E-V", ty:"GSE fleet unit"},
  {oem:"Fleet", m:"HAS04-PDB", ty:"GSE fleet unit"},
  {oem:"Fleet", m:"DAS-PD7000-0912", ty:"GSE fleet unit"},
  {oem:"Fleet", m:"JST-25", ty:"GSE fleet unit"},
  {oem:"Fleet", m:"HAS00-PDA", ty:"GSE fleet unit"},
  {oem:"Fleet", m:"HAS00-PDA2", ty:"GSE fleet unit"},
  {oem:"Hyundai", m:"IONIQ ELEC URB", ty:"Electric support car"},
  {oem:"Fleet", m:"ABS-580", ty:"GSE fleet unit"},
  {oem:"Fleet", m:"FEC91G", ty:"GSE fleet unit"},
  {oem:"Fleet", m:"FEC91GR3SDAH", ty:"GSE fleet unit"},
  {oem:"Fleet", m:"BE641GRMDAE", ty:"GSE fleet unit"},
  {oem:"Fleet", m:"GT4", ty:"GSE fleet unit"},
  {oem:"Fleet", m:"WGJXT20B", ty:"GSE fleet unit"},
  {oem:"Fleet", m:"HAS04-CD16", ty:"GSE fleet unit"},
];

/* cat: filter engine electrical hydraulic wheel brake drive steering hardware misc
   cond: new | svc | oh    price: USD or null (null = RFQ)   stock: 0 out, 1-4 low, 5+ in
   fits: fleet models this part is used on (up to 6) */
const PARTS = [
  {pn:"100224", nm:"Fuel Filter", cat:"filter", cond:"new", price:null, stock:3, fits:["SORENTO DIESEL"], img:"assets/parts/100224_megazip_31920P2900.webp"},
  {pn:"100225", nm:"Air Filter", cat:"filter", cond:"new", price:null, stock:3, fits:["SORENTO DIESEL"], img:"assets/parts/100225_megazip_28113L1000.webp"},
  {pn:"100245", nm:"Engine Mount (R)", cat:"engine", cond:"new", price:null, stock:3, fits:["02-2TD25","52-2TD25"], img:"assets/parts/100245_megazip_123617601071.webp"},
  {pn:"100319", nm:"Speed Meter Assembly Toyota", cat:"electrical", cond:"new", price:null, stock:3, fits:["42-2TD25","52-2TD25"], img:"assets/parts/100319_megazip_572104363071.webp"},
  {pn:"100383", nm:"STARTER 3957597 (GPU456)", cat:"electrical", cond:"new", price:null, stock:3, fits:["JST-25"], img:"assets/parts/100383_holdwell_223900.jpg"},
  {pn:"100723", nm:"CABLE SUB-ASSEMBLY (ASSY) (L)", cat:"electrical", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","02-2TD25","2TD25","ABS-580","DAS-MOG2023"], img:"assets/parts/100723_megazip_470114364071.webp"},
  {pn:"100724", nm:"CABLE SUB-ASSY, PARK (R)", cat:"electrical", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","02-2TD25","ABS-580","DAS-MOG2023","GT4"], img:"assets/parts/100724_megazip_470124364071.webp"},
  {pn:"101290", nm:"FUSIBLE LINK", cat:"misc", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","BC32"], img:"assets/parts/101290_megazip_908560100271.webp"},
  {pn:"101407", nm:"REAR BUMPER", cat:"misc", cond:"new", price:null, stock:3, fits:["HIACE"], img:"assets/parts/101407_megazip_5215926490.webp"},
  {pn:"101782", nm:"Brake Master Cylinder Assy", cat:"brake", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","02-2TD25","02-2TD20","QCD25-KM"], img:"assets/parts/101782_megazip_4720160120.webp"},
  {pn:"101784", nm:"HYDRAULIC FILTER", cat:"filter", cond:"new", price:null, stock:3, fits:["121"], img:"assets/parts/101784_megazip_P550222.webp"},
  {pn:"101843", nm:"Ball Bearing", cat:"drive", cond:"new", price:null, stock:9, fits:["42-2TD25"], img:"assets/parts/101843_megazip_971400630871.webp"},
  {pn:"101932", nm:"25620-E0012 E5 EGR (Toyota Coaster)", cat:"misc", cond:"new", price:null, stock:3, fits:["COASTER"], img:"assets/parts/101932_megazip_25620E0012.webp"},
  {pn:"101933", nm:"STEERING ARM, RH, 45611-36242", cat:"steering", cond:"new", price:null, stock:3, fits:["COASTER"], img:"assets/parts/101933_megazip_4561136242.webp"},
  {pn:"101994", nm:"CLAMP - RADIATOR HOSE 16592-26600-71", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["02-2TD25","52-2TD25"], img:"assets/parts/101994_megazip_165922660071.webp"},
  {pn:"101995", nm:"Hose Clamp 16591-26600-71", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["02-2TD25","52-2TD25"], img:"assets/parts/101995_megazip_165912660071.webp"},
  {pn:"102098", nm:"TRANSMISSION OVERHAUL KIT", cat:"misc", cond:"new", price:null, stock:3, fits:["42-2TD25"], img:"assets/parts/102098_megazip_043214055171.webp"},
  {pn:"102464", nm:"Steering Post", cat:"steering", cond:"new", price:null, stock:3, fits:["42-2TD25","52-2TD25"], img:"assets/parts/102464_megazip_452512360071.webp"},
  {pn:"102575", nm:"Cylinder Assy, Clutch Release", cat:"drive", cond:"new", price:null, stock:3, fits:["COASTER"], img:"assets/parts/102575_megazip_3147037081.webp"},
  {pn:"102609", nm:"NX110-5L /90D26L", cat:"misc", cond:"new", price:null, stock:3, fits:["NV350 URVAN","ALPHARD","EW4","NMR85E-V","RACTIS","52-2TD25"], img:"assets/parts/102609_megazip_NX1105L.webp"},
  {pn:"102638", nm:"Air Filter", cat:"filter", cond:"new", price:null, stock:9, fits:["2TD25"], img:"assets/parts/102638_megazip_1780175010.webp"},
  {pn:"102645", nm:"Cabin Air Filter", cat:"filter", cond:"new", price:null, stock:9, fits:["HIACE"], img:"assets/parts/102645_megazip_8713958010.webp"},
  {pn:"102813", nm:"GASKET(C4934344)KG Bus", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["LCK6970G"], img:"assets/parts/102813_megazip_C4934344.webp"},
  {pn:"103038", nm:"THERMOSTAT", cat:"misc", cond:"new", price:null, stock:3, fits:["52-2TD25","02-2TD25","42-2TD25","ABS-580"], img:"assets/parts/103038_megazip_9001A97005.webp"},
  {pn:"103238", nm:"Oil filter", cat:"filter", cond:"new", price:null, stock:3, fits:["COASTER","XZB59R-ZEMQY5","XZB50RZEMQY"], img:"assets/parts/103238_megazip_15613E0080.webp"},
  {pn:"103239", nm:"Oil filter", cat:"filter", cond:"new", price:null, stock:9, fits:["42-2TD25","H1 VAN M'T"], img:"assets/parts/103239_megazip_263304X000.webp"},
  {pn:"103242", nm:"Oil filter-Volvo 7132", cat:"filter", cond:"new", price:null, stock:3, fits:["TGS 35.360 8X4","TSG 35.360 8X4"], img:"assets/parts/103242_megazip_477556.webp"},
  {pn:"103247", nm:"FUEL FILTER -Volvo ZLC083", cat:"filter", cond:"new", price:null, stock:3, fits:["TGS 35.360 8X4","TSG 35.360 8X4"], img:"assets/parts/103247_megazip_20976003.webp"},
  {pn:"103263", nm:"Water Pump", cat:"hydraulic", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/103263_megazip_C4891252.webp"},
  {pn:"103438", nm:"OIL FILTER", cat:"filter", cond:"new", price:null, stock:3, fits:["SORENTO DIESEL","STEPWGN L"], img:"assets/parts/103438_megazip_263202R000.webp"},
  {pn:"103804", nm:"10060015 REAR COUPLING LOCK", cat:"drive", cond:"new", price:null, stock:9, fits:["WGJXT20B","HAS04-CD16","HAS04-PDA","HAS00-PDA","HAS04-PDB","WGJBT70B"], img:"assets/parts/103804_megazip_10060015.webp"},
  {pn:"103967", nm:"SENSOR, TEMPERATURE (Volvo B8R) 21412472", cat:"electrical", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/103967_megazip_21412472.webp"},
  {pn:"103969", nm:"P550388 HYDRAULIC FILTER ELEMENT (LOADER)", cat:"filter", cond:"new", price:null, stock:9, fits:["FVR34QCF-V-DOC","DT-6008","FSR34L-6S","FTR34Q-V","FVR 23","FVR34QC-VI"], img:"assets/parts/103969_megazip_P550148.webp"},
  {pn:"104223", nm:"Oil Cooler Hose", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["02-2TD25"], img:"assets/parts/104223_megazip_15779UC010.webp"},
  {pn:"104224", nm:"BY PASS HOSE", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["02-2TD25"], img:"assets/parts/104224_megazip_16261UC010.webp"},
  {pn:"104225", nm:"Hose, Radiator, Inlet 16511-43631-71", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["02-2TD25","52-2TD25"], img:"assets/parts/104225_megazip_165114363171.webp"},
  {pn:"104226", nm:"Hose Radiator, Outlet", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["02-2TD25","52-2TD25"], img:"assets/parts/104226_megazip_165124363171.webp"},
  {pn:"104229", nm:"Engine Overhaul Gasker Kit, 1DZ (PO90544)", cat:"engine", cond:"new", price:null, stock:3, fits:["02-2TD25"], img:"assets/parts/104229_megazip_041114044371.webp"},
  {pn:"104304", nm:"ADJUSTER CABLE", cat:"electrical", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","02-2TD25"], img:"assets/parts/104304_megazip_474703306071.webp"},
  {pn:"104597", nm:"VOLVO BUS DIESEL FUEL FILTER 22892652", cat:"filter", cond:"new", price:null, stock:9, fits:["B8R","18.290H0CL'R"], img:"assets/parts/104597_megazip_V22892652.webp"},
  {pn:"105063", nm:"AIR FILTER (Pick Up) 27277-4M400", cat:"filter", cond:"new", price:null, stock:9, fits:["TFS87JD-VI-AT-D","TFS87JD-VI-C-AT","ZOE"], img:"assets/parts/105063_megazip_272774M400.webp"},
  {pn:"105477", nm:"Exhaust Pipe Gasket", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["42-2TD25","52-2TD25"], img:"assets/parts/105477_megazip_905844300171.webp"},
  {pn:"105993", nm:"KG/104-112", cat:"misc", cond:"new", price:null, stock:9, fits:["FEC91GR3SDAH","FSR11FM","NQR75K'LAV'"], img:"assets/parts/105993_megazip_104112.webp"},
  {pn:"106043", nm:"Cylinder Head Assembly", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["02-2TD25","52-2TD25"], img:"assets/parts/106043_megazip_11101UC021.webp"},
  {pn:"106304", nm:"Air Filter C26", cat:"filter", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/106304_megazip_16546V0192.webp"},
  {pn:"106305", nm:"HFC26 AC Air Filter", cat:"filter", cond:"new", price:null, stock:3, fits:["EPOWER STAR","SERENA"], img:"assets/parts/106305_megazip_27277EN000.webp"},
  {pn:"106306", nm:"Boot, CV Joint inter & outer", cat:"misc", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/106306_megazip_44333SJ4961.webp"},
  {pn:"106380", nm:"Oil Filter 7133", cat:"filter", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/106380_megazip_21707133.webp"},
  {pn:"106632", nm:"BOLT", cat:"hardware", cond:"new", price:null, stock:3, fits:["52-2TD25"], img:"assets/parts/106632_megazip_815527606871.webp"},
  {pn:"107139", nm:"Exhaust pipe hanger/big", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","02-2TD25","02-2TD20","E-TRAVELLER"], img:"assets/parts/107139_megazip_9091708006.webp"},
  {pn:"107140", nm:"Exhaust pipe hanger/Small", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","02-2TD25","02-2TD20","E-TRAVELLER"], img:"assets/parts/107140_megazip_9091708004.webp"},
  {pn:"107516", nm:"10060011 REAR COUPLING PIN", cat:"drive", cond:"new", price:null, stock:9, fits:["WGJXT20B","HAS04-PDA","HAS04-CD16","WGJXT20A","WGJB","WGJX"], img:"assets/parts/107516_megazip_10060011.webp"},
  {pn:"107742", nm:"2TD25 VACUUM BOOSTER PUMP 47230-43630-71", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","02-2TD25","02-2TD20","QCD25-KM","TRANSIT 2.0 AT"], img:"assets/parts/107742_megazip_472304363071.webp"},
  {pn:"107761", nm:"Oil Filter ML239124 Mitsubishi Fuso OEM", cat:"filter", cond:"new", price:null, stock:3, fits:["FEC91G","BE641GRMDAE"], img:"assets/parts/107761_megazip_ML239124.webp"},
  {pn:"107763", nm:"Oil Filter QC000454", cat:"filter", cond:"new", price:null, stock:3, fits:["FEC91G"], img:"assets/parts/107763_megazip_FFILTERQC000454.webp"},
  {pn:"108199", nm:"95224-29850 RELAY", cat:"electrical", cond:"new", price:null, stock:3, fits:["CMX2402","H1 VAN M'T","IONIQ ELEC URB"], img:"assets/parts/108199_megazip_9522429850.webp"},
  {pn:"108275", nm:"Tie Rod End - Inner (B8R)", cat:"steering", cond:"new", price:null, stock:3, fits:["B8R"], img:"assets/parts/108275_holdwell_21368800.jpg"},
  {pn:"108420", nm:"Water Temperature Sensor", cat:"electrical", cond:"new", price:null, stock:3, fits:["42-2TD25"], img:"assets/parts/108420_megazip_894227600271.webp"},
  {pn:"108562", nm:"REAR LAMP LENS (LH)", cat:"electrical", cond:"new", price:null, stock:3, fits:["XZB50RZEMQY"], img:"assets/parts/108562_megazip_8156136310.webp"},
  {pn:"108634", nm:"OIL FILTER 4407", cat:"filter", cond:"new", price:null, stock:9, fits:["PX1153"], img:"assets/parts/108634_holdwell_100073.jpg"},
  {pn:"109200", nm:"Stud Bolt", cat:"hardware", cond:"new", price:null, stock:9, fits:[], img:"assets/parts/109200_megazip_423253080071.webp"},
  {pn:"109201", nm:"Corn Washer", cat:"hardware", cond:"new", price:null, stock:9, fits:[], img:"assets/parts/109201_megazip_423232333071.webp"},
  {pn:"109202", nm:"Spring Washer", cat:"steering", cond:"new", price:null, stock:9, fits:[], img:"assets/parts/109202_megazip_845127600871.webp"},
  {pn:"109329", nm:"FUEL FILTER 23303-76002-71", cat:"filter", cond:"new", price:null, stock:3, fits:["QCD25-KM","TD25"], img:"assets/parts/109329_megazip_233037600271.webp"},
  {pn:"109348", nm:"AC Air Filter", cat:"filter", cond:"new", price:null, stock:3, fits:["SORENTO DIESEL","IONIQ ELEC URB","NV350 URVAN"], img:"assets/parts/109348_megazip_97133L1000.webp"},
  {pn:"109352", nm:"Air Filter JJ", cat:"filter", cond:"new", price:null, stock:3, fits:["QCD25-KM","TD25"], img:"assets/parts/109352_megazip_1654640K00.webp"},
  {pn:"109380", nm:"FUEL FILTER/1R-1804", cat:"filter", cond:"new", price:null, stock:3, fits:["PX1153"], img:"assets/parts/109380_megazip_4816636.webp"},
  {pn:"109430", nm:"CABIN AIR FILTER 97133-G2000 / AC-10220-F", cat:"filter", cond:"new", price:null, stock:3, fits:["IONIQ ELEC URB","KONA ELECTRIC","MUSSO"], img:"assets/parts/109430_megazip_97133G2000.webp"},
  {pn:"109534", nm:"Air Filter", cat:"filter", cond:"new", price:null, stock:9, fits:["NEW SANTA FE"], img:"assets/parts/109534_megazip_28113A9100.webp"},
  {pn:"109542", nm:"Relay28300-48010", cat:"electrical", cond:"new", price:null, stock:3, fits:["42-2TD25","52-2TD25"], img:"assets/parts/109542_megazip_RELAY2830048010.webp"},
  {pn:"109561", nm:"Muffler Clamp Assembly", cat:"electrical", cond:"new", price:null, stock:3, fits:["52-2TD25","02-2TD25"], img:"assets/parts/109561_megazip_174062300071.webp"},
  {pn:"110603", nm:"FUEL FILTER", cat:"filter", cond:"new", price:null, stock:3, fits:["BE641GRMDAE","FEC91GR3SDAH"], img:"assets/parts/110603_megazip_ML239124.webp"},
  {pn:"111042", nm:"57590-23343-71 KEY CYLINDER", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["52-2TD25","42-2TD25","660-34-4"], img:"assets/parts/111042_holdwell_575902334071.jpg"},
  {pn:"111171", nm:"Striker Assembly", cat:"misc", cond:"new", price:null, stock:3, fits:["42-2TD25","52-2TD25","02-2TD20"], img:"assets/parts/111171_megazip_694307600171.webp"},
  {pn:"111353", nm:"Handle Assy-Tail Gate Release", cat:"hardware", cond:"new", price:null, stock:3, fits:["IONIQ ELEC URB"], img:"assets/parts/111353_megazip_81260G20104X.webp"},
  {pn:"112830", nm:"Water Pump O-Ring", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["COMMANDER-30I"], img:"assets/parts/112830_megazip_C3906698.webp"},
  {pn:"113570", nm:"REAR LAMP LENS(LH)", cat:"electrical", cond:"new", price:null, stock:3, fits:["42-2TD25","52-2TD25","02-2TD25"], img:"assets/parts/113570_megazip_815617600171.webp"},
  {pn:"113989", nm:"10060014 1.6DOLLY REAR COUPLING PIN LOCK", cat:"drive", cond:"new", price:null, stock:9, fits:["A03083D-3805","SAP-I","A03083D","DAS-PD7000-0912","PD70","WGJBT70B"], img:"assets/parts/113989_megazip_10060014.webp"},
  {pn:"114010", nm:"Oil Filler Cap Assembly", cat:"engine", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25"], img:"assets/parts/114010_megazip_121807601071.webp"},
  {pn:"114079", nm:"Tailgate support bar right Genuine manufacturerIONIQ", cat:"hardware", cond:"new", price:null, stock:3, fits:["IONIQ ELEC URB"], img:"assets/parts/114079_megazip_81781G2000.webp"},
  {pn:"114134", nm:"AIR FILTER (BVP, LARGE), 150X280X380", cat:"filter", cond:"new", price:null, stock:3, fits:["FVR34QCF-V-DOC"], img:"assets/parts/114134_megazip_1876101151.webp"},
  {pn:"114492", nm:"OIL FILTER", cat:"filter", cond:"new", price:null, stock:3, fits:["FSR11FM"], img:"assets/parts/114492_megazip_1878100752.webp"},
  {pn:"115216", nm:"HANDLE ASSY-FRONT DOOR OUTSIDE RH", cat:"hardware", cond:"new", price:null, stock:3, fits:["H1 EURO5"], img:"assets/parts/115216_megazip_826604H000CA.webp"},
  {pn:"115221", nm:"PAPER OIL FILTER ELEMENT, 115221/123020", cat:"filter", cond:"new", price:null, stock:3, fits:["XZC720R- ZKTQV3","COASTER","HINO300","XZC710R-WKTQV3"], img:"assets/parts/115221_megazip_1560178140.webp"},
  {pn:"115480", nm:"Toyota minibus air conditioning blower", cat:"misc", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/115480_megazip_8710336011.webp"},
  {pn:"115481", nm:"Toyota minibus head pressing leather(4piece/set)", cat:"misc", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/115481_megazip_0446536090.webp"},
  {pn:"115491", nm:"Oil residue filter(BVP/iron)hole17.5MM", cat:"filter", cond:"new", price:null, stock:3, fits:["NPR66P"], img:"assets/parts/115491_megazip_5876100110.webp"},
  {pn:"115941", nm:"PLATE", cat:"hardware", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/115941_megazip_123064250071.webp"},
  {pn:"116002", nm:"BRAKE, DISC PAD", cat:"brake", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25"], img:"assets/parts/116002_megazip_475114363271.webp"},
  {pn:"116888", nm:"Engine Mount (L)", cat:"engine", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/116888_megazip_123627600171.webp"},
  {pn:"117295", nm:"ACTUATOR ASSY, ACCEL INTER LOCK", cat:"hardware", cond:"new", price:null, stock:3, fits:["COASTER"], img:"assets/parts/117295_megazip_8561036070.webp"},
  {pn:"117489", nm:"Air Filter16546-VW600", cat:"filter", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/117489_megazip_FILTER16546VW600.webp"},
  {pn:"117565", nm:"4921497 SENSOR", cat:"electrical", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/117565_holdwell_4921497.jpg"},
  {pn:"117586", nm:"Photograph (Benz) 9062000670", cat:"misc", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/117586_megazip_9062000670.webp"},
  {pn:"117605", nm:"generator19010002", cat:"misc", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/117605_megazip_GENERATOR19010002.webp"},
  {pn:"117665", nm:"SEAL KIT OVERHAUL CYLINDER", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25"], img:"assets/parts/117665_megazip_044714010071.webp"},
  {pn:"117680", nm:"4 Brake Pads/F", cat:"brake", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/117680_megazip_1680791780.webp"},
  {pn:"117695", nm:"Pump Perkins U5MW0156", cat:"hydraulic", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/117695_holdwell_4223109.jpg"},
  {pn:"117708", nm:"PearNSK HR32207J", cat:"misc", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/117708_megazip_HR32207J.webp"},
  {pn:"118380", nm:"Filter 1012120 (Grass/Isuzu)", cat:"filter", cond:"new", price:null, stock:9, fits:["NPR75HJWE-VI-C","NPR75KJW-V"], img:"assets/parts/118380_megazip_8970967770.webp"},
  {pn:"118601", nm:"Steering knuckle (left)", cat:"steering", cond:"new", price:null, stock:3, fits:["EC35"], img:"assets/parts/118601_megazip_3501371CA02.webp"},
  {pn:"118602", nm:"Steering Knuckle (Right)", cat:"steering", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/118602_megazip_3501381CA02.webp"},
  {pn:"118603", nm:"Transverse Tie Rod and Ball Joint Assembly", cat:"steering", cond:"new", price:null, stock:3, fits:["EC35","TMX150"], img:"assets/parts/118603_megazip_3003100CA02.webp"},
  {pn:"118605", nm:"Brake block assembly", cat:"brake", cond:"new", price:null, stock:9, fits:["EC35"], img:"assets/parts/118605_megazip_3501500CA01.webp"},
  {pn:"118606", nm:"Front wheel housing bearing", cat:"wheel", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/118606_megazip_3501610CA01.webp"},
  {pn:"118638", nm:"Drive shaft hanger(straight)37230-36141", cat:"misc", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/118638_megazip_3723036141.webp"},
  {pn:"118757", nm:"Switch Assembly", cat:"electrical", cond:"new", price:null, stock:3, fits:["52-2TD25","42-2TD25"], img:"assets/parts/118757_megazip_844617600171.webp"},
  {pn:"119436", nm:"Oil filter GPU456 LF9009", cat:"filter", cond:"new", price:null, stock:9, fits:[], img:"assets/parts/119436_megazip_LF9009.webp"},
  {pn:"119440", nm:"High pressure filter PAP(P550388)", cat:"filter", cond:"new", price:null, stock:9, fits:["KG-B6300S"], img:"assets/parts/119440_megazip_P550388.webp"},
  {pn:"119445", nm:"Air filter ASU34/Front 5-87610020-1", cat:"filter", cond:"new", price:null, stock:9, fits:["XZC710R-WKTQV3"], img:"assets/parts/119445_megazip_5876100201.webp"},
  {pn:"119455", nm:"Air filter PAP 8-97062294-0", cat:"filter", cond:"new", price:null, stock:9, fits:["NMR85E-V","NPR75HJWE-VI-C","NPR75KJW-V"], img:"assets/parts/119455_megazip_8970622940.webp"},
  {pn:"119551", nm:"BOLT, HUB (FOR FRONT AXLE RH)", cat:"wheel", cond:"new", price:null, stock:9, fits:["BZB40R-ZCMSC"], img:"assets/parts/119551_megazip_9094202071.webp"},
  {pn:"119552", nm:"BOLT, HUB (FOR FRONT AXLE LH)", cat:"wheel", cond:"new", price:null, stock:9, fits:["BZB40R-ZCMSC"], img:"assets/parts/119552_megazip_9094202072.webp"},
  {pn:"120206", nm:"Overhaul the Wheel Cylinder", cat:"wheel", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25"], img:"assets/parts/120206_megazip_044753008171.webp"},
  {pn:"121826", nm:"Air Filter Compatible", cat:"filter", cond:"new", price:null, stock:3, fits:["KONA ELECTRIC","IONIQ ELEC URB"], img:"assets/parts/121826_megazip_97133F2000.webp"},
  {pn:"122097", nm:"10020003 LATCH WITH BRACKET", cat:"hardware", cond:"new", price:null, stock:3, fits:["HAS04-PDA","HAS00-PDA","HAS00-PDA2"], img:"assets/parts/122097_megazip_10020003.webp"},
  {pn:"122204", nm:"MITSUBISHI BELT B-133", cat:"drive", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/122204_megazip_120394.webp"},
  {pn:"122287", nm:"NISSAN E-NV200 CABIN AIR FILTER", cat:"filter", cond:"new", price:null, stock:3, fits:["E-NV200 EVALIA"], img:"assets/parts/122287_megazip_278914FA0A.webp"},
  {pn:"122296", nm:"CONVERTER ASSY", cat:"misc", cond:"new", price:null, stock:3, fits:["COASTER","XZB50RZEMQY"], img:"assets/parts/122296_megazip_1845078271.webp"},
  {pn:"122297", nm:"BOLT OR RING, EXHAUST PIPE FRONT", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["XZB50RZEMQY"], img:"assets/parts/122297_megazip_9090105026.webp"},
  {pn:"122298", nm:"Gasket, Exhaust Pipe", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["COASTER","XZB50RZEMQY"], img:"assets/parts/122298_megazip_1745178020.webp"},
  {pn:"122299", nm:"Gasket, Exhaust Pipe", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["COASTER","XZB50RZEMQY"], img:"assets/parts/122299_megazip_1745167010.webp"},
  {pn:"122300", nm:"BELT ASSY FRONT SEAT", cat:"drive", cond:"new", price:null, stock:3, fits:["XZB50RZEMQY"], img:"assets/parts/122300_megazip_7321036111E0.webp"},
  {pn:"122690", nm:"FUEL FILTER", cat:"filter", cond:"new", price:null, stock:9, fits:["B8R"], img:"assets/parts/122690_megazip_21538975.webp"},
  {pn:"123020", nm:"Oil filter (Hino 300)", cat:"filter", cond:"new", price:null, stock:9, fits:["COASTER","XZC720R- ZKTQV3"], img:"assets/parts/123020_megazip_1560178140.webp"},
  {pn:"123023", nm:"Air filter (Hino 300)", cat:"filter", cond:"new", price:null, stock:3, fits:["XZC720R- ZKTQV3"], img:"assets/parts/123023_megazip_1780178090.webp"},
  {pn:"123030", nm:"ZBE-102", cat:"misc", cond:"new", price:null, stock:9, fits:["660-34-4"], img:"assets/parts/123030_holdwell_66818.jpg"},
  {pn:"124364", nm:"BELT TENSIONER PULLEY", cat:"drive", cond:"new", price:null, stock:3, fits:["FEC71ER3SDAH","FEC91G"], img:"assets/parts/124364_megazip_MK667238.webp"},
  {pn:"124366", nm:"PULLEY, ALTERNATOR", cat:"drive", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/124366_megazip_ME230746.webp"},
  {pn:"124564", nm:"OilFilter M806418 (Grass)", cat:"filter", cond:"new", price:null, stock:9, fits:["NMR85E-V","MF6713'DYNA-4'","XZC710R-WKTQV3"], img:"assets/parts/124564_megazip_M806418.webp"},
  {pn:"125124", nm:"12020019  Pin", cat:"hardware", cond:"new", price:null, stock:9, fits:["ME3096"], img:"assets/parts/125124_megazip_12020019.webp"},
  {pn:"126661", nm:"8-97049708-1 (Isuzu)", cat:"misc", cond:"new", price:null, stock:9, fits:["TGM26.290 6X2-4"], img:"assets/parts/126661_megazip_8970497081.webp"},
  {pn:"126682", nm:"28658-21000", cat:"misc", cond:"new", price:null, stock:9, fits:["TD25"], img:"assets/parts/126682_megazip_2865821000.webp"},
  {pn:"127134", nm:"Filter 842921 (Grass)", cat:"filter", cond:"new", price:null, stock:3, fits:["CMX2402"], img:"assets/parts/127134_megazip_842921.webp"},
  {pn:"127584", nm:"Filter (Isuzu) Grass", cat:"filter", cond:"new", price:null, stock:3, fits:["NMR85E-V","XZC710R-WKTQV3"], img:"assets/parts/127584_megazip_8980188580.webp"},
  {pn:"127585", nm:"Filter (Izuzu) Grass", cat:"filter", cond:"new", price:null, stock:3, fits:["NMR85E-V"], img:"assets/parts/127585_megazip_234011580.webp"},
  {pn:"128080", nm:"Cabin Filter (Hi Ace)", cat:"filter", cond:"new", price:null, stock:3, fits:["HIACE","KANGOO VAN Z.E."], img:"assets/parts/128080_megazip_871390N010.webp"},
  {pn:"129022", nm:"Engine Oil Pressure Switch Assembly", cat:"electrical", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/129022_megazip_9475037100.webp"},
  {pn:"130122", nm:"PCV FILTER", cat:"filter", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/130122_megazip_MX008916.webp"},
  {pn:"130669", nm:"GASKET, WATER PUMP", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["FEC71ER3SDAH"], img:"assets/parts/130669_megazip_ME418849.webp"},
  {pn:"130739", nm:"Window Regulator", cat:"electrical", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/130739_megazip_6980337030.webp"},
  {pn:"131058", nm:"FOG LAMP COVER, RH", cat:"electrical", cond:"new", price:null, stock:3, fits:["HIACE"], img:"assets/parts/131058_megazip_8148126120.webp"},
  {pn:"131059", nm:"FOG LAMP COVER, LH", cat:"electrical", cond:"new", price:null, stock:3, fits:["HIACE"], img:"assets/parts/131059_megazip_8148226120.webp"},
  {pn:"131198", nm:"JU6-H1950-00-00", cat:"misc", cond:"new", price:null, stock:3, fits:["TITAN XD 4PASS"], img:"assets/parts/131198_megazip_JU6H19500000.webp"},
  {pn:"131534", nm:"PRESSURE SENSOR", cat:"electrical", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/131534_holdwell_4921517.jpg"},
  {pn:"131593", nm:"SWITCH POWER WINDOW MAIN ASSY", cat:"electrical", cond:"new", price:null, stock:3, fits:["IONIQ ELEC URB"], img:"assets/parts/131593_megazip_93570G25204X.webp"},
  {pn:"131594", nm:"Electric Window Switch Front Left", cat:"electrical", cond:"new", price:null, stock:3, fits:["IONIQ ELEC URB"], img:"assets/parts/131594_megazip_93575G20604X.webp"},
  {pn:"13217", nm:"Belt 6420", cat:"drive", cond:"new", price:null, stock:9, fits:["FVR34QCF-V-DOC","FVR34QC-VI"], img:"assets/parts/13217_megazip_1876102380.webp"},
  {pn:"132185", nm:"Cylinder Assy, Wheel Brake, Rr Rh", cat:"brake", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/132185_megazip_4755037113.webp"},
  {pn:"132186", nm:"Cylinder Assy, Wheel Brake, Rr Rh", cat:"brake", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/132186_megazip_4756037083.webp"},
  {pn:"132187", nm:"Cylinder Assy, Wheel Brake, Rr Rh", cat:"brake", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/132187_megazip_4757037073.webp"},
  {pn:"132196", nm:"Bushing 16415-23000-71 (2TG25)", cat:"steering", cond:"new", price:null, stock:9, fits:["52-2TD25"], img:"assets/parts/132196_megazip_164152300071.webp"},
  {pn:"132294", nm:"Pressure Switch (Loader)", cat:"electrical", cond:"new", price:null, stock:3, fits:["WGSJT14"], img:"assets/parts/132294_holdwell_04215774.jpg"},
  {pn:"14462", nm:"Transmission Oil Cooler", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["42-2TD25"], img:"assets/parts/14462_megazip_329204363071.webp"},
  {pn:"14656", nm:"HOSE, HIGH PRESSURE", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","02-2TD25"], img:"assets/parts/14656_megazip_963630904571.webp"},
  {pn:"24052", nm:"FUEL FILTER (ISUZU)", cat:"filter", cond:"new", price:null, stock:3, fits:["PAXLIFTXL","VITO116BT","114BT FL","516BT L","NMR85E-V"], img:"assets/parts/24052_megazip_1520831U00.webp"},
  {pn:"26421", nm:"P502042 FILTER, OIL (OFFICIAL, SAME 26424/66805/77299)", cat:"filter", cond:"new", price:null, stock:9, fits:["FRR90M-V","NPR66P"], img:"assets/parts/26421_megazip_5876101170.webp"},
  {pn:"32308", nm:"CLAMP, BRACKET", cat:"electrical", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","02-2TD25"], img:"assets/parts/32308_megazip_175453162071.webp"},
  {pn:"53726", nm:"U-BOLT, Exhaust Pipe", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","02-2TD25"], img:"assets/parts/53726_megazip_901170800171.webp"},
  {pn:"59630", nm:"OIL SEAL", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["COASTER"], img:"assets/parts/59630_megazip_9031038033.webp"},
  {pn:"76222", nm:"COUPLING, 1in, EXTENDED W/PLUG", cat:"drive", cond:"new", price:null, stock:9, fits:[], img:"assets/parts/76222_megazip_2012404.webp"},
  {pn:"88648", nm:"TOYOTA PARKING BRAKE CABLE 47011-43631-71", cat:"brake", cond:"new", price:null, stock:9, fits:["52-2TD25"], img:"assets/parts/88648_megazip_470114363171.webp"},
  {pn:"88651", nm:"TOYOTA STEERING CYLINDER OVERHAUL SEAL KIT 04456-10050-71", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","02-2TD25","DAS-PD7000G","NBL"], img:"assets/parts/88651_megazip_044561005071.webp"},
  {pn:"88661", nm:"BUSHING / BRUSHING", cat:"steering", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","02-2TD25","WGJBT70B","02-2TD20","DAS-PD7000-0912"], img:"assets/parts/88661_megazip_903851800171.webp"},
  {pn:"88663", nm:"OIL SEAL", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","02-2TD25","02-2TD20","2TD25","ABS-580"], img:"assets/parts/88663_megazip_421253306071.webp"},
  {pn:"89030", nm:"10020045 STOP PLATE", cat:"hardware", cond:"new", price:null, stock:9, fits:["HAS04-PDA","SE1596-C","HAS00-PDA","HAS04-PDB","PD70M","DAS-PD7000-0912"], img:"assets/parts/89030_megazip_10020045.webp"},
  {pn:"89032", nm:"10030035 WHEEL AXLE", cat:"wheel", cond:"new", price:null, stock:9, fits:["HAS04-PDA","HAS00-PDA","HAS04-PDB","HAS00-PDA2","SE1596-C","BC32"], img:"assets/parts/89032_megazip_10030035.webp"},
  {pn:"89038", nm:"10010016 TOWBAR HEAD", cat:"misc", cond:"new", price:null, stock:9, fits:["HAS00-PDA","HAS00-PDA2","HAS04-PDA","HAS04-PDB","DAS-PD7000-0912","E6"], img:"assets/parts/89038_megazip_10010016.webp"},
  {pn:"89514", nm:"Retread 165R13 RET", cat:"misc", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","GT4","02-2TD25","02-2TD20","JST-25"], img:"assets/parts/89514_megazip_TIRE165R13.webp"},
  {pn:"89521", nm:"Sailun 165R13C 94/93S VX1", cat:"misc", cond:"new", price:null, stock:3, fits:["52-2TD25","42-2TD25","GT4","02-2TD25","02-2TD20","JST-25"], img:"assets/parts/89521_megazip_TIRE165R13C.webp"},
  {pn:"89522", nm:"Advance 600-9  10P MB238 TTF", cat:"misc", cond:"new", price:null, stock:3, fits:["T137","T135","T-135 EVO","T135 AC","P250","GT4"], img:"assets/parts/89522_megazip_TIRE6009.webp"},
  {pn:"89590", nm:"Buzzer Ass'y Vacuum", cat:"electrical", cond:"new", price:null, stock:9, fits:["42-2TD25","HAS04-PDB","52-2TD25"], img:"assets/parts/89590_megazip_586603038071.webp"},
  {pn:"89601", nm:"Rear Lamp lens(RH)", cat:"electrical", cond:"new", price:null, stock:3, fits:["42-2TD25","52-2TD25","JNP6122GR","QCD25-KM"], img:"assets/parts/89601_megazip_815517600171.webp"},
  {pn:"89628", nm:"Switch Assy ,OIl Pressure (Engine)", cat:"electrical", cond:"new", price:null, stock:3, fits:["52-2TD25","42-2TD25","02-2TD25","CHAMP70W","NBL"], img:"assets/parts/89628_megazip_83530UC010.webp"},
  {pn:"89631", nm:"Tie Rod End. R/H", cat:"steering", cond:"new", price:null, stock:3, fits:["52-2TD25","T135"], img:"assets/parts/89631_megazip_456602054171.webp"},
  {pn:"89634", nm:"Tail oil98*130*13 'TAskeleton oil sealToyota ST", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","02-2TD20","02-2TD25","2TD25","A03083D"], img:"assets/parts/89634_megazip_424233306171.webp"},
  {pn:"89637", nm:"Bearing Set ,Crankshaft (STD)", cat:"drive", cond:"new", price:null, stock:9, fits:["52-2TD25"], img:"assets/parts/89637_megazip_1170178C0071.webp"},
  {pn:"89718", nm:"Bearing, Connecting Rod(STD)", cat:"drive", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","02-2TD25","DAS-PD7000-0912"], img:"assets/parts/89718_megazip_1304178C0071.webp"},
  {pn:"90448", nm:"WHEEL HUB 11030012", cat:"wheel", cond:"new", price:null, stock:9, fits:["HAS04-CD16","SSB","DASCD1600-0814","DAS-BC3600G","BC32","WGJXT20A"], img:"assets/parts/90448_megazip_11030012.webp"},
  {pn:"90458", nm:"TOYOTA ALTERNATOR ASSEMBLY WITH VACUUM PUMP, 27040-UC010", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["52-2TD25","42-2TD25","COMMANDER 30","TD25"], img:"assets/parts/90458_megazip_27040UC010.webp"},
  {pn:"90459", nm:"Water Pump", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["52-2TD25","42-2TD25","02-2TD25","ABS-580"], img:"assets/parts/90459_megazip_16100UD010.webp"},
  {pn:"90521", nm:"Hose", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["52-2TD25","02-2TD25"], img:"assets/parts/90521_megazip_15778UD010.webp"},
  {pn:"90525", nm:"Valve, Intake 13711-UD010", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","02-2TD25"], img:"assets/parts/90525_megazip_13711UD010.webp"},
  {pn:"90526", nm:"Valve, Exhaust 13715", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","02-2TD25"], img:"assets/parts/90526_megazip_13715UD010.webp"},
  {pn:"91701", nm:"Tie Rod End. R/H", cat:"steering", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","02-2TD25","660-34-4","K10B","TAIL STANDS"], img:"assets/parts/91701_megazip_456602054171.webp"},
  {pn:"91702", nm:"Tie Rod End. L/H", cat:"steering", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","02-2TD25","BZB40R-ZCMSC","COASTER","K10B"], img:"assets/parts/91702_megazip_456602054171.webp"},
  {pn:"91706", nm:"Diesel filter bracket and exhaust gas pump", cat:"filter", cond:"new", price:null, stock:9, fits:["42-2TD25","02-2TD20","02-2TD25","52-2TD25"], img:"assets/parts/91706_megazip_233022366071.webp"},
  {pn:"91717", nm:"TOYOTA VE ROTARY INJECTION PUMP REPAIR KIT, 146600-1120", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["42-2TD25"], img:"assets/parts/91717_megazip_1466001120.webp"},
  {pn:"91817", nm:"R/H REAR LAMP HIACE 81561-26443", cat:"electrical", cond:"new", price:null, stock:3, fits:["HIACE","UTE CANNON"], img:"assets/parts/91817_megazip_8156126443.webp"},
  {pn:"91949", nm:"Gas spring (without lock)", cat:"steering", cond:"new", price:null, stock:3, fits:["52-2TD25"], img:"assets/parts/91949_megazip_522604363071.webp"},
  {pn:"91950", nm:"Switch ASSY (Dot 3)Brake fluid", cat:"brake", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","02-2TD25","COMMANDER 30","DT-6008"], img:"assets/parts/91950_megazip_472904363071.webp"},
  {pn:"92060", nm:"10010013 TOWBAR HOOK", cat:"misc", cond:"new", price:null, stock:9, fits:["HAS00-PDA","HAS00-PDA2","HAS04-PDA","WGJB","WGJBT70B"], img:"assets/parts/92060_megazip_10010013.webp"},
  {pn:"92075", nm:"Belt 99341-01220(90916-02215)", cat:"drive", cond:"new", price:null, stock:9, fits:["BZB40R-ZCMSC","COASTER","52-2TD25"], img:"assets/parts/92075_megazip_9091602215.webp"},
  {pn:"92744", nm:"Pear30205", cat:"misc", cond:"new", price:null, stock:9, fits:["WGJXT20B","HAS04-CD16","SSB","DAS-BC3600G","DASCD1600-0814","WGJXT20A"], img:"assets/parts/92744_megazip_PEAR30205.webp"},
  {pn:"92769", nm:"10010008 Tow Hook", cat:"misc", cond:"new", price:null, stock:9, fits:["HAS04-PDA","SE1596-C"], img:"assets/parts/92769_megazip_10010008.webp"},
  {pn:"92887", nm:"11010009 TOWBAR HOOK", cat:"misc", cond:"new", price:null, stock:9, fits:["WGJXT20B","DASCD1600-0814","HAS04-CD16","A03083D-3805"], img:"assets/parts/92887_megazip_11010009.webp"},
  {pn:"92902", nm:"12030013 WHEEL HUB", cat:"wheel", cond:"new", price:null, stock:9, fits:["HDD-27","ME3096","SSB"], img:"assets/parts/92902_megazip_12030013.webp"},
  {pn:"93097", nm:"FRONT BRAKE DISC", cat:"brake", cond:"new", price:null, stock:3, fits:["COASTER","XZB50RZEMQY"], img:"assets/parts/93097_megazip_0446536090.webp"},
  {pn:"93099", nm:"Seal", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["BZB40R-ZCMSC","COASTER","XZB50RZEMQY"], img:"assets/parts/93099_megazip_9031168002.webp"},
  {pn:"93100", nm:"Clutch disc", cat:"drive", cond:"new", price:null, stock:3, fits:["BZB40R-ZCMSC","COASTER"], img:"assets/parts/93100_megazip_3125036552.webp"},
  {pn:"93101", nm:"Clutch pressure plate", cat:"drive", cond:"new", price:null, stock:3, fits:["BZB40R-ZCMSC","COASTER"], img:"assets/parts/93101_megazip_3121036310.webp"},
  {pn:"93103", nm:"Flywheel bearing", cat:"wheel", cond:"new", price:null, stock:3, fits:["BZB40R-ZCMSC"], img:"assets/parts/93103_megazip_9036312024.webp"},
  {pn:"93126", nm:"Fan", cat:"misc", cond:"new", price:null, stock:3, fits:["42-2TD25","52-2TD25"], img:"assets/parts/93126_megazip_163617600771.webp"},
  {pn:"93129", nm:"Meter Flexible Wire Assembly Toyota", cat:"electrical", cond:"new", price:null, stock:3, fits:["42-2TD25","52-2TD25"], img:"assets/parts/93129_megazip_571804030271.webp"},
  {pn:"93134", nm:"Bolt, Flywheel", cat:"wheel", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","02-2TD25","COMMANDER 15","JST-25"], img:"assets/parts/93134_megazip_321122059271.webp"},
  {pn:"93135", nm:"SPACER, Flywheel", cat:"wheel", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","JST-25"], img:"assets/parts/93135_megazip_321172367071.webp"},
  {pn:"93136", nm:"SUPPORT, Flywheel", cat:"wheel", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","COMMANDER 15","JST-25"], img:"assets/parts/93136_megazip_321192053071.webp"},
  {pn:"93215", nm:"10030078 CENTRE SHAFT", cat:"misc", cond:"new", price:null, stock:9, fits:["HAS04-PDA","HAS04-PDB"], img:"assets/parts/93215_megazip_10030078.webp"},
  {pn:"93345", nm:"Engine Plate, End Cover", cat:"engine", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","02-2TD25","02-2TD20","COMMANDER 15"], img:"assets/parts/93345_megazip_321112337371.webp"},
  {pn:"93477", nm:"ROCKET SMF56219 RK 62AH BATTERY (96179)", cat:"electrical", cond:"new", price:null, stock:3, fits:["E-TRAVELLER","IONIQ ELEC URB","T3","NEW E-GOLF LIFE","E-NV200 EVALIA","42-2TD25"], img:"assets/parts/93477_megazip_SMF56219.webp"},
  {pn:"93480", nm:"Bolt, hub", cat:"wheel", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25"], img:"assets/parts/93480_megazip_434153008071.webp"},
  {pn:"93501", nm:"Fuel Filiter", cat:"engine", cond:"new", price:null, stock:3, fits:["H1 EURO5","H1 VAN AT EURO6","H1 VAN AT EURO5","H1 EURO6","H1 VAN M'T"], img:"assets/parts/93501_megazip_319222E900.webp"},
  {pn:"93520", nm:"Injection Pump Upper Cover and Repair Kit", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25"], img:"assets/parts/93520_megazip_1466001120.webp"},
  {pn:"93631", nm:"Transmission Mounting", cat:"engine", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","02-2TD25"], img:"assets/parts/93631_megazip_123611304171.webp"},
  {pn:"93632", nm:"Flywheel", cat:"wheel", cond:"new", price:null, stock:3, fits:["52-2TD25","42-2TD25"], img:"assets/parts/93632_megazip_321012278071.webp"},
  {pn:"93655", nm:"Steering linkage", cat:"steering", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/93655_megazip_4545039215.webp"},
  {pn:"93656", nm:"Outer ball joint", cat:"steering", cond:"new", price:null, stock:3, fits:["COASTER"], img:"assets/parts/93656_megazip_4504739165.webp"},
  {pn:"93658", nm:"45046-39275 END SUB ASSY,TIE ROB", cat:"misc", cond:"new", price:null, stock:3, fits:["COASTER"], img:"assets/parts/93658_megazip_4504639275.webp"},
  {pn:"93673", nm:"SHOE KIT, BEAR BRAKE", cat:"brake", cond:"new", price:null, stock:3, fits:["COASTER","BZB40R-ZCMSC","XZB50RZEMQY"], img:"assets/parts/93673_megazip_0449436300.webp"},
  {pn:"93795", nm:"17510-76001-71 Muffler Toyota ST", cat:"engine", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","02-2TD25","02-2TD20","LEAF"], img:"assets/parts/93795_megazip_175107600171.webp"},
  {pn:"93797", nm:"Tall Pipe", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["52-2TD25","02-2TD20","42-2TD25","LEAF"], img:"assets/parts/93797_megazip_174214363171.webp"},
  {pn:"94051", nm:"90916-02227 Belt", cat:"drive", cond:"new", price:null, stock:3, fits:["BZB40R-ZCMSC","B8R","DT-6008"], img:"assets/parts/94051_megazip_9091602227.webp"},
  {pn:"94053", nm:"Alternator V Belt 45371", cat:"drive", cond:"new", price:null, stock:3, fits:["COASTER","XZB50RZEMQY","BZB40R-ZCMSC","XZB59R-ZEMQY5","XZB70R-ZEPQY"], img:"assets/parts/94053_megazip_SZ91049277.webp"},
  {pn:"94057", nm:"OIL SEAL", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["COASTER","BZB40R-ZCMSC"], img:"assets/parts/94057_megazip_9031038033.webp"},
  {pn:"94058", nm:"OIL SEAL", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["COASTER"], img:"assets/parts/94058_megazip_9031178001.webp"},
  {pn:"94065", nm:"Front brake pads", cat:"brake", cond:"new", price:null, stock:3, fits:["COASTER","BZB40R-ZCMSC"], img:"assets/parts/94065_megazip_0446536090.webp"},
  {pn:"94067", nm:"Belt", cat:"drive", cond:"new", price:null, stock:9, fits:["COASTER","XZB50RZEMQY","XZB59R-ZEMQY5","XZB70R-ZEPQY"], img:"assets/parts/94067_megazip_9091602444.webp"},
  {pn:"94070", nm:"Oil Filter  (Rosa)", cat:"filter", cond:"new", price:null, stock:3, fits:["BE641GRMDAE","52-2TD25","02-2TD25","COASTER"], img:"assets/parts/94070_megazip_QC000001.webp"},
  {pn:"94073", nm:"Fuel Filter  (95261)", cat:"filter", cond:"new", price:null, stock:9, fits:["BE641GRMDAE","CANTER","FEC91GR3SDAH","COASTER","FEC91G"], img:"assets/parts/94073_megazip_MK667920.webp"},
  {pn:"94146", nm:"Oil Filter E0080/CO-173", cat:"filter", cond:"new", price:null, stock:9, fits:["COASTER","XZB50RZEMQY","FSR34L-6S","BZB40R-ZCMSC","TGL12.180","XZB59R-ZEMQY5"], img:"assets/parts/94146_megazip_15613E0080.webp"},
  {pn:"94167", nm:"195R15C 8P 106/104R AN900 Annaite", cat:"misc", cond:"new", price:null, stock:3, fits:["HIACE","NV350 URVAN","KDH201RSSPDY","T3","HIACH PETROL","URVAN"], img:"assets/parts/94167_megazip_195R15C.webp"},
  {pn:"94832", nm:"Air Filter", cat:"filter", cond:"new", price:null, stock:9, fits:["HIACE","COASTER","KANGOO VAN Z.E.","KONA ELECTRIC"], img:"assets/parts/94832_megazip_1780131160.webp"},
  {pn:"94833", nm:"Oil Filter", cat:"filter", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","HIACE","COASTER","02-2TD25","ABS-580"], img:"assets/parts/94833_megazip_90915YZZD2.webp"},
  {pn:"94850", nm:"Fuel Tank Cap", cat:"engine", cond:"new", price:null, stock:3, fits:["42-2TD25","52-2TD25","02-2TD25","GT4"], img:"assets/parts/94850_megazip_517212054271.webp"},
  {pn:"94851", nm:"Engine Overhaul Kit, 2Z", cat:"engine", cond:"new", price:null, stock:3, fits:["42-2TD25"], img:"assets/parts/94851_megazip_041112022071.webp"},
  {pn:"94969", nm:"1.6 DOLLY TURNTABLE LOCATING PIN 11060064", cat:"hardware", cond:"new", price:null, stock:9, fits:["WGJXT20B","WGJX","WGJXT20A"], img:"assets/parts/94969_megazip_11060064.webp"},
  {pn:"94970", nm:"1.6 DOLLY TURNTABLE LOCATING PIN 11060025", cat:"hardware", cond:"new", price:null, stock:9, fits:["HAS04-CD16"], img:"assets/parts/94970_megazip_11060025.webp"},
  {pn:"94989", nm:"Toyota Little Balasco Cup48061-36020 Suspension bush Toyota", cat:"steering", cond:"new", price:null, stock:9, fits:["COASTER","XZB50RZEMQY"], img:"assets/parts/94989_megazip_CUP4806136020.webp"},
  {pn:"94991", nm:"OIL FILTER", cat:"filter", cond:"new", price:null, stock:3, fits:["COASTER","BZB40R-ZCMSC","42-2TD25","XZB70R-ZEPQY"], img:"assets/parts/94991_megazip_9091530002.webp"},
  {pn:"95205", nm:"Air Filter", cat:"filter", cond:"new", price:null, stock:3, fits:["HIACE","BZB40R-ZCMSC","COASTER"], img:"assets/parts/95205_megazip_1780130070.webp"},
  {pn:"95207", nm:"Cabin Air Filter", cat:"filter", cond:"new", price:null, stock:3, fits:["HIACE"], img:"assets/parts/95207_megazip_8713926010.webp"},
  {pn:"95495", nm:"Air-filter", cat:"filter", cond:"new", price:null, stock:9, fits:["BZB40R-ZCMSC","COASTER","XZB70R-ZEPQY"], img:"assets/parts/95495_megazip_1780158010.webp"},
  {pn:"95498", nm:"Auxiliary water tank", cat:"misc", cond:"new", price:null, stock:3, fits:["FEC71GR3SDAM","FEC91G","FEC91GR3SDAH"], img:"assets/parts/95498_megazip_ME402056.webp"},
  {pn:"96187", nm:"97617-4H900 (AC-10216F) Cabin Air Filter for HYUNDAI Grand/H1", cat:"filter", cond:"new", price:null, stock:3, fits:["H1 VAN AT EURO6","H1 EURO5","H1 VAN AT EURO5","H1 VAN M'T"], img:"assets/parts/96187_megazip_976174H900.webp"},
  {pn:"96280", nm:"Rubber stopper, Rear axle", cat:"steering", cond:"new", price:null, stock:3, fits:["42-2TD25"], img:"assets/parts/96280_megazip_485034015071.webp"},
  {pn:"96395", nm:"Rubber damping, Muffler", cat:"engine", cond:"new", price:null, stock:3, fits:["52-2TD25"], img:"assets/parts/96395_megazip_174172300171.webp"},
  {pn:"96478", nm:"BUSH, Spring", cat:"steering", cond:"new", price:null, stock:9, fits:["COASTER","XZB50RZEMQY"], img:"assets/parts/96478_megazip_9038523002.webp"},
  {pn:"96514", nm:"Labour Charge 165R13", cat:"misc", cond:"new", price:null, stock:3, fits:["52-2TD25","42-2TD25","02-2TD25"], img:"assets/parts/96514_megazip_022TD25.webp"},
  {pn:"96630", nm:"SWITCH ASSY", cat:"electrical", cond:"new", price:null, stock:3, fits:["52-2TD25","42-2TD25","QCD25-KM","T135"], img:"assets/parts/96630_megazip_575903390471.webp"},
  {pn:"96690", nm:"Air Filter", cat:"filter", cond:"new", price:null, stock:9, fits:["HIACE","KDH201RSSPDY","NMR85E-V"], img:"assets/parts/96690_megazip_1780130060.webp"},
  {pn:"96731", nm:"Brake Cylinder", cat:"brake", cond:"new", price:null, stock:9, fits:["COASTER","BZB40R-ZCMSC"], img:"assets/parts/96731_megazip_4755037113.webp"},
  {pn:"96733", nm:"47570-37073 Cylinder assy, rear wheel brake Toyota", cat:"brake", cond:"new", price:null, stock:9, fits:["BZB40R-ZCMSC","COASTER"], img:"assets/parts/96733_megazip_4757037073.webp"},
  {pn:"96734", nm:"47580-37073 Cylinder Assy, Rear Wheel Brake(For Lh, Rear Or Lower), Toyota", cat:"brake", cond:"new", price:null, stock:9, fits:["BZB40R-ZCMSC","COASTER"], img:"assets/parts/96734_megazip_4758037073.webp"},
  {pn:"96736", nm:"AIR FILTER 17801-58030", cat:"filter", cond:"new", price:null, stock:3, fits:["COASTER","XZB59R-ZEMQY5","XZB70R-ZEPQY"], img:"assets/parts/96736_megazip_1780158030.webp"},
  {pn:"96960", nm:"Belt. 4PK1420", cat:"drive", cond:"new", price:null, stock:9, fits:["TGL12.180","TGM 18.250 4X2"], img:"assets/parts/96960_megazip_4PK1420.webp"},
  {pn:"96965", nm:"PAPER OIL FILTER ELEMENT (FPV)", cat:"filter", cond:"new", price:null, stock:3, fits:["BE641GRMDAE","FEC91GR3SDAH","CANTER","FEC71GR3SDAM","FEC91G"], img:"assets/parts/96965_megazip_QC000001.webp"},
  {pn:"97069", nm:"Clutch pressure plate", cat:"drive", cond:"new", price:null, stock:3, fits:["COASTER"], img:"assets/parts/97069_megazip_3121036292.webp"},
  {pn:"97071", nm:"Flywheel bearing", cat:"wheel", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/97071_megazip_SZ37117009.webp"},
  {pn:"97280", nm:"Hub Cap", cat:"wheel", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","02-2TD25"], img:"assets/parts/97280_megazip_438212054071.webp"},
  {pn:"97382", nm:"SPP00386534 (8553-15-610B, Mazda) Sensor, Water level for Toyota tractor", cat:"electrical", cond:"new", price:null, stock:3, fits:["52-2TD25","42-2TD25","02-2TD25"], img:"assets/parts/97382_megazip_855315610B.webp"},
  {pn:"97480", nm:"P506077 LUBE FILTER, CARTRIDGE (MITSUBISHI FUSO PN# QC000001; NISSAN PN#15208HJ00A ; IVECO PN#50438510400)", cat:"filter", cond:"new", price:null, stock:3, fits:["BE641GRMDAE","FEC71ER3SDAH","FEC71GR3SDAM","FEC91G","FEC91GR3SDAH"], img:"assets/parts/97480_megazip_50438510400.webp"},
  {pn:"97483", nm:"Air Breather Filter", cat:"filter", cond:"new", price:null, stock:3, fits:["BE641GRMDAE"], img:"assets/parts/97483_megazip_QC000454.webp"},
  {pn:"97552", nm:"Steering linkage", cat:"steering", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/97552_megazip_4545039215.webp"},
  {pn:"97553", nm:"LINK ASSY, REAR STABILIZER", cat:"misc", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/97553_megazip_4883036020.webp"},
  {pn:"97554", nm:"Bush, Stabilizer", cat:"misc", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/97554_megazip_4881560020.webp"},
  {pn:"97631", nm:"1-87610093-4 Fuel Filter Isuzu", cat:"filter", cond:"new", price:null, stock:9, fits:["FTR34Q-V"], img:"assets/parts/97631_megazip_FILTER1876100934.webp"},
  {pn:"97775", nm:"10030036 WHEEL AXLE", cat:"wheel", cond:"new", price:null, stock:3, fits:["HDD-27"], img:"assets/parts/97775_megazip_10030036.webp"},
  {pn:"97776", nm:"10020018 LOCKING PIN WITH CHAIN", cat:"drive", cond:"new", price:null, stock:9, fits:["DAS-PD7000G","PD70","DAS-PD7000-0912","PD70M","WGJXT20B"], img:"assets/parts/97776_megazip_10020018.webp"},
  {pn:"97945", nm:"Tank Fuel Cap With Keys For ISUZU", cat:"engine", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/97945_megazip_8981460100.webp"},
  {pn:"98057", nm:"Air Filter", cat:"filter", cond:"new", price:null, stock:9, fits:["FEC91GR3SDAH"], img:"assets/parts/98057_megazip_MD620456.webp"},
  {pn:"98061", nm:"AIR FILTER (LDL)", cat:"filter", cond:"new", price:null, stock:9, fits:["COMMANDER 15","COMMANDER 15I","42-2TD25","COMMANDER-30I","QCD25-KM","WGSJT7WHA"], img:"assets/parts/98061_megazip_P772580.webp"},
  {pn:"98063", nm:"OIL FILTER", cat:"filter", cond:"new", price:null, stock:3, fits:["H1 EURO5","H1 VAN AT EURO6","H1 VAN M'T","H1 VAN AT EURO5","H1 EURO6"], img:"assets/parts/98063_megazip_2630042040.webp"},
  {pn:"98197", nm:"Brake Hose, Front wheel", cat:"brake", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","02-2TD25","NBL","02-2TD20","TAIL STANDS"], img:"assets/parts/98197_megazip_473354363171.webp"},
  {pn:"98357", nm:"Oil Filter Volvo Bus", cat:"filter", cond:"new", price:null, stock:3, fits:["B8R","QCD25-KM"], img:"assets/parts/98357_megazip_21913334.webp"},
  {pn:"98388", nm:"DIESEL FUEL FILTER 9693-0", cat:"filter", cond:"new", price:null, stock:9, fits:["TFR86JS-V","TFS87JD-VI-C-AT","TFS87JD-VI-AT-D","TFS87JE-VI-AT","NQR75K'LAV'"], img:"assets/parts/98388_megazip_8981596930.webp"},
  {pn:"98390", nm:"Front brake pads", cat:"brake", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/98390_megazip_MC894601.webp"},
  {pn:"98393", nm:"Rear brake cylinder", cat:"brake", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/98393_megazip_MK356639.webp"},
  {pn:"98394", nm:"Oil Seal", cat:"hydraulic", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/98394_megazip_MB161152.webp"},
  {pn:"98396", nm:"Belt", cat:"drive", cond:"new", price:null, stock:9, fits:[], img:"assets/parts/98396_megazip_MK667964.webp"},
  {pn:"98397", nm:"Belt", cat:"drive", cond:"new", price:null, stock:9, fits:[], img:"assets/parts/98397_megazip_MK667238.webp"},
  {pn:"98623", nm:"Air Filter", cat:"filter", cond:"new", price:null, stock:3, fits:["NMR85E-V"], img:"assets/parts/98623_megazip_5876100200.webp"},
  {pn:"98625", nm:"Oil Filter", cat:"filter", cond:"new", price:null, stock:3, fits:["NQR75K'LAV'","NPR66P"], img:"assets/parts/98625_megazip_5876101170.webp"},
  {pn:"98852", nm:"Air filter", cat:"filter", cond:"new", price:null, stock:9, fits:["HIACE"], img:"assets/parts/98852_megazip_1780111130.webp"},
  {pn:"98853", nm:"Air filter", cat:"filter", cond:"new", price:null, stock:9, fits:["BZB40R-ZCMSC","COASTER"], img:"assets/parts/98853_megazip_1780144010.webp"},
  {pn:"98981", nm:"Switch Assy, Stop Lamp", cat:"electrical", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","XZB50RZEMQY"], img:"assets/parts/98981_megazip_8434025030.webp"},
  {pn:"99198", nm:"PICKUP OIL FILTER", cat:"filter", cond:"new", price:null, stock:9, fits:["TFS87JD-VI-C-AT","TFS87JD-VI-AT-D","HIACE","TFS87JE-VI-AT","KDH201RSSPDY","TFR86JS-V"], img:"assets/parts/99198_megazip_8982705240.webp"},
  {pn:"99545", nm:"Fuel Filter", cat:"filter", cond:"new", price:null, stock:3, fits:[], img:"assets/parts/99545_megazip_2339011260.webp"},
  {pn:"99712", nm:"King Pin", cat:"steering", cond:"new", price:null, stock:9, fits:["42-2TD25","52-2TD25","02-2TD20","T137"], img:"assets/parts/99712_megazip_432314030071.webp"},
  {pn:"99715", nm:"Transmission Oil Cooler", cat:"hydraulic", cond:"new", price:null, stock:9, fits:["42-2TD25"], img:"assets/parts/99715_megazip_329204363071.webp"},
  {pn:"99719", nm:"Oil Pump 0410-3662", cat:"hydraulic", cond:"new", price:null, stock:3, fits:["DT-6008"], img:"assets/parts/99719_holdwell_04103338.jpg"},
  {pn:"99736", nm:"Parking Brake Link Assembly", cat:"brake", cond:"new", price:null, stock:9, fits:["52-2TD25","42-2TD25","GT4"], img:"assets/parts/99736_megazip_461062300171.webp"},
  {pn:"99798", nm:"Switch Assembly", cat:"electrical", cond:"new", price:null, stock:3, fits:["52-2TD25","42-2TD25","02-2TD25"], img:"assets/parts/99798_megazip_571462300071.webp"},
  {pn:"99863", nm:"SMF600402VT 100AH BATTERY, ELECTRIC BUS", cat:"electrical", cond:"new", price:null, stock:3, fits:["K10B","TGM 18.250 4X2","K9R","316 CDI","516BT L","DT-6008"], img:"assets/parts/99863_megazip_103684.webp"},
  {pn:"BS3301038", nm:"PEDAL, FOOT W/CABLE NO CONNECTOR (OFFICIAL 14207)", cat:"electrical", cond:"new", price:null, stock:9, fits:["T137","T135","T135 AC"], img:"assets/parts/BS3301038_megazip_SPP00485972.webp"},
];

const XREF = [
  {oem:"TLD",     oemPn:"4812-201", ourPn:"TL-4812-201"},
  {oem:"TLD",     oemPn:"3300-017", ourPn:"TL-3300-017"},
  {oem:"Goldhofer", oemPn:"AST2-K5", ourPn:"TL-9214-B"},
  {oem:"Douglas", oemPn:"TBL-BK40",  ourPn:"TL-7742-K"},
  {oem:"TLD",     oemPn:"TXL-BELT18",ourPn:"TX-1500-003"},
  {oem:"Mallaghan", oemPn:"MT-PUL-2",ourPn:"TX-4415-C"},
  {oem:"Houchin", oemPn:"4400-RLY",  ourPn:"GP-400-110"},
  {oem:"TUG",     oemPn:"MA50-CTR",  ourPn:"GP-400-224"},
  {oem:"Toyota",  oemPn:"43760-30871-71", ourPn:"TR-1142L"},
  {oem:"Toyota",  oemPn:"33506-41833-71", ourPn:"TR-1142L"},
  {oem:"Toyota",  oemPn:"45660-20541-71", ourPn:"TR-1142R"},
  {oem:"Baldwin", oemPn:"815111",    ourPn:"AS-FILT-12"},
  {oem:"TLD",     oemPn:"ASU-VN33",  ourPn:"AS-VANE-33"},
  {oem:"Kalmar",  oemPn:"T2-CHN-84", ourPn:"LD-CHN-84"},
  {oem:"DOLL",    oemPn:"ST-STEP",   ourPn:"PS-STEP-11"},
  {oem:"Global GSE", oemPn:"DI-NOZ", ourPn:"DI-NOZ-360"},
  {oem:"AeroLav", oemPn:"LV-GV03",   ourPn:"LV-VLV-03"},
  {oem:"TLD",     oemPn:"TMX-BRK7",  ourPn:"WB-BRK-700"},
  {oem:"Michelin",oemPn:"650X10-S",  ourPn:"WB-TYR-650-10"}
];

/* Featured parts (Sage-style best sellers) */
const FEATURED = ["TL-4812-201","WB-BRK-700","GP-400-110","TX-1500-003","AS-FILT-12","WB-TYR-650-10","GP-400-224","TX-2210-A"];

/* Featured brands wall */
const FEATURED_BRANDS = ["TLD","Goldhofer","Douglas","JBT AeroTech","TUG","Houchin","Mallaghan","DOLL","Kalmar","Charlatte","ITW GSE","Fast Global"];

const partByPn = (pn) => PARTS.find(p => p.pn === pn);
const catLabel = (id) => t("cat-" + id);
const catCount = (id) => PARTS.filter(p => p.cat === id).length;
const modelCount = (m) => PARTS.filter(p => p.fits.some(f => f.includes(m))).length;

/* ---------------- helpers ---------------- */
const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

function cloneTpl(id){
  const tpl = document.getElementById(id);
  return tpl.content.firstElementChild.cloneNode(true);
}
function iconInto(container, tplId, size){
  container.textContent = "";
  const node = cloneTpl(tplId);
  if(size){
    const svg = node.querySelector("svg");
    if(svg){ svg.setAttribute("width", size); svg.setAttribute("height", size); }
  }
  container.appendChild(node);
}
const fmtPrice = (n) => "$" + n.toLocaleString("en-US");
function stockState(p){ return p.stock === 0 ? "out" : p.stock <= 4 ? "low" : "in"; }
function stockLabel(p){
  const s = stockState(p);
  return s === "in" ? t("stock-in") : s === "low" ? t("stock-low") : t("stock-out");
}

let toastTimer = null;
function toast(msg){
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
}

/* ---------------- i18n apply ---------------- */
function applyI18n(){
  document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  $$("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
  $$(".lang-btn").forEach(b => b.classList.toggle("is-active", b.dataset.lang === lang));
  buildFilterOptions();
  renderCats();
  renderModels();
  renderParts();
  renderCart();
  initFinderReset();
}

/* re-populate finder dropdowns on language switch (labels are translated) */
function initFinderReset(){
  const oemSel = $("#fOem"), modelSel = $("#fModel"), catSel = $("#fPartCat");
  const prevOem = oemSel.value, prevModel = modelSel.value, prevCat = catSel.value;
  const oems = [...new Set(MODELS.map(m => m.oem))].sort();
  const fill = (sel, firstLabel, pairs, disabled) => {
    sel.textContent = "";
    const opt = document.createElement("option");
    opt.value = ""; opt.textContent = firstLabel;
    sel.appendChild(opt);
    pairs.forEach(([v, label, n]) => {
      const o = document.createElement("option");
      o.value = v; o.textContent = n !== undefined ? `${label} (${n})` : label;
      sel.appendChild(o);
    });
    sel.disabled = !!disabled;
  };
  fill(oemSel, t("fm-oem-any"), oems.map(o => [o, o, MODELS.filter(m => m.oem === o).length]));
  const models = prevOem ? MODELS.filter(m => m.oem === prevOem) : [];
  fill(modelSel, t("fm-model-any"), models.map(m => [m.oem + " " + m.m, m.oem + " " + m.m]), !prevOem);
  fill(catSel, t("fm-cat-any"), CATS.map(c => [c.id, catLabel(c.id), catCount(c.id)]));
  oemSel.value = prevOem;
  if(prevModel && [...modelSel.options].some(o => o.value === prevModel)) modelSel.value = prevModel;
  if(prevCat) catSel.value = prevCat;
}

/* ---------------- equipment categories ---------------- */
function renderCats(){
  const grid = $("#catGrid");
  grid.textContent = "";
  CATS.forEach(c => {
    const card = cloneTpl("tpl-cat-card");
    iconInto($("[data-f=ico]", card), c.ico);
    $("[data-f=t]", card).textContent = catLabel(c.id);
    $("[data-f=n]", card).textContent = catCount(c.id);
    card.addEventListener("click", () => { setCatFilter(c.id); });
    grid.appendChild(card);
  });
}

/* ---------------- models ---------------- */
let modelFilter = null;
function renderModels(){
  const q = ($("#modelSearch").value || "").trim().toLowerCase();
  const grid = $("#modelGrid");
  grid.textContent = "";

  const brands = [...new Set(MODELS.map(m => m.oem))].sort();
  const chips = $("#brandChips");
  chips.textContent = "";
  const allChip = document.createElement("button");
  allChip.type = "button";
  allChip.className = "chip-light is-active";
  allChip.dataset.brand = "";
  allChip.textContent = lang === "zh" ? "全部品牌" : "All OEMs";
  chips.appendChild(allChip);
  brands.forEach(b => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip-light";
    chip.dataset.brand = b;
    chip.textContent = b;
    chips.appendChild(chip);
  });

  let list = MODELS;
  const activeBrand = $(".chip-light.is-active", chips);
  if(activeBrand && activeBrand.dataset.brand) list = list.filter(m => m.oem === activeBrand.dataset.brand);
  if(q) list = list.filter(m => (m.oem + " " + m.m + " " + m.ty).toLowerCase().includes(q));

  list.forEach(m => {
    const card = cloneTpl("tpl-model-card");
    $("[data-f=oem]", card).textContent = m.oem;
    $("[data-f=m]", card).textContent = m.m;
    $("[data-f=ty]", card).textContent = m.ty;
    const n = modelCount(m.m);
    $("[data-f=n]", card).textContent = n > 0 ? n : "—";
    if(modelFilter && modelFilter.m === m.m) card.classList.add("is-active");
    card.addEventListener("click", () => setModelFilter(m));
    grid.appendChild(card);
  });
}

function setModelFilter(m){
  modelFilter = m;
  $("#catSearch").value = "";
  $("#modelBannerText").textContent = t("mb-showing") + " " + m.oem + " " + m.m;
  $("#modelBanner").hidden = false;
  renderModels();
  renderParts();
  location.hash = "#parts";
}
function clearModelFilter(){
  modelFilter = null;
  $("#modelBanner").hidden = true;
  renderModels();
  renderParts();
}
function setCatFilter(catId){
  clearModelFilter();
  state.cat = catId;
  $("#fCat").value = catId;
  renderParts();
  location.hash = "#parts";
}

/* ---------------- catalog ---------------- */
const state = { cat:"all", cond:"all", price:"all", stockOnly:false, sort:"relevance", q:"" };

function buildFilterOptions(){
  const mk = (sel, options) => {
    const el = $(sel);
    const cur = el.value;
    el.textContent = "";
    options.forEach(([v, label]) => {
      const o = document.createElement("option");
      o.value = v; o.textContent = label;
      el.appendChild(o);
    });
    if(options.some(([v]) => v === cur)) el.value = cur;
  };
  mk("#fCat", [["all", t("cat-all") + " (" + PARTS.length + ")"]]
    .concat(CATS.map(c => [c.id, catLabel(c.id) + " (" + catCount(c.id) + ")"])));
  mk("#fCond", [["all", t("cond-all")],["new", t("cond-new")],["svc", t("cond-svc")],["oh", t("cond-oh")]]);
  mk("#fPrice", [["all", t("price-all")],["0-200", t("price-0-200")],["200-600", t("price-200-600")],["600", t("price-600")],["rfq", t("price-rfq-only")]]);
  mk("#fSort", [["relevance", t("sort-relevance")],["price-asc", t("sort-price-asc")],["price-desc", t("sort-price-desc")],["name", t("sort-name")],["stock", t("sort-stock")]]);
}

function filteredParts(){
  let list = PARTS.slice();
  if(modelFilter){
    const m = modelFilter.m.toLowerCase();
    list = list.filter(p => p.fits.some(f => f.toLowerCase().includes(m)));
  } else {
    if(state.cat !== "all") list = list.filter(p => p.cat === state.cat);
    if(state.cond !== "all") list = list.filter(p => p.cond === state.cond);
    if(state.price !== "all"){
      if(state.price === "rfq") list = list.filter(p => p.price === null);
      else {
        const [lo, hi] = state.price === "0-200" ? [0,200] : state.price === "200-600" ? [200,600] : [600, Infinity];
        list = list.filter(p => p.price !== null && p.price >= lo && p.price < (hi === Infinity ? Infinity : hi + 0.001));
      }
    }
    if(state.stockOnly) list = list.filter(p => p.stock > 0);
    if(state.q){
      const q = state.q.toLowerCase();
      list = list.filter(p =>
        p.pn.toLowerCase().includes(q) ||
        p.nm.toLowerCase().includes(q) ||
        catLabel(p.cat).toLowerCase().includes(q) ||
        p.fits.some(f => f.toLowerCase().includes(q))
      );
    }
  }
  const s = state.sort;
  if(s === "price-asc") list.sort((a,b) => (a.price ?? 1e9) - (b.price ?? 1e9));
  else if(s === "price-desc") list.sort((a,b) => (b.price ?? -1) - (a.price ?? -1));
  else if(s === "name") list.sort((a,b) => a.nm.localeCompare(b.nm));
  else if(s === "stock") list.sort((a,b) => b.stock - a.stock);
  return list;
}

function fillPartCard(card, p){
  const media = $("[data-f=ico]", card);
  if(p.img){
    /* real photo — build <img> via DOM (no innerHTML with data) */
    media.textContent = "";
    const ph = document.createElement("img");
    ph.src = p.img;
    ph.alt = p.pn + " — " + p.nm;
    ph.loading = "lazy";
    ph.className = "part-photo";
    media.appendChild(ph);
    media.classList.add("has-photo");
  } else {
    iconInto(media, CATS.find(c => c.id === p.cat).ico, 62);
  }
  $("[data-f=pn]", card).textContent = p.pn;
  $("[data-f=nm]", card).textContent = p.nm;
  $("[data-f=fit]", card).textContent = p.fits.join(" · ");
  const condTag = $("[data-f=cond]", card);
  condTag.textContent = t("cond-" + p.cond);
  condTag.className = "tag tag-cond-" + p.cond;
  $("[data-f=cat]", card).textContent = catLabel(p.cat);
  const priceEl = $("[data-f=price]", card);
  if(p.price === null){ priceEl.textContent = t("price-rfq"); priceEl.classList.add("rfq"); }
  else { priceEl.textContent = fmtPrice(p.price); priceEl.classList.remove("rfq"); }
  const stockEl = $("[data-f=stock]", card);
  stockEl.textContent = stockLabel(p);
  stockEl.className = "stock " + stockState(p);
  return card;
}

function renderParts(){
  const list = filteredParts();
  const grid = $("#partGrid");
  grid.textContent = "";
  list.forEach(p => {
    const card = cloneTpl("tpl-part-card");
    fillPartCard(card, p);
    const viewBtn = $('[data-act="view"]', card);
    viewBtn.setAttribute("aria-label", t("cd-view-aria") + " " + p.pn);
    viewBtn.addEventListener("click", () => openQuickView(p));
    $('[data-act="add"]', card).addEventListener("click", () => addToCart(p.pn));
    grid.appendChild(card);
  });
  $("#resultCount").textContent = t("result-count").replace("{n}", list.length);
  $("#emptyState").hidden = list.length !== 0;
}

/* ---------------- quick view ---------------- */
function openQuickView(p){
  $("#qvPn").textContent = p.pn;
  $("#qvName").textContent = p.nm;
  const priceEl = $("#qvPrice");
  priceEl.textContent = p.price === null ? t("price-rfq") : fmtPrice(p.price);
  const stockEl = $("#qvStock");
  stockEl.textContent = stockLabel(p);
  stockEl.className = "stock " + stockState(p);
  const qvMedia = $("#qvMedia");
  qvMedia.textContent = "";
  if(p.img){
    const ph = document.createElement("img");
    ph.src = p.img;
    ph.alt = p.pn + " — " + p.nm;
    ph.className = "part-photo";
    qvMedia.appendChild(ph);
    qvMedia.classList.add("has-photo");
  } else {
    iconInto(qvMedia, CATS.find(c => c.id === p.cat).ico, 110);
  }
  const tb = $("#qvSpecs");
  tb.textContent = "";
  [
    [t("fl-cat"), catLabel(p.cat)],
    [t("fl-cond"), t("cond-" + p.cond)],
    [t("cd-fit"), p.fits.join(", ")],
    [t("qv-stock"), stockLabel(p)]   // never expose quantity buckets
  ].forEach(([k, v]) => {
    const row = cloneTpl("tpl-spec-row");
    $("[data-f=k]", row).textContent = k;
    $("[data-f=v]", row).textContent = v;
    tb.appendChild(row);
  });
  const addBtn = $("#qvAdd");
  const old = addBtn.cloneNode(true);   // drop previous listener
  addBtn.replaceWith(old);
  old.addEventListener("click", () => { addToCart(p.pn); $("#quickView").close(); });
  const dlg = $("#quickView");
  if(!dlg.open) dlg.showModal();
}

/* ---------------- cart / RFQ list ---------------- */
const cart = new Map();  // pn -> qty

function renderCart(){
  const listEl = $("#cartList");
  listEl.textContent = "";
  let total = 0, hasItems = cart.size > 0;
  cart.forEach((qty, pn) => {
    const p = partByPn(pn);
    if(!p) return;
    if(p.price !== null) total += p.price * qty;
    const row = cloneTpl("tpl-cart-row");
    $("[data-f=pn]", row).textContent = p.pn;
    $("[data-f=nm]", row).textContent = p.nm;
    $("[data-f=price]", row).textContent = p.price === null ? t("price-rfq") : fmtPrice(p.price);
    $("[data-f=qty]", row).textContent = qty;
    $('[data-act="dec"]', row).addEventListener("click", () => changeQty(pn, -1));
    $('[data-act="inc"]', row).addEventListener("click", () => changeQty(pn, +1));
    $('[data-act="del"]', row).addEventListener("click", () => { cart.delete(pn); renderCart(); });
    listEl.appendChild(row);
  });
  $("#cartEmpty").hidden = hasItems;
  $("#cartFoot").hidden = !hasItems;
  $("#cartOk").hidden = true;
  $("#cartTotal").textContent = fmtPrice(total);
  const badge = $("#cartBadge");
  badge.textContent = cart.size;
  badge.hidden = !hasItems;
}

function addToCart(pn){
  cart.set(pn, (cart.get(pn) || 0) + 1);
  renderCart();
  toast(t("toast-added") + " · " + pn);
}
function changeQty(pn, d){
  const q = (cart.get(pn) || 0) + d;
  if(q <= 0) cart.delete(pn); else cart.set(pn, q);
  renderCart();
}

/* ---------------- visual search (demo matcher) ---------------- */
let vsObjectUrl = null;

function initVisualSearch(){
  const dz = $("#dropzone");
  const input = $("#fileInput");

  dz.addEventListener("click", () => input.click());
  dz.addEventListener("keydown", (e) => {
    if(e.key === "Enter" || e.key === " "){ e.preventDefault(); input.click(); }
  });
  ["dragenter","dragover"].forEach(ev =>
    dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add("is-drag"); }));
  ["dragleave","drop"].forEach(ev =>
    dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove("is-drag"); }));
  dz.addEventListener("drop", (e) => {
    if(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });
  input.addEventListener("change", () => {
    if(input.files && input.files[0]) handleFile(input.files[0]);
    input.value = "";
  });
  $("#vsReset").addEventListener("click", resetVisualSearch);
}

function handleFile(file){
  if(!/^image\/(jpeg|png|webp)$/i.test(file.type)){ toast(t("vs-bad-type")); return; }
  if(file.size > 8 * 1024 * 1024){ toast("Max 8 MB"); return; }
  if(vsObjectUrl) URL.revokeObjectURL(vsObjectUrl);
  vsObjectUrl = URL.createObjectURL(file);
  $("#vsPhoto").src = vsObjectUrl;
  $("#vsPreview").hidden = false;
  $("#vsResults").hidden = true;
  runDemoMatch();
}

function runDemoMatch(){
  const fill = $("#vsBarFill");
  const status = $("#vsStatus");
  fill.style.width = "4%";
  const steps = [
    [30, "vs-step-1", 500],
    [72, "vs-step-2", 700],
    [100, "vs-step-3", 600]
  ];
  let i = 0;
  status.textContent = t("vs-analyzing");
  (function next(){
    if(i >= steps.length){ showVsResults(); return; }
    const [w, key, delay] = steps[i++];
    setTimeout(() => { fill.style.width = w + "%"; status.textContent = t(key); next(); }, delay);
  })();
}

function showVsResults(){
  const grid = $("#vsGrid");
  grid.textContent = "";
  VS_PARTS.forEach(v => {
    const p = partByPn(v.ref);
    if(!p) return;
    const card = cloneTpl("tpl-vs-card");
    iconInto($("[data-f=ico]", card), v.ico, 78);
    $("[data-f=score]", card).textContent = v.score.toFixed(1) + "%";
    $("[data-f=pn]", card).textContent = p.pn;
    $("[data-f=nm]", card).textContent = p.nm;
    const priceEl = $("[data-f=price]", card);
    priceEl.textContent = p.price === null ? t("price-rfq") : fmtPrice(p.price);
    if(p.price === null) priceEl.classList.add("rfq");
    $('[data-act="add"]', card).addEventListener("click", () => addToCart(p.pn));
    grid.appendChild(card);
  });
  $("#vsResults").hidden = false;
}

function resetVisualSearch(){
  if(vsObjectUrl){ URL.revokeObjectURL(vsObjectUrl); vsObjectUrl = null; }
  $("#vsPhoto").removeAttribute("src");
  $("#vsPreview").hidden = true;
  $("#vsResults").hidden = true;
  $("#vsBarFill").style.width = "0";
}

/* ---------------- hero search & suggestions ---------------- */
let heroScope = "all";

/* ---------------- search-mode switching (finder / search / xref) ---------------- */
function initSearchModes(){
  $$(".seg [data-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".seg [data-mode]").forEach(b => { b.classList.remove("is-active"); b.setAttribute("aria-selected","false"); });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected","true");
      const mode = btn.dataset.mode;
      $("#modeFinder").hidden = mode !== "finder";
      $("#modeSearch").hidden = mode !== "search";
      $("#modeXref").hidden = mode !== "xref";
    });
  });
}

/* ---------------- cascading equipment finder (BuyAutoParts-style) ---------------- */
function initFinder(){
  const oemSel = $("#fOem"), modelSel = $("#fModel"), catSel = $("#fPartCat");

  const fill = (sel, firstLabel, pairs, disabled) => {
    sel.textContent = "";
    const opt = document.createElement("option");
    opt.value = ""; opt.textContent = firstLabel;
    sel.appendChild(opt);
    pairs.forEach(([v, label, n]) => {
      const o = document.createElement("option");
      o.value = v; o.textContent = n !== undefined ? `${label} (${n})` : label;
      sel.appendChild(o);
    });
    sel.disabled = !!disabled;
  };

  const oems = [...new Set(MODELS.map(m => m.oem))].sort();
  fill(oemSel, t("fm-oem-any"), oems.map(o => [o, o, MODELS.filter(m => m.oem === o).length]));
  fill(modelSel, t("fm-model-any"), [], true);
  fill(catSel, t("fm-cat-any"), CATS.map(c => [c.id, catLabel(c.id), catCount(c.id)]));

  oemSel.addEventListener("change", () => {
    const oem = oemSel.value;
    const models = oem ? MODELS.filter(m => m.oem === oem) : MODELS;
    fill(modelSel, t("fm-model-any"), models.map(m => [m.oem + " " + m.m, m.oem + " " + m.m]));
    modelSel.disabled = false;
  });

  $("#finderGo").addEventListener("click", () => {
    const oem = oemSel.value;
    const model = modelSel.value;
    const cat = catSel.value;
    // model chosen → model filter mode (strongest signal)
    if(model){
      const m = MODELS.find(x => (x.oem + " " + x.m) === model);
      if(m){
        if(cat !== ""){ clearModelFilter(); state.cat = cat; $("#fCat").value = cat; }
        setModelFilter(m);
        if(cat !== ""){ renderParts(); }
        return;
      }
    }
    if(oem || cat){
      clearModelFilter();
      state.q = oem || "";
      $("#catSearch").value = oem || "";
      if(cat !== ""){ state.cat = cat; $("#fCat").value = cat; }
      renderParts();
      location.hash = "#parts";
    }
  });
}

/* ---------------- OEM cross-reference (yiparts-style) ---------------- */
function initXref(){
  const input = $("#xrefInput");
  const go = () => runXref(input.value);
  $("#xrefGo").addEventListener("click", go);
  input.addEventListener("keydown", (e) => { if(e.key === "Enter"){ e.preventDefault(); go(); } });
  $$("[data-xref]").forEach(chip => chip.addEventListener("click", () => {
    input.value = chip.dataset.xref;
    runXref(chip.dataset.xref);
  }));
}

/* OEM brand aliases: short codes users type → canonical XREF brand names */
const XREF_ALIAS = {
  "TLD":"TLD", "GOLDHOFER":"Goldhofer", "GH":"Goldhofer",
  "DOUGLAS":"Douglas", "MALLAGHAN":"Mallaghan", "HOUCHIN":"Houchin",
  "TUG":"TUG", "BAL":"Baldwin", "BALDWIN":"Baldwin", "KALMAR":"Kalmar",
  "DOLL":"DOLL", "GLOBAL":"Global GSE", "AEROLAV":"AeroLav",
  "MICHELIN":"Michelin", "JBT":"JBT AeroTech", "ITW":"ITW GSE",
  "TOYOTA":"Toyota"
};

/* normalize any PN string: uppercase, strip spaces/hyphens */
const normPn = (s) => (s || "").toUpperCase().replace(/[\s-]+/g, "");

/* split "BAL 815111" → alias-resolved brand + bare pn */
function parseXrefQuery(q){
  const raw = (q || "").trim();
  const m = raw.match(/^([A-Za-z ]+?)\s+([0-9A-Za-z-]+)$/);
  if(m){
    const brandKey = m[1].trim().toUpperCase();
    const brand = XREF_ALIAS[brandKey] || brandKey;
    return {brand, pn: m[2]};
  }
  return {brand:null, pn: raw};
}

function runXref(q){
  const box = $("#xrefResult");
  const {brand, pn} = parseXrefQuery(q);
  const query = normPn(brand ? brand + pn : pn);
  if(!query){ box.hidden = true; return; }
  const hits = XREF.filter(x => {
    const xOemPn = normPn(x.oem + x.oemPn);
    const xPn = normPn(x.oemPn);
    return xOemPn.includes(query) || xPn.includes(query) ||
           (pn && xPn.includes(normPn(pn)) && (!brand || normPn(x.oem).startsWith(normPn(brand).slice(0,3))));
  });
  box.textContent = "";
  box.hidden = false;
  if(!hits.length){
    const none = document.createElement("div");
    none.className = "xref-none";
    const s1 = document.createElement("span");
    s1.textContent = t("xr-none-1") + " ";
    const b = document.createElement("strong");
    b.textContent = q.trim();
    const s2 = document.createElement("span");
    s2.textContent = " " + t("xr-none-2");
    none.append(s1, b, s2);
    const p = document.createElement("p");
    p.style.margin = "8px 0 0";
    p.textContent = t("xr-none-3");
    none.appendChild(p);
    box.appendChild(none);
    return;
  }
  const head = document.createElement("p");
  head.className = "xref-count";
  head.textContent = t("xr-count").replace("{n}", hits.length);
  box.appendChild(head);
  hits.forEach(x => {
    const p = partByPn(x.ourPn);
    if(!p) return;
    const row = cloneTpl("tpl-xref-row");
    $("[data-f=oemPn]", row).textContent = x.oem + " " + x.oemPn;
    $("[data-f=oemBrand]", row).textContent = t("xr-oem-ref");
    $("[data-f=ourPn]", row).textContent = x.ourPn;
    $("[data-f=ourNm]", row).textContent = p.nm + (p.price === null ? "" : " · " + fmtPrice(p.price));
    $('[data-act="add"]', row).addEventListener("click", () => addToCart(x.ourPn));
    box.appendChild(row);
  });
}

/* ---------------- featured & brands (Sage-style) ---------------- */
function renderFeatured(){
  const grid = $("#featuredGrid");
  grid.textContent = "";
  FEATURED.forEach(pn => {
    const p = partByPn(pn);
    if(!p) return;
    const card = cloneTpl("tpl-part-card");
    fillPartCard(card, p);
    const viewBtn = $('[data-act="view"]', card);
    viewBtn.setAttribute("aria-label", t("cd-view-aria") + " " + p.pn);
    viewBtn.addEventListener("click", () => openQuickView(p));
    $('[data-act="add"]', card).addEventListener("click", () => addToCart(p.pn));
    grid.appendChild(card);
  });
}

function renderBrandWall(){
  const wall = $("#brandWall");
  wall.textContent = "";
  FEATURED_BRANDS.forEach(name => {
    const chip = cloneTpl("tpl-brand");
    $("[data-f=name]", chip).textContent = name;
    chip.addEventListener("click", () => {
      // jump to models section and filter by this OEM
      location.hash = "#models";
      const ms = $("#modelSearch");
      ms.value = name;
      renderModels();
    });
    wall.appendChild(chip);
  });
}

function initHeroSearch(){
  const input = $("#heroSearch");
  const sug = $("#suggest");

  $$(".seg-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".seg-btn").forEach(b => { b.classList.remove("is-active"); b.setAttribute("aria-selected","false"); });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected","true");
      heroScope = btn.dataset.scope;
      updateSuggestions(input.value);
    });
  });

  input.addEventListener("input", () => updateSuggestions(input.value));
  input.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){ sug.hidden = true; return; }
    if(e.key === "ArrowDown" && !sug.hidden){
      e.preventDefault();
      const first = $(".sug", sug);
      if(first) first.focus();
    }
    if(e.key === "Enter"){ e.preventDefault(); goHero(input.value); }
  });
  $("#heroGo").addEventListener("click", () => goHero(input.value));
  document.addEventListener("click", (e) => {
    if(!e.target.closest(".searchbox")) sug.hidden = true;
  });
  $$(".chip-mini").forEach(chip =>
    chip.addEventListener("click", () => { input.value = chip.dataset.example; goHero(chip.dataset.example); }));
}

function heroCandidates(q){
  const query = q.trim().toLowerCase();
  if(query.length < 1) return [];
  const out = [];
  if(heroScope !== "model"){
    PARTS.filter(p => (p.pn + " " + p.nm).toLowerCase().includes(query))
      .slice(0, 5)
      .forEach(p => out.push({kind:"part", label:p.pn, sub:p.nm, act:() => openQuickView(p)}));
  }
  if(heroScope !== "part"){
    MODELS.filter(m => (m.oem + " " + m.m + " " + m.ty).toLowerCase().includes(query))
      .slice(0, 4)
      .forEach(m => out.push({kind:"model", label:m.oem + " " + m.m, sub:m.ty, act:() => setModelFilter(m)}));
  }
  return out.slice(0, 7);
}

function updateSuggestions(q){
  const sug = $("#suggest");
  const items = heroCandidates(q);
  if(!items.length){ sug.hidden = true; return; }
  sug.textContent = "";
  items.forEach((it, idx) => {
    const li = cloneTpl("tpl-suggest");
    $("[data-f=kind]", li).textContent = t(it.kind === "part" ? "sug-kind-part" : "sug-kind-model");
    $("[data-f=label]", li).textContent = it.label;
    $("[data-f=sub]", li).textContent = it.sub;
    const btn = $(".sug", li);
    btn.addEventListener("click", () => { sug.hidden = true; it.act(); });
    btn.addEventListener("keydown", (e) => {
      if(e.key === "Escape"){ sug.hidden = true; input2().focus(); }
      if(e.key === "ArrowDown"){
        e.preventDefault();
        const btns = $$(".sug", sug);
        if(btns[idx + 1]) btns[idx + 1].focus();
      }
      if(e.key === "ArrowUp"){
        e.preventDefault();
        const btns = $$(".sug", sug);
        if(idx === 0) input2().focus(); else btns[idx - 1].focus();
      }
    });
    sug.appendChild(li);
  });
  sug.hidden = false;
}
function input2(){ return $("#heroSearch"); }

function goHero(q){
  $("#suggest").hidden = true;
  const items = heroCandidates(q);
  if(items.length === 1){ items[0].act(); return; }
  clearModelFilter();
  state.q = q;
  $("#catSearch").value = q;
  renderParts();
  location.hash = "#parts";
}

/* ---------------- RFQ form (FormSubmit email backend) ---------------- */
const RFQ_ENDPOINT = "https://formsubmit.co/ajax/sales@gse-spares.com";

function cartItemsText(){
  const lines = [];
  cart.forEach((qty, pn) => {
    const p = partByPn(pn);
    if(p) lines.push(qty + "x " + p.pn + " — " + p.nm + (p.price !== null ? " (" + fmtPrice(p.price) + ")" : ""));
  });
  return lines.join("\n");
}

function initForms(){
  const form = $("#rfqForm");
  const sendBtn = $("#rfqSend");
  const setErr = (inputId, errId, msg) => {
    const err = $(errId);
    err.textContent = msg || "";
    $(inputId).closest(".field").classList.toggle("invalid", !!msg);
  };
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if($("#fHoney").value) return;  // honeypot filled = bot; silently drop
    const name = $("#cName").value.trim();
    const email = $("#cEmail").value.trim();
    const msg = $("#cMsg").value.trim();
    let ok = true;
    if(!name){ setErr("#cName","#eName",t("f-err-name")); ok = false; } else setErr("#cName","#eName","");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){ setErr("#cEmail","#eEmail",t("f-err-email")); ok = false; } else setErr("#cEmail","#eEmail","");
    if(!msg){ setErr("#cMsg","#eMsg",t("f-err-msg")); ok = false; } else setErr("#cMsg","#eMsg","");
    if(!ok) return;
    const items = $("#rfqItems").value;
    const msgField = form.querySelector('[name=message]');
    if(items) msgField.value = msg + "\n\n— RFQ list —\n" + items;
    form.querySelector('[name=_replyto]').value = email;
    sendBtn.disabled = true;
    const origLabel = sendBtn.textContent;
    sendBtn.textContent = t("f-sending");
    try {
      const resp = await fetch(RFQ_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const data = await resp.json().catch(() => ({}));
      if(!resp.ok || data.success !== "true") throw new Error(data.message || ("HTTP " + resp.status));
      form.reset();
      cart.clear(); renderCart();
      form.hidden = true;
      $("#formOk").hidden = false;
    } catch(err) {
      setErr("#cMsg","#eMsg",t("f-err-send"));
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = origLabel;
    }
  });

  $("#cartSubmit").addEventListener("click", () => {
    const items = cartItemsText();
    if(!items) return;
    const note = $("#cartNote").value.trim();
    $("#rfqItems").value = items + (note ? "\n— Note —\n" + note : "");
    $("#cartOk").hidden = false;
    location.hash = "#contact";
  });
}

/* ---------------- drawer / misc UI ---------------- */
function initUi(){
  const drawer = $("#drawer");
  const scrim = $("#scrim");
  const openDrawer = () => { drawer.setAttribute("aria-hidden","false"); scrim.hidden = false; };
  const closeDrawer = () => { drawer.setAttribute("aria-hidden","true"); scrim.hidden = true; };
  $("#cartOpenBtn").addEventListener("click", openDrawer);
  $("#cartClose").addEventListener("click", closeDrawer);
  scrim.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => { if(e.key === "Escape") closeDrawer(); });

  $("#qvClose").addEventListener("click", () => $("#quickView").close());

  const burger = $("#burger");
  const nav = $("#nav");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  $$("#nav a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded","false");
  }));

  $$(".lang-btn").forEach(btn =>
    btn.addEventListener("click", () => { lang = btn.dataset.lang; applyI18n(); }));

  $("#modelSearch").addEventListener("input", renderModels);
  $("#brandChips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip-light");
    if(!chip) return;
    $$(".chip-light").forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    renderModels();
  });

  $("#catSearch").addEventListener("input", (e) => { state.q = e.target.value; renderParts(); });
  $("#fCat").addEventListener("change", (e) => { state.cat = e.target.value; renderParts(); });
  $("#fCond").addEventListener("change", (e) => { state.cond = e.target.value; renderParts(); });
  $("#fPrice").addEventListener("change", (e) => { state.price = e.target.value; renderParts(); });
  $("#fStock").addEventListener("change", (e) => { state.stockOnly = e.target.checked; renderParts(); });
  $("#fSort").addEventListener("change", (e) => { state.sort = e.target.value; renderParts(); });
  $("#clearFilters").addEventListener("click", resetFilters);
  $("#emptyReset").addEventListener("click", resetFilters);
  $("#modelClear").addEventListener("click", clearModelFilter);
}

function resetFilters(){
  clearModelFilter();
  state.cat = "all"; state.cond = "all"; state.price = "all";
  state.stockOnly = false; state.q = ""; state.sort = "relevance";
  $("#fCat").value = "all"; $("#fCond").value = "all"; $("#fPrice").value = "all";
  $("#fStock").checked = false; $("#fSort").value = "relevance"; $("#catSearch").value = "";
  renderParts();
}

/* ---------------- visual-search shape icons ---------------- */
/* defined as <template> nodes appended at runtime keeps index.html lean */

/* ---------------- boot ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  initUi();
  initSearchModes();
  initFinder();
  initXref();
  initHeroSearch();
  initVisualSearch();
  initForms();
  applyI18n();
  renderFeatured();
  renderBrandWall();
});
