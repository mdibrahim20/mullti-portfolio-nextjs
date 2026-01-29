# 🚀 Quick Start - Admin Dashboard

## Access the Admin Dashboard

1. **Start the development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Navigate to admin panel**:
   ```
   http://localhost:3001/admin
   ```

3. **Login with default credentials**:
   - Email: `admin@example.com`
   - Password: `admin123`

## Dashboard Tour

### 1. Home Dashboard
- View statistics (projects, experience, messages)
- Use quick action cards to create new content
- See recent activity

### 2. Manage Projects
- Click **Projects** in the sidebar
- View all your portfolio projects in a grid
- Click **+ Add Project** to create new
- Click **Edit** on any project card to modify
- Click **🗑️** to delete a project

### 3. Manage Experience
- Click **Experience** in the sidebar
- View your work history timeline
- Click **+ Add Experience** to create new
- Click **Edit** to modify entries
- Click **Delete** to remove entries

### 4. Update Site Settings
- Click **Site Config** in the sidebar
- Update your name, title, bio, email, location
- Click **Save Changes** to apply

### 5. View Messages
- Click **Messages** in the sidebar
- See all contact form submissions
- View sender details and message content

## Creating Content

### Add a New Project

1. Go to **Projects** → Click **+ Add Project**
2. Fill in the form:
   - **Slug**: URL-friendly identifier (e.g., `my-project`)
   - **Title**: Project name
   - **Year**: Project year
   - **Emoji**: Cover emoji (optional)
   - **Description**: Brief description
   - **Tags**: Comma-separated (e.g., `React, TypeScript`)
   - **Stack**: Technologies used
   - **Published**: Check to make it visible
3. Click **Create Project**

### Add Work Experience

1. Go to **Experience** → Click **+ Add Experience**
2. Fill in the form:
   - **Period**: Time range (e.g., `2022 - Present`)
   - **Title**: Job title
   - **Organization**: Company name
   - **Location**: Office location (optional)
   - **Description**: Role description (optional)
   - **Published**: Check to make it visible
3. Click **Add Experience**

## Editing Content

1. Navigate to the relevant section (Projects or Experience)
2. Find the item you want to edit
3. Click the **Edit** button
4. Update the fields
5. Click **Save Changes**

## Navigation

### Sidebar Menu
- **Dashboard**: Overview and statistics
- **Projects**: Manage portfolio projects
- **Experience**: Manage work history
- **Skills**: (Coming soon)
- **Site Config**: General settings
- **Messages**: Contact submissions

### Quick Actions
- **View Site**: Opens your portfolio in a new tab
- **Sign Out**: Logs out and returns to login page

## Tips

### Slugs
- Use lowercase letters, numbers, and hyphens only
- Example: `my-awesome-project` ✅
- Avoid: `My Awesome Project!` ❌

### Emojis
- Add visual interest with cover emojis
- Examples: 📁 🎨 🚀 💻 📱 🎯 ⚡

### Tags and Stack
- Separate items with commas
- Example: `React, TypeScript, Node.js, PostgreSQL`

### Publishing
- Uncheck **Published** to hide items from public view
- Perfect for drafts or work-in-progress

## Keyboard Shortcuts

- Press **Esc** to close modals/forms
- Use **Tab** to navigate between form fields
- **Enter** to submit forms

## Dark Mode

The admin panel automatically follows your system's dark mode preference. All pages are fully compatible with both light and dark modes.

## Security

⚠️ **Important**: Change the default admin password!

### To change your password:
1. Currently requires database access
2. Future update will include password change UI
3. For now, update via Prisma Studio:
   ```bash
   npx prisma studio
   ```

### Production Security:
- Generate secure AUTH_SECRET: `openssl rand -base64 32`
- Update `.env` file with new secret
- Use strong, unique admin password

## Troubleshooting

### Can't login?
- Check credentials: `admin@example.com` / `admin123`
- Ensure dev server is running
- Check browser console for errors

### Changes not appearing?
- Check if item is marked as **Published**
- Refresh the frontend page
- Check browser cache

### Build errors?
- Stop dev server first
- Run `npm run build`
- Restart dev server: `npm run dev`

## Next Steps

1. ✅ Log in and explore the dashboard
2. ✅ Update site configuration with your details
3. ✅ Add your real projects
4. ✅ Add your work experience
5. ✅ Test the contact form on frontend
6. ✅ Customize content to match your brand

## Support Files

- **Full Documentation**: See `/docs/ADMIN_DASHBOARD.md`
- **Implementation Details**: See `/docs/IMPLEMENTATION_SUMMARY.md`
- **Visual Guide**: See `/docs/ADMIN_VISUAL_GUIDE.md`

---

**Need help?** Check the documentation files or review the API endpoints in `/app/api/`.
