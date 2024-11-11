import { IncomingMessage, ServerResponse } from 'http';
import getTasks from './routes/getTasks';
import postTask from './routes/postTask';

function router(req: IncomingMessage, res: ServerResponse): void {
  const { method, url } = req;
  console.log(`Requête reçue : ${method} ${url}`);


  // Ajout des entetes cors 
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(204);  
    res.end();
    return;
  }

  if (method === 'GET' && url === '/tasks') {
    return getTasks(req, res);
  }

  if (method === 'POST' && url === '/tasks') {
    return postTask(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
}

export default router;
