<nav id="EventControls" class="relative container">
    <div class="flex space-x-4 ml-4 items-center">
        <span class="cursor-pointer flex w-20 space-x-2 items-center">
            <slot name="views"></slot>      
        </span>
        <span class="text-5xl flex-grow text-center">
            <slot name="title"></slot>
        </span>
        <span class="w-20">
            <slot name="status"></slot>
        </span>            
    </div>    
</nav>
