import { test, expect } from '@playwright/test';

test('document removal clears the upload and allows selecting the same file again', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Add Knowledge Source' }).click();
  await page.getByRole('dialog').getByLabel('Course Category', { exact: false }).selectOption('Technology');
  await page.getByLabel('Course Title', { exact: false }).selectOption('c9');
  await page.getByRole('radio', { name: 'Upload document' }).check();
  const input = page.getByLabel('Knowledge document');
  const file = { name: 'excel.txt', mimeType: 'text/plain', buffer: Buffer.from('Excel formulas calculate totals.') };
  await input.setInputFiles(file);
  await page.getByRole('button', { name: 'Remove document' }).click();
  await expect(input).toHaveValue('');
  await expect(page.getByRole('button', { name: 'Remove document' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Save as Draft' }).click();
  await expect(page.getByRole('alert')).toContainText('Upload one knowledge document');
  await input.setInputFiles(file);
  await page.getByRole('button', { name: 'Save as Draft' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  const row = page.getByRole('row').filter({ hasText: 'Excel for Analysts' });
  await row.getByRole('button', { name: 'Edit source', exact: true }).click();
  await page.getByRole('button', { name: 'Remove document' }).click();
  await page.getByRole('button', { name: 'Save Changes', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Upload one knowledge document');
  await page.screenshot({ path: 'test-results/source-form-document-removal.png' });
});
