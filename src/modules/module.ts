console.log('module');

async function start() {
  const x = await Promise.resolve('async working');
  return x;
}
start().then(console.log);
