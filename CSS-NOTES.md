# CSS 重構紀錄

目標：可維護性同設計一致性；外觀、排版、responsive 同功能保持不變。分階段做，每階段驗證後建立 checkpoint，手機驗收批准先做下一階段。

## Checkpoints
- `a0e7bea` 時間表區：刪冇作用設定、減 `!important`
- `b48470b` 第一階段：Design tokens + 基本元素（見 style.css 最頂）

## style.css 結構（由上至下）
1. Design tokens：淺色 `:root`（所有 CSS 變數）
2. Design tokens：深色 `@media(prefers-color-scheme:dark){:root:not([data-theme="light"])}`
3. 基本元素（html、body、h1、button…）
4. 其餘規則（之後逐區整理）

新增或修改顏色、字體等變數，只改第 1、2 段。網站冇設定 `data-theme`，只跟系統深淺色。

## 第二階段（按鈕及標籤）
- 已修正：時間表餐廳行導航掣向左縮 32px（舊規則為已唔顯示嘅「詳情」掣留位），而家所有導航掣右邊對齊。
- 已修正：管理者版每日頭圖標題被右邊兩個掣擠上頭圖上半部，而家同大眾版一樣貼底。
- 按鈕／標籤規則嘅自動重構（刪冇作用設定、減 `!important`）兩輪修復後仍有差異，已全部還原，未採用。建議改為人手逐個元件重寫（會有可見變化，要先批准清單）。
