export default {
    
    template: `
        <div class="relative z-10" aria-labelledby="modal-title"
            role="dialog" aria-modal="true"
        >
            <div class="fixed inset-0 bg-black bg-opacity-60 
                transition-opacity"
            >
            </div>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center
                    p-4 text-center"
                >

                    <div class="relative transform overflow-hidden rounded-lg
                        bg-blue-100 text-center p-5 shadow-xl transition-all sm:my-8 sm:w-auto sm:max-w-lg"
                    >

                        <div class="bg-blue-100 space-y-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center
                                    justify-center rounded-full bg-blue-300"
                                >
                                    <slot name="image">
                                        <img src="/src/assets/infusionTimerIcon.png" width="30" height="30" aria-hidden="true">
                                    </slot>
                                </div>
                            </div>
                            
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 space-y-4">
                                    <h3 class="text-base font-semibold leading-6 text-blue-800" id="modal-title">
                                        <slot name ="header">
                                            Default Header
                                        </slot>
                                    </h3>
                                    <div class="mt-2">
                                        <p class="text-sm space-y-2">
                                            <slot>
                                                Default Body
                                            </slot>
                                        </p>
                                    </div>
                            </div>

                            <div class="bg-blue-100 py-3">
                                <slot name="footer">
                                    <button type="button" class="inline-flex w-full justify-center 
                                        rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white 
                                        shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto"
                                    >
                                        Accept
                                    </button>
                                    <button type="button" class="mt-3 inline-flex w-full justify-center 
                                        rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm 
                                        ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    `,

}