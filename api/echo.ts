import { parse } from "url"
import { IncomingMessage, ServerResponse } from "http";

export default (req: IncomingMessage, res: ServerResponse) => {
    const { query } = parse(req.url as string, true)
    const { id = "no id provided" } = query
    res.end(id)
}
