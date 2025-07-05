const server = http.createServer(async (req, res) => {
  if (req.method === 'GET') {
    const content = await fs.readFile(path.join(basePath, 'index.html'));
    res.setHeader('Content-Type', 'text/html'); // устанавливаем тип контента
    res.writeHead(200, { 'Content-Length': 'text/html' }); // устанавливаем заголовки
    res.end(content); // отправляем ответ
  } else if (req.method === 'POST') {
    const body = [];
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

    req.on('data', (data) => {
      body.push(Buffer.from(data)); // получаем данные
    });

    req.on('end', () => {
      const title = body.toString().split('=')[1].replaceAll('+', ' ');
      addNote(title);

      res.end(`Title: ${title}`);
    });
  }
});