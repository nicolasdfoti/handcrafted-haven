# Public

## Images
image storage folder, can be referenced through
@/app/public/images

## Pages
=================

### app/page
Landing page

### explore
Marketplace view | WIP
#### /[id]/view
View product listing page
#### /[id]/purchase
Purchase item view | Not implemented

### sellers
View of all sellers
#### /thankyou
Page redirect after registering
#### /[id]
Seller profile page
#### /join
Registration page for sellers currently

## SCSS
=================

### Creating an SCSS file
To create a new style sheet, go to public/styles and create a new file.scss. Regular CSS syntax AND scss syntax are valid in .scss files.

### Editing and saving an SCSS file
Be careful to not edit/create CSS files as they could potentially get overridden. Only edit the source SCSS file.
If you are running 'npm run dev:all' the SCSS file will automatically compile to src/app/styles

### SCSS Variables
If you want to use the variable list at the top of your .scss file put ' @use "variables" as \*; '


# Lib (Functions)
=================

## Data.ts
Stores functions that fetch things from the database

## db.ts
Creates a connection with the database | Potentially compress this

## definitions.ts
Stores definitions for custom object types

## form-actions.ts
Stores actions for forms | Potentially compress into actions

## products.ts
Stores functions for products

## TODO
create actions.ts
compress form-actions.ts into actions.ts
compress db.ts into Data.ts

## components.tsx
components to export

## components.module.css
components styles


# GIT COMMITS

### Commit 1

Added readme docs
Working on product detail page
Added components page (with product card and contact card), and created components.module.css
Corrected mistakes to deploy
- Add 4 category cards with different colors, a brief description for each one, and representative icons.
Added fetchFromDB function in components, to fetch from DB
- I fixed the app structure by adding a component folder and moving them there, and moving the CSS files into the UI. All imports were fixed, as was the SCSS processing. Everything is working fine.
- Nav component was changed to NavLinks
- Changed logo and styles navlink, added login button
- New section at the end separating the hero and the call to action to invite artisans to join
- Implemented and fixing Auth, when seller authenticate, redirect to sellers/id page
- If the user is not logged in and tries to enter seller/id, it redirects them to login, and if they are logged in, for example their id is 8, and they try to enter another id from the URL, it takes them to an unauthorized page.
- When user login the navbar show "Hello, user" and adding logout button, when the user is logout the navbar show the login button only
- Added sellers/join for sellers to join
- Fixed responsive header, hamb button with menu drawer