# AeroGround Parts — GSE 零件網站模板

機場地勤設備 (GSE) 零件銷售網站前台模板。**純靜態 HTML/CSS/JS，零外部依賴、零網絡請求。**

## 開啟方式

```
cd gse-parts-website
python3 -m http.server 8080
# → http://localhost:8080
```

或者直接雙擊 `index.html`（file:// 協議亦可運行）。

## 結構

```
gse-parts-website/
├── index.html      主頁（公司介紹+設備+型號+零件+圖搜+服務+聯絡）
├── assets/
│   ├── style.css   全部樣式（企業深淺雙色調）
│   └── app.js      目錄邏輯、雙語、圖搜示範、RFQ
└── SECURITY.md     安全設計 + 上線前檢查清單
```

## 功能

| 區塊 | 內容 |
|---|---|
| 主頁 Hero | 公司定位 + 全域搜尋框（零件編號/設備型號/關鍵字）+ 即時建議 |
| 設備支援 | 10 大類設備卡片（牽引車、輸送帶車、GPU、氣源車…） |
| 型號搜尋 | 18 個示範 OEM 型號，按品牌篩選 → 點擊即過濾零件 |
| 零件目錄 | 30 項示範零件，類別/狀態/價格/現貨篩選 + 5 種排序 + 快速檢視 |
| 圖片搜尋 | 上傳零件相片（瀏覽器本地處理），示範配對動畫 + 信心分數結果 |
| 服務 | AOG 熱線、冷門採購、交換件、寄售、物流、技術支援 |
| RFQ | 詢價單抽屜（數量加減）+ 聯絡表單（前端驗證） |
| 雙語 | EN / 繁中 一鍵切換（右上角） |

## 示範數據

所有零件、型號、價格均為示範數據，定義在 `assets/app.js` 頂部：

- `CATS` — 設備類別
- `MODELS` — OEM 型號
- `PARTS` — 零件（pn/nm/cat/cond/price/stock/fits）
- `VS_PARTS` — 圖搜示範結果

換成真數據：直接編輯這些陣列，或改為 `fetch("parts.json")`（記得同步放寬 CSP `connect-src`）。

## 安全設計（已內建）

- CSP `connect-src 'none'` — 前台零網絡請求，任何注入腳本都無法外傳數據
- 全部動態文字 `textContent` 渲染，零 `innerHTML` 拼接用戶數據
- 零 `eval`、零遠端腳本、零第三方字體/追蹤器
- 上傳相片只以 `URL.createObjectURL` 本地預覽，不會離開瀏覽器
- `referrer: no-referrer`、表單 `autocomplete="off"`
- 詳見 SECURITY.md

## 上線前 TODO

1. 換公司名（搜尋 `AeroGround Parts`）、聯絡資料、證書
2. 換真零件照片（放 `assets/`，同源引用）
3. RFQ 表單接後端（目前 demo 提交後只顯示成功訊息）
4. 依 SECURITY.md 設定伺服器 headers
5. 部署：任何靜態主機（Netlify / GitHub Pages / Nginx）皆可
