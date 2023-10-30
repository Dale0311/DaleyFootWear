# Daley Footwear

## Live <a href="https://cheerful-cactus-ec721d.netlify.app">Here</a>

### Questions

##### 1. what is the website?

It is a ecommerce for shoes, basically the client want to sell shoes online

##### 2. Scope?

User can view and perform read and write in their cart if they're authorize

##### 3. Types of user

- Guest/Unauthorize can access the following:
  home, products, product details, login and signup

- Authenticated user:
  home, products, product details, cart, login and signup

##### 4. what are the major components?

- home
- products
- product details
- cart
- login
- signup

##### 5. what is website name and tagline?

- Daely Footwear
- Discover shoes online with a premier shoe sanctuary's digital
  debut.

### Tree components hierarchy

```React
<App>
    <Home />
    <Products>
        <ProductDetails />
    </Products>
    <Cart />
    <Login />
    <Sign Up />
</App>
```

### Details of each major component

##### Home

- Hero section
- Feature Section
- Sale Section
- New Stock

##### Products

- Card of Product
  img, title, price, quantity, rating
- Filter
  - Price, Stock
- Search

##### Product Details

- Card that containss
  img, title, price, quantity, rating, description
- Size
  lg, md, sm
- Quantity #it should not be greater than quantity of the stock shoes
- Go Back, Add to Cart

##### Cart

- First the user needs to be authenticated before accessing this route
- View all the products that the user added to their cart.
- functionalities:
  Can get the total price
  Can select which one to buy

##### Login

- Auth the user email and password
- link to sign up

##### Sign up

- create a Email and password

### Modeling of State management

```React
const storeBound = create({
    products: ["fetch from api"]
    user: {} //current user
    onCart: {specific to user}

    <!-- Some actions here -->
})
```

### Apis

1. products api - contains all of the shoes product, from rapidApi

2. user - from firebase

3. onCart - from firebase

### Resources to use

- React - barebone
- React Router - to create spa
- Axios - to fetch
- Zustand - state management
- Firebase - database and auth
- Tanstack Query - to manage fetch request and response
- Tailwindcss - css framework use by shadcn
- Shadcn - component ready to use
- rapidApi - for api shoes

### Bugs and features that i cannot quite fix or create

1. render login when im @cart for split second during reload
2. database relation, as I can only perform basic query in firebase
3. no loaders for atleast 80% of my fetching
4. i didn't use tanstack query at all but its installed as dependency

### To learn and improve

1. promises, like promise state
2. form and form validation like react forms
3. code structure, I know im suck at this.
4. <b>DESIGN UX UI.</b>
5. Environment variables for masking right haha
6. and many more.................

### Update 10/30/2023

1. @cart edit: input:text -> input:number
2. @cart table: checkout and total
   checkout and total price of the cart should not be in the scrollable when it's on mobile view
