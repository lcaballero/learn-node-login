

# Leaning Stuff

This project is just a way to learn how to write the login process with Node.
There is very little here.  It doesn't even use a database or a cache like
store such as MongoDB or Redis.

# Pages

See routes.js

Also these pages:

```
/
/login
/logout
/home
```

# Expected (but may not be working)

Root `/` is restricted and should redirect to `/login` if you have not logged in yet.
Once on login you can enter the credentials `lucas` and `login` to login.  Once submitted
the page should redirect to `/home`.

That's all she wrote up to this point.

# Install

1.  Clone the project
1.  Run `npm install`
1.  Run `node app/index.js`
1.  Navigate to localhost:4000/


# References

[Session]
[Postgres]
[NodePool]
[Passport]
[AuthExample]

[Session]: http://blog.modulus.io/nodejs-and-express-sessions "Session Stuff"
[Postgres]: https://github.com/brianc/node-postgres/wiki/Client
[NodePool]: https://github.com/coopernurse/node-pool "generic-pool"
[Passport]: http://passportjs.org/
[AuthExample]: https://github.com/visionmedia/express/blob/master/examples/auth/app.js
