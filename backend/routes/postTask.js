"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var tasks_1 = require("../data/tasks");
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
function postTask(req, res) {
    var body = '';
    // On écoute les morceaux de données reçues dans la requête et on les ajoute à body
    req.on('data', function (chunk) {
        body += chunk;
    });
    // Une fois que toute la requête est reçue, on tente de traiter le JSON
    req.on('end', function () {
        try {
            var title = JSON.parse(body).title;
            if (!title) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Le titre est obligatoire' }));
                return;
            }
            // Création de la nouvelle tâche avec un id unique
            var newTask = { id: (0, uuid_1.v4)(), title: title };
            tasks_1.default.push(newTask);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newTask));
        }
        catch (_a) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Le JSON est invalide !' }));
        }
    });
}
exports.default = postTask;
