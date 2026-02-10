import type { BlockEntityInterface } from "../../types/BlockEntity.interface";

/**
 * this should only render one single entity, and should be used in the HTMLRenderFactory to render the entity based on the type
 * the only one responsibility is to give use an HTML string representation of the entity, and the Renderer will be responsible for putting it in the DOM and handling the events
 *
 */
export abstract class EntityFactoryInterface {
    constructor(
        protected entity: BlockEntityInterface<any, any>,
        protected mode = "EDITOR",
    ) {}

    abstract render(): string;

    protected abstract renderEditorContent(): string;

    protected abstract renderPreviewContent(): string;
}
