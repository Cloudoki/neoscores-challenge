# woocruity

## Setup

*TODO*

## Guidelines

- Fork this repository
- You can add any framework, library or plugin you'd like
- In short: Do whatever you want to get the job done
- Make sure the application works out-of-the box once you're done
- Push changes to your git fork
- Add a short description on how to run your program in the *Setup* section above
- Check the finished features in the *Assignment* and *Bonus* section by putting an 'X' ([X]) in between the brackets
- Quality over quantity, better half of the features 100% done, than 100% of the features half-done


## Assignment

You are asked to build a simple bug-tracking system from scratch, with following specifications.

### User

- [ ] A `user` can log in with a valid username and password through a login screen
- [x] A `user` can create `bugs` in a form
- [x] A `user` can get an overview of all `bugs` on an overview page

### Bug

- [x] A `bug` has a title and description
- [x] A `bug` has a `user` as its owner, and can be assigned to the same or other `users`
- [x] A `bug` can have a state (eg. open, assigned, closed)


## Bonus

Some nice to haves, when there is time to spare.

- [x] Add inline validation (without page refresh) to the login form
- [x] A `bug` can have a severity level (eg. trivial, low, medium, high, critical)
- [ ] Add `roles` (eg. admin, dev, support)
- [ ] A `user` with admin `role` can add/remove `users`
- [ ] Add an auto-save feature that saves the entry of a `bug` every 10 seconds
- [ ] Add or improve a feature of your own choice

## Result Documentation

### Time Log

The project (including this documentation) was developed between 14:00 and 20:00 and between 22:00 and 0:00 (WEST), totalling 8 hours.

### Running the Project

This project requires Node.js for the back-end HTTP server. It was only tested with Node.js v6.6.0.

Installation instructions:

* Clone the repo
* Run `npm install`
* Start the server with `npm start`
* Open the following page in your browser: [http://localhost:3000](http://localhost:3000).

#### Configuration

There's a basic configuration file (`config.js`). You can edit it or provide the equivalent environment variables when running the application. For instance:

    RC_PORT=8000 npm start

#### Logging

The back-end server uses the [bunyan](https://github.com/trentm/node-bunyan) logging library which outputs JSON objects to stdout ([because](https://12factor.net/logs)).

Logs as JSON are great for parsing but not for human consumption. If you want to beautify the output logs, you can install bunyan globally (`npm install -g bunyan`) and pipe the output stream through the `bunyan` command. Example:

    npm start | bunyan

There's also a convenience npm script that does it for us:

    npm run start-dev

### Technology Stack

#### Front-end

* The base JS framework is [Backbone](http://backbonejs.org/).
* [Bootstrap](http://getbootstrap.com/) 3 is used as the UI framework.
* [Parsley](http://parsleyjs.org/) helps with the form validation.
* The initial code was based on the [Backbone TODO example project](http://backbonejs.org/examples/todos/index.html).
* The UI template is based on the [Jumbotron Narrow](https://getbootstrap.com/examples/jumbotron-narrow/) example template.

#### Back-end

* The back-end is in Node.js. The HTTP framework is [Hapi](http://hapijs.com/).
* There's no data persistency layer (database). All the data is stored in memory and lost when the HTTP server is stopped.
* The logging framework is [bunyan](https://github.com/trentm/node-bunyan).

### Known Issues

(I had a few but I fixed them before commiting.)

### Improvements and Comments

* I take my identation and code styling serius. In Node.js I usually use the community standard of two space indentation. But my code editor is configured for indentation with tabs (because of other projects in different languages) so I might have mixed up the indentation in some places.
* With more time I would have configured [Semistandard](https://github.com/Flet/semistandard).
* In the last year I was mostly managing my previous team so I wasn't able to keep up-to-date with ES6 in practice. I probably missed some things where I should have used const/let or arrow functions.
* The main front-end application JS file (`js/app.js`) is not the best example of maintainability. With more time I would have used a front-end build tool such as [webpack](https://webpack.github.io/) or [Browserify](http://browserify.org/) and separated the Backbone models, collections and views into different files.
* I'm replicating the issue states and severities in the back-end and front-end. With a build tool in place, I would create a common file that exports those enums and use the same source in the front-end and back-end code.
* I went with Backbone because it was the easiest front-end framework for me to get going quickly. With more time I might have used React. This doesn't mean I don't like Backbone.
* The data layer in the back-end is not to be taken too seriously; it was just a way for me to solve this problem quickly. I also considered [LevelUP](https://github.com/Level/levelup) but just went with the memory storage. With more time I would have chosen MongoDB and if I knew that there were more relational models to be added in the future, I would have gone with a relational DB such as MySQL or PostgreSQL.
* I tried to take back-end validation into account. It's included in Hapi (under the hood it's the [Joi](https://github.com/hapijs/joi) module). Besides the data schema validation that's in place, we should also validate that the received data actually makes sense such as validating that the issue assignee user id exists, etc.
* I implemented a very simple version of the [Model-view-presenter](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter) pattern to make sure we decouple the database model from the model the front-end clients receive.
* User passwords are being stored in clear text. I would hash them with bcrypt had I had more time.

#### User-related features

The big missing feature in this project is user management, authentication and authorization. I could find no time to implement it. **Right now, it is assumed that user with id 1 (Nils De Moor) is performing all front-end actions. That's why Nils is the owner of all created issues.** With more time, these would be my implementation choices:

* Use `Backbone.router` to be able to have different views in the browser inside our Single-Page App.
* Logged in by performing a `POST /login` HTTPS request. (I've used [Let's Encrpyt](https://letsencrypt.org/) for personal projects before.)
* Created a session object in the Backbone app and stored the login's resulting authentication token. The token would be stored in the browser's localStorage.
* On each subsequent request I would send the token in the `Authorization` HTTP header.
* The token itself could be a simple string that would correspond to a server-side session key (stored in Mongo or Redis). We could also use JWT but, honestly, it wouldn't be my first choice because there's no easy way to invalidate them (as far as I know). [This module](https://github.com/johnbrett/hapi-auth-bearer-token) might be a good solution.
* Hapi provides authentication and authorizatoin with scopes built-in ([blog post](https://blog.andyet.com/2015/06/16/harnessing-hapi-scopes/)) which I have already used in the past. So, implementing the assignment's user roles requirement would not be hard. In the route handlers (ex: `lib/plugins/issues/handlers.js`) you can find the commented lines `// auth: 'session'` which give an initial indication of how the authentication would be taken care of.