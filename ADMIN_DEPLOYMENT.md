# Zenith Admin Panel Setup

## Overview
The admin panel is integrated into the main Zenith website and will be accessible at `https://zenithscs.com.au/admin`

## Features
- ✅ Read contact form submissions from Hostinger database
- ✅ Search and filter emails
- ✅ Delete emails from database
- ✅ Real-time data from MySQL database
- ✅ Responsive design
- ✅ Login authentication (admin@gmail.com / admin123)

## Build & Deploy Instructions

### 1. Build the Application
```bash
# From the root directory (D:\Zenith React)
npm run build
```

This will:
- Build the main website to `dist/`
- Build the admin panel to `dist/admin/`

### 2. Upload to Hostinger

Upload the following to your Hostinger `public_html` directory:

**Main Website:**
- Upload all files from `dist/` → `public_html/`

**Admin Panel:**
- Upload all files from `dist/admin/` → `public_html/admin/`

**API Files:**
- Upload `public/api/contact.php` → `public_html/api/contact.php`
- Upload `public/api/get-emails.php` → `public_html/api/get-emails.php`
- Upload `public/api/delete-email.php` → `public_html/api/delete-email.php`

**Configuration Files:**
- Upload `public/.htaccess` → `public_html/.htaccess` (for main site routing)
- Upload `src/ZenithAdmin/public/.htaccess` → `public_html/admin/.htaccess` (for admin routing)

### 3. Database Configuration

The PHP files are already configured with your database credentials:
```php
$host = 'localhost';
$dbname = 'u931987027_zenith_db';
$username = 'u931987027_zenithscs';
$password = '(LogozoHostinger@#!132)';
```

Make sure the `contact_submissions` table exists using the SQL in `public/api/create_table.sql`

### 4. Access the Admin Panel

Once deployed, access:
- Main Website: `https://zenithscs.com.au`
- Admin Panel: `https://zenithscs.com.au/admin`

**Login Credentials:**
- Email: `admin@gmail.com`
- Password: `admin123`

## API Endpoints

The admin panel uses the following APIs:

### GET /api/get-emails.php
Fetches contact form submissions from database
- Query params: `page`, `limit`, `search`
- Returns: JSON array of emails with pagination info

### DELETE /api/delete-email.php
Deletes an email by ID
- Method: DELETE
- Body: `{ "id": 123 }`
- Returns: Success/error message

### POST /api/contact.php
Handles contact form submissions (existing endpoint)

## Local Development

### Run Main Website:
```bash
npm run dev
```
Runs on: `http://localhost:3001`

### Run Admin Panel:
```bash
npm run dev:admin
```
Runs on: `http://localhost:5173`

## File Structure

```
dist/
├── index.html          # Main website
├── assets/            # Main website assets
├── admin/             # Admin panel
│   ├── index.html
│   ├── assets/
│   └── .htaccess
public_html/           # Hostinger deployment
├── index.html         # Main website
├── .htaccess          # Main site routing
├── admin/             # Admin panel
│   ├── index.html
│   ├── assets/
│   └── .htaccess      # Admin routing
└── api/               # Backend APIs
    ├── contact.php
    ├── get-emails.php
    └── delete-email.php
```

## Troubleshooting

### Admin Panel Shows 404
- Verify `.htaccess` file exists in `public_html/admin/`
- Check that `mod_rewrite` is enabled on Hostinger

### Emails Not Loading
- Check database credentials in PHP files
- Verify `contact_submissions` table exists
- Check browser console for API errors
- Verify API URL: `https://zenithscs.com.au/api/get-emails.php`

### CORS Errors
- PHP files already have CORS headers configured
- If issues persist, check Hostinger server configuration

## Security Notes

⚠️ **Important:** The current login is hardcoded. For production, consider:
- Using a secure authentication system
- Storing credentials in database with password hashing
- Adding JWT tokens or session management
- Implementing rate limiting on login attempts

## Contact Form Flow

1. User fills contact form on website
2. Form data sent to `/api/contact.php`
3. PHP saves to MySQL database
4. Admin views emails at `/admin`
5. Admin can delete emails via `/api/delete-email.php`
