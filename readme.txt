run "node server.js"
works locally

tried adding server.js code to folder "api/index.js"
tried adding index.js to root

Routes do not work when deployed.
clicking "store" redirects to store.html which is not found
directly navigations to deploymenturl/store also is not found


404: NOT_FOUND
Code: NOT_FOUND
ID: cle1::8j2ql-1727118787847-32f10ab29ec8

Read our documentation to learn more about this error.


https://vercel.com/docs/functions/functions-api-reference
"\If you're not using a framework, you must either add "type": "module" to your package.json or change your JavaScript Functions' file extensions from .js to .mjs"

After adding "type": "module" to package.json
Error is now:

This Serverless Function has crashed.

Your connection is working correctly.

Vercel is working correctly.

500: INTERNAL_SERVER_ERROR
Code: FUNCTION_INVOCATION_FAILED
ID: cle1::ghcr6-1727199469468-5894d6dd6037

If you are a visitor, contact the website owner or try again later.
If you are the owner, learn how to fix the error and check the logs.




after switching "type":"commonjs" instead of module
now the error route works (app.all'*')
but test route not loading









https://vercel.com/guides/npm-run-start-not-working
says here that I cannot simply run "node server.js" to run the express server