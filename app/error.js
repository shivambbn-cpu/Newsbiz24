"use client";

export default function Error({ error, reset }) {
  console.error(error);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>⚠️ Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Retry</button>
    </div>
  );
    }
