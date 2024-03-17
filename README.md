# Sloneek test exam ✅

This is my implementation of Sloneek UI code exam in Angular. Due to missing `README` content I went with full API implementation while trying to follow as many recommendations as possible.

Before I started, I updated this repository to latest Angular version which is `17.2.3` at the moment, mainly due to extensive `signal` support which I wanted to try out so badly instead of going with traditional `@Input`, primitive variable double binding, `effect` or `.takeUntil(this.$ngDestroy)` / `.subscribe` approach. And I personally like it although it's not yet widely adopted thus probably not ready for pruduction deployments of larger applications 🙌😊

## Backend communication

I know there was preference for REST API communication, however Swagger docs are missing important typing such as response types of auth end-points, etc., these could be fixed by modifying response decorators within Nest.js, but that's also probably not a scope of this test. With that being said, I went with GraphQL because it provides instant and 100% accurate API documentation and allows codegen tools to generate API types in Typescript from it seemlesly.

## UI Framework - Nebular

As requested, I used Nebular UI framework for the project. I used it for the layout and for main visual components, however there is plenty of missing features such as plain table and most of available components are not very flexible so it required some gymnastics to make it work 😊

If this was on me to decide, I would probably pick [ng-zorro](https://ng.ant.design/components/overview/en) any day over Nebular mainly due to grid system, responsive support, more data components in overall and mainly due to flexible and extendable components where some input renders always accept `<ng-template>` so you can always render what you want depending on the context.

Additionaly I would go with custom components based on Tailwind CSS, probably heavily inspired by [Shadcn UI](https://ui.shadcn.com/examples/mail) and wrote everything from scratch.

## Unit tests

I created unit tests just for few files, basically for one of each kind such as component, effect, reducer, etc. as 100% test coverage is probably not in the scope of this exam.

## Missing features 😒

- Unexpected error handling on screens
- Refresh token logic _(that would probably be an extra I did not have any free time left to do, we can discuss on the call)_
- Responsive design _(this we can discuss on the call as well, however Nebular is missing any responsive component/grid support as far as I know, but we can definitely go through responsive design and I can share my thoughts)_

