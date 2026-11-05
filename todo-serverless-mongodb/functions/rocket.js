exports.handler = function (event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify([
      'Falcon 1',
      'Falcon 1e',
      'Falcon 9  v1.0',
      'Falcon 9 v1.1',
      'Falcon 9 Full Thrust',
      'Falcon Heavy',
    ]),
  });
};
