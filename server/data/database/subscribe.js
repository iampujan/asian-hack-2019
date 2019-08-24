const { Subscribe } = require('./models');

const subscribeDevice = async subscribeInfo => {
  const subscribe = new Subscribe(subscribeInfo);
  const resp = await subscribe.save().catch(err => {});
  return resp;
};

const unsubscribeDevice = async subscribeInfo => {
  const resp = Subscribe.findOneAndDelete(subscribeInfo).catch(err => {});
  return resp;
};

module.exports = { subscribeDevice, unsubscribeDevice };
