# Admin Dashboard

## Overview
The admin dashboard provides a comprehensive interface for managing your portfolio content without touching code.

## Features

### 🎨 Modern UI Design
- **Sidebar Navigation**: Clean, persistent sidebar with icon-based menu
- **Dark Mode Support**: Full dark mode compatibility
- **Responsive Design**: Works seamlessly on desktop and tablet devices
- **Card-based Layouts**: Clean, organized content presentation
- **Icon System**: Uses Lucide React icons for consistent visual language

### 📊 Dashboard Home
- **Statistics Overview**: Quick view of projects, experience, and messages
- **Quick Actions**: Fast access to create new content
- **Recent Activity**: Track your latest changes
- **Visual Cards**: Clickable cards with hover effects

### 📁 Projects Management
- **Grid View**: Beautiful card-based project display
- **Project Cards**: Show emoji, title, year, and publish status
- **CRUD Operations**: Create, read, update, and delete projects
- **Visual Status**: Eye icons indicate published/unpublished state
- **Form Validation**: Required fields and proper data formatting

### 💼 Experience Management
- **Timeline View**: Chronological display of work history
- **Location Display**: Shows position, organization, and location
- **Easy Editing**: Quick access to edit and delete entries
- **Publish Control**: Toggle visibility of experience items

### ⚙️ Site Configuration
- **General Settings**: Update name, title, bio, email, location
- **Real-time Updates**: Changes reflect immediately on frontend
- **Form Interface**: Clean, organized settings page

### 💬 Messages
- **Contact Form Submissions**: View messages from visitors
- **Organized Display**: Time-stamped, well-formatted messages
- **Email Integration**: See sender name and email

### 🎯 Skills (Coming Soon)
- Placeholder for future skills management interface

## Pages Structure

```
/admin
├── /page.tsx                    # Dashboard home
├── /login/page.tsx             # Authentication
├── /projects
│   ├── /page.tsx               # Projects list
│   ├── /new/page.tsx           # Create project
│   └── /edit/[slug]/page.tsx   # Edit project
├── /experience
│   ├── /page.tsx               # Experience list
│   ├── /new/page.tsx           # Add experience
│   └── /edit/[id]/page.tsx     # Edit experience
├── /site-config/page.tsx       # Site settings
├── /skills/page.tsx            # Skills management
└── /messages/page.tsx          # Contact submissions
```

## Components

### AdminLayout
- **Location**: `/components/admin/AdminLayout.tsx`
- **Features**:
  - Persistent sidebar navigation
  - Logo and branding
  - Navigation menu with active state highlighting
  - View Site link (opens in new tab)
  - Sign Out button

### Navigation Items
- Dashboard (/)
- Projects (/projects)
- Experience (/experience)
- Skills (/skills)
- Site Config (/site-config)
- Messages (/messages)

## Design System

### Colors
- **Primary**: Blue (blue-600, blue-700)
- **Secondary**: Purple, Green (for different sections)
- **Success**: Green
- **Danger**: Red
- **Neutral**: Zinc scale (50-950)

### Typography
- **Headings**: Bold, clear hierarchy (text-3xl, text-lg)
- **Body**: Zinc-600/400 for readability
- **Labels**: text-sm font-medium

### Components
- **Cards**: Rounded-xl, shadow-sm, border
- **Buttons**: Rounded-lg, transition-colors
- **Inputs**: Rounded-lg, focus:ring-2
- **Icons**: h-4/5/6 w-4/5/6 consistent sizing

### Spacing
- **Page Padding**: p-8
- **Section Gaps**: gap-6, gap-4
- **Card Padding**: p-6

## Access
- **URL**: `http://localhost:3001/admin`
- **Login**: `http://localhost:3001/admin/login`
- **Default Credentials**:
  - Email: `admin@example.com`
  - Password: `admin123`

## Protected Routes
All admin routes are protected by NextAuth middleware. Unauthenticated users are redirected to the login page.

## Future Enhancements
- [ ] Rich text editor for descriptions
- [ ] Image upload for projects
- [ ] Drag-and-drop reordering
- [ ] Bulk operations
- [ ] Advanced filtering and search
- [ ] Activity log with detailed history
- [ ] User management (multiple admins)
- [ ] Role-based access control
- [ ] Export/Import functionality
- [ ] Analytics dashboard
