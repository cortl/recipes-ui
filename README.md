# Recipes 🧑‍🍳

This project is used to host my collection of [recipes](https://github.com/cortl/recipes) on [recipes.cortlan.dev](https://recipes.cortlan.dev). Built with Typescript and Next.js, using GraphQL, deployed on Google Cloud using Github Actions.

## Getting Started 🚀

Create a file `.env.local` and put this in it, this is for Google Analytics to pick up page url changes

```
NEXT_PUBLIC_GOOGLE_ANALYTICS=YOUR_GOOGLE_ANALYTICS_ID
```

### Local Development
1. `nvm use`
2. `npm install`
3.  `npm run dev`

### Production Development
1. `nvm use`
2. `npm install`
3. `npm run build`
4. `npm start`
