# さんかホールディングス医療カタログ
## Sanka Holdings Medical Catalog

海外渡航者向け医療受診支援カタログ（静的HTMLサイト）

---

## 構成

```
/
├── index.html              # 言語選択ページ
├── ja/index.html           # 日本語版
├── zh-cn/index.html        # 中国語（簡体字）版
├── en/index.html           # 英語版
├── assets/
│   ├── css/style.css       # デザインシステム（PC・スマホ共通）
│   ├── css/print.css       # A4印刷最適化CSS
│   ├── js/data.js          # ★ マスターデータ（クリニック・メニュー・翻訳）
│   ├── js/renderer.js      # HTMLレンダラー
│   └── js/catalog.js       # ナビ・スクロール・印刷
├── scripts/
│   └── pdf.js              # PDF生成スクリプト（Puppeteer）
├── dist/                   # PDF出力先（gitignore推奨）
├── .github/workflows/
│   └── pages.yml           # GitHub Pages自動デプロイ
└── README.md
```

---

## データの更新方法

**クリニック情報・メニュー・翻訳はすべて `assets/js/data.js` を編集します。**
HTMLファイルは変更不要です。

### クリニック追加例

```js
// assets/js/data.js → CLINICS オブジェクトに追記
'new-clinic': {
  location: { ja: '○○県 ○○市', zh: '○○县 ○○市', en: 'City, Prefecture' },
  name:     { ja: '新クリニック名', zh: '中文名称', en: 'New Clinic Name' },
  nameShort:{ ja: '略称', zh: '略称', en: 'Short' },
  specialty:{ ja: '診療科目', zh: '诊疗科目', en: 'Specialty' },
  url: 'https://example.com/',
  chapters: ['regenerative'],  // 所属章ID
},
```

### 価格表示の切替

```js
// assets/js/data.js 先頭の CATALOG_CONFIG
const CATALOG_CONFIG = {
  showPrices: false,  // ← true に変更すると全言語で価格を表示
  ...
};
```

---

## GitHub Pages での公開

### 初回セットアップ

1. このディレクトリをGitリポジトリとして初期化・GitHubへプッシュ
2. GitHubリポジトリ → **Settings → Pages**
3. **Source: GitHub Actions** を選択
4. `main` ブランチへのプッシュで自動デプロイ開始

```bash
git init
git add .
git commit -m "Initial commit: Sanka Holdings Medical Catalog"
git remote add origin https://github.com/<ORG>/<REPO>.git
git push -u origin main
```

公開URL例: `https://<ORG>.github.io/<REPO>/`

---

## 医療用語表記ルール

> **病名・治療名・検査名・医療機器名は `assets/js/data.js` の `MEDICAL_TERMS` 辞書で一元管理します。**
> 中国富裕層向けの資料として、直訳・不適切な用語・非標準用語を使用しないでください。

### displayRule の種類

| ルール | 用途 | 表示例 |
|---|---|---|
| `zh_only` | 大陸中国の標準医学用語。そのまま使用 | 透明质酸、肿瘤标志物 |
| `zh_en` | 英語略称が重要な用語。中国語＋英語を併記 | PRP（富血小板血浆）、HIFU 超声刀 |
| `en_with_zh_note` | ブランド名・日本独自用語。英語表記＋中国語説明 | HydraFacial 水氧焕肤、Myers' Cocktail 高效营养滴注 |

### 重要表記ルール

| 禁止表記 | 正しい表記 | 理由 |
|---|---|---|
| 玻尿酸 | 透明质酸 | 台湾・香港用語。大陸中国では非標準 |
| 迈尔斯鸡尾酒 | Myers' Cocktail 高效营养滴注 | "鸡尾酒（カクテル）"は高級医療資料に不適切 |
| 水氧焕肤のみ | HydraFacial 水氧焕肤 | ブランド名の省略禁止 |
| 微针导入のみ | Dermapen 微针导入 | ブランド名の省略禁止 |
| 干细胞库存 | 干细胞冻存保管服务 | "库存"は在庫の意味で医療用語として不適切 |
| 分子矫正营养疗法 | 精准分子营养疗法（Orthomolecular） | 中国語圏で一般的でない、英語併記が信頼感を高める |
| 电穿孔导入 | 电脉冲导入（Electroporation） | 表現が粗い、英語併記で専門性を示す |
| 整体医疗 | 整合医疗 | "整体"は中国語でマッサージ店を連想させる |

### 新しい用語を追加するときは

```js
// data.js → MEDICAL_TERMS オブジェクトに追記
newTerm: {
  ja: '日本語表記',
  zh: '中国語表記（大陸標準医学用語）',
  en: 'English Term',
  displayRule: 'zh_only',   // zh_only / zh_en / en_with_zh_note のいずれか
  shortNote: '一行で用語の意味を説明（中国語）',
},
```

---

## 固有名詞表記ルール

> **会社名・法人名・クリニック名・人名は、中国語化・意訳を禁止します。**
> 表記は `data.js` 冒頭の `PROPER_NOUNS` 辞書で一元管理し、全言語ページで統一参照します。

### ルール一覧

| カテゴリ | ja（日本語） | zh（中国語ページ表記） | en（英語ページ表記） |
|---|---|---|---|
| 会社名 | さんかホールディングス株式会社 | SANKA HOLDINGS Ltd. | SANKA HOLDINGS Ltd. |
| 医療法人① | 医療法人さんか | SANKA Medical Corporation | SANKA Medical Corporation |
| 医療法人② | 医療法人SSC | Medical Corporation SSC | Medical Corporation SSC |
| クリニック | 各クリニック名 | 英字正式名称を使用 | 英字正式名称を使用 |

### 辞書の場所と編集方法

```js
// assets/js/data.js 冒頭の PROPER_NOUNS オブジェクトを編集
const PROPER_NOUNS = {
  company: { ja: 'さんかホールディングス株式会社', zh: 'SANKA HOLDINGS Ltd.', en: 'SANKA HOLDINGS Ltd.' },
  clinicNames: {
    'r-shoto': { ja: 'R CLINIC 松濤', zh: 'R CLINIC SHOTO', en: 'R CLINIC Shoto' },
    // ...
  },
  clinicShort: {
    'r-shoto': { ja: '松濤', zh: 'R CLINIC SHOTO', en: 'R CLINIC' },
    // ...
  },
};
```

### 新しいクリニックを追加するときは

1. `PROPER_NOUNS.clinicNames` と `PROPER_NOUNS.clinicShort` に追記
2. `CLINICS` オブジェクトでは `name: PROPER_NOUNS.clinicNames['new-id']` のように参照する（直書き禁止）

---

## コンテンツ差し替えガイド

> **編集ファイルは `assets/js/data.js` 1つだけです。** HTMLは触りません。

### 文言（テキスト）の変更

```js
// data.js → INTRO.hero.title など各オブジェクトの ja / zh / en を編集
title: {
  ja: '日本最高水準の医療を、<br /><em>世界の患者さまへ。</em>',
  zh: '将日本顶尖医疗，<br />...',
  en: 'Japan\'s Finest Medicine,<br />...',
},
```

### メニュー情報の追加・変更

```js
// data.js → CHAPTERS[n].categories[n].menus 配列に追記
{
  id: 'new-menu-id',        // 一意のID（英数字）
  featured: false,           // true でゴールド枠カード
  name:   { ja: '...', zh: '...', en: '...' },
  effect: { ja: '...', zh: '...', en: '...' },
  clinicIds: ['r-shoto', 'coco'],  // 対象クリニックIDの配列
  price: null,               // 価格テキスト or null
},
```

### 価格の表示・非表示

```js
// data.js 先頭
const CATALOG_CONFIG = {
  showPrices: false,  // ← false=非表示 / true=表示
  ...
};
// 価格テキストは各メニューの price フィールドに設定
price: { ja: '¥300,000〜（税込）', zh: '¥300,000起', en: 'From ¥300,000' },
```

### クリニック情報の追加

```js
// ① data.js 冒頭の PROPER_NOUNS に追記
clinicNames: {
  'new-clinic-id': { ja: '正式クリニック名', zh: 'NEW CLINIC NAME', en: 'New Clinic Name' },
},
clinicShort: {
  'new-clinic-id': { ja: '略称', zh: 'NEW CLINIC', en: 'New Clinic' },
},

// ② CLINICS オブジェクトに追記（name/nameShort は辞書参照）
'new-clinic-id': {
  location: { ja: '都道府県 市区', zh: '○○省 ○○市', en: 'City, Prefecture' },
  name:      PROPER_NOUNS.clinicNames['new-clinic-id'],
  nameShort: PROPER_NOUNS.clinicShort['new-clinic-id'],
  specialty: { ja: '診療科目', zh: '诊疗科目', en: 'Specialty' },
  url: 'https://example.com/',
  chapters: ['regenerative'],  // 所属章ID（複数可）
},
```

### 翻訳の修正

- 全翻訳は `data.js` 内の `{ ja: ..., zh: ..., en: ... }` オブジェクトに集約されています
- UI ラベル（ナビ・フッターなど）は `UI` オブジェクトを参照してください
- 企業名・タグラインは `CATALOG_CONFIG.company` / `CATALOG_CONFIG.tagline` を編集

### 画像の追加（将来対応）

現在は画像なし構成です。追加する場合は `assets/images/` に配置し、
`renderer.js` の該当セクションに `<img>` タグを追加してください。

---

## PDF生成（`npm run pdf`）

### 前提: Node.js のインストール

```
https://nodejs.org/ → LTS版（v18以上）をダウンロード・インストール
```

確認:
```bash
node -v   # v18.x.x 以上
npm -v
```

### 初回セットアップ（1回のみ）

```bash
cd <このディレクトリ>
npm install
# → Puppeteer（Chromium内蔵）を自動インストール（約300MB）
```

### 実行コマンド

```bash
npm run pdf          # 3言語すべて生成
npm run pdf:ja       # 日本語のみ
npm run pdf:zh       # 中国語（簡体字）のみ
npm run pdf:en       # 英語のみ
```

**出力先: `dist/` フォルダ**

```
dist/
├── catalog-ja.pdf
├── catalog-zh-cn.pdf
└── catalog-en.pdf
```

### 仕組み

1. `scripts/pdf.js` が内部で一時HTTPサーバー（ポート18080）を起動
2. Puppeteer（ヘッドレスChrome）が各ページを開いてA4 PDFに出力
3. Google Fontsをネット経由で取得するため**インターネット接続が必要**

### ブラウザ手動印刷（Node.js不要）

```bash
python -m http.server 8080
```

Chrome で `http://localhost:8080/ja/index.html` を開き、
`Ctrl + P` → 送信先「**PDFとして保存**」→ 用紙サイズA4・「**背景のグラフィック**」にチェック

---

## ローカル確認（開発時）

```bash
npm run serve   # http://localhost:8080 で確認
# または
npx serve . -p 8080
```

> `file://` プロトコルでも動作しますが、フォント読み込みのためローカルサーバー推奨です。

---

## 動作確認済み環境

- Chrome / Edge（最新版）
- Safari 16+
- Firefox（最新版）
- iOS Safari 16+（スマホ）
- Android Chrome（スマホ）

---

## ライセンス・権利

本カタログに含まれるすべてのコンテンツは さんかホールディングス株式会社 に帰属します。
無断転載・複製を禁じます。

&copy; 2025 Sanka Holdings Co., Ltd. All rights reserved.

