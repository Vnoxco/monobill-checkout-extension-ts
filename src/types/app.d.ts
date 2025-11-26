/**
 * Checkout Cart interface
 * Represents the shopping cart data structure
 */
export interface CheckoutCart {
    cart_items?: Array<{
        meta_data?: {
            [key: string]: any;
        };
        [key: string]: any;
    }>;
}

/**
 * Checkout API interface
 * Provides methods to interact with the checkout system
 */
export interface CheckoutApi {
    /**
     * Get the current cart data
     * @returns The current checkout cart
     */
    getCart(): CheckoutCart;

    /**
     * Register a hook handler
     * @param hook - The hook name to register
     * @param handler - The handler function
     * @returns A teardown function to unregister the hook
     */
    registerHook(
        hook: 'beforeCompleteOrder' | 'afterCompleteOrder' | 'onCartChange',
        handler: (...args: any[]) => any
    ): () => void;

    /**
     * Make an API request
     * @param method - HTTP method (GET, POST, etc.)
     * @param url - API endpoint URL
     * @param payload - Request payload (optional)
     * @returns Promise with the response data
     */
    request<T = any>(method: string, url: string, payload?: unknown): Promise<T>;

    /**
     * Shared state object
     */
    state: Record<string, any>;

    /**
     * Get or initialize shared state
     * @param initialState - Initial state value or factory function
     * @returns The state object
     */
    useState<T extends Record<string, any>>(initialState?: T | (() => T)): T;

    /**
     * Update shared state
     * @param partialState - Partial state updates
     * @returns The updated state object
     */
    setState<T extends Record<string, any>>(partialState: Partial<T>): T;
}

/**
 * Register Context interface
 * The context passed to the registerExtension function
 */
export interface RegisterContext {
    checkoutApi: {
        getCart(): CheckoutCart;
        request<T = any>(method: string, url: string, body?: unknown): Promise<T>;
        registerHook(name: 'beforeCompleteOrder' | 'onCartChange', fn: (...args: any[]) => any): () => void;
        useState<T extends Record<string, any>>(initialState?: T | (() => T)): T;
        setState<T extends Record<string, any>>(partialState: Partial<T>): T;
    };
}

