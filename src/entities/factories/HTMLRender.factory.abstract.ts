export abstract class HTMLRenderFactoryInterface<Options> {
    constructor(private options: Options) {}

    /**
     * Factory method to create an HTML element based on the provided entity and render mode.
     *
     * @param entity - The entity containing data and options for rendering.
     * @param mode - The render mode (e.g., "EDITOR" or "PREVIEW").
     * @returns An HTML element representing the rendered entity.
     */
    abstract createRender(entity: any, mode: string): HTMLElement;
}
