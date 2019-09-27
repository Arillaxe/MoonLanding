const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 80;

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'MoonLandingFinished.html')));

app.use(express.static(__dirname))
	.listen(port, () => console.log(`Server running on port ${port}`));
