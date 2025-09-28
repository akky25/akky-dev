# 独自ブログアプリ 初期構築手順 & マイルストーン（コードなし v1.0）

最終更新: 2025-09-27 / タイムゾーン: Asia/Tokyo

---

## 0. スコープ / 前提

* **対象スタック**: pnpm、Next.js（App Router）、Tailwind CSS、shadcn/ui、MDX、Velite + Zod、Vercel。
* **目的**: 型安全かつシンプル運用のブログ基盤を短期間で公開（MVP）。
* **非ゴール**: 検索、i18n、ビルド時間最適化、PWA/Newsletter 等の拡張。

---

## 1. 初期構築フロー（自然言語）

**全体像**: ローカル環境整備 → 雛形作成 → コンテンツ層（Velite + Zod） → MDX/表示体験 → ルーティングと静的生成 → SEO/配信 → OGP 生成 → 品質/CI → Vercel デプロイ。

### 1.1 環境準備

* Node.js 20+ と pnpm を用意する。
* 空の GitHub リポジトリを作成し、`main` を既定ブランチにする。
* Issue/PR テンプレートは任意（後の運用を見越して用意しておくと良い）。

### 1.2 Next.js 雛形 & Tailwind

* Next.js プロジェクトを App Router & TypeScript で生成する。
* Tailwind を組み込み、`@tailwindcss/typography` を追加する。
* ダークモードは `class` 戦略で切替（`<html class="dark">` を想定）。
* 記事本文に `.prose` クラスを適用する方針を決める。

### 1.3 shadcn/ui の導入

* shadcn/ui を初期化し、最低限のコンポーネント（Button、Card、Typography など）を追加する。
* トークン（色/半径/影）と Tailwind 側の設定の整合性を確認する。

### 1.4 MDX とプラグイン

* MDX を Next.js に組み込み、以下の目的でプラグインを設定する。

  * **remark-gfm**: テーブル/脚注等の拡張を有効化。
  * **rehype-slug / rehype-autolink-headings**: 見出しに ID と自動リンクを付与。
  * **rehype-pretty-code（Shiki）**: コードブロックを美しく表示。ダーク/ライトで違和感が出ない設計にする。
  * **カスタム rehype（画像）**: MDX の画像表現を `next/image` に統一する。

### 1.5 コンテンツ層（Velite + Zod）

* Frontmatter のスキーマ項目を確定する（タイトル、説明、公開日、更新日、タグ、ドラフト、カバー画像）。
* Velite で `content/posts/**/*.mdx` をコレクションとして定義し、ビルド時に `.velite/` 配下へ型付きインデックスを出力する。
* スラッグはファイルパスから自動算出する（ファイル名から拡張子を除いた文字列）。
* 記事ファイルは `YYYY-MM-DD-title.mdx` の命名規則に統一し、画像等は `content/assets/` に保存する。
* `draft: true` の記事は一覧・サイトマップから除外する運用にする。

### 1.6 ルーティング & 生成

* 一覧 `/blog` と詳細 `/blog/[slug]` を用意する。
* 静的サイト生成（SSG）を基本とし、記事は Git で管理・デプロイで反映する。
* 生成対象スラッグはコンテンツ索引（Velite 出力）から取得する。

### 1.7 SEO / 配信の最小構成

* Next.js Metadata API を基盤に、記事ごとにタイトル/説明/OG/Twitter を生成する。
* ルートレベルで `metadataBase` を環境変数（`NEXT_PUBLIC_SITE_URL`）から確立する。
* `sitemap.xml` と `robots.txt` を用意し、記事のみを列挙する（ドラフトを含めない）。
* 記事ページに **JSON-LD（Article）** を埋め込み、検索エンジンへの理解を補助する。

### 1.8 OGP 自動生成

* `next/og` を用い、`/og/[slug]` の動的ルートで OGP 画像を生成する。
* 長いタイトルの改行やマージン、フォント埋め込みの扱いに注意する。

### 1.9 品質保証 / CI（最小）

* **Biome** でフォーマットと Lint を実行する。
* **remark-lint** で Markdown/MDX の基本品質を担保する。
* **Playwright** でトップ表示・記事表示のスモークテストを 2〜3 本用意する。
* **GitHub Actions** で、インストール → Lint → ビルド → E2E の最小パイプラインを組む。

### 1.10 Vercel デプロイ

* GitHub リポジトリを Vercel に接続する。
* `NEXT_PUBLIC_SITE_URL` を Production/Preview で設定する。
* `main` へのマージで自動デプロイされることを確認する。
* デプロイ後、トップ、一覧、記事、OGP、`/sitemap.xml` を目視で確認する。

---

## 2. マイルストーン計画（MVP → 公開）

**期間目安**: 個人開発で 1〜2 週間。

| ID | タイトル       | 目的        | 主な成果物                                | 終了判定                       | 目安    |
| -- | ---------- | --------- | ------------------------------------ | -------------------------- | ----- |
| M0 | キックオフ/雛形   | 足場作り      | リポジトリ、Next.js 雛形、Tailwind 反映         | ローカルでトップ表示                 | 0.5 日 |
| M1 | コンテンツ層確立   | 型安全な記事取得  | Velite 設定、Post スキーマ、サンプル記事           | ビルドで `.velite` 生成、一覧に記事が出る | 1 日   |
| M2 | 表示体験（MDX）  | 読みやすさ向上   | 見出しリンク、GFM、コードハイライト、画像最適化            | サンプル記事で視認確認                | 0.5 日 |
| M3 | ルーティング/SSG | 公開手前の骨格   | `/blog` 一覧、`/blog/[slug]` 詳細、静的生成    | すべて静的生成、404 なし             | 0.5 日 |
| M4 | SEO/配信     | 最低限の流入対策  | Metadata、sitemap、robots、JSON-LD       | 各エンドポイントが返る                | 0.5 日 |
| M5 | OGP 自動生成   | SNS 共有最適化 | `/og/[slug]` で静的画像生成                 | 代表記事で表示確認                  | 0.5 日 |
| M6 | 品質/CI      | 回帰防止      | Biome、remark-lint、Playwright、CI      | CI 緑、E2E 成功                | 0.5 日 |
| M7 | デプロイ       | 一般公開      | Vercel 連携、環境変数、初回公開                  | 公開 URL が安定                 | 0.5 日 |

---

## 3. MVP アクセプタンス基準

* トップ、一覧、記事詳細が表示できる（最低 1 記事）。
* OGP 画像が生成され、主要 SNS でプレビューが崩れない。
* sitemap が正しい URL を返し、ドラフトが含まれない。
* CI が緑（Lint/Build/E2E 最小セット）。
* Core Web Vitals の初期計測に致命的な問題がない（LCP/CLS の目安を満たす）。

---

## 4. 運用ルール

* 記事は PR で追加し、Lint とプレビュー確認を必須化する。
* 公開時に `draft` を `false` にし、公開後の微修正は `updated` を更新する。
* 画像は `content/assets/` に保存し、横幅 1200px 以上を推奨（OGP 兼用）。

---

## 5. 既知のリスク / 留意点

* **ビルド時間**: 記事が増えると時間が増大（今回は最適化対象外）。
* **Velite の API 変更**: 新しめのエコシステムのため、バージョン固定を推奨。
* **OGP フォント/文字詰め**: 日本語長文タイトルの見切れ・禁則処理に注意。
* **アクセシビリティ**: 見出し階層、コントラスト、代替テキスト運用を明文化。

---

## 6. タイムライン例（個人 10 営業日想定）

* **Day 1**: M0（雛形作り、UI 基本確認）
* **Day 2–3**: M1（Velite + スキーマ、サンプル記事）
* **Day 4**: M2（MDX UX）
* **Day 5**: M3（ルーティング/SSG）
* **Day 6**: M4（SEO/配信）
* **Day 7**: M5（OGP）
* **Day 8**: M6（品質/CI）
* **Day 9–10**: M7（デプロイ、本番動作確認、微調整）

---

## 7. 完了後チェックリスト

* 公開 URL で OGP プレビューが想定どおり表示される。
* 検索結果のインデックスに関する初期状態が適切（noindex が不要に付いていない）。
* 記事テンプレート（frontmatter の雛形）が用意されている。
* 次の 3 本分のネタを Issue 化してある（継続性確保）。

---

## 付録 A: 依存コンポーネント一覧（参照用）

* アプリ: Next.js、React、Tailwind CSS、shadcn/ui、`@tailwindcss/typography`。
* コンテンツ/型: Velite、Zod、MDX 周辺（remark/rehype、pretty-code、Shiki）。
* 品質/CI: Biome、remark-lint、Playwright、GitHub Actions。
* 配信/その他: Vercel、Next Metadata API、JSON-LD。
