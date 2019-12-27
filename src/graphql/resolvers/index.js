const bcrypt = require('bcrypt');

const Event = require('../../models/events');
const User = require('../../models/users');

const events = eventIds => {
  return Event.find({ _id: { $in: eventIds } })
    .then(events => {
      return events.map(event => {
        return {
          ...event._doc,
          creator: user.bind(this, event.creator)
        }
      })
    })
    .catch(err => {
      throw err
    })
};

const user = userId => {
  return User.findById(userId)
    .then(user => {
      return {
        ...user._doc,
        password: null,
        createdEvents: events.bind(this, user._doc.createdEvents)
      }
    })
    .catch(err => {
      throw err
    })
};

module.exports = {
  events: () => {
    return Event.find()
      .then(events => {
        return events.map(event => {
          return {
            ...event._doc,
            creator: user.bind(this, event._doc.creator)
          }
        })
      }).catch(err => {
        console.log(err);
        return err;
      });
  },
  createEvent: (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5e0670f870a212013f2d52cb'
    });
    let createdEvent;
    return event
      .save()
      .then(result => {
        createdEvent = {
          ...result._doc,
          creator: user.bind(this, result._doc.creator)
        };
        return User.findById('5e0670f870a212013f2d52cb')
      })
      .then(user => {
        if (!user) {
          throw new Error('User doesn\'t exist')
        }
        user.createdEvents.push(event);
        return user.save();
      })
      .then(result => {
        return createdEvent;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  },
  createUser: (args) => {
    return User.findOne({email: args.userInput.email})
      .then(user => {
        if (user) {
          throw new Error('User exists already')
        }
        return bcrypt.hash(args.userInput.password, 12)
      })
      .then(hashedPassword => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        });
        return user.save();
      })
      .then(result => {
        console.log(result);
        return {...result._doc, password: null }
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
};
