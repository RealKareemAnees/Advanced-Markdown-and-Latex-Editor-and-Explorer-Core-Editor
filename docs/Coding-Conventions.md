# Rules

## General

- The app is OOP in terms of architecture, so main components and state-holding components are classes; anything else should be pure functions.

- Every file should be unit tested, at least with initialization and construction.

- As a visual application, there should not be many errors unless users try to mess with the app in an inappropriate way. Any errors in rendering will lead to displaying nothing in the entity.

## Coding

- Every file is documented in the heading with comments that explain it.

- Every function/method/class should be explained with JSDoc.

- Every step should have a nice inline comment that explains it.

- Any constant, readonly, getter, or setter must be in `CAPITAL_LETTERS`.

- All interface names should end with `Interface`. The same pattern applies for types, enums, and abstracts.

- All class names should end with their pattern, example: `ClassSomethingSingleton`.

- Every file should only have one default export; use only named exports otherwise.

- Private methods should start with `_` and be expressed as private. Only expose the minimal interface.
