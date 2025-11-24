# Authentication System Documentation

## Overview
Complete username-based authentication system with role-based access control, user management, password reset via OTP email, and user blocking functionality.

## Default Admin Credentials
```
Username: zenithlog
Password: logo@#!132
```

## Features Implemented

### 1. Username-Based Login
- Changed from email to username authentication
- Login page accepts username instead of email
- Backend validates username against `admin_users` table
- Blocked users cannot login (shows "Account blocked" message)

### 2. Role-Based Access Control
- Two roles: `admin` and `user`
- Admins have full access including user management
- Regular users cannot see/access user management features
- Admin users cannot be deleted (only blocked/unblocked)
- Regular users can be permanently deleted

### 3. User Management System (Admin Only)
Located in **Settings** page, visible only to admin users.

#### Features:
- **View All Users**: Table showing username, name, email, role, status (Active/Blocked), and actions
- **Add User**: Create new users with username, email, password, name, and role selection
- **Edit User**: Update user's name, email, and role
- **Delete User**: Permanently remove regular users (not available for admin users)
- **Block/Unblock User**: Admins can block/activate admin accounts (replaces delete for admins)
- **Change Password**: Admins can reset any user's password
- **Status Indicators**: Green badge for Active users, Red badge for Blocked users

### 4. Forgot Password Flow
Three-step process on login page:

**Step 1: Enter Email**
- User enters their registered email address
- System generates 6-digit OTP valid for 10 minutes
- OTP sent via email to user

**Step 2: Verify OTP**
- User enters the 6-digit code from email
- System validates OTP and expiry
- OTP marked as used after successful verification

**Step 3: Reset Password**
- User enters new password
- Password updated in database with Argon2ID hashing

## Database Schema

### admin_users Table
```sql
CREATE TABLE IF NOT EXISTS admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role ENUM('admin', 'user') DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
);
```

### password_resets Table
```sql
CREATE TABLE IF NOT EXISTS password_resets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    otp VARCHAR(10) NOT NULL,
    expires_at DATETIME NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE,
    INDEX idx_user_otp (user_id, otp),
    INDEX idx_expires (expires_at)
);
```

## API Endpoints

### Authentication
- `POST /api/login.php` - Username/password authentication
- `POST /api/logout.php` - Destroy session
- `GET /api/check-auth.php` - Verify active session

### User Management (Admin Only)
- `GET /api/list-users.php` - Retrieve all users
- `POST /api/create-user.php` - Create new user
- `POST /api/update-user.php` - Update user details
- `POST /api/delete-user.php` - Delete user (regular users only)
- `POST /api/change-user-password.php` - Admin changes user password
- `POST /api/toggle-user-status.php` - Block/unblock user account

### Password Reset
- `POST /api/forgot-password.php` - Generate and send OTP
- `POST /api/verify-otp.php` - Validate OTP code
- `POST /api/reset-password.php` - Update password after OTP verification

## Email Configuration

### Current Setup (Basic PHP mail())
```php
Email From: logozodev@gmail.com
App Password: csts jqmj rerg gmji
```

### For Production (Recommended: SMTP)
The current implementation uses PHP's `mail()` function which may not work reliably on all hosting providers.

#### Option 1: Configure PHP mail() in php.ini
```ini
[mail function]
SMTP = smtp.gmail.com
smtp_port = 587
sendmail_from = logozodev@gmail.com
```

#### Option 2: Use PHPMailer Library (Recommended)
```bash
composer require phpmailer/phpmailer
```

Update `sendOTPEmail()` in `auth-config.php`:
```php
use PHPMailer\PHPMailer\PHPMailer;

function sendOTPEmail($to, $subject, $body) {
    $mail = new PHPMailer(true);
    
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'logozodev@gmail.com';
    $mail->Password = 'csts jqmj rerg gmji';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    
    $mail->setFrom('logozodev@gmail.com', 'Zenith SCS Admin');
    $mail->addAddress($to);
    $mail->Subject = $subject;
    $mail->Body = $body;
    
    return $mail->send();
}
```

## Security Features

### Password Security
- Argon2ID hashing algorithm
- Server-side validation
- Minimum length requirements enforced

### Session Security
- HTTP-only cookies
- Secure flag in production
- Session regeneration on login
- IP address binding
- Session timeout after inactivity
- CSRF token validation

### API Security
- `requireAdmin()` helper blocks non-admin access
- Input sanitization with `sanitizeInput()`
- Prepared statements prevent SQL injection
- Rate limiting on sensitive endpoints
- Credential validation before operations

### OTP Security
- 6-digit random codes
- 10-minute expiry window
- One-time use only (marked as used after verification)
- Secure comparison with `hash_equals()`

## Frontend Components

### Updated Files
1. **src/admin-zenith/src/contexts/AuthContext.jsx**
   - Real API authentication (replaced mock)
   - Session restoration on mount via check-auth
   - User object includes username and role

2. **src/admin-zenith/src/pages/Login.jsx**
   - Username input field (not email)
   - Forgot password wizard (3 steps)
   - "Forgot Password?" link

3. **src/admin-zenith/src/pages/Settings.jsx**
   - User management section (admin only)
   - Add/Edit/Delete user modals
   - Change password dialog
   - Role badges and action buttons

## Testing Checklist

### Local Testing
- [ ] Login with zenithlog/logo@#!132
- [ ] Verify admin role in session
- [ ] Access Settings → User Management section visible
- [ ] Create new user with username/email/password/role
- [ ] Edit user details (name, email, role)
- [ ] Change user password
- [ ] Delete user (not self)
- [ ] Test forgot password flow (all 3 steps)
- [ ] Verify OTP email delivery
- [ ] Login with newly created user
- [ ] Verify non-admin users cannot see user management

### Production Testing
1. Deploy all PHP files to `/public_html/api/`
2. Deploy admin build to `/public_html/admin/`
3. Test login at https://zenithscs.com.au/admin/
4. Verify HTTPS and secure cookies
5. Test email delivery (may need SMTP configuration)
6. Create test user account
7. Test forgot password flow
8. Verify role-based UI visibility

## Deployment Steps

### 1. Upload Backend Files
Upload to `public_html/api/`:
- login.php (updated)
- auth-config.php (updated)
- check-auth.php (updated)
- list-users.php (new)
- create-user.php (new)
- update-user.php (new)
- delete-user.php (new)
- change-user-password.php (new)
- forgot-password.php (new)
- verify-otp.php (new)
- reset-password.php (new)

### 2. Upload Frontend Build
Upload `dist/admin/` contents to `public_html/admin/`:
- index.html
- assets/ (folder)

### 3. Verify Database
Run `login.php` once to auto-create:
- `admin_users` table with username and role columns
- Default admin user (zenithlog/logo@#!132)

Run `forgot-password.php` once to auto-create:
- `password_resets` table

### 4. Configure Email (If Needed)
Test email delivery. If emails don't send:
1. Check Hostinger email settings
2. Configure SMTP in php.ini, or
3. Install PHPMailer and update auth-config.php

## Troubleshooting

### "Unable to connect to server"
- Verify API files are in `/public_html/api/`
- Check file permissions (644 for PHP files)
- Confirm database credentials in auth-config.php

### "Invalid credentials"
- Default admin created on first login.php access
- Username is `zenithlog` (not email)
- Password is `logo@#!132`

### OTP Email Not Received
- Check spam/junk folder
- Verify sendOTPEmail() returns true
- Configure SMTP instead of mail()
- Check server mail logs

### User Management Not Visible
- Only admin role can see this section
- Verify user.role === 'admin' in session
- Check browser console for errors

### Session Expires Immediately
- Check CORS headers allow credentials
- Verify cookies are being set (check DevTools)
- Confirm session.cookie_secure matches HTTPS

## File Structure
```
public/
  api/
    auth-config.php (updated - added sendOTPEmail, requireAdmin)
    login.php (updated - username auth, role support)
    check-auth.php (updated - returns username and role)
    logout.php (existing)
    list-users.php (new)
    create-user.php (new)
    update-user.php (new)
    delete-user.php (new)
    change-user-password.php (new)
    forgot-password.php (new)
    verify-otp.php (new)
    reset-password.php (new)

src/admin-zenith/src/
  contexts/
    AuthContext.jsx (updated - real API, session restoration)
  pages/
    Login.jsx (updated - username field, forgot password wizard)
    Settings.jsx (updated - user management UI)
```

## Next Steps

1. **Test Email Delivery**
   - Send test OTP
   - If fails, configure SMTP

2. **Create Additional Admin Users**
   - Login as zenithlog
   - Go to Settings
   - Add new admin users

3. **Set Up Regular Users**
   - Create user accounts with 'user' role
   - Test limited access

4. **Security Hardening**
   - Enable HTTPS
   - Configure secure session cookies
   - Set up rate limiting
   - Review CORS headers

5. **Backup Strategy**
   - Regular database backups
   - Export user list periodically
   - Document critical credentials securely
