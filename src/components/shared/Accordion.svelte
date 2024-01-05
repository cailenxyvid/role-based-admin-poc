<script>
    export let title
    export let icon = null

    let toggleOpen = ()=>{ open = !open }

    let open = false;
</script>

<div class="accordion inline">    
    <div class="header cursor-pointer" on:click={toggleOpen} on:keypress={toggleOpen}>
        {#if icon}
        <i class="fa fa-{icon} mr-3"></i>
        {/if}
        {title}
        <i class="fa fa-caret-{ open ? 'up' : 'down'}" aria-hidden="true"></i>
    </div>
    {#if open}
        <div class="content">
            <slot></slot>
        </div>
    {/if}
</div>