# 🚀 Hostinger Deployment Checklist

## ✅ Pre-Deployment

- [x] Build completed successfully
- [x] Admin panel configured for `/admin` path
- [x] Database credentials configured in PHP files
- [x] API endpoints created (get-emails.php, delete-email.php)
- [x] .htaccess files created for routing

## 📦 Files to Upload

### 1. Main Website Files
Upload from `dist/` to `public_html/`:
```
dist/
├── index.html          → public_html/index.html
├── .htaccess           → public_html/.htaccess
├── service-worker.js   → public_html/service-worker.js
└── assets/             → public_html/assets/
```

### 2. Admin Panel Files  
Upload from `dist/admin/` to `public_html/admin/`:
```
dist/admin/
├── index.html          → public_html/admin/index.html
├── .htaccess           → public_html/admin/.htaccess
└── assets/             → public_html/admin/assets/
```

### 3. API Files
Upload from `public/api/` to `public_html/api/`:
```
public/api/
├── contact.php         → public_html/api/contact.php
├── get-emails.php      → public_html/api/get-emails.php
└── delete-email.php    → public_html/api/delete-email.php
```

## 🗄️ Database Setup

1. **Login to Hostinger hPanel**
2. **Go to:** Databases → MySQL Databases  
3. **Select database:** `u931987027_zenith_db`
4. **Click:** phpMyAdmin
5. **Run SQL:** Use the query from `public/api/create_table.sql`

```sql
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## 🧪 Testing After Deployment

### Test Main Website:
1. Visit: `https://zenithscs.com.au`
2. Navigate to all pages: Home, About, Services, Contact, Blog
3. Refresh each page (should not show 404)
4. Test invalid URL like `/test` (should show custom 404 page)

### Test Contact Form:
1. Go to: `https://zenithscs.com.au/contact`
2. Fill and submit form
3. Check for success message
4. Verify data in database (via admin panel)

### Test Admin Panel:
1. Go to: `https://zenithscs.com.au/admin`
2. Login with:
   - Email: `admin@gmail.com`
   - Password: `admin123`
3. Check if emails appear in inbox
4. Test search functionality
5. Test delete functionality
6. Test pagination
7. Refresh page (should stay on admin, not 404)

### Test APIs Directly:
```bash
# Test get emails API
https://zenithscs.com.au/api/get-emails.php

# Should return JSON with emails
```

## 🔧 Troubleshooting

### Issue: Admin shows 404 on refresh
**Fix:** Verify `public_html/admin/.htaccess` exists and contains:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /admin/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /admin/index.html [L]
</IfModule>
```

### Issue: Emails not loading in admin
**Fix:** 
1. Check database credentials in all PHP files
2. Verify `contact_submissions` table exists
3. Check browser console for errors
4. Test API directly: `https://zenithscs.com.au/api/get-emails.php`

### Issue: Contact form not submitting
**Fix:**
1. Verify `public_html/api/contact.php` exists
2. Check database credentials
3. Check browser console for CORS errors
4. Verify `.env` is not uploaded (not needed on server)

### Issue: 404 on main site routes
**Fix:**
1. Verify `public_html/.htaccess` exists
2. Verify `mod_rewrite` is enabled (contact Hostinger support)
3. Check .htaccess syntax

## 📁 Final File Structure on Hostinger

```
public_html/
├── index.html                 # Main website
├── .htaccess                  # Main site routing
├── service-worker.js
├── assets/                    # Main site assets
│   ├── index-*.css
│   └── index-*.js
├── admin/                     # Admin panel
│   ├── index.html
│   ├── .htaccess              # Admin routing
│   └── assets/
│       ├── index-*.css
│       └── index-*.js
└── api/                       # Backend APIs
    ├── contact.php
    ├── get-emails.php
    └── delete-email.php
```

## 🔐 Security Notes

**Current Setup:**
- Admin login: `admin@gmail.com` / `admin123` (hardcoded)
- No authentication on API endpoints
- Database password in plain text in PHP files

**Recommendations for Production:**
- [ ] Change admin password
- [ ] Add authentication to API endpoints
- [ ] Implement JWT tokens
- [ ] Add rate limiting
- [ ] Use environment variables for database credentials
- [ ] Enable HTTPS (should already be enabled on Hostinger)

## 📊 Success Criteria

✅ Main website loads at `zenithscs.com.au`
✅ All routes work without 404 errors
✅ Contact form saves to database
✅ Admin panel accessible at `zenithscs.com.au/admin`
✅ Admin can view contact submissions
✅ Admin can search emails
✅ Admin can delete emails
✅ Custom 404 page shows for invalid routes

## 🎉 Post-Deployment

Once everything is working:
1. Test all functionality thoroughly
2. Monitor for any errors
3. Check database for contact submissions
4. Verify email inbox in admin panel
5. Test on mobile devices
6. Share admin credentials with team (change default password first!)

---

**Admin Panel Login:**
- URL: https://zenithscs.com.au/admin
- Email: admin@gmail.com
- Password: admin123

**Database:**
- Host: localhost
- Database: u931987027_zenith_db
- Username: u931987027_zenithscs
- Password: (LogozoHostinger@#!132)
