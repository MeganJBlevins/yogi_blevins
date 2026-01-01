# Yogi Blevins

A modern, extensible personal website built with [Next.js 16](https://nextjs.org), React 19, TypeScript, and Tailwind CSS 4.

## Getting Started

First, install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
app/
├── components/           # Shared/reusable components
│   ├── index.ts          # Barrel exports for clean imports
│   ├── Navigation.tsx    # Site-wide navigation component
│   ├── PageLayout.tsx    # Reusable page wrapper
│   └── Section.tsx       # Reusable section component
├── Pages/                # Page modules (each page is a folder)
│   └── Home/
│       ├── index.tsx     # Home page entry point
│       ├── Hero.tsx      # Hero section component
│       └── components/   # Home-specific components
│           └── index.ts  # Barrel exports
├── globals.css           # Global styles and CSS variables
├── layout.tsx            # Root layout (fonts, metadata)
└── page.tsx              # Main entry point (routes to Home)
```

## How to Add a New Page

### Step 1: Create the Page Folder

Create a new folder under `app/Pages/` with your page name:

```
app/Pages/About/
├── index.tsx             # Page entry point
├── AboutHero.tsx         # Page-specific sections
├── Bio.tsx
└── components/
    └── index.ts          # Barrel exports for page components
```

### Step 2: Create the Page Component

Create `app/Pages/About/index.tsx`:

```tsx
import PageLayout from "@/app/components/PageLayout";
import AboutHero from "./AboutHero";
import Bio from "./Bio";

export default function AboutPage() {
  return (
    <PageLayout>
      <AboutHero />
      <Bio />
    </PageLayout>
  );
}
```

### Step 3: Create Page Sections

Create section components using the `Section` wrapper:

```tsx
// app/Pages/About/AboutHero.tsx
import Section from "@/app/components/Section";

export default function AboutHero() {
  return (
    <Section className="flex min-h-[50vh] items-center justify-center bg-primary-bg">
      <h1 className="font-serif text-5xl font-bold text-primary-text">
        About Me
      </h1>
    </Section>
  );
}
```

### Step 4: Add the Route

For Next.js App Router, create a route file at `app/about/page.tsx`:

```tsx
import AboutPage from "@/app/Pages/About";

export default function Page() {
  return <AboutPage />;
}
```

## How to Add Navigation Items

### For Anchor Links (Same Page Sections)

Edit the `navItems` array in `app/components/Navigation.tsx`:

```tsx
const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Videos", href: "#videos" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];
```

Make sure your section has a matching `id`:

```tsx
<Section id="about" className="...">
  {/* Section content */}
</Section>
```

### For Page Links (Separate Pages)

Add the page route to the navigation:

```tsx
const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];
```

## Adding the Navigation to Your Site

Import and add `Navigation` to your layout or page:

```tsx
// Option 1: In app/layout.tsx (appears on all pages)
import Navigation from "@/app/components/Navigation";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}

// Option 2: In individual pages
import Navigation from "@/app/components/Navigation";
import PageLayout from "@/app/components/PageLayout";

export default function HomePage() {
  return (
    <PageLayout>
      <Navigation />
      <Hero />
    </PageLayout>
  );
}
```

## Component Reference

### PageLayout

A wrapper component for consistent page structure.

```tsx
import PageLayout from "@/app/components/PageLayout";

<PageLayout className="optional-additional-classes">
  {/* Page sections go here */}
</PageLayout>;
```

### Section

A semantic section wrapper with optional styling.

```tsx
import Section from "@/app/components/Section";

<Section
  id="about" // Optional: for anchor links
  className="flex items-center" // Optional: Tailwind classes
  style={{ background: "#fff" }} // Optional: inline styles
>
  {/* Section content */}
</Section>;
```

### Navigation

Fixed navigation header with mobile menu support.

| Feature            | Description                              |
| ------------------ | ---------------------------------------- |
| Scroll detection   | Background becomes opaque on scroll      |
| Mobile menu        | Animated hamburger menu on small screens |
| Smooth transitions | All interactions are animated            |

## Theming

All theme colors are defined as CSS variables in `app/globals.css`:

```css
@theme inline {
  --color-primary-bg: #f8ede3; /* Main background */
  --color-primary-text: #798777; /* Main text color */
  --color-secondary-bg: #ffffff; /* Secondary backgrounds */
  --color-secondary-text: #a2b29f; /* Secondary text */
  --color-accent: #bdd2b6; /* Accent color */
  --color-accent-hover: #a8c4a0; /* Accent hover state */
  --color-primary-text-hover: #667766;
  --color-primary-text-muted: #8a9b88;
}
```

Use these in Tailwind classes:

```tsx
<div className="bg-primary-bg text-primary-text">
  <span className="text-accent hover:text-accent-hover">Link</span>
</div>
```

## Fonts

Three font families are configured:

| Variable       | Font             | Usage                  |
| -------------- | ---------------- | ---------------------- |
| `--font-sans`  | Geist Sans       | Body text, UI elements |
| `--font-mono`  | Geist Mono       | Code blocks            |
| `--font-serif` | Playfair Display | Headings, titles       |

Use in Tailwind:

```tsx
<h1 className="font-serif">Elegant Heading</h1>
<p className="font-sans">Body text</p>
<code className="font-mono">code</code>
```

## Deployment

### Option 1: Vercel (Recommended for simplicity)

The easiest way to deploy is with [Vercel](https://vercel.com/new):

```bash
pnpm build
```

### Option 2: Digital Ocean Droplet (Self-hosted)

This project includes a complete GitHub Actions CI/CD pipeline for deploying to a Digital Ocean droplet.

#### Prerequisites

- A Digital Ocean droplet running Ubuntu 22.04+
- A domain name pointed to your droplet's IP
- SSH access to your droplet

#### Initial Server Setup

1. SSH into your droplet and run the setup script:

```bash
curl -fsSL https://raw.githubusercontent.com/YOUR_USERNAME/yogi_blevins/main/scripts/server-setup.sh | bash
```

Or manually copy `scripts/server-setup.sh` to your server and run it:

```bash
chmod +x server-setup.sh
./server-setup.sh
```

This script installs:
- Node.js 20.x
- pnpm
- PM2 (process manager)
- nginx (reverse proxy)
- certbot via snap (SSL certificates - recommended for Ubuntu 22.04+)

2. Set up SSL certificate (after DNS is configured):

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

**Note for Ubuntu 22.04/24.04:** If certbot isn't found after running the setup script, install it manually via snap:

```bash
sudo snap install --classic certbot
sudo ln -sf /snap/bin/certbot /usr/bin/certbot
```

#### GitHub Repository Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

| Secret | Description |
|--------|-------------|
| `DROPLET_HOST` | Your droplet's IP address or hostname |
| `DROPLET_USER` | SSH username (e.g., `root` or your username) |
| `DROPLET_SSH_KEY` | Your private SSH key (entire key content) |
| `DROPLET_SSH_PORT` | SSH port (default: 22) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID (`xyhoulob`) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name (`production`) |

#### Generate a Deploy Key

On your droplet:

```bash
ssh-keygen -t ed25519 -C 'github-deploy-key' -f ~/.ssh/github_deploy
cat ~/.ssh/github_deploy.pub
```

- Add the **public key** to `~/.ssh/authorized_keys` on your droplet
- Add the **private key** as `DROPLET_SSH_KEY` secret in GitHub

#### Triggering Deployments

Deployments are triggered automatically when you push to the `main` branch. You can also trigger a manual deployment from the Actions tab in GitHub.

#### Deployment Process

The GitHub Action will:
1. Build the Next.js application
2. Create a deployment package
3. Copy files to your server via SCP
4. Install production dependencies
5. Restart the application with PM2
6. Run a health check to verify the deployment

#### Monitoring

On your server, you can monitor the application with:

```bash
pm2 status              # View process status
pm2 logs yogi-blevins   # View application logs
pm2 monit               # Real-time monitoring
```

#### Rollback

If a deployment fails, the previous version is backed up. To rollback:

```bash
# List available backups
ls -la /var/www/yogi_blevins_backup_*

# Restore a backup (replace with actual backup folder name)
sudo rm -rf /var/www/yogi_blevins
sudo cp -r /var/www/yogi_blevins_backup_YYYYMMDD_HHMMSS /var/www/yogi_blevins
pm2 reload yogi-blevins
```

Check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more options.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [React 19 Documentation](https://react.dev)
