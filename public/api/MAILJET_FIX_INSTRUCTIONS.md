# Mailjet Email Not Sending - Fix Instructions

## Common Issues and Solutions

### Issue 1: Sender Email Not Verified

**Problem:** The sender email `noreply@zenithscs.com.au` is not verified in Mailjet.

**Solution:**
1. Log in to your Mailjet account: https://app.mailjet.com
2. Go to **Account Settings** → **Sender & Domains**
3. Verify your domain `zenithscs.com.au` using one of these methods:
   - **File Method:** Upload `aa9238131a1055866dfe3a4c7fead6a4.txt` to your website root
   - **DNS Method:** Add TXT record: `mailjet._aa923813` with value `aa9238131a1055866dfe3a4c7fead6a4`
4. Once verified, you can use `noreply@zenithscs.com.au` as sender

### Issue 2: Use Verified Sender Email

**If domain is not verified yet, use a verified sender email:**

1. In Mailjet dashboard, go to **Senders & Domains**
2. Find a verified sender email (usually your account email)
3. Update `auth-config.php` line 171:
   ```php
   $fromEmail = 'your-verified-email@example.com'; // Use verified email
   ```

### Issue 3: Test Mailjet Connection

**Use the test script:**
1. Access: `https://zenithscs.com.au/api/test-mailjet.php`
2. Check the response for errors
3. Common errors:
   - **401 Unauthorized:** Check API Key and Secret
   - **400 Bad Request:** Sender email not verified
   - **200 Success:** Email should be sent

### Issue 4: Check Server Error Logs

**View error logs to see detailed errors:**
- Check PHP error logs on your server
- Look for "Mailjet" in the logs
- Common log locations:
  - `/var/log/php_errors.log`
  - `/var/log/apache2/error.log`
  - cPanel error logs

### Issue 5: API Credentials

**Verify API credentials are correct:**
- API Key: `0b73581ecf415db678c8e88c3eb47bab`
- Secret Key: `a6edd4d55fe1432c5f0599dd480a15a6`
- Check in Mailjet: **Account Settings** → **API Keys**

## Quick Fix Steps

1. **Verify Domain in Mailjet** (Recommended)
   - Complete domain validation
   - Use `noreply@zenithscs.com.au`

2. **OR Use Verified Sender Email** (Quick Fix)
   - Find verified email in Mailjet dashboard
   - Update `auth-config.php` with verified email

3. **Test Email Sending**
   - Use `test-mailjet.php` to test
   - Check error logs for details

4. **Check Mailjet Dashboard**
   - Go to **Statistics** → **Email Activity**
   - See if emails are being sent but blocked
   - Check bounce/spam reports

## After Fixing

1. Delete `test-mailjet.php` for security
2. Test forgot password flow
3. Check email inbox (and spam folder)
4. Monitor Mailjet dashboard for delivery status

