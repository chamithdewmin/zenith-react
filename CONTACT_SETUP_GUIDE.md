# Contact Form Database Setup Guide

This guide will help you set up the contact form to send data to your Hostinger database.

---

## 📋 Prerequisites

- Hostinger hosting account with PHP and MySQL support
- Access to Hostinger's phpMyAdmin or MySQL database
- Your domain name or hosting URL

---

## 🗄️ Step 1: Create Database Table

1. **Login to Hostinger Control Panel (hPanel)**
   - Go to https://hpanel.hostinger.com
   - Login with your credentials

2. **Access phpMyAdmin**
   - Navigate to **Databases** → **phpMyAdmin**
   - Select your database from the left sidebar

3. **Create the Table**
   - Click on the **SQL** tab
   - Copy and paste the contents of `public/api/create_table.sql`
   - Click **Go** to execute

   Alternatively, run this SQL:
   ```sql
   CREATE TABLE IF NOT EXISTS contact_submissions (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       phone VARCHAR(50) DEFAULT NULL,
       subject VARCHAR(500) NOT NULL,
       message TEXT NOT NULL,
       created_at DATETIME NOT NULL,
       status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
       INDEX idx_email (email),
       INDEX idx_created_at (created_at),
       INDEX idx_status (status)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
   ```

---

## 🔧 Step 2: Configure PHP API File

1. **Get Your Database Credentials**
   - In hPanel, go to **Databases** → **MySQL Databases**
   - Note down:
     - Database name
     - Database username
     - Database password
     - Hostname (usually `localhost`)

2. **Update `public/api/contact.php`**
   - Open the file
   - Replace these values (lines 18-21):
   ```php
   $host = 'localhost'; // Usually stays as 'localhost'
   $dbname = 'u123456789_zenith'; // Your database name
   $username = 'u123456789_zenith'; // Your database username
   $password = 'YourSecurePassword123'; // Your database password
   ```

3. **Update Email Notification (Optional)**
   - Line 67: Change the recipient email
   ```php
   $to = 'isuru.warnakula@zenithscs.com.au'; // Your email
   ```

---

## 📤 Step 3: Upload PHP File to Hostinger

### Option A: Using File Manager (Recommended)

1. **Login to hPanel**
2. **Navigate to File Manager**
   - Go to **Files** → **File Manager**
3. **Upload the API file**
   - Navigate to `public_html` or your domain's root directory
   - Create a folder named `api`
   - Upload `contact.php` into the `api` folder
4. **Set Permissions**
   - Right-click on `contact.php`
   - Click **Permissions** or **Change Permissions**
   - Set to `644` or `-rw-r--r--`

### Option B: Using FTP

1. **Get FTP Credentials from hPanel**
   - Go to **Files** → **FTP Accounts**
2. **Connect with an FTP client** (FileZilla, etc.)
3. **Upload `contact.php`** to `public_html/api/`

---

## ⚙️ Step 4: Configure React App

1. **Create `.env` file** in project root (if not exists):
   ```bash
   # .env
   VITE_API_URL=https://yourdomain.com/api/contact.php
   ```

2. **Replace `yourdomain.com`** with your actual domain:
   ```bash
   VITE_API_URL=https://zenithscs.com.au/api/contact.php
   ```

3. **Add to `.env.example`** for team reference:
   ```bash
   VITE_API_URL=https://yourdomain.com/api/contact.php
   ```

---

## 🧪 Step 5: Test the Setup

### Test Database Connection

1. **Create a test file** `public/api/test_connection.php`:
   ```php
   <?php
   $host = 'localhost';
   $dbname = 'your_database_name';
   $username = 'your_username';
   $password = 'your_password';

   try {
       $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
       echo "✅ Database connection successful!";
   } catch (PDOException $e) {
       echo "❌ Connection failed: " . $e->getMessage();
   }
   ?>
   ```

2. **Access in browser**: `https://yourdomain.com/api/test_connection.php`

### Test Contact Form

1. **Start development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to Contact page**: `http://localhost:5173/contact`

3. **Fill out and submit the form**

4. **Check for success message**

5. **Verify in database**:
   - Go to phpMyAdmin
   - Select your database
   - Click on `contact_submissions` table
   - Click **Browse** to see entries

---

## 📧 Email Notifications (Optional)

The PHP script includes basic email functionality. For better email delivery:

### Option 1: Use Hostinger Email
- Create an email account in hPanel
- Update the `From:` header in `contact.php`

### Option 2: Use SMTP (Recommended)
Install PHPMailer for more reliable email delivery:

```php
// Update contact.php to use PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.hostinger.com';
$mail->SMTPAuth = true;
$mail->Username = 'your-email@yourdomain.com';
$mail->Password = 'your-email-password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
// ... rest of email configuration
```

---

## 🔒 Security Best Practices

1. **Never commit `.env` to Git**
   - Already in `.gitignore`

2. **Use strong database passwords**

3. **Enable HTTPS** (SSL Certificate)
   - Hostinger provides free SSL certificates
   - Enable in hPanel → SSL

4. **Sanitize inputs** (already implemented in PHP)

5. **Rate limiting** (optional):
   - Add IP-based rate limiting to prevent spam
   - Use CAPTCHA (Google reCAPTCHA)

---

## 🐛 Troubleshooting

### Issue: CORS Error
**Solution**: Verify CORS headers in `contact.php`:
```php
header('Access-Control-Allow-Origin: *');
// For production, use specific domain:
header('Access-Control-Allow-Origin: https://yourdomain.com');
```

### Issue: 500 Internal Server Error
**Solution**: 
- Check PHP error logs in hPanel
- Verify database credentials
- Ensure PHP version is 7.4 or higher

### Issue: Form submits but no data in database
**Solution**:
- Check database table exists
- Verify column names match
- Check PHP error logs

### Issue: Email not sending
**Solution**:
- Verify email address is correct
- Check spam folder
- Consider using SMTP instead of PHP `mail()`

---

## 📊 Viewing Submissions

### Option 1: phpMyAdmin
1. Login to phpMyAdmin
2. Select database
3. Click `contact_submissions` table
4. Click **Browse**

### Option 2: Create Admin Panel (Advanced)
Create a simple admin page to view submissions:

```php
// public/api/view_submissions.php
<?php
// Add authentication here
$pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
$stmt = $pdo->query("SELECT * FROM contact_submissions ORDER BY created_at DESC");
$submissions = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($submissions as $sub) {
    echo "<div>";
    echo "<h3>{$sub['subject']}</h3>";
    echo "<p><strong>From:</strong> {$sub['name']} ({$sub['email']})</p>";
    echo "<p>{$sub['message']}</p>";
    echo "<hr>";
    echo "</div>";
}
?>
```

---

## 🚀 Production Deployment

1. **Build React app**:
   ```bash
   npm run build
   ```

2. **Upload build files to Hostinger**:
   - Upload contents of `dist/` folder to `public_html/`

3. **Ensure API URL is correct**:
   - Update `.env` with production URL
   - Rebuild if necessary

4. **Test on production domain**

---

## 📝 Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key, auto-increment |
| name | VARCHAR(255) | Contact name |
| email | VARCHAR(255) | Contact email |
| phone | VARCHAR(50) | Phone number (optional) |
| subject | VARCHAR(500) | Message subject |
| message | TEXT | Message content |
| created_at | DATETIME | Submission timestamp |
| status | ENUM | new, read, replied, archived |

---

## 🆘 Support

If you encounter issues:
1. Check Hostinger documentation
2. Review error logs in hPanel
3. Test database connection separately
4. Verify API endpoint is accessible

---

**Setup complete! Your contact form will now save submissions to your Hostinger database.**
