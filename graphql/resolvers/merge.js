const { dateToString } = require("../../helpers/date");
const DataLoader = require("dataloader");

const User = require("../../models/users");
const Event = require("../../models/events");

const eventLoader = new DataLoader(eventIds => {
  return events(eventIds);
});

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => transformEvent(event));
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    return await eventLoader.load(eventId.toString());
  } catch (err) {
    throw err;
  }
};

const userLoader = new DataLoader(userIds => {
  return User.find({ _id: { $in: userIds } });
});

const singleUser = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      password: null,
      createdEvents: eventLoader.load.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

const transformEvent = event => ({
  ...event._doc,
  date: dateToString(event._doc.date),
  creator: singleUser.bind(this, event.creator)
});

const transformUser = async user => {
  return await singleUser(user.id)
};

exports.transformEvent = transformEvent;
exports.transformUser = transformUser;