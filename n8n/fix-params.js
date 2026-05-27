const sqlite3 = require('/usr/local/lib/node_modules/n8n/node_modules/sqlite3');
const db = new sqlite3.Database('/home/node/.n8n/database.sqlite');

db.get("SELECT nodes FROM workflow_entity WHERE id = 'Eu2b4gqacfEOjwIO'", (err, row) => {
  if (err) { console.error(err); return; }

  const nodes = JSON.parse(row.nodes);
  const buscar = nodes.find(n => n.name === 'buscarProductos');

  // Fix: embed q parameter directly in URL and strip extra quotes from AI output
  // The AI (Mistral in ReAct mode) outputs the query with single quotes e.g. 'vestido'
  // We clean those with replace and trim, then embed directly in the URL
  buscar.parameters = {
    name: 'buscarProductos',
    description: 'Busca productos en el catalogo de Gusmuss Diamond por texto. El parametro de entrada es el termino de busqueda en espanol (ejemplo: vestido, anillo, collar). Devuelve nombre, precio, material y slug del producto.',
    url: "={{ 'http://web/api/productos/buscar?q=' + $parameter.query.replace(/'/g, '').replace(/\"/g, '').trim() }}",
    sendQuery: false
  };

  const newNodes = JSON.stringify(nodes);
  console.log('New URL expression:', buscar.parameters.url);

  db.run("UPDATE workflow_entity SET nodes = ? WHERE id = 'Eu2b4gqacfEOjwIO'", [newNodes], function(err) {
    if (err) { console.error('Update error:', err); return; }
    console.log('Updated successfully, rows changed:', this.changes);
  });
});
