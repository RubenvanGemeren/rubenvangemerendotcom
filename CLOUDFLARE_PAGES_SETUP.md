# Cloudflare Pages Setup for Automatic Git Deployments

This guide will help you configure Cloudflare Pages to automatically deploy your Next.js app with dynamic pages and API routes from your Git repository.

## Prerequisites

✅ Your code is already configured with:
- Next.js 15.5.2 (compatible with Cloudflare adapter)
- `@cloudflare/next-on-pages` adapter installed
- Build script configured: `"build": "next build && npx @cloudflare/next-on-pages"`

## Step 1: Connect Your Git Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Click **Connect to Git**
4. Select your Git provider (GitHub, GitLab, or Bitbucket)
5. Authorize Cloudflare to access your repositories
6. Select your repository (`personal_website`)

## Step 2: Configure Build Settings

In the **Build configuration** section:

### Build Settings:
- **Framework preset**: `Next.js` (or leave as "None")
- **Build command**: `npm run build`
- **Build output directory**: `.vercel/output/static`

### Root directory:
- Leave empty (or set to `/` if your project is in the root)

## Step 3: Configure Environment Variables

Click **Save and Deploy**, then go to **Settings** → **Environment variables** and add:

### Required Variables:
```
MONGODB_CONNECTION_STRING=<your-mongodb-connection-string>
```
OR (if using separate credentials):
```
DB_ADMIN_USERNAME=<your-username>
DB_ADMIN_PASSWORD=<your-password>
MONGODB_CLUSTER=rubenvangemerendotcom-cluster
MONGODB_DATABASE=github_stats
```

### GitHub API Variables:
```
GITHUB_USERNAME=<your-github-username>
GITHUB_TOKEN=<your-github-token>
GITHUB_PRIVATE_OWNER=<private-repo-owner> (optional)
GITHUB_PRIVATE_REPO=<private-repo-name> (optional)
```

### Sync Code:
```
SYNC_CODE=<your-sync-password>
```

**Important:** Add these for **Production**, and optionally for **Preview** environments.

## Step 4: Enable Node.js Compatibility

1. Go to **Settings** → **Functions**
2. Enable **Compatibility flags**
3. Add: `nodejs_compat`

This is required for MongoDB and other Node.js features to work.

## Step 5: Deploy

1. Click **Save and Deploy**
2. Cloudflare will:
   - Clone your repository
   - Run `npm install`
   - Run `npm run build` (which runs the adapter)
   - Deploy to Cloudflare Pages

## Step 6: Verify Deployment

After deployment completes:

1. Visit your Cloudflare Pages URL
2. Test static pages: `/`, `/about`, `/projects`
3. Test dynamic page: `/github` (should load with data)
4. Test API routes: `/api/github/stats?dateRange=week`

## Automatic Deployments

Once configured, Cloudflare Pages will automatically:
- ✅ Deploy on every push to your main branch
- ✅ Create preview deployments for pull requests
- ✅ Rebuild when you update environment variables

## Troubleshooting

### Build Fails
- Check build logs in Cloudflare dashboard
- Verify Node.js version (should be 18+)
- Ensure all environment variables are set

### API Routes Not Working
- Verify `nodejs_compat` flag is enabled
- Check that MongoDB connection string is correct
- Review function logs in Cloudflare dashboard

### Pages Not Found
- Verify build output directory is `.vercel/output/static`
- Check that adapter ran successfully (look for `@cloudflare/next-on-pages` in build logs)

### Database Connection Errors
- Verify MongoDB Atlas allows connections from Cloudflare IPs
- Check MongoDB connection string format
- Ensure environment variables are set for Production environment

## Custom Domain

To use your custom domain:

1. Go to **Custom domains** in your Pages project
2. Add your domain
3. Follow DNS configuration instructions
4. Cloudflare will automatically configure SSL

## Monitoring

- **Analytics**: View in Cloudflare dashboard
- **Logs**: Check **Functions** → **Logs** for API route logs
- **Builds**: View build history and logs in **Deployments**

## Next Steps

1. Push your code to Git
2. Configure Cloudflare Pages as above
3. Your site will auto-deploy on every commit! 🚀

