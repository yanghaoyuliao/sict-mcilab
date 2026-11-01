/** Shared by the deployed website and the self-contained review HTML. */
declare global {
  interface Window {
    __MCI_ASSETS?: Record<string, string>;
  }
}
export function asset(path: string): string {
  return window.__MCI_ASSETS?.[path] ?? `${import.meta.env.BASE_URL}${path}`;
}
