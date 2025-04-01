# ServerSidePaginationAngular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.5.

## Description

**ServerSidePaginationAngular** is an Angular application that implements server-side pagination. It uses Angular Material for the user interface, optimizing performance and user experience for applications with large datasets.

## Features

- **Server-side pagination**: Efficiently paginates large sets of product data.
- **Product filtering**: Products can be filtered by name or category.
- **Currency conversion**: Allows conversion of prices between USD and EUR.
- **Product editing**: Users can edit products using an edit modal.
- **User interaction**: Users can leave comments and rate products with stars.
- **Category support**: Sidebar navigation to filter products by category.

## Prerequisites

Before starting, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or above recommended)
- [Angular CLI](https://angular.dev/cli) (version 19.2.5 or above)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone <REPOSITORY_URL>
   ```

2. Navigate to the project directory:

   ```bash
   cd server-side-pagination-angular
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

## Development Server

To start a local development server, run:

```bash
ng serve
```

Then, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify the source files.

## Code Generation

Angular CLI includes scaffolding tools for generating code. For example, to generate a new component, run:

```bash
ng generate component component-name
```

To view a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Build

To build the project, run:

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory. By default, the production build optimizes the application for performance and speed.

## Unit Tests

To run unit tests with the [Karma](https://karma-runner.github.io) testing framework, use the following command:

```bash
ng test
```

Note: Angular CLI does not include a default e2e testing framework. You can choose one that fits your needs.

## SSR Server

To run the application in server-side rendering (SSR) mode, use the following command:

```bash
npm run serve:ssr
```

This will run the Node.js server located in `dist/server-side-pagination-angular/server/server.mjs`.

## Additional Resources

For more information on using Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

---

## Project Structure

The project structure is organized as follows:

```
/src
  /app
    /core
      /models
        category.model.ts    # Defines the structure of a category
        product.model.ts     # Defines the structure of a product
      /services
        api-base.service.ts   # Generic methods to interact with the API
        product.service.ts    # Handles CRUD operations for products
        currency.service.ts   # Manages currency conversion
        storage.service.ts    # Abstracts access to local storage
    /features
      /product-list          # List of products
        product-list.component.ts
        product-list.component.html
      /product-details       # Product details
        product-details.component.ts
        product-details.component.html
    /shared
      /components
        category-sidebar.component.ts  # Sidebar for categories
      /directives
        stock-color.directive.ts       # Directive to change color based on stock
      /pipes
        currency.pipe.ts              # Formats prices according to the selected currency
  /assets
    /images
    /styles
      styles.scss
```

### Main Modules:

1. **Core Module**:
   - Essential services and models for business logic and API interaction.
   - Services like `product.service.ts`, `currency.service.ts`, and `storage.service.ts`.
   - Models like `product.model.ts` and `category.model.ts`.

2. **Features Module**:
   - `product-list`: Displays products with server-side pagination and filtering options.
   - `product-details`: Displays full product details and allows editing.

3. **Shared Module**:
   - Reusable components like the category sidebar (`category-sidebar.component.ts`).
   - Directives like `stock-color.directive.ts` that change the text color based on stock levels.
   - Pipes like `currency.pipe.ts` that formats prices according to the selected currency.

## License

This project is private and does not include an explicit license.

---

## Contribution

If you'd like to contribute to the project, please follow these steps:

1. **Fork** the repository.
2. **Create a branch** for your feature (`git checkout -b feature/my-new-feature`).
3. **Make your changes** and commit (`git commit -am 'Add new feature'`).
4. **Submit a pull request** with a clear description of what you've changed.

---

## Contact

If you have any questions, you can contact me via:

- **Email**: gonzalogestri92299@gmail.com
- **GitHub**: [https://github.com/Ggestri99](https://github.com/Ggestri99)

---

**Thank you for using this project!**

---