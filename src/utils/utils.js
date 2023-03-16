export const chunkBuffer = function* (str, size) {
  const numChunks = Math.ceil(str.length / size);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    console.log(`${i} of ${numChunks}`);

    yield str.substr(o, size);
  }
};
