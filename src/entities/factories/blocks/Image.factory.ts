import { Parser } from "../../Parser";
import { EntityFactoryInterface } from "../Entity.factory.abstract";
import { ImageEntity } from "../../entities-store/image/ImageEntity";

export class ImageFactory extends EntityFactoryInterface {
    constructor(entity: ImageEntity, mode = "EDITOR") {
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
