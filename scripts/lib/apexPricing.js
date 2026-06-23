/**
 * Coretix retail pricing rules vs Apex dealer sheet.
 *
 * - Promo / bundle SKUs: list at Apex *selling* (cart promos apply on top).
 * - All other singles: Apex selling × markup (default 10%), never below Apex selling.
 */
import * as XLSX from 'xlsx';
import fs from 'fs';

export const SINGLE_MARKUP = 1.1;

/** Cart promo qualifiers — keep Apex selling as list price (no +10%). */
export const PROMO_UNIT_IDS = new Set([
  // AirPeak 3 + coupler @ $1,000
  'A1004-V2',
  'A1005',
  'A1004-V3',
  // Buy 2 get 1 free (promoEngine)
  'TH-001',
  'A1009B',
  'A1012',
  'A1003',
  'A1061',
  'A1658',
  'IPR-001',
  'M1042X',
  'M1002',
  // SureTact 2 kits @ $400
  'M1001',
]);

/** SKUs priced manually — not driven by Apex selling column. */
export const MANUAL_PRICE_IDS = new Set([
  '1008-1', // EP Light Transilluminator — retail CSV $160
  'OS-SEAL-SYR',
  'OS-SEAL-PDR',
  'OS-SEAL-MEM',
  'OSTEO-PLUG',
  'HELI-1',
  'A1019',
  'A1619',
  'A1030',
]);

const APEX_XLSX =
  'C:/Users/sebas/OneDrive/Desktop/VC_CORE_HQ/05_Companies/Dental_Core_Supplies/_PRODUCT_HUB/Dental Core Files/docs/Apex_Dealer_Docs/Apexdent_price_list_11-11-25_dental_core.xlsx';

export function loadApexSheet() {
  const buf = fs.readFileSync(APEX_XLSX);
  const wb = XLSX.read(buf, { type: 'buffer' });
  const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
  const map = new Map();
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row?.[2]) continue;
    map.set(String(row[2]).trim(), {
      name: String(row[1] || ''),
      msrp: Number(row[3]) || 0,
      dealer: Number(row[4]) || 0,
      selling: Number(row[5]) || 0,
      remarks: String(row[6] || ''),
    });
  }
  return map;
}

/** Consumer-friendly rounding: ≥$50 → nearest .99 below next dollar when close. */
export function roundRetail(n) {
  if (!Number.isFinite(n) || n <= 0) return 0;
  if (n < 50) return Math.round(n * 100) / 100;
  const up = Math.ceil(n);
  const candidate = up - 0.01;
  if (candidate >= n) return candidate;
  return Math.round(n * 100) / 100;
}

export function retailFromApexRow(row, { isPromoUnit = false, markup = SINGLE_MARKUP } = {}) {
  const selling = row.selling || row.msrp || 0;
  if (!selling) return 0;
  if (isPromoUnit) return selling;
  return roundRetail(Math.max(selling * markup, selling));
}

export function isPromoUnitId(id, hasPromoField = false) {
  return hasPromoField || PROMO_UNIT_IDS.has(String(id).trim());
}
