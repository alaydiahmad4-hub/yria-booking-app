import { describe, it, expect } from 'vitest';
import i18n from '../../src/i18n';

describe('i18n Multi-language System', () => {
  it('initializes with Arabic (ar) by default', () => {
    expect(i18n.language).toMatch(/^ar/);
  });

  it('translates brand and navigation terms into Arabic correctly', () => {
    i18n.changeLanguage('ar');
    expect(i18n.t('brand.name')).toBe('سيران سوريا');
    expect(i18n.t('nav.explore')).toBe('الرئيسية والاستكشاف');
    expect(i18n.t('nav.hotels')).toBe('فنادق دمشق');
    expect(i18n.t('nav.host')).toBe('بوابة المضيف السوري');
  });

  it('translates brand and navigation terms into English correctly', () => {
    i18n.changeLanguage('en');
    expect(i18n.t('brand.name')).toBe('Seyran Syria');
    expect(i18n.t('nav.explore')).toBe('Explore & Stays');
    expect(i18n.t('nav.hotels')).toBe('Damascus Hotels');
    expect(i18n.t('nav.host')).toBe('Syrian Host Portal');
  });

  it('provides host portal and notification keys in both languages', () => {
    i18n.changeLanguage('ar');
    expect(i18n.t('host.totalEarnings')).toBe('إجمالي الأرباح');
    expect(i18n.t('notifications.title')).toBe('مركز الإشعارات والتنبيهات');

    i18n.changeLanguage('en');
    expect(i18n.t('host.totalEarnings')).toBe('Total Earnings');
    expect(i18n.t('notifications.title')).toBe('Notifications & Alerts');
  });
});
