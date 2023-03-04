export default {
    template: `
        <button 
            :class="{
                'inline-flex justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm': true,
                'text-white bg-blue-500 hover:bg-blue-600': theme === 'blue',
                'text-white bg-red-500 hover:bg-red-600': theme === 'red',
                'text-gray-900 bg-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50': theme === 'white',
                'w-full sm:w-auto': size === 'small',
                'w-auto': size === 'auto',
            }"
            :disabled="disabled"
        >
            <slot />
        </button>
    `,

    props: {
        theme: {
            type: String,
            default: 'blue'
        },

        size: {
            type: String,
            default: 'auto' 
        },
        
        disabled: {
            type: Boolean,
            default: false,
        },
    }
}