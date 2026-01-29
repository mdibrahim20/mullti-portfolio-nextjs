# 🚀 Kinetic Portfolio - Full-Stack CMS

A beautiful, motion-first portfolio website with a **complete backend CMS** for easy content management. Built with Next.js 14, Prisma, NextAuth, and Tailwind CSS.

## ✨ Features

### Frontend
- **Motion-First Design**: Smooth animations with Framer Motion
- **Dark/Light Mode**: System-aware theme toggle
- **Responsive**: Mobile-first design that looks great everywhere
- **Performance**: Optimized loading and rendering
- **Accessibility**: WCAG compliant components

### Backend CMS
- **Complete Admin Dashboard**: Manage all content from a beautiful UI at `/admin`
- **Authentication**: Secure login with NextAuth.js
- **Database**: SQLite with Prisma ORM (easily switchable to PostgreSQL/MySQL)
- **API Routes**: RESTful APIs for all content types
- **Contact Form**: Store and manage contact submissions

## 🎯 What You Can Manage

From the admin dashboard (`/admin`), you can edit:
- ✅ **Projects**: Add, edit, delete portfolio projects
- ✅ **Experience**: Update work history and positions
- ✅ **Skills**: Modify skill categories and radar chart
- ✅ **Site Config**: Change name, role, description, social links
- ✅ **Contact Messages**: View submissions from your contact form
- ✅ **All Text Content**: Every piece of text is database-driven!

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npm run db:migrate

# Seed with sample data
npm run db:seed
```

### 3. Set Up Environment Variables

Create a `.env` file in the root:

```env
# NextAuth
AUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32
AUTH_URL=http://localhost:3000
```

Generate AUTH_SECRET:
```bash
openssl rand -base64 32
```

### 4. Run Development Server

```bash
npm run dev
```

Visit:
- **Frontend**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin

## 🔐 Default Admin Credentials

After seeding the database:

```
Email: admin@example.com
Password: admin123
```

**⚠️ IMPORTANT**: Change these credentials immediately in production!

## 📁 Project Structure

```
kinetic-portfolio/
├── app/
│   ├── admin/              # Admin dashboard pages
│   │   ├── login/          # Login page
│   │   ├── projects/       # Project management
│   │   └── page.tsx        # Dashboard home
│   ├── api/                # API routes
│   │   ├── auth/           # NextAuth endpoints
│   │   ├── projects/       # Project CRUD
│   │   ├── experience/     # Experience CRUD
│   │   ├── site/           # Site config
│   │   └── contact/        # Contact form
│   └── page.tsx            # Homepage
├── components/             # React components
├── lib/
│   ├── prisma.ts           # Prisma client
│   └── api.ts              # API helper functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed script
└── auth.ts                 # NextAuth configuration
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:seed          # Seed database with sample data
npm run db:studio        # Open Prisma Studio (GUI)
npm run db:migrate       # Create new migration
```

## 🎨 Customization

### Update Your Information (Two Ways)

1. **Via Admin Dashboard** ✨ (Recommended):
   - Login at `/admin/login`
   - Navigate to "Site Settings"
   - Update all your information

2. **Via Database Seed**:
   - Edit `prisma/seed.ts`
   - Run `npm run db:seed` again

## 🔄 Switching to Production Database

To use PostgreSQL or MySQL:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // or "mysql"
  url      = env("DATABASE_URL")
}
```

2. Update `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

3. Run migrations:
```bash
npx prisma migrate deploy
npm run db:seed
```

## 🚢 Deployment (Vercel Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables: `AUTH_SECRET`, `AUTH_URL`
4. Switch to PostgreSQL (Vercel doesn't support SQLite)
5. Deploy!

## 🐛 Troubleshooting

### Reset Database
```bash
rm prisma/dev.db
npm run db:migrate
npm run db:seed
```

### Authentication Issues
```bash
# Regenerate AUTH_SECRET
openssl rand -base64 32
# Add to .env
```

## 📝 License

MIT License - Free to use for your portfolio!

## 🙏 Built With

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

**Made with ❤️ - Happy building! 🚀**

## 3) Deploy

- Vercel: import the repo and deploy.
- Netlify: `npm run build` then `npm run start` (or configure Next adapter).

## Notes

- The contact form uses `mailto:` by default (no backend needed).
- If you want a real form submit, plug in Formspree / Resend / your API route.

Enjoy — and make it yours.
