# ✅ Contact Form Setup - Super Simple Guide

Your contact form will save all data to Hostinger database. Follow these 3 steps:

---

## Step 1: Create Database Table

1. Go to **Hostinger hPanel** → Login
2. Click **Databases** → **phpMyAdmin**
3. Select your database (click on it in the left sidebar)
4. Click **SQL** tab at the top
5. Copy this code and paste it:

```sql
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) DEFAULT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

6. Click the **Go** button
7. ✅ Done! Table created.

---

## Step 2: Upload & Configure PHP File

### A. Get Your Database Info

1. In Hostinger hPanel, go to **Databases** → **MySQL Databases**
2. Write down these 3 things:
   - Database name (looks like: `u123456789_dbname`)
   - Username (looks like: `u123456789_user`)
   - Password (click eye icon to view it)

### B. Update contact.php

1. Open file: `public/api/contact.php`
2. Find lines 18-21 and update with YOUR info:

```php
$host = 'localhost';                    // ← Keep this as is
$dbname = 'u123456789_yourdb';          // ← PUT YOUR DATABASE NAME
$username = 'u123456789_user';          // ← PUT YOUR USERNAME
$password = 'YourActualPassword';       // ← PUT YOUR PASSWORD
```

3. Save the file

### C. Upload to Hostinger

1. Go to Hostinger **Files** → **File Manager**
2. Open `public_html` folder
3. Click **+ New Folder** button, name it `api`
4. Click on the `api` folder to open it
5. Click **Upload Files** button
6. Select `contact.php` from your computer (`public/api/contact.php`)
7. After upload, right-click the file → **Permissions** → Type `644` → Save
8. ✅ Done! PHP file uploaded.

---

## Step 3: Configure Your Website

1. **In your project folder**, create a new file called `.env` (right next to `package.json`)

2. Add this line to `.env`:

```
VITE_API_URL=https://yourdomain.com/api/contact.php
```

**Replace `yourdomain.com` with your actual website domain**, for example:
- `VITE_API_URL=https://zenithscs.com.au/api/contact.php`

3. Save the file

4. **Restart your server**:
```bash
# Press Ctrl+C to stop the server if running
npm run dev
```

---

## ✅ Test It!

1. Open your website: http://localhost:3001/contact
2. Fill out the contact form
3. Click "Send Message"
4. You should see "Message sent successfully!"

**Check if it saved:**
1. Go to Hostinger phpMyAdmin
2. Click your database
3. Click `contact_submissions` table
4. Click **Browse**
5. You should see your test message!

---

## 📧 View All Submissions Anytime

**To see all contact form messages:**

1. Login to Hostinger hPanel
2. Go to **Databases** → **phpMyAdmin**
3. Click your database name
4. Click `contact_submissions` table
5. Click **Browse**

You'll see all messages with name, email, phone, subject, message, and date!

---

## 🐛 Problems?

### "CORS error" in browser
- Make sure `.env` has the correct URL
- Restart your dev server (`Ctrl+C` then `npm run dev`)

### "500 error" when submitting
- Double-check database credentials in `contact.php`
- Make sure database name, username, and password are correct

### Form submits but no data in database
- Check if table was created (Step 1)
- Verify `contact.php` has correct credentials

### Can't find `.env` file
- Create it in the main project folder (same location as `package.json`)
- Make sure the filename is exactly `.env` (starts with a dot)

---

## 📁 File Locations

**Your computer:**
- `public/api/contact.php` ← Edit this with database credentials, then upload
- `.env` ← Create this with your API URL

**Hostinger server:**
- `public_html/api/contact.php` ← Upload here

---

## 🎉 That's It!

Your contact form now automatically saves to your Hostinger database. Every time someone fills out the form, their info goes straight to the database!

To view submissions, just go to phpMyAdmin anytime.
