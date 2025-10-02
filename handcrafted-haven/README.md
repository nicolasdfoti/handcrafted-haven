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
Registration page for sellers currently
#### /thankyou
page redirect after registering
#### /[id]
Seller profile page

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