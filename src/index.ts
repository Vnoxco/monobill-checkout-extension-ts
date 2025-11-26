import type { defineComponent as DefineComponentFn } from 'vue';
import type { RegisterContext } from './types/app';

import App from './App.vue';

// Get Vue runtime from global scope (provided by the checkout system)
const vueRuntime = (globalThis as any).Vue;
const defineComponent: typeof DefineComponentFn = 
    (vueRuntime && vueRuntime.defineComponent) || 
    (((options: any) => options));

/**
 * Example Checkout Extension
 * 
 * This is a bare-bones example of a checkout extension.
 * It demonstrates the basic structure and API usage without any domain-specific logic.
 */
export default {
    // Mount point: where this extension will be rendered in the checkout
    // Options: 'summary', 'payment', 'shipping', etc.
    mountPoint: 'summary',

    /**
     * Register the extension
     * This function is called by the checkout system to initialize your extension
     * 
     * @param context - The registration context containing checkoutApi
     * @returns A Vue component definition
     */
    registerExtension({ checkoutApi }: RegisterContext) {
        return defineComponent({
            components: { App },
            template: '<App />',
            provide() {
                return {
                    checkoutApi,
                };
            },
        });
    },
};

