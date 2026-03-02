/**
 * Wraps a dynamic import with retry + cache-bust logic to handle stale chunks
 * after deploys (e.g. "Failed to fetch dynamically imported module").
 */
export function lazyRetry<T extends { default: React.ComponentType<any> }>(
  importFn: () => Promise<T>,
  retries = 1
): Promise<T> {
  return importFn().catch((error) => {
    if (retries > 0 && error.message?.includes("dynamically imported module")) {
      // Force a full page reload to get the new manifest
      window.location.reload();
    }
    throw error;
  });
}
