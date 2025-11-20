# 🚀 Contact Form - Developer Quick Reference

## Environment Variables
```bash
# .env (create this file)
VITE_API_URL=https://yourdomain.com/api/contact.php
```

## Database Credentials (contact.php)
```php
$host = 'localhost';
$dbname = 'u123456789_yourdb';
$username = 'u123456789_user';
$password = 'YourPassword';
```

## API Endpoints

### Submit Contact Form
```javascript
POST https://yourdomain.com/api/contact.php
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Inquiry",
  "message": "Hello..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Usage in React

```javascript
import { submitContactForm, validateForm } from '../services/api/contactApi';

// Validate form
const validation = validateForm(formData);
if (!validation.isValid) {
  console.log(validation.errors);
}

// Submit form
const result = await submitContactForm(formData);
if (result.success) {
  // Success
} else {
  // Error
}
```

## Admin Panel Access
```
URL: https://yourdomain.com/api/admin.php
Username: admin (change this!)
Password: changeme123 (change this!)
```

## Database Query Examples

```sql
-- View all submissions
SELECT * FROM contact_submissions ORDER BY created_at DESC;

-- Count new messages
SELECT COUNT(*) FROM contact_submissions WHERE status = 'new';

-- Today's submissions
SELECT * FROM contact_submissions WHERE DATE(created_at) = CURDATE();

-- Update status
UPDATE contact_submissions SET status = 'read' WHERE id = 1;

-- Delete old submissions (be careful!)
DELETE FROM contact_submissions WHERE created_at < DATE_SUB(NOW(), INTERVAL 90 DAY);
```

## File Upload Checklist
- [ ] `contact.php` → `public_html/api/`
- [ ] `admin.php` → `public_html/api/`
- [ ] File permissions: `644`
- [ ] Database credentials updated
- [ ] Test API endpoint: `https://yourdomain.com/api/contact.php`

## Common HTTP Status Codes
- `200 OK` - Success
- `400 Bad Request` - Validation error
- `405 Method Not Allowed` - Not POST request
- `500 Internal Server Error` - Database/server error

## Testing

### Test Database Connection
```php
// test_connection.php
<?php
$pdo = new PDO("mysql:host=localhost;dbname=yourdb", "user", "pass");
echo "Connected!";
?>
```

### Test API with cURL
```bash
curl -X POST https://yourdomain.com/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Testing"}'
```

### Test in Browser Console
```javascript
fetch('https://yourdomain.com/api/contact.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test',
    message: 'This is a test message'
  })
})
.then(r => r.json())
.then(console.log);
```

## Security Headers (Production)
```php
// Add to contact.php for production
header('Access-Control-Allow-Origin: https://yourdomain.com'); // Specific domain
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
```

## Backup Database
```bash
# Via command line (if available)
mysqldump -u username -p database_name contact_submissions > backup.sql

# Restore
mysql -u username -p database_name < backup.sql
```

## Monitor Submissions
```sql
-- Create a view for easy monitoring
CREATE VIEW recent_contacts AS
SELECT name, email, subject, created_at, status
FROM contact_submissions
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
ORDER BY created_at DESC;

-- Use it
SELECT * FROM recent_contacts;
```

---

**Pro Tips:**
- Set up email forwarding for instant notifications
- Add database indexes for better performance (already included)
- Consider adding rate limiting for production
- Backup database regularly
- Monitor submission patterns for spam
