# Project Changelog Summary

## Init: Monorepo Workspace
- Created `pnpm-workspace.yaml`.
- Created root `package.json`.
- Created directories for `apps/host/remotes`.

## Phase 1: Host Scaffolding
- Added `apps/host/package.json` with dependencies for Webpack 5, Navigo, Redux Toolkit, and Vitest.
- Added `apps/host/webpack.config.js` with Module Federation configuration consuming `budgT` and `splittR`.

## Phase 1: Host Core Logic
- Created `apps/host/src/store.js` implementing a Redux Toolkit `authSlice`.
- Created `apps/host/src/router.js` configuring Navigo for `/`, `/app-a`, and `/app-b`. Used `updatePageLinks` for v8 compatibility.
- Created `apps/host/src/index.html` with static Mega Menu and `#micro-frontend-container`.
- Created `apps/host/src/main.js` and `apps/host/src/index.js` to bootstrap the Host.

## Phase 1: Host Tests
- Created `apps/host/vitest.config.js` with jsdom.
- Created `apps/host/tests/host.test.js` to verify Redux store and Navigo router.

## Phase 1: Scaffold App A (budgT)
- Created `apps/host/remotes/budgT/package.json` for React environment.
- Created `apps/host/remotes/budgT/webpack.config.js` exposing `./app` via Module Federation.
- Created `apps/host/remotes/budgT/src/app.js` with a minimal React mount function.

## Phase 1: Scaffold App B (splittR)
- Created `apps/host/remotes/splittR/package.json`.
- Created `apps/host/remotes/splittR/webpack.config.js` exposing `./app` via Module Federation.
- Created `apps/host/remotes/splittR/src/app.js` with a minimal mount placeholder simulating Angular bootstrap.
