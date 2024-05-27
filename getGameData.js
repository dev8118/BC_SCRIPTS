const Database = require("better-sqlite3")
const db = new Database("sqlite-database.db")

const apiEndpoint =  'https://bc.game/api/game/support/bet-log/all-bet/crash/'

const setup = () => {
    db.prepare(`CREATE TABLE IF NOT EXISTS bc_crash_history(
        gameId INTEGER PRIMARY KEY,
        time BIGINT,
        hash VARCHAR(100),
        maxRate INTEGER
    )`).run()
}

const getGameDataFromApi = async (gameId) => {
    const result = await fetch(`${apiEndpoint}/${gameId}/`, {method: 'GET'})
    console.log(result);
    const time = result.data.time
    const hash = result.data.extend.hash
    const maxRate = result.data.extend.maxRate
    return({gameId, time, hash, maxRate})
}

const run = async (min, max) => {
    for(let i = min; i <= max; i++) {
        const {gameId, time, hash, maxRate} = await getGameDataFromApi(i);
        const check = db.prepare('SELECT * FROM bc_crash_history WHERE gameId = ?').get(i)
        if(check) continue
        const row = db.prepare('INSERT INTO bc_crash_history (gameId, time, hash, maxRate) VALUES (?, ?, ?, ?)').run(gameId, time, hash, maxRate);
        console.log(row);
    }
}

setup()
run(6800000, 6864140)