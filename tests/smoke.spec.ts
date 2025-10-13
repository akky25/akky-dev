import { expect, type Page, test } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('トップページが表示される', async ({ page }) => {
    await page.goto('/');

    // h1 見出しが表示されることを確認
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('ブログ一覧ページが表示される', async ({ page }) => {
    await page.goto('/blog');

    // ページタイトルに "blog" が含まれることを確認
    await expect(page).toHaveTitle(/blog/i);

    // ブログ記事へのリンクが存在することを確認
    const articleLinks = page.getByRole('link').filter({ hasText: /.*/ });
    await expect(articleLinks.first()).toBeVisible();
  });

  test('ブログ一覧→記事詳細への遷移', async ({ page }) => {
    await page.goto('/blog');

    // 最初の記事リンクを取得してクリック
    const firstArticleLink = page
      .getByRole('link')
      .filter({ has: page.getByRole('heading') })
      .first();
    await expect(firstArticleLink).toBeVisible();
    await firstArticleLink.click();

    // 記事詳細ページに遷移していることを確認
    await expect(page).toHaveURL(/\/blog\/.+/);
  });

  test('記事詳細ページが正しく表示される', async ({ page }) => {
    // 既知の記事スラッグで直接アクセス
    await page.goto('/blog/index');

    // ページが完全に読み込まれるまで待機
    await page.waitForLoadState('networkidle');

    // 記事タイトルが表示されることを確認
    const articleTitle = page.getByRole('heading', {
      name: 'Markdown構文ガイド - 完全版',
    });
    await expect(articleTitle).toBeVisible();

    // "ブログに戻る" リンクが表示されることを確認
    const backLink = page.getByRole('link', { name: /ブログに戻る/ });
    await expect(backLink).toBeVisible();
  });

  test('記事詳細ページのビジュアルリグレッションテスト', async ({ page }) => {
    // 既知の記事スラッグで直接アクセス
    await page.goto('/blog/index');

    // ページが完全に読み込まれるまで待機
    await page.waitForLoadState('networkidle');

    // VRT: ページ全体のスクリーンショットを取得して比較
    await expect(page).toHaveScreenshot('blog-article-detail.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('記事詳細ページのビジュアルリグレッションテスト（モバイル）', async ({
    page,
  }) => {
    // モバイルビューポートサイズに設定（iPhone 12 相当）
    await page.setViewportSize({ width: 390, height: 844 });

    // 既知の記事スラッグで直接アクセス
    await page.goto('/blog/index');

    // ページが完全に読み込まれるまで待機
    await page.waitForLoadState('networkidle');

    // VRT: モバイル表示のスクリーンショットを取得して比較
    await expect(page).toHaveScreenshot('blog-article-detail-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('記事詳細ページのビジュアルリグレッションテスト（ダークモード）', async ({
    page,
  }) => {
    // 既知の記事スラッグで直接アクセス
    await page.goto('/blog/index');

    // ページが完全に読み込まれるまで待機
    await page.waitForLoadState('networkidle');

    // ダークモードに切り替え（HTML要素にdarkクラスを追加）
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });

    // テーマ変更後の再レンダリングを待つ
    await page.waitForTimeout(500);

    // VRT: ダークモード表示のスクリーンショットを取得して比較
    await expect(page).toHaveScreenshot('blog-article-detail-dark.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('記事詳細ページのビジュアルリグレッションテスト（モバイル・ダークモード）', async ({
    page,
  }) => {
    // モバイルビューポートサイズに設定（iPhone 12 相当）
    await page.setViewportSize({ width: 390, height: 844 });

    // 既知の記事スラッグで直接アクセス
    await page.goto('/blog/index');

    // ページが完全に読み込まれるまで待機
    await page.waitForLoadState('networkidle');

    // ダークモードに切り替え（HTML要素にdarkクラスを追加）
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });

    // テーマ変更後の再レンダリングを待つ
    await page.waitForTimeout(500);

    // VRT: モバイル・ダークモード表示のスクリーンショットを取得して比較
    await expect(page).toHaveScreenshot('blog-article-detail-mobile-dark.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});
