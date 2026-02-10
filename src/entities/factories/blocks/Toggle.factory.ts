import { Parser } from "../../Parser";
import { EntityFactoryInterface } from "../Entity.factory.abstract";
import { ToggleEntity } from "../../entities-store/toggle/ToggleEntity";

export class ToggleFactory extends EntityFactoryInterface {
    constructor(entity: ToggleEntity, mode = "EDITOR") {
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
