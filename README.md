This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing

```bash
npm run test
```

## Notes

- This was created using Next.js, Tailwind, and Jest.
- Non "available" files should be disabled. This included disbling hover states and ability to toggle due to UX considerations
- Jest was used for testing to ensure requirements are met programatically
- The table was broken into reusable components where logical based on repeated elements. In the event of a component library, these would have been more genaric following a similar pattern to [Shadcn](https://ui.shadcn.com/docs/components/table) (built on Radix). Where each element of a table are componentized. For single use of an element a component was not created for this purpose.
