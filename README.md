# Save the Dogs Chi-Town

Draft website for the Chicago chapter of the campaign to end the breeding and use of dogs in laboratories.

Live in this repo: the Chi-Town Promise, events, volunteer and email signup, a donate button ready for the official fundraising URL, Learn, gallery, Illinois facility map, and the Promise Pack ticker.

## Run it

```bash
npm install
npm run dev
```

Opens on port 8080.

```bash
npm run build
npm run preview
```

## Board notes

- **Donate** is on the site. Paste the official fundraising URL into `org.donate` in `src/lib/content.ts` when it is live. Do not use the old GoFundMe.
- Volunteer, Promise, and event-note signups currently save on the visitor's device. Swap those saves for the chapter's list tool when it exists.
- Two board seats are unpublished on purpose. Add names in `src/lib/content.ts` when they are ready.

## Stack

TanStack Start, React 19, Tailwind v4.
