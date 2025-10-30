import { db } from "../helper/db_connection";

export function isAdmin(req, res, next) {
    const {email} = req.body;
    
    db.query('SELECT role FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userRole = results[0].role;
        if (userRole === 'admin') {
            next(); // User is admin, proceed to the next middleware/route handler
        } else {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }
    });
}