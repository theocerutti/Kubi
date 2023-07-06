const k8s = require('@kubernetes/client-node');

const express = require('express');
const app = express();
const crypto = require('crypto');

const { Registry, collectDefaultMetrics, Gauge } = require('prom-client');

// Set up k8s client
const kc = new k8s.KubeConfig();
kc.loadFromCluster();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const id = crypto.randomBytes(16).toString("hex");

const registry = new Registry();
const requestGauge = new Gauge({
  name: 'request_gauge',
  help: 'Number of requests',
  registers: [registry],
});

collectDefaultMetrics({ register: registry });

// respond with "hello world" when a GET request is made to the homepage
app.get('/', async function (req, res) {
  // const pods = await k8sApi.listNamespacedPod('default');
  // const podNames = pods.body.items.map(pod => `${pod.metadata.name}: ${pod.status.podIP}`);
  // res.send(`Hello world from "${id}" [${podNames.join(', ')}]`);
  res.send("Hello World")
  requestGauge.inc();
});

app.get('/metrics', async function (req, res) {
  res.setHeader('Content-Type', registry.contentType);
  res.status(200).send(await registry.metrics());
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});