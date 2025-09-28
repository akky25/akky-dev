# SEO実装チェックリスト

## 実装確認

- [x] `NEXT_PUBLIC_SITE_URL` 環境変数設定
  - `.env.local` に設定済み
  - `.env.production` に設定済み
  - `.env.example` にテンプレート作成済み
- [x] Metadata API の `metadataBase` 設定
  - `app/layout.tsx` に実装済み
- [x] sitemap.xml 生成
  - `app/sitemap.ts` 作成済み
  - ドラフト記事の除外処理実装済み
- [x] robots.txt 生成
  - `app/robots.ts` 作成済み
- [x] JSON-LD（Article）実装
  - `components/seo/article-json-ld.tsx` 作成済み
  - 記事ページに組み込み済み

## ローカル検証

開発サーバーを起動して以下を確認：

```bash
pnpm dev
```

- [ ] http://localhost:3000/sitemap.xml アクセス確認
- [ ] http://localhost:3000/robots.txt 表示確認
- [ ] ドラフト記事の除外確認（本番環境の場合）
- [ ] JSON-LD 構造化データ確認（DevTools で確認）
  - ページソースで `<script type="application/ld+json">` タグを確認
- [ ] メタタグが正しく設定されている（DevTools の Elements タブで確認）

## デプロイ後検証

本番環境デプロイ後に以下のツールで検証：

- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results)
  - 記事ページの URL を入力
  - Article 構造化データが認識されることを確認
- [ ] [Twitter Card Validator](https://cards-dev.twitter.com/validator)
  - 記事ページの URL を入力
  - プレビューが正しく表示されることを確認
- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - 記事ページの URL を入力
  - OGP 情報が正しく取得されることを確認
- [ ] サイトマップのインデックス確認
  - Google Search Console でサイトマップを送信
  - インデックス状況を確認

## コマンド一覧

### ビルド確認

```bash
# ビルドを実行
pnpm build

# ビルド後のプレビュー
pnpm start
```

### SEO エンドポイント確認

```bash
# サイトマップ確認
curl http://localhost:3000/sitemap.xml

# robots.txt 確認
curl http://localhost:3000/robots.txt

# メタタグ確認（HTML ヘッダー部分を取得）
curl -s http://localhost:3000/blog/getting-started | head -50
```

## トラブルシューティング

### 環境変数が読み込まれない場合

1. `.env.local` ファイルが存在することを確認
2. `NEXT_PUBLIC_` プレフィックスが付いていることを確認
3. 開発サーバーを再起動

### サイトマップにドラフト記事が含まれる場合

1. `NEXT_PUBLIC_SHOW_DRAFTS` が `false` に設定されていることを確認
2. 本番ビルド（`pnpm build`）で確認

### OGP 画像が表示されない場合

1. `/og/[slug]` ルートが実装されていることを確認（今後の実装予定）
2. メタデータの images URL が正しいことを確認