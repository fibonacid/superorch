const bcrypt = require('bcrypt');

const Event = require('../../models/events');
const User = require('../../models/users');

const events = async eventIds => {
  try {
    const events = await Event.find({_id: {$in: eventIds}});
    events.map(event => {
      return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator)
      }
    });
    return events;
  } catch (err) {
    throw err
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      password: null,
      createdEvents: events.bind(this, user._doc.createdEvents)
    }
  } catch (err) {
    throw err
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return {
          ...event._doc,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator)
        }
      });
    } catch (err) {
      console.log(err);
      return err
    }
  },

  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5e0670f870a212013f2d52cb'
    });
    let createdEvent;
    try {
      const eventSaveResult = await event.save();

      createdEvent = {
        ...eventSaveResult._doc,
        date: new Date(eventSaveResult._doc.date).toISOString(),
        creator: user.bind(this, eventSaveResult._doc.creator)
      };

      const creator = await User.findById('5e0670f870a212013f2d52cb');

      if (!creator) {
        throw new Error('User doesn\'t exist')
      }
      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({email: args.userInput.email});

      if (existingUser) {
        throw new Error('User exists already')
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)

      const newUser = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await newUser.save();
      console.log(result);

      return {...result._doc, password: null}
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};
