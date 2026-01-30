# Next.js 16.1 + Rush.js Pino Symlink Caching Issue

This repository reproduces an issue where Next.js 16.1 creates a symlink for `pino` that breaks Rush.js build caching.

## The Problem

Next.js 16.1 automatically detects `pino` in your dependencies and adds it to `serverExternalPackages`. During build, it creates a symlink:

```
.next/node_modules/pino-<hash> -> ../../../../common/temp/node_modules/.pnpm/pino@x.x.x/node_modules/pino
```

This causes two issues with Rush.js:

1. **Build cache cannot include the symlink** - Rush warns: `Unable to include ".next/node_modules/pino-..." in build cache. It is a symbolic link.`

2. **Cache restoration fails** - Even if the symlink were cached, the target path points into Rush's `common/temp` folder which may not exist or have the same structure on other machines.

## Repository Structure

```
├── apps/web/                    # Next.js 16.1 app
│   └── src/app/actions.ts       # Server action using @repo/logger
├── libraries/logger/            # Library exporting pino logger
│   └── src/index.ts
└── common/config/rush/          # Rush configuration with caching enabled
```

## Reproduction Steps

1. Install dependencies:

   ```bash
   npx @microsoft/rush update
   ```

2. Build with caching:

   ```bash
   npx @microsoft/rush build --verbose
   ```

3. Observe the warning:
   ```
   Unable to include ".next/node_modules/pino-2dc6f539681c602d" in build cache. It is a symbolic link.
   ```

## Related

- Next.js automatically adds certain packages, such as `pino`, to `serverExternalPackages`: https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages
