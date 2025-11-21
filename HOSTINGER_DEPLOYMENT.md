# Hostinger Deployment Guide

## Overview
- **Main Website**: `https://zenithscs.com.au/`
- **Admin Panel**: `https://zenithscs.com.au/admin/`
- **Admin Login**: 
  - Email: `admin@gmail.com`
  - Password: `admin123`

## Build Locally

```bash
cd "d:\Zenith React"
npm run build
```

This creates:
- `dist/` - Main website files
- `dist/admin/` - Admin panel files

## File Structure on Hostinger

Your `public_html` folder should be:

```
public_html/
├── .htaccess           (root htaccess for routing)
├── index.html          (main website)
├── assets/             (main website assets)
├── api/                (backend PHP files)
│   ├── auth-config.php
│   ├── login.php
│   ├── logout.php
│   ├── check-auth.php
│   ├── get-emails.php
│   ├── delete-email.php
│   └── contact.php
└── admin/              (admin panel)
    ├── .htaccess       (admin routing)
    ├── index.html
    └── assets/
```

## Deployment Steps

### Step 1: Upload Main Website
1. Open Hostinger File Manager
2. Navigate to `public_html/`
3. Upload ALL contents from `dist/` (index.html, assets/, etc.)
4. Upload `dist/.htaccess` to `public_html/.htaccess`

### Step 2: Upload Admin Panel
1. In `public_html/`, create/navigate to `admin/` folder
2. Upload ALL contents from `dist/admin/`
3. Upload `dist/admin/.htaccess` to `public_html/admin/.htaccess`

### Step 3: Upload API Files
1. In `public_html/`, create/navigate to `api/` folder
2. Upload ALL files from `public/api/` to `public_html/api/`

### Step 4: Configure Database
1. Ensure MySQL credentials in PHP files match your Hostinger database:
   - Host: `localhost`
   - Database: `u931987027_zenith_db`
   - Username: `u931987027_zenithscs`
   - Password: `Zenith2025@#!`

2. Verify tables exist:
   - `contact_submissions` (for contact form)
   - `admin_users` (auto-created on first login)

### Step 5: Set Permissions
```
Files: 644
Folders: 755
```

Ensure these permissions on Hostinger File Manager.

### Step 6: Test Deployment

1. **Main Website**: Visit `https://zenithscs.com.au/`
   - Should show landing page
   - Contact form should submit to `/api/contact.php`

2. **Admin Panel**: Visit `https://zenithscs.com.au/admin/`
   - Should show login page
   - Login with:
     - Email: `admin@gmail.com`
     - Password: `admin123`
   - After login, access Dashboard, Inbox, etc.

3. **API Endpoints**: Test in browser DevTools Network tab
   - Login: `POST /api/login.php`
   - Get emails: `GET /api/get-emails.php`
   - Check auth: `GET /api/check-auth.php`

## Troubleshooting

### Black/Blank Admin Page
- **Cause**: Uploaded source files instead of build files
- **Fix**: Delete `public_html/admin/`, upload `dist/admin/` contents

### 404 Errors on Routes
- **Cause**: Missing .htaccess files
- **Fix**: Ensure both root and admin .htaccess files are uploaded

### Login Fails
- **Cause**: Database credentials mismatch
- **Fix**: Update credentials in all PHP files in `api/` folder

### Contact Form 500 Error
- **Cause**: Database connection issue or table doesn't exist
- **Fix**: Run SQL to create `contact_submissions` table (see `public/api/create_table.sql`)

### Assets 404
- **Cause**: Wrong folder structure (nested dist/)
- **Fix**: Upload contents OF dist folders, not the dist folders themselves

### CORS Errors
- **Cause**: Origin mismatch in PHP headers
- **Fix**: Verify `Access-Control-Allow-Origin` in PHP files points to `https://zenithscs.com.au`

## Security Checklist

- ✅ HTTPS enforced (via .htaccess)
- ✅ Session-based authentication
- ✅ HTTP-only, secure cookies
- ✅ Rate limiting on login
- ✅ CSRF token generation
- ✅ Prepared SQL statements
- ✅ Password hashing (Argon2ID)
- ✅ Input sanitization

## File Verification Commands

After upload, verify in browser:
- Main: `https://zenithscs.com.au/`
- Admin: `https://zenithscs.com.au/admin/`
- Main JS: `https://zenithscs.com.au/assets/index-XXXXX.js` (should return JS)
- Admin JS: `https://zenithscs.com.au/admin/assets/index-XXXXX.js` (should return JS)
- Login API: `https://zenithscs.com.au/api/check-auth.php` (should return JSON)

## Quick Deploy Script (PowerShell)

```powershell
# Build
cd "d:\Zenith React"
npm run build

# Reminder to upload:
Write-Host "Upload these folders to Hostinger:"
Write-Host "  dist/* → public_html/"
Write-Host "  dist/admin/* → public_html/admin/"
Write-Host "  public/api/* → public_html/api/"
Write-Host "Don't forget .htaccess files!"
```

## Changing Admin Password

Login to admin panel, go to Settings page (when implemented), or update directly in database:

```php
// In login.php or a password reset script
$new_password_hash = password_hash('YourNewPassword', PASSWORD_ARGON2ID);
// Update in admin_users table
```

## Support

For issues:
1. Check browser Console (F12) for JS errors
2. Check Network tab for failed requests (404, 500)
3. Check Hostinger error logs in File Manager
4. Verify file permissions and structure
