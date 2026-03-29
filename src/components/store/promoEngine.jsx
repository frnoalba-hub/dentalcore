// Promo engine: evaluates cart items and returns applicable promotions
// Each promo returns a discount line with label + amount

import { products as catalog } from '../dentalcore/productsData';

// IDs that qualify for "Buy 2, Get 1 Free" (use sale price per unit)
const B2G1_IDS = new Set([
  'TH-001',    // Stronic Touch & Heat
  'A1004-V3',  // AirPeak Micro
  'A1009B',    // AirPeak G100-LA
  'A1012',     // AirPeak G100-ST
  'A1003',     // iTesla G600-S
  'A1061',     // STRONIC X300 Air Scaler
  'A1658',     // AirPeak PRO200 Air Polisher
  'IPR-001',   // AirPeak Automatic IPR
  'M1042X',    // ModuLite X Curing Light
  'M1002',     // SureTact G3 Rings
]);

// AirPeak handpiece bundle: 3 handpieces + 1 coupler = $1,000
const AIRPEAK_BUNDLE_IDS = new Set(['A1004-V2', 'A1005']);

// SureTact Kit: Buy 2 Kits for $400
const SURETACT_KIT_ID = 'M1001';

export function calculatePromos(items) {
  const promos = [];

  // --- Buy 2, Get 1 Free ---
  // Group qualifying items, for every 3 units the cheapest is free
  const b2g1Items = items.filter(i => B2G1_IDS.has(i.id));
  b2g1Items.forEach(item => {
    const freeCount = Math.floor(item.quantity / 3);
    if (freeCount > 0) {
      const unitPrice = parsePrice(item.price);
      const discount = freeCount * unitPrice;
      promos.push({
        label: `Buy 2 Get 1 Free — ${item.name}`,
        discount,
        tag: 'B2G1',
      });
    }
  });

  // --- AirPeak 3+1 Coupler for $1,000 ---
  const airpeakItems = items.filter(i => AIRPEAK_BUNDLE_IDS.has(i.id));
  const totalAirpeakQty = airpeakItems.reduce((s, i) => s + i.quantity, 0);
  const bundles = Math.floor(totalAirpeakQty / 3);
  if (bundles > 0) {
    // Normal price per unit for these is the item price
    const normalPerBundle = airpeakItems.reduce((s, i) => {
      const unitPrice = parsePrice(i.price);
      const share = Math.min(i.quantity, bundles * 3) * unitPrice;
      return s + share;
    }, 0);
    // Bundle price is $1,000 per 3
    const bundleTotal = bundles * 1000;
    // However items already priced at $333.33, so 3 = $999.99, round the diff
    const rawTotal = bundles * 3 * 333.33;
    // Effectively coupler free — show as savings vs original $599 each
    const originalPerUnit = 599;
    const savings = bundles * (3 * originalPerUnit - 1000);
    if (savings > 0) {
      promos.push({
        label: `AirPeak™ 3 + Coupler Bundle ×${bundles}`,
        discount: 0, // price already reflects deal in catalog
        tag: 'BUNDLE',
        info: `Saves $${savings.toFixed(0)} vs retail`,
      });
    }
  }

  // --- SureTact Kit: 2 for $400 ---
  const kitItem = items.find(i => i.id === SURETACT_KIT_ID);
  if (kitItem && kitItem.quantity >= 2) {
    const pairs = Math.floor(kitItem.quantity / 2);
    const unitPrice = parsePrice(kitItem.price);
    const normalPairCost = pairs * 2 * unitPrice;
    const promoPairCost = pairs * 400;
    const discount = normalPairCost - promoPairCost;
    if (discount > 0) {
      promos.push({
        label: `SureTact G3 Kit — 2 for $400`,
        discount,
        tag: 'BUNDLE',
      });
    }
  }

  const totalDiscount = promos.reduce((s, p) => s + p.discount, 0);

  // --- Promo hints: items close to unlocking a deal ---
  const hints = [];

  // B2G1: if they have 1 or 2 of a qualifying item, hint to add more
  b2g1Items.forEach(item => {
    const remainder = item.quantity % 3;
    if (remainder > 0) {
      const needed = 3 - remainder;
      const unitPrice = parsePrice(item.price);
      hints.push({
        message: `Add ${needed} more ${item.name} to get 1 free (save $${unitPrice.toFixed(0)})`,
        action: { id: item.id, name: item.name, price: item.price, image: item.image, quantity: needed },
      });
    }
  });

  // B2G1: if they have items NOT yet in cart but ARE in B2G1 set, skip (too noisy)

  // AirPeak bundle: if they have 1 or 2 AirPeak handpieces, hint to add more
  if (totalAirpeakQty > 0 && totalAirpeakQty % 3 !== 0) {
    const needed = 3 - (totalAirpeakQty % 3);
    // Suggest the first AirPeak item in cart
    const sampleItem = airpeakItems[0];
    if (sampleItem) {
      hints.push({
        message: `Add ${needed} more AirPeak™ handpiece${needed > 1 ? 's' : ''} to unlock 3 + Coupler for $1,000`,
        action: { id: sampleItem.id, name: sampleItem.name, price: sampleItem.price, image: sampleItem.image, quantity: needed },
      });
    }
  }

  // SureTact Kit: if they have 1, hint to add another
  if (kitItem && kitItem.quantity % 2 !== 0) {
    hints.push({
      message: `Add 1 more SureTact G3 Kit to get 2 for $400`,
      action: { id: kitItem.id, name: kitItem.name, price: kitItem.price, image: kitItem.image, quantity: 1 },
    });
  }

  return { promos, totalDiscount, hints };
}

function parsePrice(price) {
  if (typeof price === 'number') return price;
  return parseFloat(String(price).replace(/[^0-9.]/g, '')) || 0;
}