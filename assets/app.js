/* ============================================================
   AeroGround Parts — catalog app (demo data)
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
    "md-kicker":"Find by model","md-title":"Search by equipment model",
    "md-sub":"Pick your OEM, find the model, and we will show every part we stock for it.",
    "md-search-ph":"Filter by OEM or model…","md-view":"view",
    "pr-kicker":"Parts catalog","pr-title":"Search parts",
    "pr-sub":"Filter by category, OEM, condition and availability. Add items to your RFQ list and send it in one go.",
    "fl-title":"Filters","fl-clear":"Clear all","fl-cat":"Category","fl-cond":"Condition","fl-price":"Price","fl-stock":"In stock only",
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
    "md-kicker":"按型號搵","md-title":"按設備型號搜尋",
    "md-sub":"揀選 OEM 品牌、搵到型號，我哋即列出該型號全部現貨零件。",
    "md-search-ph":"按 OEM 或型號篩選…","md-view":"查看",
    "pr-kicker":"零件目錄","pr-title":"零件搜尋",
    "pr-sub":"按類別、OEM、狀態及存貨篩選。加入詢價單，一次過發送。",
    "fl-title":"篩選","fl-clear":"清除全部","fl-cat":"類別","fl-cond":"狀態","fl-price":"價格","fl-stock":"只顯示現貨",
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
  {id:"tow", ico:"ico-tow"},  {id:"belt", ico:"ico-belt"},
  {id:"gpu", ico:"ico-gpu"},  {id:"air", ico:"ico-air"},
  {id:"loader", ico:"ico-loader"}, {id:"stair", ico:"ico-stair"},
  {id:"spray", ico:"ico-spray"}, {id:"lav", ico:"ico-lav"},
  {id:"wheel", ico:"ico-wheel"}, {id:"uni", ico:"ico-uni"}
];

const MODELS = [
  {oem:"TLD", m:"TMX", ty:"Conventional tow tractor"},
  {oem:"TLD", m:"TXL", ty:"Belt loader"},
  {oem:"TLD", m:"ACU", ty:"Air conditioning unit"},
  {oem:"TLD", m:"ASU 180", ty:"Air start unit"},
  {oem:"Goldhofer", m:"AST-2", ty:"Aircraft tow tractor"},
  {oem:"Goldhofer", m:"TPS-350", ty:"Pushback tractor"},
  {oem:"Douglas", m:"TBL-400", ty:"Towbarless tractor"},
  {oem:"Douglas", m:"TBL-800", ty:"Towbarless tractor"},
  {oem:"JBT AeroTech", m:"Commander 15", ty:"Cargo loader"},
  {oem:"JBT AeroTech", m:"Commander 40LD", ty:"Main deck loader"},
  {oem:"TUG", m:"660", ty:"Conventional tow tractor"},
  {oem:"TUG", m:"MA-50", ty:"400Hz GPU"},
  {oem:"Houchin", m:"4400", ty:"400Hz GPU"},
  {oem:"Mallaghan", m:"MTLD", ty:"Belt loader"},
  {oem:"DOLL", m:"5000", ty:"Passenger stairs"},
  {oem:"Global GSE", m:"De-icer 3000", ty:"De-icing truck"},
  {oem:"AeroLav Group", m:"LS-2", ty:"Lavatory service truck"},
  {oem:"Kalmar", m:"T2", ty:"Ground forklift"},
  {oem:"Toyota", m:"2TD20", ty:"Baggage tow tractor"},
  {oem:"Toyota", m:"2TD25", ty:"Baggage tow tractor"}
];

/* cat: category id · cond: new|svc|oh · price: number|null(RFQ) · stock: qty (0=out, ≤4 low) · img: optional real photo (assets/parts/…) */
const PARTS = [
  {pn:"TR-1142L", nm:"Tie rod end, left-hand thread (with nut & cotter pin)", cat:"tow", cond:"new", price:null, stock:1, fits:["Toyota 2TD20","Toyota 2TD25"], img:"assets/parts/TR-1142L-tie-rod-end.jpg"},
  {pn:"TR-1142R", nm:"Tie rod end, right-hand thread (with nut & cotter pin)", cat:"tow", cond:"new", price:null, stock:1, fits:["Toyota 2TD20","Toyota 2TD25"], img:"assets/parts/TR-1142R-tie-rod-end.jpg"},
  {pn:"TL-4812-201", nm:"Steering cylinder seal kit", cat:"tow", cond:"svc", price:128, stock:14, fits:["TLD TMX","Goldhofer AST-2"]},
  {pn:"TL-3300-017", nm:"Tow hook assembly", cat:"tow", cond:"new", price:860, stock:5, fits:["TLD TMX","TUG 660"]},
  {pn:"TL-9214-B", nm:"5th wheel coupling plate", cat:"tow", cond:"new", price:1240, stock:3, fits:["Goldhofer TPS-350"]},
  {pn:"TL-7742-K", nm:"Axle bushing kit", cat:"tow", cond:"svc", price:96, stock:22, fits:["Douglas TBL-400","Douglas TBL-800"]},
  {pn:"TX-1500-003", nm:"Conveyor belt PVC 18″", cat:"belt", cond:"new", price:420, stock:8, fits:["TLD TXL","JBT AeroTech Commander 40LD"]},
  {pn:"TX-2210-A", nm:"Belt drive roller", cat:"belt", cond:"new", price:310, stock:11, fits:["TLD TXL"]},
  {pn:"TX-8890-05", nm:"Lift hydraulic cylinder", cat:"belt", cond:"oh", price:1680, stock:2, fits:["JBT AeroTech Commander 15","JBT AeroTech Commander 40LD"]},
  {pn:"TX-4415-C", nm:"Conveyor end pulley", cat:"belt", cond:"new", price:540, stock:6, fits:["Mallaghan MTLD"]},
  {pn:"GP-400-110", nm:"400Hz control relay", cat:"gpu", cond:"new", price:185, stock:26, fits:["Houchin 4400"]},
  {pn:"GP-400-224", nm:"Output contactor 3-pole", cat:"gpu", cond:"new", price:410, stock:9, fits:["Houchin 4400","TUG MA-50"]},
  {pn:"GP-AVR-09", nm:"Automatic voltage regulator", cat:"gpu", cond:"new", price:690, stock:4, fits:["Houchin 4400"]},
  {pn:"GP-CBL-6M", nm:"400Hz cable assembly 6 m", cat:"gpu", cond:"new", price:1450, stock:7, fits:["Universal 400Hz"]},
  {pn:"AS-VANE-33", nm:"Air start vane motor", cat:"air", cond:"oh", price:2400, stock:1, fits:["TLD ASU 180"]},
  {pn:"AS-HOSE-25", nm:"Start air hose 25 m", cat:"air", cond:"new", price:380, stock:12, fits:["Universal air start"]},
  {pn:"AS-FILT-12", nm:"AC intake filter element", cat:"air", cond:"new", price:74, stock:40, fits:["TLD ACU"]},
  {pn:"LD-FRK-2T", nm:"Fork assembly 2 t", cat:"loader", cond:"new", price:980, stock:5, fits:["Kalmar T2"]},
  {pn:"LD-CHN-84", nm:"Lift chain 84 links", cat:"loader", cond:"new", price:210, stock:16, fits:["Kalmar T2"]},
  {pn:"LD-MST-45", nm:"Mast seal kit", cat:"loader", cond:"svc", price:130, stock:18, fits:["Kalmar T2"]},
  {pn:"PS-RAIL-20", nm:"Handrail bend 2 m", cat:"stair", cond:"new", price:260, stock:10, fits:["DOLL 5000"]},
  {pn:"PS-STEP-11", nm:"Non-slip step tread", cat:"stair", cond:"new", price:85, stock:32, fits:["DOLL 5000"]},
  {pn:"PS-LIFT-04", nm:"Stair lift actuator", cat:"stair", cond:"oh", price:1950, stock:2, fits:["DOLL 5000"]},
  {pn:"DI-NOZ-360", nm:"De-icing nozzle 360°", cat:"spray", cond:"new", price:340, stock:9, fits:["Global GSE De-icer 3000"]},
  {pn:"DI-PMP-15", nm:"Spray pump 15 L/min", cat:"spray", cond:"new", price:760, stock:4, fits:["Global GSE De-icer 3000"]},
  {pn:"LV-VLV-03", nm:"Lavatory gate valve", cat:"lav", cond:"new", price:190, stock:14, fits:["AeroLav Group LS-2"]},
  {pn:"LV-TNK-CAP", nm:"Waste tank cap assembly", cat:"lav", cond:"new", price:120, stock:20, fits:["AeroLav Group LS-2"]},
  {pn:"LV-HOSE-8", nm:"Suction hose 8 m", cat:"lav", cond:"new", price:95, stock:25, fits:["AeroLav Group LS-2"]},
  {pn:"WB-BRK-700", nm:"Brake pad set", cat:"wheel", cond:"new", price:230, stock:30, fits:["TLD TMX","TUG 660"]},
  {pn:"WB-TYR-650-10", nm:"Solid tire 650×10", cat:"wheel", cond:"new", price:310, stock:12, fits:["TLD TMX","Goldhofer AST-2"]},
  {pn:"WB-HUB-450", nm:"Wheel hub with bearings", cat:"wheel", cond:"oh", price:890, stock:3, fits:["TLD TXL","Mallaghan MTLD"]},
  {pn:"HY-CYL-63", nm:"Steering cylinder 63 mm", cat:"uni", cond:"oh", price:null, stock:0, fits:["Multiple GSE", "Quote by serial"]}
];

/* visual-search demo corpus (subset with distinct shapes) */
const VS_PARTS = [
  {ref:"TL-4812-201", ico:"ico-vs-ring",   score:96.4},
  {ref:"TL-9214-B",    ico:"ico-vs-fifth", score:91.2},
  {ref:"TX-1500-003",  ico:"ico-vs-belt",  score:88.7},
  {ref:"GP-400-110",   ico:"ico-vs-relay", score:84.1},
  {ref:"AS-FILT-12",   ico:"ico-vs-filter",score:81.5},
  {ref:"PS-LIFT-04",   ico:"ico-vs-act",   score:76.9},
  {ref:"WB-TYR-650-10",ico:"ico-vs-tire",  score:72.3}
];

/* OEM cross-reference table (yiparts-style interchange lookup) */
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
    [t("fl-stock"), stockLabel(p) + " (" + p.stock + ")"]
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
const RFQ_ENDPOINT = "https://formsubmit.co/ajax/alma.leung613@gmail.com";

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
      if(!resp.ok) throw new Error("HTTP " + resp.status);
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
