const { parse } = require("url")
module.exports = (req, res) => {
    const { query } = parse(req.url, true)
    const { id = "no id provided" } = query
    res.end(id)
}
