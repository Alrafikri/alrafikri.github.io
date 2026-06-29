import { test, expect } from '@playwright/test';

test.describe('Portfolio pages', () => {
  test('home page loads with correct metadata', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Almas Rausan Fikri — Portfolio');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /Data engineer and analyst/
    );
  });

  test('hero section renders key elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.avatar')).toBeVisible();
    await expect(page.locator('.hero h1')).toBeVisible();
    await expect(page.locator('.tagline')).toBeVisible();
    await expect(page.locator('.bio')).toBeVisible();
    await expect(page.locator('.badge-row')).toBeVisible();
  });

  test('contact badges are links', async ({ page }) => {
    await page.goto('/');
    const badges = page.locator('.badge');
    await expect(badges.first()).toBeVisible();
    const count = await badges.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('navigation links are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.logo')).toBeVisible();
    await expect(page.locator('.site-nav')).toBeVisible();
  });
});

test.describe('Tab switching', () => {
  test('experience tab shows work entries by default', async ({ page }) => {
    await page.goto('/');
    const cvTabs = page.locator('.tab-group').first();
    await expect(cvTabs.locator('#tab-panel-0')).toBeVisible();
    await expect(cvTabs.getByText('HitPay')).toBeVisible();
  });

  test('clicking Education tab switches panel', async ({ page }) => {
    await page.goto('/');
    const cvTabs = page.locator('.tab-group').first();
    await cvTabs.locator('button').nth(1).click();
    await page.waitForTimeout(500);

    await expect(cvTabs.locator('#tab-panel-1')).toBeVisible();
    await expect(cvTabs.getByText('Universitas Gadjah Mada (UGM)').first()).toBeVisible();
  });

  test('Skills & Achievement tab shows tech stack', async ({ page }) => {
    await page.goto('/');
    const cvTabs = page.locator('.tab-group').first();
    await cvTabs.locator('button').nth(2).click();
    await page.waitForTimeout(500);

    await expect(cvTabs.locator('#tab-panel-2').getByText('Tech Stack')).toBeVisible();
    await expect(cvTabs.locator('#tab-panel-2').getByText('Data Engineering')).toBeVisible();
  });
});

test.describe('Project tabs', () => {
  test('AI Engineering project tab shows content', async ({ page }) => {
    await page.goto('/');
    const projectTabs = page.locator('.section-alt .tab-group button');
    await expect(projectTabs.first()).toBeVisible();
    await projectTabs.first().click();
    await page.waitForTimeout(500);

    const projectGroup = page.locator('.section-alt .tab-group');
    await expect(projectGroup.getByText('Prechat Screening Agent').first()).toBeVisible();
  });
});

test.describe('Blog and footer', () => {
  test('blog preview section exists', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Latest from the Blog')).toBeVisible();
    await expect(page.getByText('View all posts')).toBeVisible();
  });

  test('footer renders', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
  });
});

test.describe('404 page', () => {
  test('unknown route shows 404', async ({ page }) => {
    const response = await page.goto('/does-not-exist');
    expect(response?.status()).toBe(404);
  });
});

test.describe('Hero canvas (desktop)', () => {
  test('hero canvas exists on desktop width', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const canvas = page.locator('#hero-canvas');
    await expect(canvas).toBeAttached();
  });
});
