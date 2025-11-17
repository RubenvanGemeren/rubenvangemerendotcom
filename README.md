# Personal Portfolio Website

A modern, data-driven portfolio website for a senior software engineer specializing in distributed systems and large-scale data processing. Built with Next.js, TypeScript, Tailwind CSS, and featuring a claymorphism design aesthetic.

## Features

- **Modern Tech Stack**: Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Claymorphism Design**: Soft cards with rounded corners, gentle shadows, and subtle gradients
- **Data-Driven Content**: All content loaded from JSON files for easy updates
- **Interactive Charts**: Recharts integration for visualizing project metrics
- **Smooth Animations**: Framer Motion for subtle page transitions and interactions
- **Fully Responsive**: Mobile-friendly with desktop-optimized layouts
- **Type-Safe**: Strict TypeScript with no `any` types

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
personal_website/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with theme CSS variables
│   ├── page.tsx           # Home page
│   ├── projects/          # Projects routes
│   ├── experience/        # Experience page
│   └── about/             # About page
├── components/            # Reusable React components
│   ├── Layout.tsx         # Main layout wrapper
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer with links
│   ├── ClayCard.tsx       # Claymorphism card component
│   ├── ProjectCard.tsx    # Project card component
│   ├── MetricChart.tsx    # Recharts wrapper
│   └── ...
├── config/                # Configuration files
│   └── theme.ts           # Theme configuration
├── data/                  # JSON content files
│   ├── profile.json       # Profile information
│   ├── experience.json    # Work experience
│   ├── education.json     # Education history
│   └── projects/          # Individual project files
├── lib/                   # Utility functions
│   └── content.ts         # Content loading helpers
└── types/                 # TypeScript type definitions
    └── content.ts         # Content type definitions
```

## Content Management

All content is stored in JSON files in the `data/` directory. This makes it easy to update your portfolio without touching component code.

### Profile (`data/profile.json`)

```json
{
  "name": "Your Name",
  "title": "Senior Software Engineer",
  "tagline": "Distributed Systems & Data Platforms",
  "summary": "Your professional summary...",
  "links": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "email": "your.email@example.com"
  }
}
```

### Experience (`data/experience.json`)

Array of work experience entries:

```json
[
  {
    "company": "Company Name",
    "role": "Senior Software Engineer",
    "location": "City, State",
    "startDate": "2021-03",
    "endDate": null,
    "current": true,
    "highlights": [
      "Achievement 1 with metrics",
      "Achievement 2 with impact"
    ],
    "tech": ["Kafka", "Kubernetes", "Go", "Python"]
  }
]
```

**Fields:**
- `company`: Company name
- `role`: Job title
- `location`: Location (city, state/country)
- `startDate`: Start date in YYYY-MM format
- `endDate`: End date in YYYY-MM format (null for current role)
- `current`: Boolean indicating if this is the current role
- `highlights`: Array of achievement descriptions (focus on metrics and impact)
- `tech`: Array of technologies used

### Education (`data/education.json`)

Array of education entries:

```json
[
  {
    "institution": "University Name",
    "degree": "M.S. Computer Science",
    "startDate": "2015-09",
    "endDate": "2017-06",
    "details": "Optional additional details"
  }
]
```

### Projects (`data/projects/*.json`)

One JSON file per project. Example:

```json
{
  "slug": "project-slug",
  "title": "Project Title",
  "subtitle": "Short subtitle",
  "tags": ["Distributed Systems", "Streaming"],
  "challenge": "What problem were you solving?",
  "approach": "How did you solve it?",
  "impact": "What was the impact? Include metrics.",
  "techStack": ["Kafka", "Kubernetes", "Go"],
  "metrics": {
    "label": "Latency (ms)",
    "before": 250,
    "after": 80,
    "unit": "ms"
  },
  "chartData": [
    { "label": "Before", "value": 250 },
    { "label": "After", "value": 80 }
  ],
  "featured": true
}
```

**Fields:**
- `slug`: URL-friendly identifier (used in `/projects/[slug]`)
- `title`: Project title
- `subtitle`: Short one-line description
- `tags`: Array of category tags
- `challenge`: Problem statement (1-2 sentences)
- `approach`: Technical approach (1-2 sentences)
- `impact`: Results and impact with metrics (1-2 sentences)
- `techStack`: Array of technologies used
- `metrics`: Optional before/after metrics object
- `chartData`: Optional array of data points for visualization
- `featured`: Boolean to show on homepage (max 3 featured)

### Adding New Content

1. **Add a new project**: Create a new JSON file in `data/projects/` following the structure above.

2. **Update experience**: Edit `data/experience.json` and add a new entry to the array.

3. **Update profile**: Edit `data/profile.json` with your information.

4. **Update education**: Edit `data/education.json` with your education history.

The site will automatically pick up changes on the next build or dev server restart.

## Theming

The theme is centralized in `config/theme.ts`. You can customize:

- **Colors**: Primary, secondary, accent, background, surface, text colors
- **Border Radius**: Card and button radius values
- **Shadows**: Claymorphism shadow definitions
- **Chart Colors**: Color palette for charts

### Customizing the Theme

1. Edit `config/theme.ts`:

```typescript
export const theme = {
  colors: {
    primary: "#6366f1",  // Change to your preferred color
    // ... other colors
  },
  // ... other theme values
};
```

2. The CSS variables are automatically injected in `app/layout.tsx` and used throughout the app via Tailwind classes.

### Tailwind Integration

The theme colors are available as Tailwind classes:
- `bg-primary`, `text-primary`, etc.
- `bg-surface`, `text-text-subtle`, etc.
- `rounded-card`, `rounded-button`
- `shadow-clay`, `shadow-clay-hover`

## Components

### Layout Components

- **Layout**: Wraps all pages with Header and Footer
- **Header**: Navigation header with active state links
- **Footer**: Footer with contact links

### UI Components

- **ClayCard**: Reusable card with claymorphism styling
- **Section**: Consistent spacing wrapper for page sections
- **Tag**: Small pill component for tech tags and categories
- **NavLink**: Navigation link with active state

### Content Components

- **ProjectCard**: Displays project summary with optional chart
- **MetricChart**: Wrapper around Recharts for visualizing metrics

### Using Components

```tsx
import ClayCard from "@/components/ClayCard";
import Tag from "@/components/Tag";

export default function MyPage() {
  return (
    <ClayCard className="p-6">
      <h2>Title</h2>
      <Tag>Technology</Tag>
    </ClayCard>
  );
}
```

## Development

### TypeScript

The project uses strict TypeScript. All content types are defined in `types/content.ts`. When adding new JSON fields, update the corresponding TypeScript interface.

### Styling

- Use Tailwind utility classes for styling
- Reference theme values via CSS variables or Tailwind classes
- Maintain claymorphism aesthetic with `ClayCard` component
- Keep animations subtle using Framer Motion

### Code Organization

- **Server Components**: Use for data loading (default in App Router)
- **Client Components**: Mark with `"use client"` only when needed (interactivity, hooks)
- **Data Loading**: Use `lib/content.ts` helpers in server components
- **Type Safety**: Import types from `types/content.ts`

## Deployment

### Cloudflare Pages (Edge-first MongoDB with Durable Objects)

This project uses **Cloudflare Pages Functions** with **Durable Objects** for MongoDB database access. The static frontend is served from Cloudflare Pages, while dynamic API endpoints run as serverless functions that communicate with a Durable Object that maintains a persistent MongoDB connection.

#### Prerequisites

1. **MongoDB Atlas Account**
   - Create a MongoDB Atlas cluster
   - Get your connection string (MongoDB URI)
   - Note your database name

2. **Cloudflare Pages Account**
   - Connect your GitHub repository
   - Set up a new Pages project
   - Access to Workers/Pages plan that supports Durable Objects

#### Create / Configure Durable Object

1. **Add the Durable Object class** to your repository:
   - The `MongoDO` class is defined in `durable-objects/MongoDO.ts`
   - This class manages a single MongoDB client connection per DO instance

2. **Create Durable Object namespace** in Cloudflare:
   - Go to your Cloudflare Workers dashboard
   - Create a new Durable Object namespace (e.g., `MONGO_DO`)
   - Note the namespace binding name

3. **Bind Durable Object to Pages project**:
   - In your Pages project settings → **Functions** → **Durable Objects**
   - Bind the namespace to your Pages project
   - The binding name should match `MONGO_DO` (as used in `wrangler.toml`)

#### Environment Variables / Secrets

Add the following **secrets** in your Cloudflare Pages project settings:

1. Go to your Pages project → **Settings** → **Environment Variables**
2. Add the following secrets (mark as "Encrypted" / "Secret"):

   ```
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
   MONGODB_DATABASE=github_stats
   MONGODB_DEFAULT_COLLECTION=posts
   GITHUB_USERNAME=your-github-username
   GITHUB_TOKEN=your-github-personal-access-token
   SYNC_SECRET=your-sync-secret-key
   ```

   Optional:
   ```
   GITHUB_PRIVATE_OWNER=optional-private-repo-owner
   GITHUB_PRIVATE_REPO=optional-private-repo-name
   ```

   **Important**: The Durable Object will also need access to these environment variables. Ensure they are available to both Pages Functions and the Durable Object.

#### Enable Node Compatibility

The MongoDB driver requires Node.js compatibility:

1. Ensure `wrangler.toml` includes:
   ```toml
   compatibility_flags = ["nodejs_compat"]
   compatibility_date = "2024-01-01"
   ```

2. In Cloudflare Pages settings, ensure Node.js compatibility is enabled for Functions.

#### Deployment Steps

1. **Push code to GitHub** (the repository connected to Cloudflare Pages)

2. **Configure Build Settings** in Cloudflare Pages:
   - **Build command**: `npm run build`
   - **Build output directory**: `out` (or `.next` depending on your Next.js config)
   - **Root directory**: `/` (or your project root)

3. **Deploy**: Cloudflare Pages will automatically build and deploy on push

4. **Verify Functions**: The `functions/` directory is automatically deployed. Endpoints are available at:
   - `https://your-site.pages.dev/api/github/stats`
   - `https://your-site.pages.dev/api/github/sync`
   - `https://your-site.pages.dev/api/posts` (example endpoint)

#### Testing the Deployment

After deployment, test the endpoints:

**Test Stats Endpoint:**
```bash
curl https://your-site.pages.dev/api/github/stats?dateRange=week
```

**Test Sync Endpoint:**
```bash
curl -X POST https://your-site.pages.dev/api/github/sync \
  -H "Content-Type: application/json" \
  -H "x-sync-secret: your-sync-secret-key"
```

**Test Posts Endpoint (example):**
```bash
curl https://your-site.pages.dev/api/posts?limit=10
```

**Create a Post:**
```bash
curl -X POST https://your-site.pages.dev/api/posts/create \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Post","content":"This is a test"}'
```

Expected responses:
- **Stats**: Returns JSON with commits, issues, PRs, trends, etc.
- **Sync**: Returns `{"success": true, "result": {...}}` with counts of added items
- **Posts**: Returns array of posts or single post by ID

#### Local Development

To test Pages Functions locally with Durable Objects:

1. **Install Wrangler CLI**:
   ```bash
   npm install -g wrangler
   ```

2. **Configure `wrangler.toml`** (already included in the repo):
   - Ensure Durable Object bindings are configured
   - Set `compatibility_flags = ["nodejs_compat"]`

3. **Run local dev server**:
   ```bash
   npx wrangler pages dev out --compatibility-date=2024-01-01 --compatibility-flags=nodejs_compat
   ```

4. **Set environment variables** for local testing (create `.dev.vars` file):
   ```
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
   MONGODB_DATABASE=github_stats
   MONGODB_DEFAULT_COLLECTION=posts
   GITHUB_USERNAME=your-username
   GITHUB_TOKEN=your-token
   SYNC_SECRET=your-secret
   ```

#### Architecture Notes

- **Static Pages**: Served directly from Cloudflare Pages CDN
- **API Endpoints**: Run as Cloudflare Pages Functions (serverless)
- **Database Access**: Uses Durable Object (`MongoDO`) that maintains a single MongoDB client connection
- **Why Durable Objects?**: Cloudflare Pages Functions don't support persistent TCP connections per-request. Durable Objects enable connection reuse by maintaining stateful connections in a single DO instance (using `idFromName("global")` for a named instance)
- **Connection Reuse**: The DO uses a single named instance to maximize connection reuse and reduce connection overhead

#### Observability

- Monitor DO logs and function logs in Cloudflare dashboard
- Watch connection establishment/teardown in DO logs
- Monitor function execution time and DO response times

#### Notes / Caveats

- **Durable Object Lifecycle**: Durable Objects have a lifecycle; we use `idFromName("global")` to create a single named instance for connection reuse
- **Connection Pooling**: Tune `maxPoolSize` in the MongoClient options (in `MongoDO.js`) based on your traffic patterns
- **High Throughput**: For very high throughput, consider a connection pooling layer or dedicated backend
- **ObjectId Handling**: The DO converts `{ _id: { $oid: "..." } }` format to native ObjectId, but also accepts plain string IDs

#### Troubleshooting

- **Functions not working**: Check that `functions/` directory is in the project root
- **Database errors**: Verify MongoDB URI and credentials are correct
- **DO binding errors**: Ensure Durable Object namespace is created and bound correctly
- **Node compatibility**: Ensure `nodejs_compat` flag is enabled
- **CORS issues**: Functions include CORS headers, but check browser console for specific errors
- **Build failures**: Ensure all environment variables are set in Cloudflare Pages settings
- **Connection errors**: Check MongoDB Atlas network access settings (allow Cloudflare IPs or use 0.0.0.0/0 for testing)

### Vercel (Alternative)

1. Push your code to GitHub
2. Import project in Vercel
3. Vercel will automatically detect Next.js and configure build settings

### Other Platforms

Build the project:

```bash
npm run build
```

The `out` directory (or `.next` for server-side rendering) contains the production build.

## Customization Tips

1. **Update Colors**: Edit `config/theme.ts` and adjust the color palette
2. **Add Pages**: Create new routes in `app/` directory
3. **Modify Layout**: Edit `components/Layout.tsx`, `Header.tsx`, or `Footer.tsx`
4. **Change Animations**: Adjust Framer Motion props in components
5. **Add Charts**: Use `MetricChart` component or extend `lib/content.ts` for more chart types

## License

This project is open source and available for personal use.

## Support

For issues or questions, please open an issue on GitHub or contact the maintainer.

