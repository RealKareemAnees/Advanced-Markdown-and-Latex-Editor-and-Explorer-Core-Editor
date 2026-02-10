import type { BlockEntityInterface } from "../../../types/BlockEntity.interface";
import type { ContainerInterface } from "../../../types/Container.interface";

/**
 * this should only render one single entity, and should be used in the HTMLRenderFactory to render the entity based on the type
 * the only one responsibility is to give use an HTML element based on the entity and the render mode (editor or preview)
 *
 */
export abstract class ContainerRenderFactoryInterface {
    protected container: ContainerInterface;

    constructor(
        protected entity: BlockEntityInterface,
        container: ContainerInterface,
    ) {
        this.container = container;
    }

    /**
     * Returns the container interface associated with this render factory.
     *
     * @returns The container interface instance.
     */
    get CONTAINER(): ContainerInterface {
        return this.container;
    }

    protected abstract renderEditorContent(): ContainerRenderFactoryInterface;

    protected abstract renderPreviewContent(): ContainerRenderFactoryInterface;

    protected abstract shipToDOM(): void;
}
