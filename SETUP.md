# 🚀 Quick Setup Guide

Follow these steps to get your portfolio running with the admin dashboard:

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Generate Prisma Client

```bash
npx prisma generate
```

## Step 3: Run Database Migrations

```bash
npm run db:migrate
```

This creates the SQLite database at `prisma/dev.db`

## Step 4: Seed Database with Sample Data

```bash
npm run db:seed
```

This will create:
- ✅ Admin user (admin@example.com / admin123)
- ✅ Sample projects, experience, skills
- ✅ Site configuration

## Step 5: Set Up Environment Variables

The `.env` file should already exist. If not, copy from `.env.example`:

```bash
cp .env.example .env
```

Generate a secure `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

Update `.env`:
```env
AUTH_SECRET=paste-your-generated-secret-here
AUTH_URL=http://localhost:3000
```

## Step 6: Run Development Server

```bash
npm run dev
```

## Step 7: Access Your Portfolio

Open these URLs:

- **Portfolio**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin (after login)

## 🔐 Login Credentials

```
Email: admin@example.com
Password: admin123
```

## 🎨 Next Steps

1. **Login to Admin** at `/admin/login`
2. **Update Site Settings**:
   - Your name
   - Role/title
   - Email and social links
   - Description
3. **Add Your Projects**: Go to "Manage Projects"
4. **Update Experience**: Go to "Manage Experience"
5. **Modify Skills**: Update your skills and expertise
6. **Test Contact Form**: Submit a test message

## 🛠️ Useful Commands

```bash
# View database in GUI
npm run db:studio

# Reset database (if needed)
rm prisma/dev.db
npm run db:migrate
npm run db:seed

# Build for production
npm run build
npm start
```

## 🚢 Ready to Deploy?

See the main [README.md](./README.md) for deployment instructions to Vercel, Netlify, or other platforms.

## ❓ Troubleshooting

### Can't login?
- Make sure you ran `npm run db:seed`
- Check that `.env` has `AUTH_SECRET` set
- Try resetting the database

### Database errors?
```bash
npx prisma generate
npm run db:migrate
```

### Port 3000 in use?
```bash
npm run dev -- -p 3001
```

---

**Need help?** Check the [README.md](./README.md) or open an issue!
