import { getServerMessage } from "./actions";

export default async function Home() {
  const message = await getServerMessage();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Next.js 16.1 Rush.js Pino Symlink Repro</h1>
      <p>Server message: {message}</p>
      <p>This app uses @repo/logger which exports pino.</p>
      <p>
        In Next.js 16.1, pino is automatically added to serverExternalPackages,
        which creates a symlink that causes issues with Rush.js caching.
      </p>
    </main>
  );
}
