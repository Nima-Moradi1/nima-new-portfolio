// Also used by Liara before it sends traffic to a new release.
async function check() {
  const origin = `http://127.0.0.1:${process.env.PORT || 3000}`;
  for (const path of ["/api/health", "/fa"]) {
    const response = await fetch(`${origin}${path}`, {
      signal: AbortSignal.timeout(4000),
      redirect: "error",
    });
    if (response.status !== 200) throw new Error(`${path}: ${response.status}`);
    await response.arrayBuffer();
  }
}

check().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
