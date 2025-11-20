# ⚠️ FIX "Failed to fetch" Error

## The Problem
You're getting "Failed to fetch" because the app doesn't know where your Hostinger API is.

## The Solution (2 Steps)

### Step 1: Update .env File

1. **Open the file**: `.env` (in your project root folder)

2. **Find this line**:
```
VITE_API_URL=https://yourdomain.com/api/contact.php
```

3. **Replace with YOUR actual Hostinger domain**:

**IF you already uploaded contact.php to Hostinger:**
```
VITE_API_URL=https://yoursite.com/api/contact.php
```
Replace `yoursite.com` with your real domain (e.g., `zenithscs.com.au`)

**IF you haven't uploaded to Hostinger yet:**
You have 2 options:

**Option A - Test with Production (Recommended):**
1. First complete the Hostinger setup from `SETUP_CONTACT_FORM.md`
2. Upload `contact.php` to Hostinger
3. Then update `.env` with your Hostinger URL

**Option B - Skip for now:**
The form won't work until you upload to Hostinger, but you can still develop the UI

### Step 2: Restart Your Dev Server

After changing `.env`, you MUST restart:

```bash
# Press Ctrl+C to stop the server
# Then start again:
npm run dev
```

---

## 🎯 Example Setup

**If your Hostinger domain is `zenithscs.com.au`:**

1. Edit `.env`:
```
VITE_API_URL=https://zenithscs.com.au/api/contact.php
```

2. Restart server:
```bash
npm run dev
```

3. Test the form at: http://localhost:3001/contact

---

## ✅ How to Know It's Working

**Before fixing:**
- Error: "Failed to fetch"
- Browser console shows connection error

**After fixing:**
- Form submits successfully
- You see "Message sent successfully!"
- Data appears in your Hostinger database (phpMyAdmin)

---

## 🔍 Verify Your Setup

Open browser console (F12) when you submit the form. You should see:

```
🚀 Sending form to: https://yoursite.com/api/contact.php
✅ Response: {success: true, message: "Message sent successfully!"}
```

If you see errors, they'll tell you exactly what's wrong!

---

## 📋 Complete Checklist

Before the form will work, you need:

- [ ] Database table created in Hostinger phpMyAdmin
- [ ] `contact.php` uploaded to `public_html/api/` on Hostinger
- [ ] Database credentials updated in `contact.php`
- [ ] `.env` file updated with your Hostinger domain
- [ ] Dev server restarted after `.env` change

**If you haven't done these steps yet, see `SETUP_CONTACT_FORM.md`**

---

## 🆘 Still Getting Errors?

### Error: "API not configured"
- You need to update `.env` with your real domain
- Restart the dev server

### Error: "Failed to fetch"
- Check if you uploaded `contact.php` to Hostinger
- Verify your domain is correct in `.env`
- Make sure you restarted the server

### Error: "CORS error"
- Your `contact.php` file has CORS headers (it should work)
- Try accessing the API directly: `https://yoursite.com/api/contact.php`

### Error: "500 Internal Server Error"
- Check database credentials in `contact.php`
- View Hostinger error logs: hPanel → Files → Error Logs

---

## 💡 Pro Tip

You can test if your API is accessible by visiting it directly in your browser:

`https://yoursite.com/api/contact.php`

You should see:
```json
{"success":false,"message":"Method not allowed"}
```

This means the API is working! (It shows "Method not allowed" because you need to POST data, not just visit it)
