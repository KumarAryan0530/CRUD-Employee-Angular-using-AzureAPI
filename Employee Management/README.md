# Employee Management (Angular)

A small Angular application for managing employee records. This repository contains the frontend application, components, services, and configuration used to display, add, and edit employees.

**Quick Start**

- **Prerequisites:** Node.js (>= 14) and npm. Verify with `node -v` and `npm -v`.
- **Install dependencies:**

```
npm install
```

- **Run dev server:**

```
npm start
```

- **Run tests:**

```
npm test
```

The dev server runs the Angular app (see `package.json` scripts). Open your browser at `http://localhost:4200/` (or the address logged by the server).

**Project Structure (important files)**

- **`src/`**: Application source.
  - **`src/index.html`**: App shell.
  - **`src/main.ts`**: App bootstrap.
  - **`src/styles.css`**: Global styles.
  - **`src/app/`**: App code and configuration.
    - **`app.ts`**: Application entry and module setup.
    - **`app.routes.ts`**: Route definitions.
    - **`app.config.ts`**: App-level configuration values.
    - **`components/`**: UI components.
      - **`employee-list/`**: Employee list view and logic (`employee-list.component.ts`, template, styles).
      - **`employee-form-dialog/`**: Dialog/form for adding or editing employees.
    - **`services/employee.service.ts`**: Service for employee operations (fetching, creating, updating). This is the primary place to change how the app talks to the backend API.
    - **`config/api.config.ts`**: API base URL and related endpoints.
    - **`models/employee.model.ts`**: Employee model/interface used across the app.
    - **`app.spec.ts`**: High-level tests for app setup.

**Environments**

- **`src/environments/environment.ts`** and **`environment.prod.ts`**: Environment-specific variables (API endpoints, flags). Update these to point the app at different backend environments.

**API / Backend**

- The frontend expects a REST API defined in `src/app/config/api.config.ts`. Look at `employee.service.ts` for the exact endpoints used (e.g., list, get, create, update). To connect to your backend, update the API base URL in `api.config.ts` or the environment files.

**Development notes & tips**

- To change where the app calls the backend, update `src/app/config/api.config.ts` or modify `src/environments/*` and rebuild.
- Components follow a simple pattern: each has a `.ts` controller, `.html` template, and `.scss` (or `.css`) styles.
- `employee.service.ts` is a good place to add caching, error handling, or switch to a different HTTP library.

**Scripts**

- `npm start`: Runs the dev server.
- `npm test`: Run tests configured in the project.

**Contributing**

- Fork the repo and open a pull request with a descriptive title.
- Run `npm install` and `npm test` before submitting changes.

**License**

This repository currently has no license file. Add a `LICENSE` file if you want to clarify reuse and redistribution terms.

---

If you want, I can also:

- Add a short `CONTRIBUTING.md` with a PR checklist.
- Add a `LICENSE` file (BSD/MIT/Apache) you prefer.
- Add quick screenshots and API examples to this `README.md`.

Let me know which of those you'd like next.
