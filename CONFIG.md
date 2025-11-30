# Environment Configuration & Credentials

## 🔐 Current Environment Variables

Your `.env.local` file should contain:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/electrostore

# NextAuth Configuration
NEXTAUTH_SECRET=electrostore_next_auth_secret_key_2024_super_secure_key_12345678
NEXTAUTH_URL=http://localhost:3000

# Cloudinary (Image Storage)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dl1iwo7ul
CLOUDINARY_API_KEY=584921912743483
CLOUDINARY_API_SECRET=_qOxDzeWSjgjLlTFfM

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
```

---

## 📋 Current Credentials

### Admin Account
```
Username: admin
Password: admin123
Email: admin@electrostore.com
```

### MongoDB
- **Status**: ✅ Connected
- **Database**: electrostore
- **Collections**: 3 (products, users, orders)
- **Records**: 17 (16 products + 1 admin)

### Cloudinary
- **Cloud Name**: dl1iwo7ul
- **Status**: ✅ Configured
- **Purpose**: Image storage and optimization

---

## 🔄 How to Change Admin Credentials

### Option 1: Using Seed Script
1. Edit `scripts/init-admin.js`:
```javascript
const adminUser = {
  username: "newusername",
  password: "newsecurepassword",
  email: "newemail@example.com"
}
```
2. Run: `npm run seed:admin`

### Option 2: MongoDB Compass
1. Open MongoDB Compass
2. Go to `electrostore.users` collection
3. Find the admin user document
4. Delete or edit the password field
5. Run the seed script to create new admin

---

## 🔑 How to Get MongoDB Connection String

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign in to your account
3. Go to Databases section
4. Click "Connect" on your cluster
5. Select "Drivers"
6. Choose "Node.js"
7. Copy the connection string
8. Replace `<username>`, `<password>`, and `<dbname>` with your credentials
9. Add to `.env.local` as `MONGODB_URI`

---

## ☁️ How to Get Cloudinary Credentials

1. Go to https://cloudinary.com/console
2. Sign in to your account
3. In the Dashboard, you'll see:
   - **Cloud Name** (your unique identifier)
   - **API Key** (shown in settings)
   - **API Secret** (shown in settings, keep secure!)
4. Add these to `.env.local`:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

---

## 🚀 Environment Variables for Vercel Deployment

When deploying to Vercel, add these environment variables in:
**Vercel Dashboard → Project Settings → Environment Variables**

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_strong_random_secret
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep `.env.local` in `.gitignore` (already done)
- Use strong passwords (minimum 12 characters)
- Rotate secrets periodically
- Use different secrets for dev/prod
- Keep API keys confidential

### ❌ DON'T:
- Commit `.env.local` to git
- Share credentials in messages/emails
- Use weak or default passwords
- Expose secrets in client-side code (use NEXT_PUBLIC_ prefix only for non-secret values)

---

## 📝 Generated Secrets Explanation

### NEXTAUTH_SECRET
- **Purpose**: Signs and encrypts session tokens
- **How to generate**: 
  ```bash
  openssl rand -base64 32
  ```
- **Keep it**: Absolutely confidential!

### MONGODB_URI Format
```
mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
```
- `username`: MongoDB Atlas user (not your email)
- `password`: Database user password
- `cluster`: Your cluster name
- `database_name`: Usually "electrostore"

---

## 🛠️ Updating Configuration

### Change MongoDB Connection
1. Edit `.env.local`
2. Update `MONGODB_URI`
3. Restart dev server: `npm run dev`

### Change Cloudinary Credentials
1. Edit `.env.local`
2. Update `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
3. Restart dev server: `npm run dev`

### Change Admin Password
1. Edit `scripts/init-admin.js`
2. Update credentials
3. Run: `npm run seed:admin`
4. Update `.env.local` `ADMIN_PASSWORD` if needed

---

## ✅ Verification Checklist

- [ ] `.env.local` exists in project root
- [ ] `MONGODB_URI` is set and valid
- [ ] `NEXTAUTH_SECRET` is set (random 32 chars)
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set
- [ ] `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` are set
- [ ] Admin credentials are updated from defaults
- [ ] `.env.local` is in `.gitignore`
- [ ] Vercel env vars match local env vars (except URLs)
- [ ] MongoDB IP whitelist includes your IP (or 0.0.0.0/0 for dev)
- [ ] All env vars reload after changes (restart dev server)

---

## 🔄 Environment Variables by Environment

### Local Development (.env.local)
```env
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=your_local_connection
```

### Vercel Production
```env
NEXTAUTH_URL=https://your-app.vercel.app
MONGODB_URI=your_production_connection
```

**Note**: Different credentials/URLs for security and data separation

---

## 🚨 If Something Goes Wrong

### Test MongoDB Connection
```bash
node scripts/init-admin.js
```
If this fails, your MONGODB_URI is incorrect.

### Test Cloudinary
Try uploading an image via the admin panel. If it fails, check API credentials.

### Reset Everything
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules

# Reinstall
npm install

# Reseed database
npm run seed
```

---

## 📞 Need Help?

- **MongoDB Issues**: Check MongoDB Atlas settings
- **Cloudinary Issues**: Verify API credentials in Cloudinary console
- **Auth Issues**: Ensure `.env.local` is reloaded (restart dev server)
- **Vercel Deployment**: Double-check all env vars are set in Vercel dashboard

---

**Last Updated**: November 30, 2025  
**Version**: Next.js 14 + MongoDB + Cloudinary
