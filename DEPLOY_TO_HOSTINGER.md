# 🚀 Deploy to Hostinger - Step by Step Guide

## ✅ What You Have
- Main Website: `zenithscs.com.au`
- Admin Panel: `zenithscs.com.au/admin`
- Admin Login: `admin@gmail.com` / `admin123`

## 📦 Files to Upload

After running `npm run build`, you have:
- `dist/` folder - Main website
- `dist/admin/` folder - Admin panel
- `public/api/` folder - PHP backend

## 🎯 Hostinger File Structure

Your `public_html` folder should look like this:

```
public_html/
├── .htaccess          ← Root routing
├── index.html         ← Main website homepage
├── assets/            ← Main website assets (CSS, JS, images)
├── admin/             ← Admin panel folder
│   ├── .htaccess      ← Admin routing
│   ├── index.html     ← Admin login page
│   └── assets/        ← Admin assets
└── api/               ← PHP backend
    ├── auth-config.php
    ├── login.php
    ├── logout.php
    ├── check-auth.php
    ├── get-emails.php
    ├── delete-email.php
    └── contact.php
```

## 📋 Step-by-Step Deployment

### Step 1: Clear Old Files
1. Login to Hostinger File Manager
2. Navigate to `public_html/`
3. **Delete these if they exist:**
   - `admin/` folder (old version)
   - `assets/` folder (old version)
   - `index.html` (old version)
   - `.htaccess` (old version)
4. **Keep:**
   - `api/` folder (don't delete)

### Step 2: Upload Main Website
1. From your local `d:\Zenith React\dist\` folder, upload:
   - `index.html` → `public_html/index.html`
   - `assets/` folder → `public_html/assets/`
   - `.htaccess` → `public_html/.htaccess`

### Step 3: Upload Admin Panel
1. From your local `d:\Zenith React\dist\admin\` folder, upload:
   - Create folder `public_html/admin/` (if doesn't exist)
   - Upload ALL contents from `dist/admin/` into `public_html/admin/`:
     - `index.html` → `public_html/admin/index.html`
     - `assets/` folder → `public_html/admin/assets/`
     - `.htaccess` → `public_html/admin/.htaccess`

### Step 4: Verify API Files
1. Check `public_html/api/` contains:
   - `auth-config.php`
   - `login.php`
   - `logout.php`
   - `check-auth.php`
   - `get-emails.php`
   - `delete-email.php`
   - `contact.php`

2. If missing, upload from `d:\Zenith React\public\api\`

### Step 5: Check File Permissions
In Hostinger File Manager:
- Files: `644` (click file → Permissions)
- Folders: `755`

### Step 6: Test Deployment

#### Test Main Website
1. Visit: `https://zenithscs.com.au/`
2. Should show: Landing page with services
3. Try: Contact form submission
4. Check: All images load, navigation works

#### Test Admin Panel
1. Visit: `https://zenithscs.com.au/admin/`
2. Should show: Login page (dark theme)
3. Login with:
   - Email: `admin@gmail.com`
   - Password: `admin123`
4. After login:
   - Dashboard shows stats
   - Inbox shows contact form submissions
   - Can delete emails

## 🔍 Troubleshooting

### Blank Page (Main Site)
**Problem:** White/blank page at `zenithscs.com.au`  
**Solution:**
- Check `index.html` loads (view source - should see `<script src="/assets/index-...js">`)
- Check `assets/` folder uploaded correctly
- Try hard refresh: Ctrl+Shift+R

### Blank Page (Admin)
**Problem:** Black/blank page at `zenithscs.com.au/admin/`  
**Solution:**
- Check `admin/index.html` exists
- Check `admin/assets/` folder exists
- Verify `.htaccess` in `admin/` folder
- Clear browser cache

### 404 Errors on Routes
**Problem:** `/about`, `/services`, `/admin/dashboard` show 404  
**Solution:**
- Check `.htaccess` in `public_html/`
- Check `.htaccess` in `public_html/admin/`
- Ensure mod_rewrite enabled (contact Hostinger support)

### Login Error "Unable to connect"
**Problem:** Login fails with connection error  
**Solution:**
- Check `api/` folder exists
- Verify database credentials in `api/login.php`:
  ```php
  $host = 'localhost';
  $dbname = 'u931987027_zenith_db';
  $username = 'u931987027_zenithscs';
  $db_password = 'Zenith2025@#!';
  ```
- Check database exists in Hostinger phpMyAdmin

### Login Error "Invalid credentials"
**Problem:** Correct password but login fails  
**Solution:**
- Database needs `admin_users` table
- On first login, table auto-creates with default admin
- If issues, run this SQL in phpMyAdmin:
  ```sql
  CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email)
  );
  ```

### Contact Form 500 Error
**Problem:** Contact form shows error  
**Solution:**
- Check `contact_submissions` table exists
- Run SQL from `public/api/create_table.sql`
- Verify database credentials in `api/contact.php`

## ✅ Final Checklist

Before going live:
- [ ] Main site loads at `zenithscs.com.au`
- [ ] All pages work (About, Services, Contact)
- [ ] Contact form submits successfully
- [ ] Admin panel loads at `zenithscs.com.au/admin/`
- [ ] Can login with `admin@gmail.com` / `admin123`
- [ ] Dashboard shows email count
- [ ] Inbox displays submitted emails
- [ ] Can view and delete emails
- [ ] HTTPS works (green padlock)

## 🎉 Success!

Your site is live:
- **Main Website:** https://zenithscs.com.au
- **Admin Panel:** https://zenithscs.com.au/admin

## 📞 Support

If you encounter issues:
1. Check browser Console (F12) for errors
2. Check Network tab for failed requests
3. Verify file structure matches exactly
4. Check Hostinger error logs in File Manager

---

**Built on:** ${new Date().toLocaleDateString()}  
**Local Build Path:** `d:\Zenith React\dist\`
