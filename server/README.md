https://github.com/andreiduca/cra-ssr-code-splitting

## Owo What's this?
This is a modification of the above repository to enable `create-react-app` apps to be rendered on a server.

1. [Upgrading a create-react-app project to a SSR + Code Splitting setup](http://medium.com/bucharestjs/upgrading-a-create-react-app-project-to-a-ssr-code-splitting-setup-9da57df2040a)
2. [Adding state management with Redux in a CRA + SSR project](https://medium.com/bucharestjs/adding-state-management-with-redux-in-a-cra-srr-project-9798d74dbb3b)

## How can I see it in action?

Just install dependencies, build the app and run the express server:

```
yarn install
yarn build
yarn server
```

## Can I use this as a template for a production app?

**NO!** This repo exists only to demonstrate how to achieve SSR and Code Splitting at the same time.

_But... Why?_ --- The server app is as slim as it can get. It lacks even the most basic security features like XSS and CSRF.

**This is not a boilerplate for a production expressjs server app!!!**
