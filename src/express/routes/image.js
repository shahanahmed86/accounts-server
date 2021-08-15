import { existsSync } from 'fs';
import { Router } from 'express';

const router = Router();

//downloading images
router.get(`/:filename`, (req, res) => {
	const { filename } = req.params;
	let file;
	if (filename === 'logo.png') file = './src/assets/logo.png';
	else file = `./uploads/${filename}`;

	if (existsSync(file)) return res.download(file);
	res.status(404).send('file not found...');
});

export default router;
