# Access Stamp

Access Stamp is a Next.js app for accessible venue search, disability advice guides, and an Access Stamp AI assistant.

## The Folder to Use

Use this folder as the project root:

```sh
access-stamp-clean
```

This is the cleaned project folder. The duplicate source folders, local build output, installed dependencies, zip archives, and desktop metadata have been removed from the parent folder.

## Run Locally

```sh
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Check Before Uploading

```sh
npm run lint
npm run build
```

## Deploy on Vercel

Upload or push the contents of `access-stamp-clean` as the project root. Vercel should detect it as a Next.js app automatically.

Do not upload `node_modules`, `.next`, `.DS_Store`, or old zip backups.
