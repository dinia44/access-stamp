export function formatKnownUnknowns(count: number): string {
  return `${count} ${count === 1 ? "known unknown" : "known unknowns"}`;
}
