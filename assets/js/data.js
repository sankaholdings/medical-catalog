/* ============================================================
   Sanka Holdings Medical Catalog — Master Data
   Edit this file to update clinics, menus, and translations.
   ============================================================ */

'use strict';

/* ============================================================
   PROPER NOUN DICTIONARY
   固有名詞（会社名・法人名・クリニック名・人名）は
   翻訳・意訳・漢字中国語化を禁止し、ここで一元管理する。
   ルール:
     ja  = 日本語正式名称
     zh  = 中文ページでの表記（英字正式名称を優先）
     en  = 英語ページでの表記
   ============================================================ */
const PROPER_NOUNS = {
  /* 法人 */
  company: {
    ja: 'さんかホールディングス株式会社',
    zh: 'SANKA HOLDINGS Ltd.',
    en: 'SANKA HOLDINGS Ltd.',
  },
  medCorpSanka: {
    ja: '医療法人さんか',
    zh: 'SANKA Medical Corporation',
    en: 'SANKA Medical Corporation',
  },
  medCorpSSC: {
    ja: '医療法人SSC',
    zh: 'Medical Corporation SSC',
    en: 'Medical Corporation SSC',
  },
  /* クリニック（フル名） */
  clinicNames: {
    'r-shoto':   { ja: 'R CLINIC 松濤',                           zh: 'R CLINIC SHOTO',                    en: 'R CLINIC Shoto' },
    'riseling':  { ja: 'リセリングクリニック',                       zh: 'RISELING CLINIC',                   en: 'Riseling Clinic' },
    'coco':      { ja: 'CoCoセルクリニック',                         zh: 'CoCo CELL CLINIC',                  en: 'CoCo Cell Clinic' },
    'tenjin':    { ja: '天神ホリスティックビューティークリニック',       zh: 'TENJIN HOLISTIC BEAUTY CLINIC',     en: 'Tenjin Holistic Beauty Clinic' },
    'sakaguchi': { ja: '医療法人SSC 坂口耳鼻咽喉科',                  zh: 'SSC SAKAGUCHI ENT CLINIC',          en: 'SSC Sakaguchi ENT Clinic' },
    'yahata':    { ja: '医療法人さんか 八幡西クリニック',               zh: 'SANKA YAHATA-NISHI CLINIC',         en: 'SANKA Yahata-Nishi Clinic' },
    'luna':      { ja: '医療法人さんか ルナクリニック',                 zh: 'SANKA LUNA CLINIC',                 en: 'SANKA Luna Clinic' },
    'carproad':  { ja: '医療法人さんか カープロード鼻専門クリニック',    zh: 'SANKA CARP ROAD NASAL CLINIC',      en: 'SANKA Carp Road Nasal Clinic' },
    'heiwa':     { ja: '医療法人さんか 平和記念公園鼻専門クリニック',    zh: 'SANKA HEIWA KINEN KOEN NASAL CLINIC', en: 'SANKA Heiwa Kinen Koen Nasal Clinic' },
  },
  /* クリニック略称（カード表示用） */
  clinicShort: {
    'r-shoto':   { ja: '松濤',          zh: 'R CLINIC SHOTO',    en: 'R CLINIC' },
    'riseling':  { ja: '大阪',          zh: 'RISELING',          en: 'Riseling' },
    'coco':      { ja: 'CoCo',          zh: 'CoCo CELL',         en: 'CoCo' },
    'tenjin':    { ja: '天神',          zh: 'TENJIN HOLISTIC',   en: 'Tenjin' },
    'sakaguchi': { ja: '坂口（福岡）',  zh: 'SAKAGUCHI ENT',     en: 'Sakaguchi ENT' },
    'yahata':    { ja: '八幡西（北九州）', zh: 'SANKA YAHATA-NISHI', en: 'Yahata-Nishi' },
    'luna':      { ja: 'ルナ（北九州）', zh: 'SANKA LUNA',        en: 'SANKA Luna' },
    'carproad':  { ja: 'カープロード（広島）', zh: 'SANKA CARP ROAD', en: 'Carp Road' },
    'heiwa':     { ja: '平和記念（広島）', zh: 'SANKA HEIWA KINEN', en: 'Peace Memorial' },
  },
};

/* ============================================================
   MEDICAL TERMS DICTIONARY
   病名・治療名・検査名・医療機器名の多言語表記を一元管理。

   displayRule:
     'zh_only'          — 中国語の正式表現のみで表示（標準用語）
     'zh_en'            — 中国語 + 英語略称を併記（略称が重要な用語）
     'en_with_zh_note'  — 英語表記を主にし、中国語の短い説明を添える
                          （日本独自・ブランド名・専門性が高い用語）

   ルール:
     - 大陸中国の標準医学用語を使用（台湾・香港用語を避ける）
     - 英語の製品名・学術名はカタカナ化せず英字のまま保持
     - 高級感のある表現に統一（技術用語でも品位を保つ）
   ============================================================ */
const MEDICAL_TERMS = {

  /* ── 再生医療 ─────────────────────────────────────────── */
  stemCell: {
    ja: '幹細胞',
    zh: '干细胞',
    en: 'Stem Cell',
    displayRule: 'zh_only',
    shortNote: '具有自我更新及分化能力的细胞，是再生医疗的核心',
  },
  autologousStemCell: {
    ja: '自己脂肪由来幹細胞',
    zh: '自体脂肪来源干细胞',
    en: 'Autologous Adipose-Derived Stem Cell (ADSC)',
    displayRule: 'zh_en',
    shortNote: '从患者自身脂肪组织提取，无排斥风险',
  },
  stemCellBanking: {
    ja: '幹細胞バンキング（冷凍保存）',
    zh: '干细胞冻存保管服务（Stem Cell Banking）',
    en: 'Stem Cell Banking',
    displayRule: 'en_with_zh_note',
    shortNote: '将年轻健康状态下的干细胞冷冻保存，用于未来治疗',
  },
  exosome: {
    ja: 'エクソソーム（幹細胞培養上清液）',
    zh: '外泌体（Exosome）',
    en: 'Exosome (Stem Cell Conditioned Medium)',
    displayRule: 'zh_en',
    shortNote: '干细胞分泌的纳米级信使囊泡，激活细胞间修复信号',
  },
  prp: {
    ja: 'PRP（多血小板血漿）',
    zh: 'PRP（富血小板血浆）',
    en: 'PRP — Platelet-Rich Plasma',
    displayRule: 'zh_en',
    shortNote: '从自体血液离心提取，富含高浓度生长因子',
  },
  bloodCleansing: {
    ja: '血液クレンジング（オゾン療法）/ UVBI',
    zh: '血液净化（臭氧疗法 / UVBI）',
    en: 'Blood Ozone Therapy / UVBI',
    displayRule: 'zh_en',
    shortNote: '通过臭氧或紫外线照射净化血液，增强免疫与抗氧化力',
  },

  /* ── 点滴・抗加齢療法 ──────────────────────────────────── */
  nmn: {
    ja: 'NMN（ニコチンアミドモノヌクレオチド）',
    zh: 'NMN（烟酰胺单核苷酸）',
    en: 'NMN — Nicotinamide Mononucleotide',
    displayRule: 'zh_en',
    shortNote: 'NAD+前体，激活长寿基因（Sirtuin），恢复细胞能量代谢',
  },
  glutathione: {
    ja: 'グルタチオン（白玉点滴）',
    zh: '谷胱甘肽（Glutathione 美白滴注）',
    en: 'Glutathione IV Drip',
    displayRule: 'zh_en',
    shortNote: '强效抗氧化剂，抑制黑色素合成，实现全身美白',
  },
  myersCocktail: {
    ja: 'マイヤーズカクテル',
    zh: "Myers' Cocktail 高效营养滴注",
    en: "Myers' Cocktail",
    displayRule: 'en_with_zh_note',
    shortNote: '静脉直输维生素与矿物质复合配方，快速恢复体能与活力',
  },

  /* ── 注入治療 ───────────────────────────────────────────── */
  hyaluronicAcid: {
    ja: 'ヒアルロン酸',
    zh: '透明质酸',
    en: 'Hyaluronic Acid (HA)',
    displayRule: 'zh_only',
    shortNote: '大陸中国標準用語（台湾・香港の「玻尿酸」は使用しない）',
  },
  botulinumToxin: {
    ja: 'ボトックス / ボツリヌストキシン',
    zh: '肉毒素（Botulinum Toxin）',
    en: 'Botulinum Toxin (Botox)',
    displayRule: 'zh_en',
    shortNote: '作用于神经肌肉接头，精准放松目标肌群',
  },
  fatDissolution: {
    ja: '脂肪溶解注射',
    zh: '溶脂注射',
    en: 'Lipolytic Injection',
    displayRule: 'zh_only',
    shortNote: '注射溶解局部脂肪细胞，无需手术塑形',
  },

  /* ── リフトアップ・機器 ─────────────────────────────────── */
  threadLift: {
    ja: 'スレッドリフト（糸リフト）',
    zh: '埋线提升（Thread Lift）',
    en: 'Thread Lift',
    displayRule: 'zh_en',
    shortNote: '以可吸收线埋入皮下，即时提拉同时促进胶原新生',
  },
  hifu: {
    ja: 'HIFU（高密度焦点式超音波）',
    zh: 'HIFU 超声刀',
    en: 'HIFU — High-Intensity Focused Ultrasound',
    displayRule: 'zh_en',
    shortNote: '聚焦超声波直达SMAS筋膜层，媲美手术级提升效果',
  },
  smasFascia: {
    ja: 'SMAS筋膜',
    zh: 'SMAS筋膜层',
    en: 'SMAS (Superficial Musculo-Aponeurotic System)',
    displayRule: 'zh_en',
    shortNote: '面部深层支撑结构，提升此层方能实现持久年轻化',
  },
  picoLaser: {
    ja: 'ピコレーザー',
    zh: '皮秒激光（Pico Laser）',
    en: 'Picosecond Laser',
    displayRule: 'zh_en',
    shortNote: '超短脉冲精细粉碎色素，对周围组织损伤极低',
  },
  ipl: {
    ja: 'IPL / フォトフェイシャル',
    zh: 'IPL 光子嫩肤',
    en: 'IPL — Intense Pulsed Light',
    displayRule: 'zh_en',
    shortNote: '宽谱光改善肤色不均、毛细血管扩张与晒斑',
  },
  co2Laser: {
    ja: 'CO2フラクショナルレーザー',
    zh: 'CO2 点阵激光',
    en: 'CO2 Fractional Laser',
    displayRule: 'zh_en',
    shortNote: '点阵微剥脱刺激胶原重塑，改善凹陷疤痕与粗糙质地',
  },

  /* ── スキンケア機器 ─────────────────────────────────────── */
  hydraFacial: {
    ja: 'ハイドラフェイシャル',
    zh: 'HydraFacial 水氧焕肤',
    en: 'HydraFacial',
    displayRule: 'en_with_zh_note',
    shortNote: '品牌名不可省略。集清洁、去角质、导入于一体的医疗级护肤疗程',
  },
  dermapen: {
    ja: 'ダーマペン',
    zh: 'Dermapen 微针',
    en: 'Dermapen (Microneedling)',
    displayRule: 'en_with_zh_note',
    shortNote: '品牌名を保持。医疗级微针在皮肤形成微通道，最大化有效成分吸收',
  },
  chemicalPeel: {
    ja: 'ケミカルピーリング',
    zh: '医疗级化学焕肤（Chemical Peel）',
    en: 'Medical Chemical Peel',
    displayRule: 'en_with_zh_note',
    shortNote: '酸性制剂加速角质代谢，改善暗沉与不均匀肤色',
  },
  iontophoresis: {
    ja: 'イオン導入',
    zh: '离子导入（Iontophoresis）',
    en: 'Iontophoresis',
    displayRule: 'zh_en',
    shortNote: '微弱直流电驱动带电活性成分深入真皮层',
  },
  electroporation: {
    ja: 'エレクトロポレーション',
    zh: '电脉冲导入（Electroporation）',
    en: 'Electroporation',
    displayRule: 'en_with_zh_note',
    shortNote: '瞬间电场脉冲开放皮肤通道，大分子成分深层渗透',
  },

  /* ── 検査 ───────────────────────────────────────────────── */
  telomere: {
    ja: 'テロメア（細胞年齢）検査',
    zh: '端粒检测（Telomere Testing）',
    en: 'Telomere Length Testing',
    displayRule: 'zh_en',
    shortNote: '测量染色体端粒长度，科学评估生物学年龄与衰老速率',
  },
  igGAllergy: {
    ja: '遅延型アレルギー検査（IgG）',
    zh: '迟发型过敏检测（IgG）',
    en: 'IgG Delayed Food Allergy Testing',
    displayRule: 'zh_en',
    shortNote: 'IgG抗体检测识别慢性食物不耐受，是慢性炎症根因排查利器',
  },
  orthomolecular: {
    ja: 'オーソモレキュラー（栄養外来）',
    zh: '精准分子营养疗法（Orthomolecular Nutrition）',
    en: 'Orthomolecular Nutrition Consultation',
    displayRule: 'en_with_zh_note',
    shortNote: '通过精准营养素检测与补充，从分子层面优化身体功能',
  },
  tumorMarker: {
    ja: '腫瘍マーカー',
    zh: '肿瘤标志物',
    en: 'Tumor Markers',
    displayRule: 'zh_only',
    shortNote: '血液中的癌症相关蛋白指标，用于早期筛查与追踪',
  },

  /* ── 婦人科・健診 ──────────────────────────────────────── */
  mammography: {
    ja: 'マンモグラフィー',
    zh: '乳腺X线摄影（钼靶）',
    en: 'Mammography',
    displayRule: 'zh_en',
    shortNote: 'X线专项筛查，为乳腺癌早期发现的金标准',
  },
  transvaginalUS: {
    ja: '経腟超音波検査',
    zh: '经阴道超声检查（TVS）',
    en: 'Transvaginal Ultrasound (TVS)',
    displayRule: 'zh_en',
    shortNote: '内镜式超声，精准显像子宫与卵巢状态',
  },

  /* ── 耳鼻咽喉手術 ──────────────────────────────────────── */
  endoscopicNasalSurgery: {
    ja: '内視鏡下鼻腔手術',
    zh: '内镜下鼻腔手术',
    en: 'Endoscopic Nasal Surgery',
    displayRule: 'zh_only',
    shortNote: '高清内镜直视下操作，出血少、创伤小、恢复快',
  },
  ess: {
    ja: '内視鏡下副鼻腔手術（ESS）',
    zh: '内镜下副鼻腔手术（ESS）',
    en: 'Endoscopic Sinus Surgery (ESS)',
    displayRule: 'zh_en',
    shortNote: '针对慢性副鼻腔炎的微创根治手术',
  },
  uppp: {
    ja: '口蓋垂口蓋咽頭形成術（UPPP）',
    zh: '悬雍垂腭咽成形术（UPPP）',
    en: 'Uvulopalatopharyngoplasty (UPPP)',
    displayRule: 'zh_en',
    shortNote: '扩宽咽腔气道，根治打鼾及睡眠呼吸暂停',
  },
  cpap: {
    ja: 'CPAP（持続陽圧呼吸療法）',
    zh: 'CPAP 持续正压通气治疗',
    en: 'CPAP — Continuous Positive Airway Pressure',
    displayRule: 'zh_en',
    shortNote: '睡眠呼吸暂停的保守疗法，本院手术可实现永久摆脱',
  },
  tympanoplasty: {
    ja: '鼓膜形成術 / 鼓室形成術',
    zh: '鼓膜修补术（鼓室成形术）',
    en: 'Tympanoplasty',
    displayRule: 'zh_en',
    shortNote: '修复鼓膜穿孔，恢复听力',
  },
};

/* ── Global Config ──────────────────────────────────────── */
const CATALOG_CONFIG = {
  /** Set to true to show price information */
  showPrices: false,
  year: 2025,
  company: PROPER_NOUNS.company,
  tagline: {
    ja: '海外渡航者向け医療受診支援カタログ',
    zh: '赴日就医专属支援 · 臻选医疗目录',
    en: 'International Medical Support Catalog',
  },
};

/* ── Clinic Master Data ─────────────────────────────────── */
const CLINICS = {
  'r-shoto': {
    location: { ja: '東京都 渋谷区', zh: '东京都 涩谷区', en: 'Shibuya, Tokyo' },
    name:     PROPER_NOUNS.clinicNames['r-shoto'],
    nameShort:PROPER_NOUNS.clinicShort['r-shoto'],
    specialty:{ ja: '美容医療・再生医療', zh: '美容医疗·再生医疗', en: 'Aesthetic & Regenerative Medicine' },
    url: 'https://rclinic-shoto.jp/',
    image: { src: 'https://rclinic-shoto.jp/wp-content/themes/rc-clinic/image/sec03-01.webp', alt: 'R CLINIC 松濤 — 院内空間' },
    chapters: ['regenerative', 'aesthetic'],
  },
  'riseling': {
    location: { ja: '大阪府 大阪市', zh: '大阪府 大阪市', en: 'Osaka City, Osaka' },
    name:     PROPER_NOUNS.clinicNames['riseling'],
    nameShort:PROPER_NOUNS.clinicShort['riseling'],
    specialty:{ ja: '美容医療・再生医療', zh: '美容医疗·再生医疗', en: 'Aesthetic & Regenerative Medicine' },
    url: 'https://ormc.jp/',
    image: null,  // 品質基準を満たす高解像度画像が確認できなかったため不採用
    chapters: ['regenerative', 'aesthetic'],
  },
  'coco': {
    location: { ja: '福岡県 福岡市', zh: '福冈县 福冈市', en: 'Fukuoka City, Fukuoka' },
    name:     PROPER_NOUNS.clinicNames['coco'],
    nameShort:PROPER_NOUNS.clinicShort['coco'],
    specialty:{ ja: '美容医療・再生医療', zh: '美容医疗·再生医疗', en: 'Aesthetic & Regenerative Medicine' },
    url: 'https://cococell-clinic.or.jp/',
    image: { src: 'https://cococell-clinic.or.jp/lib/img/top_slide_img01.jpg', alt: 'CoCoセルクリニック — 院内' },
    chapters: ['regenerative', 'aesthetic'],
  },
  'tenjin': {
    location: { ja: '福岡県 福岡市', zh: '福冈县 福冈市', en: 'Fukuoka City, Fukuoka' },
    name:     PROPER_NOUNS.clinicNames['tenjin'],
    nameShort:PROPER_NOUNS.clinicShort['tenjin'],
    specialty:{ ja: '美容医療・再生医療', zh: '美容医疗·再生医疗', en: 'Aesthetic & Regenerative Medicine' },
    url: 'https://tenjin-hbc.jp/',
    image: { src: 'https://tenjin-hbc.jp/wp-content/uploads/2022/06/tenjin-hbc_main_image.jpg', alt: '天神ホリスティックビューティークリニック — 院内空間' },
    chapters: ['regenerative', 'aesthetic'],
  },
  'sakaguchi': {
    location: { ja: '福岡県 福岡市', zh: '福冈县 福冈市', en: 'Fukuoka City, Fukuoka' },
    name:     PROPER_NOUNS.clinicNames['sakaguchi'],
    nameShort:PROPER_NOUNS.clinicShort['sakaguchi'],
    specialty:{ ja: '耳鼻咽喉科（総合）・日帰り手術', zh: '耳鼻喉科（综合）·日间手术', en: 'ENT (Comprehensive) & Same-Day Surgery' },
    url: 'https://ssc-jibi.com/',
    image: { src: 'https://ssc-jibi.com/wp-content/uploads/image4.png', alt: '坂口耳鼻咽喉科 — 院内' },
    chapters: ['ent'],
  },
  'yahata': {
    location: { ja: '福岡県 北九州市', zh: '福冈县 北九州市', en: 'Kitakyushu, Fukuoka' },
    name:     PROPER_NOUNS.clinicNames['yahata'],
    nameShort:PROPER_NOUNS.clinicShort['yahata'],
    specialty:{ ja: '耳鼻咽喉科（鼻専門）・日帰り手術', zh: '耳鼻喉科（鼻部专科）·日间手术', en: 'ENT (Nasal Specialist) & Same-Day Surgery' },
    url: 'https://sanka.or.jp/otolaryngology/',
    image: { src: '../assets/images/clinics/yahata/main.jpg', webp: '../assets/images/clinics/yahata/main.webp', alt: 'さんか八幡西クリニック — 手術室' },
    chapters: ['ent'],
  },
  'luna': {
    location: { ja: '福岡県 北九州市', zh: '福冈县 北九州市', en: 'Kitakyushu, Fukuoka' },
    name:     PROPER_NOUNS.clinicNames['luna'],
    nameShort:PROPER_NOUNS.clinicShort['luna'],
    specialty:{ ja: '精密健診・婦人科ドック', zh: '精密体检·妇科套餐', en: "Precision Checkup & Women's Health" },
    url: 'https://www.sanka-lunaclinic.com/',
    image: { src: 'https://www.sanka-lunaclinic.com/wp-content/uploads/2025/04/main_img_01-2_2.jpg', alt: 'SANKA LUNA CLINIC — 院内' },
    chapters: ['checkup'],
  },
  'carproad': {
    location: { ja: '広島県 広島市', zh: '广岛县 广岛市', en: 'Hiroshima City, Hiroshima' },
    name:     PROPER_NOUNS.clinicNames['carproad'],
    nameShort:PROPER_NOUNS.clinicShort['carproad'],
    specialty:{ ja: '耳鼻咽喉科（鼻専門）・日帰り手術', zh: '耳鼻喉科（鼻部专科）·日间手术', en: 'ENT (Nasal Specialist) & Same-Day Surgery' },
    url: 'https://carproad.com/',
    image: { src: '../assets/images/clinics/carproad/main.jpg', webp: '../assets/images/clinics/carproad/main.webp', alt: 'カープロード鼻専門クリニック — 院内空間' },
    chapters: ['ent'],
  },
  'heiwa': {
    location: { ja: '広島県 広島市', zh: '广岛县 广岛市', en: 'Hiroshima City, Hiroshima' },
    name:     PROPER_NOUNS.clinicNames['heiwa'],
    nameShort:PROPER_NOUNS.clinicShort['heiwa'],
    specialty:{ ja: '耳鼻咽喉科（鼻専門）・日帰り手術', zh: '耳鼻喉科（鼻部专科）·日间手术', en: 'ENT (Nasal Specialist) & Same-Day Surgery' },
    url: 'https://www.heiwakinenclinic.com/',
    image: { src: '../assets/images/clinics/heiwa/main.jpg', webp: '../assets/images/clinics/heiwa/main.webp', alt: '平和記念公園鼻専門クリニック — 院内空間' },
    chapters: ['ent'],
  },
};

/* ── UI / Labels ────────────────────────────────────────── */
const UI = {
  nav: {
    intro1: { ja: '企業紹介', zh: '企业介绍', en: 'About Us' },
    intro2: { ja: 'サービス概要', zh: '服务概述', en: 'Services' },
    clinics:{ ja: '拠点一覧', zh: '据点一览', en: 'Our Clinics' },
    toc:    { ja: 'はじめに', zh: '简介', en: 'Introduction' },
    menu:   { ja: '医療メニュー', zh: '医疗菜单', en: 'Medical Menu' },
    clinic: { ja: 'クリニック', zh: '诊所', en: 'Clinics' },
  },
  print: { ja: '印刷 / PDF', zh: '打印 / PDF', en: 'Print / PDF' },
  allClinics: { ja: '全クリニック', zh: '全部诊所', en: 'All Clinics' },
  clinicDir: {
    title: { ja: 'グループクリニック 拠点一覧', zh: '集团旗下诊所 · 全国九大据点', en: 'Group Clinic Directory' },
    sub:   { ja: 'Group Clinic Directory', zh: 'Group Clinic Directory', en: 'Group Clinic Directory' },
  },
  price: {
    label:        { ja: '料金目安', zh: '费用参考', en: 'Price Reference' },
    consultation: { ja: '要相談', zh: '请咨询', en: 'Upon Consultation' },
  },
  footer: {
    catalog: { ja: '医療カタログ（日本語版）', zh: '臻选医疗目录（简体中文版）', en: 'Medical Catalog (English)' },
    copy:    { ja: '無断転載・複製を禁じます', zh: '版权所有 · 未经授权禁止转载', en: 'All rights reserved' },
  },
  langLabel: { ja: '日本語版', zh: '简体中文版', en: 'English' },
};

/* ── Intro Section Data ─────────────────────────────────── */
const INTRO = {
  hero: {
    eyebrow: { ja: 'Sanka Holdings Co., Ltd.', zh: 'Sanka Holdings Co., Ltd.', en: 'Sanka Holdings Co., Ltd.' },
    title: {
      ja: '日本最高水準の医療を、<br /><em>世界のみなさまへ。</em>',
      zh: '将日本最高水准的医疗，<br /><em>呈献给全球尊贵客户。</em>',
      en: 'Delivering Japan\'s Highest Standard<br /><em>of Medical Care to the World.</em>',
    },
    sub: {
      ja: 'さんかホールディングス株式会社は、再生医療・美容医療・精密健診・耳鼻咽喉科を中心とした医療グループです。東京・大阪・福岡・北九州・広島の5都市に9拠点を展開し、海外からお越しの患者さまに対して、安心・安全・高品質な日本の先端医療を提供します。',
      zh: 'SANKA HOLDINGS Ltd. 旗下汇聚九家专科诊所，横跨东京、大阪、福冈、北九州、广岛五大都市。深耕再生医疗、高端美容、精密健诊及耳鼻喉专科领域，以日本最高标准，为尊贵的海外宾客提供安心、卓越的就医体验。',
      en: 'Sanka Holdings is a medical group specializing in regenerative medicine, aesthetic medicine, precision health checkups, and ENT surgery. With 9 clinics across 5 cities — Tokyo, Osaka, Fukuoka, Kitakyushu, and Hiroshima — we deliver world-class Japanese medicine to international patients.',
    },
    stats: [
      { num: '9', label: { ja: 'グループ拠点数', zh: '集团据点数', en: 'Group Clinics' } },
      { num: '5', label: { ja: '展開都市',       zh: '布局城市数', en: 'Cities' } },
      { num: '4', label: { ja: '診療領域',       zh: '诊疗领域',  en: 'Medical Fields' } },
      { num: '3', label: { ja: '対応言語',       zh: '对应语言',  en: 'Languages' } },
    ],
  },
  service: {
    number: '0.2',
    title: {
      ja: '海外渡航者向け<br />医療受診支援サービス',
      zh: '赴日就医<br />全程贵宾礼遇支援',
      en: 'Medical Reception Support<br />for International Visitors',
    },
    sub: {
      ja: 'International Medical Support Services',
      zh: 'Premium Inbound Medical Concierge',
      en: 'International Medical Support Services',
    },
    desc: {
      ja: '言葉の壁や医療システムの違いを超え、海外からお越しの方が日本の最先端医療を安心して受診できるよう、グループ全体でサポートします。予約から帰国後フォローアップまで、ワンストップでご支援いたします。',
      zh: '语言无碍，体系无忧。SANKA HOLDINGS 以专属管家式服务，陪伴每一位贵宾从初次咨询到归国后随访的全程旅程，让您在尽享日本顶尖医疗的同时，感受细致入微的贴心关怀与全程安心礼遇。',
      en: 'Bridging language barriers and navigating Japan\'s medical system, our group provides comprehensive support so international visitors can confidently access Japan\'s most advanced medical care — from initial inquiry to post-return follow-up.',
    },
    flows: [
      {
        num: '01',
        title: { ja: 'お問い合わせ・相談', zh: '尊享专属咨询', en: 'Inquiry & Consultation' },
        desc: {
          ja: '多言語対応スタッフが受診内容のヒアリングを行い、最適なクリニックとプランをご提案します。',
          zh: '专属多语言顾问深入了解您的就医需求，精准匹配最合适的诊所与诊疗方案，为您量身定制专属赴日医疗计划。',
          en: 'Multilingual staff will listen to your needs and recommend the most suitable clinic and treatment plan.',
        },
      },
      {
        num: '02',
        title: { ja: 'ご予約・渡航サポート', zh: '专属预约与出行礼遇', en: 'Booking & Travel Support' },
        desc: {
          ja: '診察予約の代行手続き、必要書類の準備をサポート。空港送迎・宿泊手配のご案内も行います。',
          zh: '全权代办预约手续及必要文件准备，并提供机场专车接送、精品酒店安排等出行礼遇，确保您无忧抵达。',
          en: 'We handle appointment booking, document preparation, and can arrange airport transfers and accommodation guidance.',
        },
      },
      {
        num: '03',
        title: { ja: '受診・通訳サポート', zh: '全程陪诊与专业口译', en: 'Consultation & Interpretation' },
        desc: {
          ja: '診察時には専属通訳が同行。医師との丁寧なコミュニケーションで、安心の受診をお届けします。',
          zh: '专属口译顾问全程随行，确保您与主治医师之间每一句沟通的准确传达，让您安心、放心地接受最专业的诊疗。',
          en: 'A dedicated interpreter accompanies you during consultations, ensuring clear and precise communication with our physicians.',
        },
      },
      {
        num: '04',
        title: { ja: '帰国後フォローアップ', zh: '归国后持续关怀', en: 'Post-Return Follow-Up' },
        desc: {
          ja: 'オンライン診療・検査結果説明・追加処方など、帰国後も継続的にサポートいたします。',
          zh: '提供线上复诊、检查结果专业解读及追加处方等服务，让高品质医疗照护在您归国后依然温暖延续。',
          en: 'Online consultations, result explanations, and additional prescriptions ensure your care continues after returning home.',
        },
      },
    ],
    features: [
      {
        icon: '🏥',
        title: { ja: '9拠点・4診療領域', zh: '九大专科据点 · 四大医疗领域', en: '9 Clinics · 4 Medical Fields' },
        desc: {
          ja: '再生医療・美容医療・精密健診・耳鼻咽喉科の専門クリニックが連携。包括的な医療体験を提供します。',
          zh: '再生医疗、高端美容、精密健诊及耳鼻喉专科诊所协同联动，为您打造覆盖全面、品质卓越的一站式医疗体验。',
          en: 'Regenerative medicine, aesthetics, precision checkups, and ENT clinics collaborate to provide comprehensive medical experiences.',
        },
      },
      {
        icon: '🌐',
        title: { ja: '多言語対応', zh: '专属多语言礼遇服务', en: 'Multilingual Support' },
        desc: {
          ja: '日本語・英語・中国語（繁体字・簡体字）に対応。海外患者さまのコミュニケーションをサポートします。',
          zh: '精通日语、英语及中文（繁简双体）的专属顾问团队随时恭候，消除一切语言隔阂，让每次沟通都流畅无碍。',
          en: 'Japanese, English, and Chinese (Traditional & Simplified) support ensures seamless communication for all international patients.',
        },
      },
      {
        icon: '✈️',
        title: { ja: 'トータルコーディネート', zh: '管家式全程统筹安排', en: 'Total Coordination' },
        desc: {
          ja: '渡航前相談から帰国後フォローまで。医療観光に必要なすべての手配をワンストップで行います。',
          zh: '从出行前的咨询规划到归国后的持续随访，专属顾问全程跟进，将赴日医疗旅程中每一个细节都妥善安排、万无一失。',
          en: 'From pre-travel consultation to post-return follow-up — everything needed for medical tourism handled in one place.',
        },
      },
      {
        icon: '🔬',
        title: { ja: '日本最先端の技術', zh: '日本顶尖前沿医疗技术', en: "Japan's Cutting-Edge Technology" },
        desc: {
          ja: '幹細胞治療・最新レーザー機器・精密内視鏡手術など、世界水準を超える最先端医療技術を提供します。',
          zh: '干细胞治疗、高端激光设备、精准内镜手术……以超越世界标准的日本尖端医疗技术，守护您与家人的健康与美丽。',
          en: 'Stem cell therapy, state-of-the-art laser systems, and precision endoscopic surgery — technology that leads the world.',
        },
      },
    ],
  },
};

/* ── Chapter & Menu Data ────────────────────────────────── */
const CHAPTERS = [
  /* ── Chapter 1: Regenerative Medicine ───────────────── */
  {
    id: 'regenerative',
    num: '01',
    heroClinicId: 'coco',   // 章の代表画像：CoCoセルクリニック
    title:  { ja: '再生医療',        zh: '再生医疗',            en: 'Regenerative Medicine' },
    enLabel:'Regenerative Medicine',
    desc: {
      ja: '自己の細胞・血液を活用した最先端の再生医療。加齢・疾患・外傷で失われた機能を根本から回復させ、身体本来の力で若返りと治癒を実現します。厚生労働省の認可を受けた安全なプロトコルのもと、専門医が施術を行います。',
      zh: '以自体细胞与血液为媒介的前沿再生医疗，从根本唤醒人体自愈潜能，逆转岁月痕迹。所有诊疗方案均通过日本厚生劳动省严格认证，由资深权威专科医师主理，将安全与疗效完美融合。',
      en: 'Cutting-edge regenerative medicine using your own cells and blood to restore function lost to aging, disease, or injury. Harnessing the body\'s natural healing power, these treatments are performed under Ministry of Health-approved protocols.',
    },
    clinicIds: ['r-shoto', 'riseling', 'coco', 'tenjin'],
    categories: [
      {
        id: 'stem-cell',
        num: '1-1',
        title: { ja: '再生医療（幹細胞）', zh: '再生医疗（干细胞）', en: 'Regenerative Medicine — Stem Cell' },
        menus: [
          {
            id: 'stem-iv',
            featured: true,
            name: {
              ja: '自己脂肪由来幹細胞 点滴（静脈内投与）',
              zh: '自体脂肪来源干细胞 静脉滴注（静脉内给药）',
              en: 'Autologous Adipose-Derived Stem Cell IV Drip',
            },
            effect: {
              ja: '究極の全身アンチエイジング、免疫力強化、疲労回復。自己の脂肪組織から採取した幹細胞を静脈内に投与し、全身の細胞再生を促します。',
              zh: '终极全身抗衰老、增强免疫力、消除疲劳。将从自体脂肪组织采集的干细胞通过静脉注射，促进全身细胞再生。',
              en: 'Ultimate full-body anti-aging, immune enhancement, and fatigue recovery. Autologous stem cells harvested from adipose tissue are administered intravenously to stimulate systemic cell regeneration.',
            },
            clinicIds: ['r-shoto', 'riseling', 'coco'],
            price: null,
          },
          {
            id: 'stem-local',
            featured: true,
            name: {
              ja: '自己脂肪由来幹細胞 局所注射（顔面・頭皮・関節）',
              zh: '自体脂肪来源干细胞 局部注射（面部·头皮·关节）',
              en: 'Autologous Stem Cell Local Injection (Face / Scalp / Joints)',
            },
            effect: {
              ja: '深いシワ・たるみの根本改善、毛髪再生、関節痛の治療。問題部位へ直接投与することで高い局所効果を発揮します。',
              zh: '从根本上改善深层皱纹和松弛、促进毛发再生、治疗关节疼痛。直接注射至患部，发挥强效的局部治疗效果。',
              en: 'Root-cause correction of deep wrinkles, sagging, hair regeneration, and joint pain relief. Direct local injection delivers concentrated regenerative effects to target areas.',
            },
            clinicIds: ['r-shoto', 'riseling', 'coco'],
            price: null,
          },
          {
            id: 'stem-banking',
            featured: false,
            name: {
              ja: '幹細胞バンキング（保管サービス）',
              zh: '干细胞冻存保管服务（Stem Cell Banking）',
              en: 'Stem Cell Banking (Storage Service)',
            },
            effect: {
              ja: '若く健康な状態の細胞を将来の治療のために冷凍保存。今の健康な細胞を確保しておくことで、将来の様々な疾患・加齢に備えます。',
              zh: '将年轻健康状态下的细胞冷冻保存，用于未来的治疗。提前储备健康细胞，为应对未来各种疾病及衰老做好准备。',
              en: 'Cryopreservation of young, healthy cells for future therapeutic use. Secure your healthiest cells now as insurance against future illness and aging.',
            },
            clinicIds: ['r-shoto', 'riseling'],
            price: null,
          },
        ],
      },
      {
        id: 'prp',
        num: '1-2',
        title: { ja: '再生医療（PRP・血液療法）', zh: '再生医疗（PRP·血液疗法）', en: 'Regenerative Medicine — PRP & Blood Therapy' },
        menus: [
          {
            id: 'prp-skin',
            featured: false,
            name: {
              ja: 'PRP（多血小板血漿）皮膚再生療法',
              zh: 'PRP（富血小板血浆）皮肤再生疗法',
              en: 'PRP (Platelet-Rich Plasma) Skin Regeneration Therapy',
            },
            effect: {
              ja: '目の下のクマ、小ジワ、ほうれい線の自然な改善。自己血液を遠心分離し、成長因子を高濃度に含むPRPを患部に注入します。',
              zh: '自然改善黑眼圈、细纹及法令纹。将自体血液离心分离，提取富含高浓度生长因子的PRP后注射至患部。',
              en: 'Natural improvement of under-eye dark circles, fine lines, and nasolabial folds. Autologous blood is centrifuged to extract growth-factor-rich PRP for targeted injection.',
            },
            clinicIds: ['all'],
            price: null,
          },
          {
            id: 'prp-hair',
            featured: false,
            name: {
              ja: 'PRP 育毛・発毛治療（頭皮注射）',
              zh: 'PRP育发·生发治疗（头皮注射）',
              en: 'PRP Hair Growth Treatment (Scalp Injection)',
            },
            effect: {
              ja: '自己組織を用いた安全な薄毛治療。PRP内の成長因子が毛乳頭細胞を活性化し、発毛・育毛を促進します。',
              zh: '利用自体组织的安全脱发治疗。PRP中的生长因子激活毛乳头细胞，促进生发与育发。',
              en: 'Safe hair loss treatment using your own tissue. Growth factors in PRP activate dermal papilla cells, stimulating hair growth and strengthening existing follicles.',
            },
            clinicIds: ['all'],
            price: null,
          },
          {
            id: 'blood-cleanse',
            featured: false,
            name: {
              ja: '血液クレンジング（オゾン療法）/ UVBI',
              zh: '血液净化（臭氧疗法）/ UVBI',
              en: 'Blood Cleansing (Ozone Therapy) / UVBI',
            },
            effect: {
              ja: 'ドロドロ血液の浄化、細胞の活性化、デトックス。血液にオゾンや紫外線を照射し、抗酸化・免疫賦活作用をもたらします。',
              zh: '净化血液、激活细胞、排毒。通过对血液进行臭氧或紫外线照射，发挥抗氧化和免疫激活作用。',
              en: 'Blood purification, cellular activation, and detoxification. Ozone or UV irradiation of blood delivers powerful antioxidant and immune-stimulating effects.',
            },
            clinicIds: ['tenjin', 'coco'],
            price: null,
          },
        ],
      },
    ],
  },

  /* ── Chapter 2: Aesthetic & Anti-Aging ──────────────── */
  {
    id: 'aesthetic',
    num: '02',
    heroClinicId: 'tenjin', // 章の代表画像：天神ホリスティックビューティークリニック
    title:  { ja: '美容・アンチエイジング', zh: '臻颜·抗衰医美',        en: 'Aesthetic & Anti-Aging' },
    enLabel:'Aesthetic & Anti-Aging',
    desc: {
      ja: '次世代の美容医療技術を集結。エクソソーム点滴から最新レーザー・HIFUまで、ダウンタイムを最小限に抑えながら最大の効果を追求します。日本トップクラスの専門医が、あなたの美を科学します。',
      zh: '汇聚新生代高端医美精华——外泌体臻养点滴、精准塑颜注射、超声刀、皮秒激光……以最短修复期换取最卓越的蜕变效果。在日本顶尖美容专科医师的精心诊治下，以科学之道成就您的极致之美。',
      en: 'A convergence of next-generation aesthetic technologies — from exosome IV drips to the latest lasers and HIFU — delivering maximum results with minimal downtime, guided by Japan\'s top aesthetic physicians.',
    },
    clinicIds: ['tenjin', 'coco', 'r-shoto', 'riseling'],
    categories: [
      {
        id: 'exosome',
        num: '2-1',
        title: { ja: '次世代エイジングケア（エクソソーム）', zh: '新一代抗衰老（外泌体）', en: 'Next-Gen Aging Care — Exosome' },
        menus: [
          {
            id: 'exosome-iv',
            featured: true,
            name: {
              ja: '高濃度エクソソーム（幹細胞培養上清液）点滴',
              zh: '高浓度外泌体（干细胞培养上清液）静脉滴注',
              en: 'High-Concentration Exosome (Stem Cell Conditioned Medium) IV Drip',
            },
            effect: {
              ja: '全身の細胞修復、肌質改善、ダウンタイムなしの若返り。幹細胞が分泌するエクソソームを高濃度で点滴投与し、細胞間コミュニケーションを活性化します。',
              zh: '全身细胞修复、改善肤质、无恢复期的年轻化。通过高浓度点滴给予干细胞分泌的外泌体，激活细胞间通讯。',
              en: 'Full-body cellular repair, skin quality improvement, and zero-downtime rejuvenation. High-concentration exosomes from stem cell culture are delivered IV to activate intercellular communication.',
            },
            clinicIds: ['all'],
            price: null,
          },
          {
            id: 'exosome-local',
            featured: false,
            name: {
              ja: 'エクソソーム 水光注射 / ダーマペン導入',
              zh: '外泌体水光注射 / Dermapen 微针导入',
              en: 'Exosome Hydro Injection / Dermapen Treatment',
            },
            effect: {
              ja: '顔や頭皮へ直接有効成分を注入し、極上の美肌・発毛を実現。ダーマペンで微細な穿孔を作り、エクソソームの吸収率を最大化します。',
              zh: '直接向面部或头皮注入有效成分，实现极致美肌与发毛效果。通过微针在皮肤上制造细微穿孔，最大化外泌体的吸收率。',
              en: 'Direct injection of active ingredients into the face or scalp for premium skin quality and hair regrowth. Dermapen micro-channels maximize exosome absorption rates.',
            },
            clinicIds: ['tenjin', 'coco'],
            price: null,
          },
        ],
      },
      {
        id: 'drip',
        num: '2-2',
        title: { ja: '高機能・長寿点滴療法', zh: '高功能·长寿滴注疗法', en: 'High-Performance & Longevity IV Therapy' },
        menus: [
          {
            id: 'nmn-vitc',
            featured: false,
            name: {
              ja: 'NMN点滴 / 高濃度ビタミンC点滴',
              zh: 'NMN静脉滴注 / 高浓度维生素C滴注',
              en: 'NMN IV Drip / High-Concentration Vitamin C Drip',
            },
            effect: {
              ja: 'サーチュイン（長寿）遺伝子の活性化、美白・抗酸化作用。NMNはNAD+の前駆体として細胞エネルギー代謝を回復させます。',
              zh: '激活长寿基因（Sirtuin）、美白·抗氧化作用。NMN作为NAD+前体，恢复细胞能量代谢。',
              en: 'Sirtuin (longevity) gene activation, skin brightening, and antioxidant effects. NMN as an NAD+ precursor restores cellular energy metabolism.',
            },
            clinicIds: ['all'],
            price: null,
          },
          {
            id: 'glutathione',
            featured: false,
            name: {
              ja: '白玉点滴 / マイヤーズカクテル / 肝斑・疲労回復点滴',
              zh: '美白点滴（Glutathione 谷胱甘肽）/ Myers\' Cocktail 高效营养滴注 / 肝斑·抗疲劳滴注',
              en: 'Glutathione (Shiratama) Drip / Myers\' Cocktail / Melasma & Fatigue Drip',
            },
            effect: {
              ja: '全身の強力な美白（グルタチオン）、慢性疲労の即効回復。マイヤーズカクテルはビタミン・ミネラルを直接静脈内へ届けます。',
              zh: '强效全身美白（Glutathione 谷胱甘肽）、即效缓解慢性疲劳。Myers\' Cocktail 将维生素与矿物质精准输送至血管，高效恢复体能与活力。',
              en: 'Powerful full-body whitening (glutathione), rapid chronic fatigue recovery. Myers\' Cocktail delivers vitamins and minerals directly into the bloodstream for immediate effect.',
            },
            clinicIds: ['all'],
            price: null,
          },
        ],
      },
      {
        id: 'injection',
        num: '2-3',
        title: { ja: '注入治療（切らない美容）', zh: '注射治疗（无刀美容）', en: 'Injectable Treatments (Non-Surgical Aesthetics)' },
        menus: [
          {
            id: 'ha',
            featured: false,
            name: {
              ja: 'ヒアルロン酸注入（顔面各部位 / 涙袋 / 唇等）',
              zh: '透明质酸注射（面部各部位 / 泪沟 / 嘴唇等）',
              en: 'Hyaluronic Acid Injection (Face / Tear Trough / Lips, etc.)',
            },
            effect: {
              ja: 'ボリュームロス改善、輪郭形成（Eライン）、リフトアップ。自然な仕上がりで若々しい顔立ちを実現します。',
              zh: '改善容量流失、轮廓塑形（E线）、提升。以自然的效果实现年轻化的面部轮廓。',
              en: 'Volume restoration, facial contouring (E-line), and lifting. Achieve a naturally youthful appearance with precision filler placement.',
            },
            clinicIds: ['tenjin', 'coco'],
            price: null,
          },
          {
            id: 'botox',
            featured: false,
            name: {
              ja: 'ボトックス注射（シワ取り / エラ / 肩こり / 多汗症）',
              zh: '肉毒素注射（除皱 / 瘦脸 / 肩部 / 多汗症）',
              en: 'Botox Injection (Wrinkles / Jaw Slimming / Shoulders / Hyperhidrosis)',
            },
            effect: {
              ja: '表情ジワの改善、小顔効果、肩こり解消。ボツリヌストキシン製剤により筋肉の緊張を緩和し、自然な若返りを実現します。',
              zh: '改善表情纹、小脸效果、消除肩膀僵硬。通过肉毒杆菌毒素制剂放松肌肉紧张，实现自然的年轻化效果。',
              en: 'Expression line correction, facial slimming, and shoulder tension relief. Botulinum toxin relaxes targeted muscles for natural, long-lasting rejuvenation.',
            },
            clinicIds: ['tenjin', 'coco'],
            price: null,
          },
          {
            id: 'skin-booster',
            featured: false,
            name: {
              ja: '次世代肌育注射（プロファイロ / スネコス / ジュルベルック等）',
              zh: '新一代肌肤注射（Profhilo / Sunekos / Juvelook等）',
              en: 'Next-Gen Skin Booster (Profhilo / Sunekos / Juvelook, etc.)',
            },
            effect: {
              ja: '肌のコラーゲン・エラスチン自生を促す最新の自然な若返り。欧州で実績のある次世代製剤を使用します。',
              zh: '促进肌肤自主生成胶原蛋白和弹性蛋白的最新自然抗衰老疗法。使用在欧洲拥有丰富实绩的新一代制剂。',
              en: 'Next-generation natural rejuvenation that stimulates the skin\'s own collagen and elastin production. Uses clinically-proven European formulations.',
            },
            clinicIds: ['tenjin', 'coco'],
            price: null,
          },
          {
            id: 'fat-dissolve',
            featured: false,
            name: {
              ja: '脂肪溶解注射（カベリン / BNLS等）',
              zh: '溶脂注射（卡贝林 / BNLS等）',
              en: 'Fat Dissolution Injection (Kabelline / BNLS, etc.)',
            },
            effect: {
              ja: '二重アゴ、フェイスラインの脂肪をメスを使わずに除去。注射で脂肪細胞を溶解し、スリムなフェイスラインを形成します。',
              zh: '无需手术即可消除双下巴和脸部轮廓多余脂肪。通过注射溶解脂肪细胞，打造纤细的脸部轮廓。',
              en: 'Non-surgical removal of double chin and facial fat. Injectable solutions dissolve fat cells to sculpt a defined, slim facial contour.',
            },
            clinicIds: ['tenjin', 'coco'],
            price: null,
          },
        ],
      },
      {
        id: 'thread-lift',
        num: '2-4',
        title: { ja: 'スレッドリフト（糸によるリフトアップ）', zh: '埋线提升', en: 'Thread Lift' },
        menus: [
          {
            id: 'pdo-pcl',
            featured: false,
            name: {
              ja: 'PDO / PCL スレッドリフト（各種）',
              zh: 'PDO / PCL 埋线提升（各种）',
              en: 'PDO / PCL Thread Lift (Various)',
            },
            effect: {
              ja: 'メスを使わない強力な顔のたるみ引き上げ、Vライン形成。吸収性の糸を皮下組織に挿入し、コラーゲン生成を促しながら即時リフトアップ効果を実現します。',
              zh: '无需手术刀即可强力上提面部松弛、塑造V脸轮廓。将可吸收线埋入皮下组织，在促进胶原蛋白生成的同时实现即时提升效果。',
              en: 'Powerful non-surgical facial lifting and V-line contouring. Absorbable threads inserted into subcutaneous tissue provide immediate lift while stimulating long-term collagen production.',
            },
            clinicIds: ['tenjin', 'coco'],
            price: null,
          },
        ],
      },
      {
        id: 'laser-hifu',
        num: '2-5',
        title: { ja: '医療機器（レーザー・HIFU）', zh: '医疗设备（激光·超声刀）', en: 'Medical Devices — Laser & HIFU' },
        menus: [
          {
            id: 'hifu',
            featured: false,
            name: {
              ja: '医療HIFU（ウルセラ / ウルトラフォーマー等）',
              zh: '医疗超声刀（Ulthera / Ultraformer等）',
              en: 'Medical HIFU (Ulthera / Ultraformer, etc.)',
            },
            effect: {
              ja: 'SMAS筋膜からの強力なリフトアップ、たるみ予防。高密度焦点式超音波が筋膜層にアプローチし、外科的リフトに匹敵する効果を発揮します。',
              zh: '从SMAS筋膜层进行强效提升、预防松弛。高聚焦超声波作用于筋膜层，发挥媲美外科提升的效果。',
              en: 'Powerful SMAS-layer lifting and sagging prevention. High-intensity focused ultrasound targets the fascial layer, delivering surgical-lift equivalent results without incisions.',
            },
            clinicIds: ['tenjin', 'coco'],
            price: null,
          },
          {
            id: 'pico-laser',
            featured: false,
            name: {
              ja: 'ピコレーザー（トーニング / フラクショナル / スポット）',
              zh: '皮秒激光（调色 / 点阵 / 斑点）',
              en: 'Pico Laser (Toning / Fractional / Spot)',
            },
            effect: {
              ja: 'シミ、肝斑、くすみ、タトゥー除去、毛穴の引き締め。ピコ秒の超短パルスで色素を微細に砕き、周囲組織へのダメージを最小化します。',
              zh: '祛斑、肝斑、暗沉、纹身去除、收缩毛孔。以皮秒超短脉冲将色素精细粉碎，最大程度减少对周围组织的损伤。',
              en: 'Pigment spots, melasma, dullness, tattoo removal, and pore tightening. Ultra-short picosecond pulses shatter pigment into fine particles with minimal surrounding tissue damage.',
            },
            clinicIds: ['tenjin', 'coco'],
            price: null,
          },
          {
            id: 'ipl-co2',
            featured: false,
            name: {
              ja: '光治療（IPL・フォトフェイシャル）/ CO2フラクショナル',
              zh: '光子嫩肤（IPL）/ CO2点阵激光',
              en: 'Phototherapy (IPL / Photofacial) / CO2 Fractional Laser',
            },
            effect: {
              ja: '全体的な肌の色ムラ改善、ニキビ跡・クレーター治療。複数の波長を用いて肌トーンを均一化し、肌のテクスチャーを改善します。',
              zh: '全面改善肤色不均、痘印·凹陷治疗。利用多种波长均匀肤色，改善肌肤质地。',
              en: 'Overall skin tone correction and acne scar/crater treatment. Multi-wavelength therapy evens skin tone and improves texture for a flawless complexion.',
            },
            clinicIds: ['tenjin', 'coco'],
            price: null,
          },
        ],
      },
      {
        id: 'skincare',
        num: '2-6',
        title: { ja: 'メディカルスキンケア', zh: '医疗护肤', en: 'Medical Skincare' },
        menus: [
          {
            id: 'hydrafacial',
            featured: false,
            name: {
              ja: 'ハイドラフェイシャル / 各種ケミカルピーリング',
              zh: 'HydraFacial 水氧焕肤 / 医疗级化学焕肤（Chemical Peel）',
              en: 'HydraFacial / Various Chemical Peels',
            },
            effect: {
              ja: '毛穴の黒ずみ・角栓除去、肌のターンオーバー正常化。医療グレードの機器と薬剤で、クリニックでしかできない高度なスキンケアを提供します。',
              zh: '去除毛孔黑头与角栓、促进肌肤代谢正常化。利用医疗级设备和药剂，提供只有在诊所才能实现的高端护肤体验。',
              en: 'Blackhead and keratin plug removal, skin turnover normalization. Medical-grade equipment and solutions deliver clinic-exclusive advanced skincare results.',
            },
            clinicIds: ['tenjin', 'coco'],
            price: null,
          },
          {
            id: 'ionto',
            featured: false,
            name: {
              ja: 'イオン導入 / エレクトロポレーション',
              zh: '离子导入（Iontophoresis）/ 电脉冲导入（Electroporation）',
              en: 'Iontophoresis / Electroporation',
            },
            effect: {
              ja: 'レーザーやピーリング後の有効成分（ビタミン等）深層導入。微弱な電流を利用して、美容成分を皮膚の深部まで浸透させます。',
              zh: '激光或焕肤后的有效成分（维生素等）深层导入。利用微弱电流将美容成分渗透至皮肤深层。',
              en: 'Deep delivery of active ingredients (vitamins, etc.) after laser or peel treatments. Weak electrical current drives cosmetic actives into the skin\'s deeper layers.',
            },
            clinicIds: ['tenjin', 'coco'],
            price: null,
          },
        ],
      },
      {
        id: 'holistic',
        num: '2-7',
        title: { ja: '検査・ホリスティック医療', zh: '检查·整合医疗', en: 'Diagnostics & Holistic Medicine' },
        menus: [
          {
            id: 'genetic',
            featured: false,
            name: {
              ja: '遺伝子検査 / テロメア（細胞年齢）検査',
              zh: '基因检测 / 端粒（细胞年龄）检测',
              en: 'Genetic Testing / Telomere (Cellular Age) Testing',
            },
            effect: {
              ja: '自身の老化リスクや発症リスクを科学的に知るVIP向け検査。テロメア長を測定することで、実際の細胞年齢と生物学的老化度を可視化します。',
              zh: '科学了解自身衰老风险和发病风险的VIP级检测。通过测量端粒长度，可视化实际的细胞年龄和生物学老化程度。',
              en: 'VIP-level testing to scientifically assess your aging and disease risk. Telomere length measurement reveals your actual cellular age and biological aging rate.',
            },
            clinicIds: ['tenjin', 'coco'],
            price: null,
          },
          {
            id: 'ortho',
            featured: false,
            name: {
              ja: '遅延型アレルギー検査 / オーソモレキュラー（栄養外来）',
              zh: '迟发型过敏检测（IgG）/ 精准分子营养疗法（Orthomolecular）',
              en: 'Delayed Allergy Testing / Orthomolecular Nutrition Consultation',
            },
            effect: {
              ja: '体調不良の原因究明、サプリメントによる根本的な体質改善。IgG抗体検査で食物アレルギーを特定し、最適な栄養療法プランを策定します。',
              zh: '深查慢性不适根因，以精准营养补充从根本改善体质。IgG抗体检测精准锁定食物不耐受原，量身定制专属营养疗法方案（Orthomolecular Nutrition）。',
              en: 'Root-cause investigation of chronic health issues with supplement-based constitution improvement. IgG antibody testing identifies food sensitivities to build an optimal nutritional therapy plan.',
            },
            clinicIds: ['tenjin', 'coco'],
            price: null,
          },
        ],
      },
    ],
  },

  /* ── Chapter 3: Premium Health Checkup ──────────────── */
  {
    id: 'checkup',
    num: '03',
    heroClinicId: 'luna',   // 章の代表画像：ルナクリニック
    title:  { ja: '精密健診',    zh: '精密健诊',         en: 'Premium Health Checkup' },
    enLabel:'Premium Health Checkup',
    desc: {
      ja: '最新鋭の医療機器と専門医による高精度な人間ドック。疾病の早期発見から予防医学まで、あなたの健康を360度サポートします。特に女性に特化した婦人科ドックは、渡航者の方にも高く評価されています。',
      zh: '最新锐精密仪器与资深专科医师的完美结合，为您呈现高精度全面健康检查。从疾病早期筛查到前瞻性预防医学，全方位守护您的健康根基。专为女性臻选的高端妇科套餐，深受海外贵宾赞誉。',
      en: 'High-precision health screenings using state-of-the-art medical equipment and specialist physicians. From early disease detection to preventive medicine, we support your health 360°. Our women\'s health dock is particularly popular with international visitors.',
    },
    clinicIds: ['luna'],
    categories: [
      {
        id: 'precision-checkup',
        num: '3-1',
        title: { ja: '精密健診・プレミアム婦人科ドック', zh: '精密体检·高端妇科套餐', en: 'Precision Checkup & Premium Women\'s Health Dock' },
        menus: [
          {
            id: 'luna-dock',
            featured: true,
            name: {
              ja: 'ルナクリニック — 精密健診・プレミアム婦人科ドック',
              zh: 'SANKA LUNA CLINIC — 精密体检·高端女性健康套餐',
              en: 'Luna Clinic — Precision Health Checkup & Premium Women\'s Health Dock',
            },
            effect: {
              ja: '最新鋭機器による高精度診断と、専門医（婦人科・乳腺外科）による即時フィードバック。上質な受診体験とともに、包括的な健康チェックを提供します。\n\n【主な検査項目】婦人科内診・子宮頸がん検診・子宮体がん検査・経腟超音波検査・乳腺超音波（エコー）・マンモグラフィー・血液検査（腫瘍マーカー含む）・全身CT・MRI など',
              zh: '最新锐设备高精度诊断，妇科及乳腺外科专科医生即时反馈，提供高品质就诊体验和全面健康检查。\n\n【主要检查项目】妇科内诊·子宫颈癌筛查·子宫体癌检查·经阴道超声检查·乳腺超声（彩超）·乳腺X线摄影·血液检查（含肿瘤标志物）·全身CT·MRI等',
              en: 'High-precision diagnostics with state-of-the-art equipment, plus immediate specialist feedback from gynecologists and breast surgeons — all in a premium setting.\n\nKey examinations include: gynecological exam, cervical cancer screening, uterine cancer testing, transvaginal ultrasound, breast ultrasound, mammography, blood tests (including tumor markers), full-body CT, MRI, and more.',
            },
            clinicIds: ['luna'],
            price: null,
          },
        ],
      },
    ],
  },

  /* ── Chapter 4: Nasal Breathing & ENT ───────────────── */
  {
    id: 'ent',
    num: '04',
    heroClinicId: 'carproad', // 章の代表画像：カープロード（2560px高解像度）
    title:  { ja: '鼻呼吸・耳鼻咽喉',  zh: '鼻·耳鼻喉专科手术',    en: 'Nasal Breathing & ENT Surgery' },
    enLabel:'Nasal Breathing & ENT Surgery',
    desc: {
      ja: '慢性鼻炎・副鼻腔炎・睡眠時無呼吸症候群など、QOLに深く影響する鼻・耳・喉の疾患に対し、熟練の専門医が日帰り内視鏡手術で根本治療を行います。短い滞在期間で完治を目指す「医療ツーリズム型」手術を提供します。',
      zh: '慢性鼻炎、副鼻腔炎、睡眠呼吸暂停……这些长期困扰您的耳鼻喉疾患，由日本专科名医以日间精密内镜手术实现彻底根治。专为赴日就医人士量身设计，以最短住院期换取最大程度的生活品质提升。',
      en: 'Expert surgeons perform same-day endoscopic procedures to fundamentally treat chronic rhinitis, sinusitis, sleep apnea, and other ENT conditions that deeply impact quality of life — designed specifically for international patients seeking cure within a short stay.',
    },
    clinicIds: ['sakaguchi', 'yahata', 'carproad', 'heiwa'],
    categories: [
      {
        id: 'nasal-surgery',
        num: '4-1',
        title: { ja: '鼻炎・副鼻腔炎 日帰り手術（鼻専門）', zh: '鼻炎·副鼻腔炎 日间手术（鼻部专科）', en: 'Same-Day Surgery for Rhinitis & Sinusitis (Nasal Specialist)' },
        menus: [
          {
            id: 'endo-nasal',
            featured: true,
            name: {
              ja: '内視鏡下鼻腔手術（アレルギー性鼻炎・鼻中隔弯曲・下鼻甲介切除）',
              zh: '内镜下鼻腔手术（过敏性鼻炎·鼻中隔偏曲·下鼻甲切除）',
              en: 'Endoscopic Nasal Surgery (Allergic Rhinitis / Septal Deviation / Turbinate Reduction)',
            },
            effect: {
              ja: '重症の鼻炎・副鼻腔炎患者、CPAPが合わない方、短期滞在で完治を目指す国内外の患者に対応。出血や痛みを極限まで抑えた日帰り手術で、短期離脱でのQOL劇的向上を実現します。',
              zh: '适用于重症鼻炎·副鼻腔炎患者、无法适应CPAP的患者，以及希望在短期内实现痊愈的国内外患者。通过将出血和疼痛控制至极低水平的日间手术，实现短期内生活质量的显著提升。',
              en: 'Designed for patients with severe rhinitis or sinusitis, those unable to tolerate CPAP, and international visitors seeking definitive cure within a short stay. Same-day surgery with minimal bleeding and pain dramatically improves QOL in a short recovery period.',
            },
            clinicIds: ['yahata', 'carproad', 'heiwa'],
            price: null,
          },
          {
            id: 'ess',
            featured: false,
            name: {
              ja: '内視鏡下副鼻腔手術（ESS）',
              zh: '内镜下副鼻腔手术（ESS）',
              en: 'Endoscopic Sinus Surgery (ESS)',
            },
            effect: {
              ja: '慢性副鼻腔炎（蓄膿症）に対する低侵襲手術。内視鏡を用いて副鼻腔の病変を除去し、長年悩んできた鼻詰まり・頭痛・においの低下を根本から改善します。',
              zh: '针对慢性副鼻腔炎（蓄脓症）的微创手术。使用内镜去除副鼻腔病变，从根本上改善长期困扰您的鼻塞、头痛和嗅觉减退问题。',
              en: 'Minimally invasive surgery for chronic sinusitis (empyema). Endoscopic removal of sinus pathology provides permanent relief from years of nasal congestion, headaches, and reduced sense of smell.',
            },
            clinicIds: ['yahata', 'carproad', 'heiwa'],
            price: null,
          },
        ],
      },
      {
        id: 'ent-comprehensive',
        num: '4-2',
        title: { ja: '耳・鼻・喉の総合専門日帰り手術', zh: '耳鼻喉综合专科日间手术', en: 'Comprehensive Same-Day ENT Surgery' },
        menus: [
          {
            id: 'snoring',
            featured: true,
            name: {
              ja: 'いびき・睡眠時無呼吸症候群 手術（UPPP等）',
              zh: '打鼾·睡眠呼吸暂停综合征手术（UPPP等）',
              en: 'Snoring & Sleep Apnea Surgery (UPPP, etc.)',
            },
            effect: {
              ja: '口蓋垂口蓋咽頭形成術（UPPP）などにより、気道を広げていびき・睡眠時無呼吸を根本治療。CPAPからの脱却を目指す患者に最適です。',
              zh: '通过悬雍垂腭咽成形术（UPPP）等手术扩宽气道，对打鼾和睡眠呼吸暂停进行根治。是希望摆脱CPAP治疗的患者的最佳选择。',
              en: 'UPPP (Uvulopalatopharyngoplasty) and related procedures widen the airway for definitive snoring and sleep apnea treatment. Ideal for patients seeking to discontinue CPAP therapy.',
            },
            clinicIds: ['sakaguchi'],
            price: null,
          },
          {
            id: 'tonsil-ear',
            featured: false,
            name: {
              ja: '扁桃腺手術 / 中耳炎手術（鼓膜形成等）',
              zh: '扁桃体手术 / 中耳炎手术（鼓膜修复等）',
              en: 'Tonsillectomy / Otitis Media Surgery (Tympanoplasty, etc.)',
            },
            effect: {
              ja: '耳から喉まで網羅する高度な日帰り手術。繰り返す扁桃炎や慢性中耳炎に対し、低侵襲で高精度な手術を提供します。',
              zh: '涵盖从耳到喉的高级日间手术。针对反复发作的扁桃炎和慢性中耳炎，提供微创且高精度的手术治疗。',
              en: 'Advanced same-day surgery covering the full ENT spectrum. Minimally invasive, high-precision procedures for recurrent tonsillitis and chronic otitis media.',
            },
            clinicIds: ['sakaguchi'],
            price: null,
          },
          {
            id: 'ent-general',
            featured: false,
            name: {
              ja: 'その他 耳鼻咽喉科全般（外来・内科的治療）',
              zh: '其他耳鼻喉科综合（门诊·内科治疗）',
              en: 'General ENT Outpatient & Medical Treatment',
            },
            effect: {
              ja: '鼻炎・花粉症・めまい・難聴・声帯疾患など、耳鼻咽喉科全般の診療。海外でなかなか受けられない専門的な診断と治療を提供します。',
              zh: '鼻炎、花粉症、眩晕、听力障碍、声带疾病等耳鼻喉科全科诊疗。提供在海外难以获得的专业诊断和治疗。',
              en: 'Full-spectrum ENT outpatient care including rhinitis, hay fever, vertigo, hearing loss, and vocal cord conditions — specialist diagnosis and treatment difficult to access overseas.',
            },
            clinicIds: ['sakaguchi', 'yahata', 'carproad', 'heiwa'],
            price: null,
          },
        ],
      },
    ],
  },
];

/* ── Clinic Directory Layout ────────────────────────────── */
/* カテゴリー構成・表示順をデータで制御。                      */
/* renderer.js はこの構造に従って描画するだけ。                 */
const CLINIC_DIRECTORY = {
  categories: [
    {
      id:  'dir-aesthetic',
      num: '01',
      title: {
        ja: '美容・再生医療',
        zh: '美容·再生医疗',
        en: 'Aesthetic & Regenerative Medicine',
      },
      /* 先頭 = CoCoセルクリニック (primary / メイン扱い) */
      clinicIds: ['coco', 'r-shoto', 'riseling', 'tenjin'],
    },
    {
      id:  'dir-checkup',
      num: '02',
      title: {
        ja: '精密健診・女性医療',
        zh: '精密健诊·女性医疗',
        en: "Precision Checkup & Women's Health",
      },
      /* ルナクリニック単独 */
      clinicIds: ['luna'],
    },
    {
      id:  'dir-ent',
      num: '03',
      title: {
        ja: '耳鼻咽喉科・機能改善',
        zh: '耳鼻喉科·功能改善',
        en: 'ENT & Functional Medicine',
      },
      /* 先頭 = 坂口耳鼻咽喉科、続いてさんか系3院 */
      clinicIds: ['sakaguchi', 'yahata', 'carproad', 'heiwa'],
    },
  ],
};
