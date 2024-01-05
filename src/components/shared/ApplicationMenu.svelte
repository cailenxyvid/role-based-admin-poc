<script>
    let open = false
</script>
<button on:click={() => { open = !open }}>
    <i class="fa-solid fa-bars"></i>
</button>

{#if open}
<div class="absolute bg-slate-100 right-12 p-1 flex flex-col border border-slate-300 z-10">        
    <a href="/#">Dashboard</a>
    <a href="/#/account">My Account</a>
</div>
{/if}