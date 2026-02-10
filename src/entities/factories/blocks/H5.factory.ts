import { Parser } from "../../Parser";
import { EntityFactoryInterface } from "../Entity.factory.abstract";
import { H5Entity } from "../../entities-store/h5/H5Entity";

export class H5Factory extends EntityFactoryInterface {
    constructor(entity: H5Entity, mode = "EDITOR") {
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
