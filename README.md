# AHT Studio website
1. Put this folder on GitHub (github.com > New repository > "uploading an existing file").
2. vercel.com > Add New > Project > import the repo > Deploy.
3. In the Vercel project: Storage > Create > Blob > connect to the project.
4. Settings > Environment Variables: add ADMIN_PASSWORD (required) and optionally the NEXT_PUBLIC_* values from .env.example. Then Deployments > Redeploy.
5. Open yoursite.com/admin, log in, upload videos and photos. They go live instantly.
6. Search Console: add your domain, then submit yoursite.com/sitemap.xml.
Local run: copy .env.example to .env.local, then npm install && npm run dev (uploads need the Blob token from Vercel).
