export const chunkBuffer = function* (str, size) {
  const numChunks = Math.ceil(str.length / size);
  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    let progress = Math.floor(((i + 1) / numChunks) * 100);
    yield { chunk: str.substr(o, size), progress: `${i + 1}-${progress}-${numChunks}` };
  }
};
