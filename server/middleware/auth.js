const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const models = require('../../db/models');
const redisClient = require('redis').createClient(process.env.REDISCLOUD_URL);

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.session.returnTo = req.originalUrl;
  res.redirect('/login');
};

module.exports.redirect = (req, res) => {
  let redirect = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(redirect);
};

module.exports.render = (req, res) => {
  res.render('index.ejs', {user: JSON.stringify(req.user)});
};

module.exports.updateAndRender = (req, res) => {
  const eventId = parseInt(req.params.id);
  const inviteId = req.query.invite;
  const recipientId = req.query.recipient;

  if (inviteId) {
    return models.Invitation.where({id: inviteId}).fetch()
      .then((invitation) => {
        if (!invitation || invitation.attributes.event_id !== eventId) {
          return res.send('bad link!');
        }

        if (invitation.attributes.rsvp === 'true') {
          return res.redirect(req.path);
        }

        invitation.save('rsvp', 'true', {method: 'update'})
          .then(() => {
            return new models.Contributor({
              user_id: req.user.id,
              event_id: eventId,
              role: 'contributor'
            }).save();
          })
          .then(() => {
            res.redirect(req.path);
          });
      });
  }

  if (recipientId) {
    return models.Recipient.where({id: recipientId}).fetch()
      .then((recipient) => {
        if (!recipient || recipient.attributes.event_id !== eventId) {
          return res.send('bad link!');
        }

        if (recipient.attributes.rsvp === 'true') {
          return res.redirect(req.path);
        }

        recipient.save('viewed', true, {method: 'update'})
          .then(() => {
            return new models.Contributor({
              user_id: req.user.id,
              event_id: eventId,
              role: 'contributor'
            }).save();
          })
          .then(() => {
            return res.redirect(req.path);
          });
      });
  }

  res.render('index.ejs', {user: JSON.stringify(req.user)});
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    host: process.env.REDISCLOUD_URL,
    port: 6379
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});
