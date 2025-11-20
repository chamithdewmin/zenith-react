# Contact Form to Hostinger Database - Simple Setup

## 🎯 What This Does
When someone fills out your contact form, their information gets saved directly to your Hostinger database.

---

## 📋 Setup Steps (3 Steps Only!)

### Step 1: Create Database Table (2 minutes)

1. **Login to Hostinger**
   - Go to https://hpanel.hostinger.com
   - Login with your credentials

2. **Open phpMyAdmin**
   - Click on **Databases** → **phpMyAdmin**
   - Select your database from the left sidebar

3. **Run This SQL**
   - Click the **SQL** tab at the top
   - Copy and paste this code:

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

4. **Click "Go" button**

---

### Step 2: Configure & Upload PHP File (3 minutes)

1. **Open the file**: `public/api/contact.php`

2. **Update database credentials** (lines 18-21):
```php
$host = 'localhost';              // Keep as 'localhost'
$dbname = 'u123456789_yourdb';    // ← Your database name from Hostinger
$username = 'u123456789_user';    // ← Your database username from Hostinger
$password = 'YourPassword123';    // ← Your database password from Hostinger
```

**Where to find these credentials:**
- Login to Hostinger hPanel
- Go to **Databases** → **MySQL Databases**
- You'll see your database name, username, and you can view/reset the password

3. **Upload to Hostinger**
   - In Hostinger hPanel, go to **Files** → **File Manager**
   - Navigate to `public_html`
   - Create a new folder called `api`
   - Upload `contact.php` into the `api` folder
   - Right-click the file → **Permissions** → Set to `644`

---

### Step 3: Configure Your React App (1 minute)

1. **Create `.env` file** in your project root (same level as package.json):

```bash
VITE_API_URL=https://yourdomain.com/api/contact.php
```

**Replace `yourdomain.com` with your actual domain**, for example:
```bash
VITE_API_URL=https://zenithscs.com.au/api/contact.php
```

2. **Save the file**

---

## ✅ Test Your Setup

1. **Start your development server**:
```bash
npm run dev
```

2. **Go to your contact page**:
   - http://localhost:5173/contact

3. **Fill out and submit the form**

4. **Check if it worked**:
   - Go back to Hostinger phpMyAdmin
   - Select your database
   - Click on `contact_submissions` table
   - Click **Browse** button
   - You should see your test submission!

---

## 📊 View Your Submissions

**To view contact form submissions:**

1. Login to Hostinger hPanel
2. Go to **Databases** → **phpMyAdmin**
3. Select your database
4. Click on `contact_submissions` table
5. Click **Browse**

You'll see all submissions with:
- Name
- Email
- Phone
- Subject
- Message
- Date/Time submitted

---

## 🔧 Troubleshooting

### "CORS Error" in browser console
- Make sure your `.env` file has the correct URL
- Restart your dev server after creating `.env`

### "500 Internal Server Error"
- Check your database credentials in `contact.php`
- Make sure the database and table exist
- Check file permissions (should be 644)

### Form submits but no data appears
- Verify the table was created successfully
- Check database credentials are correct
- Look for PHP errors in Hostinger error logs (Files → Error Logs)

### How to find Hostinger error logs
- hPanel → Files → Error Logs
- Check for any PHP errors related to `contact.php`

---

## 🎉 That's It!

Your contact form now saves all submissions to your Hostinger database automatically. No admin panel needed - just check phpMyAdmin whenever you want to see new submissions.

---

## 📁 Important Files

**On Your Computer:**
- `public/api/contact.php` - PHP backend (upload to Hostinger)
- `.env` - Your API URL configuration
- `src/pages/ContactUs.jsx` - Contact form (already configured)

**On Hostinger Server:**
- `public_html/api/contact.php` - The uploaded API file

**Database:**
- Table: `contact_submissions` - Stores all form data

---

## 🔒 Security Note

The `.env` file is already in your `.gitignore`, so your API URL won't be committed to Git. This is good for security.

---

## ℹ️ Optional Email Notifications

If you want to receive an email when someone submits the form:

1. Open `contact.php`
2. Find line 67
3. Change the email to yours:
```php
$to = 'your-email@yourdomain.com';
```

The form will work fine without this - it's completely optional.
