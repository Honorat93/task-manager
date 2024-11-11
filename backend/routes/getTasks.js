"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tasks_1 = require("../data/tasks");
/**
 * GET /tasks
 * Description: Récupère et renvoie la liste de toutes les taches
 * Paramètres: Aucun
 * Réponse:
 *   - 200 OK: Retourne un objet JSON contenant un tableau des taches
 *   Exemple de réponse:
 *   {
 *     "tasks": [
 *       { "id": "1", "title": "Tache 1" },
 *       { "id": "2", "title": "Tache 2" }
 *     ]
 *   }
 */
function getTasks(req, res) {
    console.log("GET /tasks - Récupération des tâches");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ tasks: tasks_1.default }));
}
exports.default = getTasks;