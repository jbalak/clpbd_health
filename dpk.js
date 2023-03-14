const { isDef, getHash, getString } = require("./helper");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  const { partitionKey } = event;

  let candidate = null;
  if (!isDef(event)) {
    return TRIVIAL_PARTITION_KEY;
  }

  const partitionKeyString = getString(partitionKey);
  const eventHash = getHash(event);

  if (isDef(partitionKeyString)) {
    candidate = partitionKeyString;
  } else if (isDef(eventHash)) {
    candidate = eventHash;
  }

  if (isDef(candidate)) {
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      return getHash(candidate);
    } else {
      return candidate;
    }
  }
};
