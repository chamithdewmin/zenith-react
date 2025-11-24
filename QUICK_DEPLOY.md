# Quick Deployment Guide - Authentication Update

## What Changed
✅ Username-based login (zenithlog/logo@#!132)  
✅ User management system in Settings (admin only)  
✅ Forgot password with OTP email  
✅ Role-based access control (admin/user roles)  
✅ Block/Unblock user accounts (for admin users)  
✅ Delete functionality (for regular users only)  

## Files to Upload

### Backend PHP (upload to public_html/api/)
- ✅ login.php (UPDATED - username auth, blocks inactive users)
- ✅ auth-config.php (UPDATED - email helpers)
- ✅ check-auth.php (UPDATED - role support)
- ✅ list-users.php (NEW)
- ✅ create-user.php (NEW)
- ✅ update-user.php (NEW)
- ✅ delete-user.php (NEW - regular users only)
- ✅ change-user-password.php (NEW)
- ✅ toggle-user-status.php (NEW - block/unblock)
- ✅ forgot-password.php (NEW)
- ✅ verify-otp.php (NEW)
- ✅ reset-password.php (NEW)

### Frontend Build (upload dist/admin/ to public_html/admin/)
- ✅ index.html (UPDATED)
- ✅ assets/ folder (UPDATED)

## Deployment Steps

### 1. Upload PHP Files
```bash
# Using FTP/FileZilla:
Upload public/api/*.php → public_html/api/
```

### 2. Upload Admin Build
```bash
# Upload admin panel build:
dist/admin/index.html → public_html/admin/index.html
dist/admin/assets/* → public_html/admin/assets/
```

### 3. First Login
1. Visit https://zenithscs.com.au/admin/
2. Login with:
   - Username: `zenithlog`
   - Password: `logo@#!132`

### 4. Test User Management
1. Go to Settings page
2. You should see "User Management" section (admin only)
3. Try creating a test user:
   - Click "Add User"
   - Enter username, name, email, password
   - Select role (admin or user)
   - Click "Create User"

### 5. Test Forgot Password
1. Logout
2. Click "Forgot Password?" on login page
3. Enter your email
4. Check email for 6-digit OTP
5. Enter OTP
6. Set new password

## Email Configuration

**If OTP emails don't send**, you need to configure SMTP:

### Option 1: Update php.ini (Hostinger)
Contact Hostinger support to enable SMTP with:
```
smtp.gmail.com
Port: 587
Username: logozodev@gmail.com
Password: csts jqmj rerg gmji
```

### Option 2: Install PHPMailer (Recommended)
```bash
# SSH into Hostinger
cd public_html/api
composer require phpmailer/phpmailer
```

Then update `sendOTPEmail()` function in auth-config.php to use PHPMailer (see AUTHENTICATION_SYSTEM.md for code).

## Database Tables

Tables are auto-created on first use:
- `admin_users` - Created when you first visit login.php
- `password_resets` - Created when forgot-password.php is first called

### Verify Tables Exist (phpMyAdmin)
1. Login to Hostinger cPanel
2. Open phpMyAdmin
3. Select database: u931987027_zenith_db
4. Check for tables:
   - ✅ admin_users (should have username and role columns)
   - ✅ password_resets (created on first forgot-password request)

## Testing Checklist

- [ ] Login with zenithlog/logo@#!132 works
- [ ] Settings → User Management section visible
- [ ] Can create new user (both admin and regular users)
- [ ] Can edit user details
- [ ] Can change user password
- [ ] Can delete regular users (not admin users)
- [ ] Can block/unblock admin users
- [ ] Blocked users cannot login
- [ ] Status column shows Active (green) or Blocked (red)
- [ ] Forgot password sends email
- [ ] OTP verification works
- [ ] Password reset completes
- [ ] Non-admin users don't see user management

## Troubleshooting

### Login Fails
- Clear browser cache and cookies
- Verify username is `zenithlog` (not email)
- Check browser console for errors

### User Management Not Visible
- Confirm you're logged in as admin role
- Check AuthContext is returning user.role = 'admin'

### OTP Email Not Received
- Check spam/junk folder
- Configure SMTP (see above)
- Contact Hostinger about email delivery

### API Errors
- Check file permissions (644 for .php files)
- Verify database connection in auth-config.php
- Check browser Network tab for API responses

## Quick Command Reference

### Build Admin Panel (local)
```powershell
cd "d:\Zenith React\src\admin-zenith"
npm run build
```

### Files Are Located At:
- Backend: `d:\Zenith React\public\api\*.php`
- Frontend: `d:\Zenith React\dist\admin\*`

## Support

For detailed documentation, see:
- AUTHENTICATION_SYSTEM.md (full technical docs)
- HOSTINGER_DEPLOYMENT.md (deployment guide)
- SECURITY_IMPLEMENTATION.md (security features)

## Default Credentials

```
URL: https://zenithscs.com.au/admin/
Username: zenithlog
Password: logo@#!132
Role: admin
```

**⚠️ Remember to create additional admin accounts and consider changing the default password after first login!**
