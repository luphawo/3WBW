"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ fontFamily: "monospace", padding: "2rem", background: "#1a1a1a", color: "#fff" }}>
        <h2 style={{ color: "#f87171" }}>Runtime Error</h2>
        <pre style={{ background: "#2a2a2a", padding: "1rem", borderRadius: "8px", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
          {error?.message}
          {"\n\n"}
          {error?.stack}
        </pre>
        <button onClick={reset} style={{ marginTop: "1rem", padding: "0.5rem 1rem", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Try again
        </button>
      </body>
    </html>
  );
}
