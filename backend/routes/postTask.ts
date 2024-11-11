import { ServerResponse, IncomingMessage } from "http";
import { v4 as uuidv4 } from "uuid";
import tasks, { Task } from "../data/tasks";

/**
 * POST /tasks
 * Description: Ajoute une nouvelle tache à la liste des taches
 * Body JSON requis: { "title": "Nom de la tache" }
 * Réponses:
 *   - 201 Created: La tahce a été créée avec succès, renvoie un objet JSON de la nouvelle tache
 *     Exemple de réponse: { "id": "abc123", "title": "Nouvelle tache" }
 *   - 400 Bad Request: Retourne une erreur si le champ title est manquant ou si le JSON est invalide.
 *     Exemple d'erreur: { "error": "Le titre est obligatoire" }
 */
function postTask(req: IncomingMessage, res: ServerResponse): void {
    let body = '';

    // On écoute les morceaux de données reçues dans la requête et on les ajoute à body
    req.on('data', chunk => {
        body += chunk;
    });

    // Une fois que toute la requête est reçue, on tente de traiter le JSON
    req.on('end', () => {
        try {
            const { title } = JSON.parse(body);

            if(!title) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Le titre est obligatoire' }));
                return;
            }
             
            // Création de la nouvelle tâche avec un id unique
            const newTask: Task = { id: uuidv4(), title };
            tasks.push(newTask);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newTask));
        } catch {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Le JSON est invalide !' }));
        }
    });
}

export default postTask;
