# Monorepo Migration and Enhancement Plan

This document outlines the steps required to perform three major updates to the `mf-monorepo` workspace. This plan is designed to be executed by an agent, so each step is described with precise commands and expected outcomes.

## Table of Contents

1.  Doubts and Call-outs
2.  Task 1: Migrate `mf-monorepo` from JavaScript to TypeScript
3.  Task 2: Migrate `budgT` app from npm to pnpm
4.  Task 3: Link Monorepo Applications using pnpm Workspaces

---

## Doubts and Call-outs

*   **Source Code Access**: This plan is based on general best practices and the provided context files. I do not have access to the source code of `mf-monorepo`, `budgT`, or `splitTheBills`. The file paths and package names (`app-a`, `app-b`) are assumptions. These will need to be verified against the actual project structure.
*   **Angular Version**: The plan for TypeScript migration in "angular app-b" assumes it's a modern Angular application, which is already based on TypeScript. If it's an older AngularJS (1.x) application, the migration process will be more complex. [6, 7]
*   **`splittR` vs `splitTheBills`**: You mentioned linking `splittR` to the `splitTheBills` app. I am assuming `splittR` is the name of an application inside `mf-monorepo` that will consume the `splitTheBills` package. Please confirm this naming.
*   **Workspace Root**: The `mf-monorepo.code-workspace` file is located inside the `mf-monorepo` directory, but references sibling directories (`../budgT`, `../splitTheBills`). This suggests the true project root is the parent directory of `mf-monorepo`. This plan assumes all `pnpm workspace` commands will be run from that root directory.

---

## Task 1: Migrate `mf-monorepo` from JavaScript to TypeScript

This task involves converting the React (`app-a`) and Angular (`app-b`) applications inside `mf-monorepo` to TypeScript. The migration can be done incrementally. [15, 18]

### 1.1. Install TypeScript and Type Definitions

For each application (`app-a` and `app-b`), navigate to its directory and install the necessary dependencies.

**For React app (`app-a`):**

```bash
cd mf-monorepo/app-a
npm install --save-dev typescript @types/node @types/react @types/react-dom @types/jest
```

### 1.2. Create `tsconfig.json`

Create a `tsconfig.json` file in the root of each application. A good starting point for a React app is:

**File: `mf-monorepo/app-a/tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```

**Note on Angular (`app-b`):** If it's a modern Angular app, it should already have TypeScript configured. If not, a similar process of adding `typescript` and a `tsconfig.json` will be required. [6]

### 1.3. Rename Files

Incrementally rename JavaScript files (`.js`, `.jsx`) to their TypeScript counterparts (`.ts`, `.tsx`). [8, 11]

*   For React components using JSX: `MyComponent.js` -> `MyComponent.tsx`
*   For plain JavaScript files: `utils.js` -> `utils.ts`

### 1.4. Fix Type Errors

After renaming files, the TypeScript compiler will likely show errors.

*   Start the TypeScript compiler in watch mode to get live feedback: `tsc --watch`.
*   Address the errors by adding appropriate types to variables, function parameters, and component props.
*   For complex issues or third-party libraries without types, you can use `any` as a temporary escape hatch and create a follow-up task to replace it with a stricter type.

### 1.5. Update Build Tooling

Ensure your build process (e.g., Webpack, Vite, Rsbuild) is configured to handle TypeScript files. If you are using Create React App, this is often handled automatically after installing TypeScript and renaming files. [11]

---

## Task 2: Migrate `budgT` app from npm to pnpm

This task will switch the package manager for the `budgT` application to `pnpm`. [10, 16]

### 2.1. Install pnpm

If not already installed, install pnpm globally.

```bash
npm install -g pnpm
```

### 2.2. Import Existing Dependencies

Navigate to the `budgT` directory. Use the `pnpm import` command to generate a `pnpm-lock.yaml` file from the existing `package-lock.json`. [23, 25]

```bash
cd ../budgT
pnpm import
```

### 2.3. Clean Up and Install

Remove the old npm artifacts and install dependencies using pnpm.

```bash
rm -rf node_modules package-lock.json
pnpm install
```

### 2.4. Enforce pnpm Usage (Optional but Recommended)

To prevent accidental use of other package managers, add a `preinstall` script to `budgT/package.json`. [10]

```json
"scripts": {
  "preinstall": "npx only-allow pnpm",
  "...": "..."
}
```

---

## Task 3: Link Monorepo Applications using pnpm Workspaces

This task will set up a pnpm workspace to manage the `mf-monorepo`, `budgT`, and `splitTheBills` projects together. [1, 2, 4]

### 3.1. Create Workspace Configuration

In the root directory (the parent of `mf-monorepo`), create a `pnpm-workspace.yaml` file.

**File: `../pnpm-workspace.yaml`**
```yaml
packages:
  - 'mf-monorepo/*'
  - 'budgT'
  - 'splitTheBills'
```

### 3.2. Add Workspace Dependencies

Update the `package.json` files of the applications within `mf-monorepo` (`app-a`, `app-b`) to reference the local packages using the `workspace:` protocol.

**In `mf-monorepo/app-a/package.json` (assuming it uses `budgT`):**
```json
"dependencies": {
  "budgT": "workspace:*"
}
```

**In `mf-monorepo/app-b/package.json` (assuming it's the `splittR` app using `splitTheBills`):**
```json
"dependencies": {
  "splitTheBills": "workspace:*"
}
```

### 3.3. Install All Dependencies

From the root directory (where `pnpm-workspace.yaml` is located), run `pnpm install`. This will install all dependencies for all projects and create symlinks for the local workspace packages.

```bash
cd .. 
pnpm install
```

After this step, `app-a` will import `budgT` directly from the local `../budgT` folder, and the same for `app-b` and `splitTheBills`.
