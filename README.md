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

### Vercel (Recommended)

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

