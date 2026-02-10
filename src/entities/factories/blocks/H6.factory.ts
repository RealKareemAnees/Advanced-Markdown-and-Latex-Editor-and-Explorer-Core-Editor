import { Parser } from "../../Parser";
import { EntityFactoryInterface } from "../Entity.factory.abstract";
import { H6Entity } from "../../entities-store/h6/H6Entity";

export class H6Factory extends EntityFactoryInterface {
    constructor(entity: H6Entity, mode = "EDITOR") {
        super(entity, mode);
    }

    render(): string {
        return this.mode === "EDITOR"
            ? this.renderEditorContent()
            : this.renderPreviewContent();
    }

    protected renderEditorContent(): string {
        const parser = new Parser(String(this.entity.DATA));
        return parser.parse();
    }

    protected renderPreviewContent(): string {
        const parser = new Parser(String(this.entity.DATA));
        return parser.parse();
    }
}
