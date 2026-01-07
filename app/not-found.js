export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: 20
    }}>
      <h1 style={{ fontSize: 48 }}>404</h1>
      <p style={{ fontSize: 18 }}>Page not found</p>
      <a href="/" style={{ color: "#16a34a", marginTop: 10 }}>
        Go to Home
      </a>
    </div>
  );
}
