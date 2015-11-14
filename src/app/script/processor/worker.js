self.importScripts(
  './sample.js',
);

self.onmessage = (e) => {
  const workerResult = `Message recived from main script\n${e.data}`;
  self.postMessage(workerResult);
};
