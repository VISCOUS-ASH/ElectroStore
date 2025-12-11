# ElectroStore Next.js - Complete Setup Checklist

## ✅ Pre-Setup Requirements

- [ ] **Node.js 18+** installed
- [ ] **npm 9+** or yarn installed  
- [ ] **MongoDB Account** created (Atlas recommended)
- [ ] **Cloudinary Account** created
- [ ] Git installed (for deployment)

---

## 📋 Step 1: Environment Setup

### 1.1 Verify Environment Variables

Check your `.env.local` file has all required variables:

```bash
# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/electrostore

# Authentication
NEXTAUTH_SECRET=electrostore_next_auth_secret_key_2024_super_secure_key_12345678
NEXTAUTH_URL=http://localhost:3000

# Cloudinary (Image Storage)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Credentials (Change these!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
```

### 1.2 Get Your Credentials

**MongoDB:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Create a database user
4. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/electrostore`

**Cloudinary:**
1. Go to https://cloudinary.com/console
2. Copy Cloud Name, API Key, API Secret
3. Add to `.env.local`

---

## 📦 Step 2: Install Dependencies

```bash
# Install all packages
npm install

# Verify installation
npm list mongoose cloudinary
```

**If installation fails:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

---

## 🗄️ Step 3: Initialize Database

### 3.1 Create Admin User

```bash
npm run seed:admin
```

**Output should show:**
```
✅ Connected to MongoDB
✅ Admin user created successfully
   Username: admin
   Password: admin123
   Email: admin@electrostore.com
```

### 3.2 Seed Products

```bash
npm run seed:products
```

**Output should show:**
```
✅ Connected to MongoDB
✅ Successfully seeded 16 products
📊 Products by category:
   - Smartphones: 4
   - Laptops: 4
   - Audio: 4
   - Accessories: 4
```

### 3.3 Or Run Both Together

```bash
npm run seed
```

**If seeding fails:**
- Check MongoDB connection string is correct
- Verify you can access MongoDB Atlas
- Check database user permissions
- Try removing existing data: `db.products.deleteMany({})`

---

## 🚀 Step 4: Run Development Server

```bash
npm run dev
```

**Output should show:**
```
> ElectroStore next dev
> ▲ Next.js 14.0.4
> ✓ Ready in XXXms
> ✓ GET http://localhost:3000
```

---

## 🧪 Step 5: Test Everything

### 5.1 Test Home Page
- [ ] Visit http://localhost:3000
- [ ] Check featured products load
- [ ] Test dark mode toggle (top-right)
- [ ] Verify responsive design

### 5.2 Test Products Page
- [ ] Visit http://localhost:3000/products
- [ ] Search for a product
- [ ] Filter by category
- [ ] Click on a product to see details

### 5.3 Test Shopping Cart
- [ ] Add product to cart
- [ ] Go to /cart
- [ ] Update quantities
- [ ] Verify total price calculation

### 5.4 Test Checkout
- [ ] Click "Proceed to Checkout"
- [ ] Fill in shipping info
- [ ] Place order
- [ ] Check order success page

### 5.5 Test Admin Login
- [ ] Visit http://localhost:3000/admin/login
- [ ] Login with: admin / admin123
- [ ] Should redirect to /admin/dashboard
- [ ] View dashboard stats

### 5.6 Test Other Pages
- [ ] /about - About page loads
- [ ] /contact - Contact form visible
- [ ] /faq - FAQ accordion works
- [ ] All links work properly

---

## 🔌 API Routes to Test

### Products API
```bash
# Get all products
curl http://localhost:3000/api/products

# Get featured products
curl http://localhost:3000/api/products?featured=true

# Get single product (replace ID with actual MongoDB ID)
curl http://localhost:3000/api/products/{id}
```

### Admin Login API
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Create Order API
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"name": "iPhone 15 Pro", "price": 134900, "quantity": 1}],
    "customerInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "9999999999",
      "address": "123 Main St",
      "city": "Tech City",
      "state": "TC",
      "zipCode": "12345",
      "country": "India"
    },
    "subtotal": 134900,
    "tax": 24282,
    "shipping": 0,
    "totalPrice": 159182,
    "paymentInfo": {"method": "card", "status": "pending"},
    "status": "pending"
  }'
```

---

## ⚠️ Common Issues & Solutions

### Issue: "MONGODB_URI is not set"
**Solution:**
- Ensure `.env.local` exists in project root
- Check MONGODB_URI variable is present
- Restart dev server after adding to .env.local

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Verify MongoDB connection string is correct
- Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for local testing)
- Ensure database user credentials are correct
- Try connection string in MongoDB Compass first

### Issue: "Cloudinary upload fails"
**Solution:**
- Verify NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is correct
- Check API Key and Secret are correct
- Ensure image size is under 100MB
- Check cloudinary folder permissions

### Issue: "Admin login doesn't work"
**Solution:**
- Verify admin user was created: `npm run seed:admin`
- Check username is "admin" (case-sensitive)
- Check password is "admin123"
- Clear browser cookies and try again

### Issue: "Products don't appear on home page"
**Solution:**
- Run `npm run seed:products` to populate database
- Check MongoDB has data: use MongoDB Compass
- Verify API route returns data: test /api/products in browser
- Check browser console for errors (F12)

### Issue: "Images not loading"
**Solution:**
- Check NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set
- Verify images are from valid sources
- Check Next.js Image optimization isn't blocking
- Try different image URLs

---

## 🏗️ Build & Production

### Build for Production
```bash
npm run build
```

**Should output:**
```
✓ Compiled successfully
✓ Linting and type checking
✓ Build complete
```

### Test Production Build
```bash
npm run build
npm start
```

Visit http://localhost:3000

---

## 📤 Deploy to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "ElectroStore Next.js Migration"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables in Vercel dashboard
5. Deploy

### 3. Add Environment Variables in Vercel
- MONGODB_URI
- NEXTAUTH_SECRET
- NEXTAUTH_URL (set to your Vercel domain)
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

---

## 🎯 Performance Checklist

- [ ] Database queries are optimized
- [ ] Images are optimized via Cloudinary
- [ ] Cart state persists in localStorage
- [ ] Dark mode works smoothly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] API responses under 500ms
- [ ] Build time under 60 seconds

---

## 🔐 Security Checklist

- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] Admin password is changed from default
- [ ] Environment variables not committed to git
- [ ] MongoDB IP whitelist configured
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] API routes validate input

---

## 📚 Remaining Tasks

### High Priority
- [ ] Complete admin product manager UI
- [ ] Add admin orders management
- [ ] Implement image upload to Cloudinary
- [ ] Add payment gateway integration
- [ ] Setup email notifications

### Medium Priority
- [ ] Add user authentication
- [ ] Implement wish list feature
- [ ] Add product reviews
- [ ] Setup email service
- [ ] Add SEO optimization

### Low Priority
- [ ] Analytics integration
- [ ] Social media sharing
- [ ] Chat support
- [ ] Mobile app
- [ ] Progressive Web App

---

## 📞 Support Resources

- **MongoDB Docs**: https://docs.mongodb.com/
- **Next.js Docs**: https://nextjs.org/docs
- **Cloudinary Docs**: https://cloudinary.com/documentation
- **Vercel Docs**: https://vercel.com/docs

---

## ✨ Summary

**Your ElectroStore site should be:**
- ✅ Running on http://localhost:3000
- ✅ Connected to MongoDB
- ✅ Displaying 16 products
- ✅ Admin login working
- ✅ Cart functional
- ✅ Checkout process complete
- ✅ Ready for customization
- ✅ Ready for production deployment

**Next Steps:**
1. Test everything from the checklist above
2. Customize design/branding as needed
3. Add payment integration
4. Deploy to Vercel
5. Monitor and maintain

Good luck! 🚀
