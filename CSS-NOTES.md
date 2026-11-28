# CSS 重構紀錄

目標：可維護性同設計一致性；外觀、排版、responsive 同功能保持不變。分階段做，每階段驗證後建立 checkpoint，手機驗收批准先做下一階段。

## Checkpoints
- `a0e7bea` 時間表區：刪冇作用設定、減 `!important`
- 第一階段：Design tokens + 基本元素（見 style.css 最頂）

## style.css 結構（由上至下）
1. Design tokens：淺色 `:root`（所有 CSS 變數）
2. Design tokens：深色 `@media(prefers-color-scheme:dark){:root:not([data-theme="light"])}`
3. 基本元素（html、body、h1、button…）
4. 其餘規則（之後逐區整理）

新增或修改顏色、字體等變數，只改第 1、2 段。網站冇設定 `data-theme`，只跟系統深淺色。

## 未解決問題（留待共用元件階段）
- 時間表餐廳行嘅導航掣（`.drvgo.depgo`，70×36）比其他行嘅導航掣向左縮 32px，兩者右邊唔對齊。重構前已存在。
