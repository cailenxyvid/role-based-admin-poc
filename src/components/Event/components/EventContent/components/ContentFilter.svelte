<script>
    // import components
    import ContentFilterTab from "./ContentFilterTab.svelte"

    // component actions
    export let filterAction
    export let searchAction
    export let activeType
</script>

<div class="contentFilter">
    <div><input class="rounded-full border border-slate-600 p-1 mb-3" type="text" on:change={ searchAction(this.value) } placeholder="Search" /></div>
    <ContentFilterTab {filterAction} {activeType} type="active" label="Active" />
    <ContentFilterTab {filterAction} {activeType} type="all" label="All" />
    <ContentFilterTab {filterAction} {activeType} type="word" label="Doc" />
    <ContentFilterTab {filterAction} {activeType} type="poll" label="Poll" />
    <ContentFilterTab {filterAction} {activeType} type="quiz" label="Quiz" />
    <ContentFilterTab {filterAction} {activeType} type="slidedeck" label="Slide" />
</div>