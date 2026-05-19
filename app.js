const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.json({ message: "Hello from GCP Cloud Native App!" });
});
// Liveness probe — Kubernetes checks this to know if the app is alive
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'alive' });
});

// Readiness probe — delays traffic until the app is ready
let isReady = false;
setTimeout(() => { isReady = true; }, 5000);

app.get('/ready', (req, res) => {
  if (isReady) {
    res.status(200).json({ status: 'ready' });
  } else {
    res.status(503).json({ status: 'not ready yet' });
  }
});
app.listen(3000);