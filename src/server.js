const express = require('express');

require('dotenv').config();

// const AdminBro = require('admin-bro');
const { default: AdminBro } = require('admin-bro');
const options = require('./admin.options');
const buildAdminRouter = require('./admin.router');
const mongoose = require('mongoose');
const cors = require('cors');

const { User } = require('./users/users.enitity');
const { MemoryGames } = require('./games/memorygame/memory.game.entity');
const { QuizGames } = require('./games/quizgame/quiz.game.entity');

var multer = require('multer');

var fs = require('fs');

//. . .

const app = express();
const port = process.env.PORT || 8080;
const dbURI = process.env.MONGO_DB;

// const corsOption = {
// 	origin: ['http://localhost:3000'],
// }; * all options
app.use(cors());

const runServer = async () => {
	await mongoose
		.connect(dbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((result) => console.log('mongodb connected successfully'))
		.catch((error) => console.log(error));
	const admin = new AdminBro(options);
	const router = buildAdminRouter(admin); // default value for router `/admin`

	app.use(admin.options.rootPath, router);

	app.listen(port, () => console.log(`app at http://localhost:${port}`));
};

// api all users data
app.get('/all-users', (req, res) => {
	User.find({}, (err, users) => {
		if (err) {
			res.send(err);
		}
		res.json(users);
	});
});

// api user data by id
app.get('/all-users/:id', (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) {
			res.send(err);
		}
		res.json(user);
	});
});

//api all memory games data
app.get('/MemoryGames', (req, res) => {
	MemoryGames.find({}, (err, games) => {
		if (err) {
			res.send(err);
		}
		res.json(games);
	});
});
app.use('/uploads', express.static('uploads'));

app.get('/QuizGames', (req, res) => {
	QuizGames.find({}, (err, games) => {
		if (err) {
			res.send(err);
		}
		res.json(games);
	});
});

module.exports = { runServer, app };

// var upload = multer({ dest: 'upload/' });
// var type = upload.single('file');

// app.post('/upload', type, function (req, res) {
// 	var tmp_path = req.files.recfile.path;
// 	var target_path = 'uploads/' + req.files.recfile.name;
// 	fs.readFile(tmp_path, function (err, data) {
// 		fs.writeFile(target_path, data, function (err) {
// 			res.render('complete');
// 		});
// 	});
// });

// var storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, './public/uploads/');
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, Date.now() + path.extname(file.originalname));
// 	},
// });

// const fileFilter = (req, file, cb) => {
// 	if (
// 		file.mimetype === 'image/jpeg' ||
// 		file.mimetype === 'image/png' ||
// 		file.mimetype === 'image/jpg' ||
// 		file.mimetype === 'image/svg' ||
// 		file.mimetype === 'image/JPG'
// 	) {
// 		cb(null, true);
// 	} else {
// 		cb(null, false);
// 	}
// };

// var upload = multer({ storage: storage });

// app.post('/uploadForm', upload.single('uploadImage'), async (req, res) => {
// 	if (req.file) {
// 		const pathName = req.file.path;
// 		res.send(req.file, pathName);
// 	}
// });

// app.post('/postImage', (req, res) => {})

// const corsOptions = {
// 	origin: 'http://localhost:3000',
// 	credentials: true, //access-control-allow-credentials:true
// 	optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// app.use(function (req, res, next) {
// 	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
// 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// 	next();
// });
