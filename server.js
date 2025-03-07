const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const cookieParser = require('cookie-parser');
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const auth = require('./middleware/auth')
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(auth);
app.use("/admin",adminRouter)
app.use("/user",userRouter)

app.use((req, res, next) => {
    console.log('Session:', req.session);
    next();
});

// MySQL connection pool
const dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'khanakhajan'
};

const sessionStore = new MySQLStore(dbOptions);

// Configure session middleware
app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { 
        maxAge: 1000 * 60 * 60, // 1 hour
        httpOnly: true, // Prevents JavaScript from accessing the cookie
        secure: false, // Set to true if using HTTPS
        sameSite: "lax" // Allows sending cookies across different domains
    }
}));

// app.get("/", async (req, res)=> {
//     try {
//         const connection = await mysql.createConnection(dbOptions);
//         const [result] = await connection.execute("select * from user");
//         res.json(result)
//     } catch (err) {
//         res.send(err)
//     }
// })

// Registration route (password hashing with bcrypt)
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const connection = await mysql.createConnection(dbOptions);
        await connection.execute('INSERT INTO user (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.send('User registered successfully');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Login route (password verification with bcrypt)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const connection = await mysql.createConnection(dbOptions);
        const [rows] = await connection.execute('SELECT * FROM user WHERE username = ?', [username]);

        if (rows.length > 0) {
            const match = await bcrypt.compare(password, rows[0].password);
            if (match) {
                req.session.userId = rows[0].user_id;  // Store session data
                
                req.session.save(err => {  // Ensure session is saved
                    if (err) {
                        console.error('Session save error:', err);
                        return res.status(500).send('Error saving session');
                    }

                    console.log('Session saved:', req.session);
                    res.send('Logged in successfully');
                });
            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    }
});

// Protected route
app.get('/dashboard', (req, res) => {
    console.log('Session in /dashboard:', req.session);
    
    if (req.session && req.session.userId) {
        res.send(`Welcome to your dashboard, User ID: ${req.session.userId}`);
    } else {
        res.status(401).send('Please login to access this page');
    }
});

//logout functionality

app.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send('Error logging out');
            }

            res.clearCookie('connect.sid'); // Remove session cookie
            res.send('Logged out successfully');
        });
    } else {
        res.status(400).send('No active session');
    }
});



app.listen(7000, () => {
    console.log('Server started on http://localhost:7000');
});