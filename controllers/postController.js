const {database} = require('../db')

class postController {

    getAllCards = async (req, res) => {
        var sql = "select * from posts"
        var params = []
        database.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({"error":err.message});
                return;
            }
            res.json({
                "message":"success",
                "data":rows
            })
            });
    }

    deleteAllCards = async (req, res) => {
        var deletePosts = 'DELETE FROM posts';
        database.run(deletePosts, (err) => {
            if (!err) return
            console.log(err);
        })
    }

    addCard = async (req, res, next) => {
        try {    
            var insert = 'INSERT INTO posts (theme, dsc, date) VALUES (?,?,?)'
            database.run(insert, [req.body.theme, req.body.text, req.body.date])
            res.status;
            next()
             
        } catch (error) {
            console.log(error);
        }
    }
    
}

module.exports = new postController()