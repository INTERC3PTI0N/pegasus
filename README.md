<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/6d27a5c2-af23-4b36-b211-d6f5be38e46b

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## Content management

Page copy, images, menus, journal articles and office locations are edited in the Pegasus
admin (Pegassus Dashboard → Website → Site content) and fetched by [lib/cms.ts](lib/cms.ts).
Set `CMS_URL` and `SITE_SECRET` (see `.env.example`). Pages are cached and refresh as soon
as the admin publishes (`/api/revalidate`), or within 5 minutes. If the admin is unreachable
the site falls back to [content/defaults.json](content/defaults.json). The brochure and
dealer/business forms send submissions to the admin's Enquiries inbox.
