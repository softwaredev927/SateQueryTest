const conn = require('./conn')

async function add(sate) {
    return conn.execute(
        "INSERT INTO satellites(st_id, st_launchPrice, st_launchTime, st_apr) VALUES(?,?,?,?)", [
            sate.st_id, 
            sate.st_launchPrice, 
            sate.st_launchTime, 
            sate.st_apr
        ]
    )
}

async function get(id) {
    return conn.query("SELECT * FROM satellites WHERE st_id=" + id)
}

module.exports = {
    add,
    get
}
  