//Filter video games
router.get('/video_games-filter', async (req, res) => {
    let query = "SELECT video_games.id, release_date, video_games.name AS video_games_name, category.name AS category_name, developer.name as developer_name FROM video_games INNER JOIN category ON video_games.category_id = category.id INNER JOIN developer ON video_games.developer_id = developer.id";
    let name_order = '';
    const parameters = [];
    const wheres = [];
    let parameterCount = 1;
  
    if(req.query.sort === 'video_games_name') {
      query += ' ORDER BY video_games_name';
      name_order = '_DESC';
    } else if(req.query.sort === 'video_games_name_DESC') {
      query += ' ORDER BY video_games_name DESC';
    } else if (req.query.sort === 'category_name') {
      query += ' ORDER BY category_name';
      name_order = '_DESC';
    } else if(req.query.sort === 'category_name_DESC') {
      query += ' ORDER BY category_name DESC';
    } else if (req.query.sort === 'developer_name') {
      query += ' ORDER BY developer_name';
      name_order = '_DESC';
    } else if(req.query.sort === 'developer_name_DESC') {
      query += ' ORDER BY developer_name DESC';
    } else if (req.query.sort === 'release_date') {
      query += ' ORDER BY release_date';
      name_order = '_DESC';
    } else if(req.query.sort === 'release_date_DESC') {
      query += ' ORDER BY release_date DESC';
    }
  
    if (req.query.video_games_name) {
      wheres.push(' video_games.name ILIKE $' + parameterCount);
      parameters.push('%' + req.query.video_games_name + '%');
      parameterCount += 1;
    }
    
    if (req.query.category_name) {
      wheres.push(' category.name ILIKE $' + parameterCount);
      parameters.push('%' + req.query.category_name + '%');
      parameterCount += 1;
    }
    
    if (req.query.developer_name) {
      wheres.push(' developer.name ILIKE $' + parameterCount);
      parameters.push('%' + req.query.developer_name + '%');
      parameterCount += 1;
    }
    
    if (req.query.release_date) {
      wheres.push(' release_date = $' + parameterCount);
      parameters.push(req.query.release_date);
      parameterCount += 1;
    } 
  
    if(parameters.length > 0) {
      query += ' WHERE ' + wheres.join(' AND ');
    }
  
    const result = await db.query(query, parameters);
    res.render('video_games-filter', { rows: result.rows, query, parameters, name_order });
  });