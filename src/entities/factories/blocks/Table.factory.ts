import { Parser } from "../../Parser";
import { EntityFactoryInterface } from "../Entity.factory.abstract";
import { TableEntity } from "../../entities-store/table/TableEntity";

export class TableFactory extends EntityFactoryInterface {
    constructor(entity: TableEntity, mode = "EDITOR") {
        super(entity, mode);
    }

    render(): string {
        return this.mode === "EDITOR"
            ? this.renderEditorContent()
            : this.renderPreviewContent();
    }

    protected renderEditorContent(): string {
        const parser = new Parser(JSON.stringify(this.entity.DATA || []));
        return parser.parse();
    }

    protected renderPreviewContent(): string {
        const parser = new Parser(JSON.stringify(this.entity.DATA || []));
        return parser.parse();
    }
}
