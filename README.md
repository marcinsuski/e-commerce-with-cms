# e-commerce-admin
e-commerce fullstack app with custom CMS (admin panel) done in Next.js (backend + frontend).

## 📦 Tech stack:
### Frontend
- Next.js
- TypeScript
- Redux-toolkit
- Styled Components
- Stripe

### Backend
- Next.js
- Mongoose
- Google api
- AWS S3

## 💻 Demo
Click the link and check the app:  
[Admin panel](https://e-commerce-admin-six.vercel.app/)  
[Ecommerce front](https://e-commerce-front-lyart.vercel.app/)

### Screenshot
![](./admin/public/screenshot-admin.JPG)
![](./front/public/screenshot-front.JPG)

## 💾 Installation
git clone https://github.com/marcinsuski/e-commerce-admin.git


## /admin: 
`cd admin`  
`npm install`  
`npm run dev`  

## /front:
`cd front`  
`npm install`  
`npm run dev`  

## Environment variables:
After creating your own MongoDB database, add .env file to `admin` and `front` directory and to add following data of your own:

`admin`  
_Google login:_  
GOOGLE_ID= 'your google id'  
GOOGLE_SECRET= 'your google secret'  
SECRET= 'your secret generated for google auth'
_products database_  

MONGODB_URI='mongodb+srv://<mongodb-cluster>:<password>@cluster0.sjdaogc.mongodb.net/?retryWrites=true&w=majority'  
 
_products images storage_  
S3_ACCESS_KEY="your aws access key"  
S3_SECRET_ACCESS_KEY="you aws access secret"  
  
_email to allow gmail login to admin panel_  
ADMIN_EMAIL='your email'  
  
`front`  
MONGODB_URI='mongodb+srv://<mongodb-cluster>:<password>@cluster0.sjdaogc.mongodb.net/?retryWrites=true&w=majority'  
STRIPE_SK='your stripe access SK'
STRIPE_PK='your stripe access PK'
PUBLIC_URL="public url"


## TODO: 
- Fix styled components issue on the front
- Improve validation in cart
- add categories tab and account tab
- add badges (promo, new arrivals, featured) to products
  
## ☎️ Contact
In case of any comments or advice, You can e-mail me or use Issues :)

## 🧙‍♂️ Author
- GitHub - [Marcin Suski](https://github.com/marcinsuski)
- LinkedIn - [marcin-suski](https://www.linkedin.com/in/marcin-suski/)
- Porftolio - [marcinsuski.pl](https://marcinsuski.pl)
