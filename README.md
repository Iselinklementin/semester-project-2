# Semester Project 2

We needed to create an e-commerce website that had both customer-facing and admin sections.
Both sections needed to be responsive and populated by a Strapi API.

## Brief
Design your website using your favourite tool. You will need to create a suitable logo.
You must apply all that you have learned in your studies so far.
The site must have a good user experience and UI design, following today’s trends and design patterns.

Build a frontend with home, product list, product detail and cart pages.
Build admin pages to create, update and delete products.

**The home page must include:**

    A hero banner with an image that is uploaded to Strapi. You can find this in the Home single type in the provided Strapi project.
    A list of featured products. On Strapi products can be marked as ‘featured’. When a product is marked as ‘featured’ it should be displayed on the homepage. You can find the products in the Products collection type.

**Bold Text** The products page must include:

    A list of all products added to Strapi. Each product must display its title, price and image. The product should link to its products detail page.
    A search text box. When searching (filtering), only the products that include the searched text in their title or description should be listed.


**Bold Text** Product details page is reached by a user clicking on a product on the product list page. The product details page must include:

    title
    description
    image
    price
    an add to cart button. This will toggle the product in and out of a cart array stored in local storage.

The cart/basket page must display a list of all products added to the cart.
Load the items that have been added to local storage and display them on the page. If the cart is empty display a message indicating this.
After the list of products, display the total price of all the products in the cart.

**Bold Text** Each product in the cart must display:

    title
    price
    a link to the product view page
    image


## Admin section

The admin section must only be accessible to logged in admin users and must include the following features.

**Bold Text** Login/Logout
Create an admin login form that allows administrator users to login. Use local storage to keep the user logged in.
When logged in, display a logout button in the layout that logs the user out. Logging out should not clear the cart.

**Bold Text** Add/edit products
Create form(s) that allow products to be added and edited. The form must allow the user to toggle whether a product is featured.

**Bold Text** Product images
For adding/editing product images use either of these 2 methods:

    Use a file upload field to upload images to Strapi, or
    Use a text input that allows a URL to be entered. This allows an image from an external URL to be used as the product image.

**Bold Text** Delete existing product
Allow products to be deleted. Before a product is deleted you must display a confirmation dialog.
The product should only be deleted if the user confirms.

The API MUST be publicly hosted and accessible, you cannot submit a custom API with your frontend code.

**Bold Text** FAQ

    You can use CSS libraries like Bootstrap.
    Use either Sass or Styled Components for your styles. Using BEM is optional but using proper class names is important.
    Use vanilla (regular) JavaScript for the project and split your code up using modules (imports/exports).
    You can use small JS libraries to perform tasks such as formatting dates with Moment.js

**Bold Text** Marking criteria

    All functionality should be implemented.
    The design should be coherent and provide a good user experience.
    All the customer-facing and admin pages must be fully responsive.
    Use appropriate names for Sass classes and folders.
    All code should be properly formatted and arranged with sensible variable and function names.
    Use modules (imports/exports) to organise your code.

## Grade: A