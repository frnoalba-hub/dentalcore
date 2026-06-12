import { useEffect } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * WCAG dialog behavior for custom modals/drawers:
 * - moves focus into the dialog on open and restores it on close
 * - traps Tab / Shift+Tab inside the dialog
 * - closes on Escape
 *
 * The dialog element should also carry role="dialog", aria-modal="true",
 * an aria-label, and tabIndex={-1}.
 */
export function useDialogA11y(ref, isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const panel = ref.current;
    if (!panel) return undefined;

    const previouslyFocused = document.activeElement;
    const getFocusable = () =>
      Array.from(panel.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (el) => el.getClientRects().length > 0,
      );

    (getFocusable()[0] || panel).focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = getFocusable();
      if (items.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !panel.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [ref, isOpen, onClose]);
}
