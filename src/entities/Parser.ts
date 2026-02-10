/**
 * this takes a an entity and returns and html for it, it parses it to translate inline elements into html, things like latex, highlighting and so on, it is used by renderer
 */
export class Parser {
    constructor(private content: string) {}

    parse(): string {
        return String(this.content);
    }
}
