# Contact Form API - Quick Setup

## 🚀 Quick Start (3 Steps)

### 1. Database Setup
```sql
-- Run this SQL in phpMyAdmin (Hostinger)
CREATE TABLE contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME NOT NULL
);
```

### 2. Configure PHP File
Edit `public/api/contact.php` lines 18-21:
```php
$host = 'localhost';
$dbname = 'u123456789_yourdb';    // ← Your database name
$username = 'u123456789_user';     // ← Your database username
$password = 'YourPassword123';     // ← Your database password
```

Then upload `contact.php` to `public_html/api/` on Hostinger

### 3. Configure React App
Create `.env` file in project root:
```bash
VITE_API_URL=https://yourdomain.com/api/contact.php
```

Replace `yourdomain.com` with your actual domain.

### 4. Test
```bash
npm run dev
```
Go to http://localhost:3001/contact and submit a test form

## ✅ Verification
- [ ] Database table created in phpMyAdmin
- [ ] PHP file uploaded to Hostinger
- [ ] Database credentials updated in contact.php
- [ ] .env file created with your domain
- [ ] Test form submission works
- [ ] Data appears in phpMyAdmin

## 📧 View Submissions
**phpMyAdmin**: 
1. Login to Hostinger hPanel
2. Databases → phpMyAdmin
3. Select your database
4. Click `contact_submissions` table
5. Click **Browse**

## 🆘 Troubleshooting
- **CORS Error**: Check API URL in `.env`, restart dev server
- **500 Error**: Verify database credentials in `contact.php`
- **No data in DB**: Check table exists in phpMyAdmin
- **Form not submitting**: Check browser console for errors

## 📖 Documentation
See `SIMPLE_SETUP.md` for step-by-step instructions with screenshots locations.
