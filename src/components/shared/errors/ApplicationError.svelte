<script>
    export let error = null;
    export let onError = null;

    $: if ($error && onError) onError($error);
</script>

{#if $error}
    <div class="error">
        <em class="text-xl text-red-700">There was a critical error!</em>
        <div class="text-sm text-red-300 bg-slate-700">{$error}</div>
    </div>
{:else}
    <slot />
{/if}
