export default {
    
    template: `
        <div class="grid place-items-center bg-black w-full h-full overflow-y-auto bg-opacity-60 absolute top-0 z-10">
            <div class="bg-blue-100 rounded-lg p-1 min-w-1/2 max-w-lg min-h-1/2 grid place-items-center">
                <header class="p-2">
                    <slot name="header">default header</slot>
                </header>
                <div class="p-2">
                    <slot>default body</slot>
                </div>
        
                <footer class="p-2 border-t-2 w-full border-blue-300 grid place-items-center">
                    <slot name="footer">default footer</slot>
                </footer>
            </div>
        </div>
    `, 

}