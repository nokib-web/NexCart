import React from 'react';

const Login = () => {
    return (
        <div>
            i am login
        </div>
    );
};

export default Login;


/**
 * nextcart-client/
│
├── app/
│   ├── layout.js
│   ├── globals.css
│   ├── page.js                     → Landing Page
│   │
│   ├── products/
│   │   ├── page.js                 → All products page
│   │   └── [id]/
│   │       └── page.js             → Product details page
│   │
│   ├── dashboard/
│   │   ├── layout.js               → Dashboard layout (no navbar/footer)
│   │   ├── page.js                 → Dashboard Home
│   │   ├── add-product/
│   │   │   └── page.js             → Protected
│   │   └── manage-products/
│   │       └── page.js             → Protected
│   │
│   ├── login/
│   │   └── page.js
│   ├── register/
│   │   └── page.js
│   │
│   └── api/
│       └── auth/
│           └── [...nextauth]/route.js
│
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── ProductCard.js
│   └── UserDropdown.js
│
├── public/
│   └── logo.png
│
├── tailwind.config.js
├── package.json
└── postcss.config.js

 */