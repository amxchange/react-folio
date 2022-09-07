# AMX UI COMPONENTS

## Overview

-   Folder Structure
-   React Router
-   Redux / Redux-toolkit
-   Configured for SCSS/SASS
-   Prettier
-   Configured webpack / webpack-dev-server
-   Imports using Aliases
-   code splitting using React lazy loading
-   React ErrorBoundary, PrivateRoute, Toast, Modal & other utilities

> [Please follow this import style for better code readability](#imports-style)

### Folder Structure

Mix of strategies to achieve efficient performance for the defined requirements.

Top level project architecture (which is under src/ folder) is inspired by hybrid structure. No extra files here, except the index files (main & template, including global state index). This way it will be clear and understandable. All the concerned files coupled with respective package.

```
- src/
  - index.html (app template)
  - index.js (main file)
  - store.js (or global state)
  - m-app/ (or app/)
  - d-app/ (or app2/)
  - shared/ (or common/)
```

---

**index.js** : Main (entry) file of the project. Takes care of rendering App tree based on whether App opened in mobile browser or desktop browser. Initiates global store shared between all packages.

**m-app Package** : This package holds mobile browser related components (Responsive web). Idea is to keep the behaviour as an independent package, but unlike monorepo architecture we will register dependencies with parent package.json. index.js is the main (entry) file of the package and renders app tree specific to m-app. routes.js takes care of all the routes for m-app. Modules folder holds all the app modules.
Note - we need to just keep the stuff specific and used only for mobile web here and uplift as much business/functionality logic as you can to the shared/ (common) folder which we are going to see further.

```
- src/m-app/
  - index.js
  - routes.js
  - modules/
    - Dashboard/
      - index.jsx
      - dashboard.hooks.js ( custom hooks )
      - dashboard.slice.js ( redux stuff. Used redux-toolkit for efficient Redux development )
      - dashboard.hoc.jsx ( since you have liberty to use class components as well )
      - dashboard.redux.js ( redux stuff. If not using redux-toolkit, we can have reducers, actions & constants at on place for a module )
      - SubComponent/
        -index.jsx
```

---

**shared Folder** : This package structure is similar to m-app/d-app. It will hold all the potential reusable stuff amongst other packages.
It is recommended to have as much as business logic here so that we are in a good shape at the time of scaling. No routes involved. Purely resuable stuff (think of it as a super class from other package will inherit code)

```
- src/shared/
  - config/
  - constants/
  - modules/
    - same as above
  - resources/
  - services/
  - styles/
  - utils/
```

---

**d-app Package** : : This package holds desktop browser related components. Again idea and structure is same as m-app/shared package.
Note - we need to just keep the stuff specific and used only for desktop web here and uplift as much business/functionality logic as you can to the shared/ (common) folder.

```
- src/d-app/
  - same as m-app
```

---

## Imports Style

Order should be as below

```
Imports from node_modules

Absolute Imports

Relative Imports
```

example:

```jsx
import React from "react";
import { uniqBy } from "lodash";

import "./style.scss";

import Navbar from "@shared/modules/layout/Navbar";
```

## Installation

1. Clone the repository: `git clone https://github.com/amxchange/react-folio.git`
2. cd to the directory
3. Install the dependencies: `npm install`
4. Run the application: `npm run dev`



