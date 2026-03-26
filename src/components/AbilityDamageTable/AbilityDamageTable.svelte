<script>
    import {
        FlexRender,
        createTable,
        getCoreRowModel,
        getSortedRowModel
    } from '@tanstack/svelte-table';
    import { ownedItemsStore } from '$lib/stores/ownedItemsStore.svelte.js';
    import PillToggle from '$components/UI/PillToggle.svelte';

    let { data, columns } = $props();

    let abilityFilter = $state('popular');
    let sorting = $state([]);

    let filteredData = $derived(
        abilityFilter === 'all' ? data :
        abilityFilter === 'owned' ? data.filter(d => ownedItemsStore.items.has(d.key)) :
        data.filter(d => d.common !== false)
    );

    const setSorting = updater => {
        if (updater instanceof Function) {
            sorting = updater(sorting);
        } else {
            sorting = updater;
        }
        options = {
            ...options,
            state: {
                ...options.state,
                sorting
            }
        };
    };

    let options = $derived({
        data: filteredData,
        columns,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    let table = $state(createTable(options));

    $effect(() => {
        table = createTable(options);
    })

    async function copyCSV() {
        let csv = '';
        csv += columns.map(col => col.header).join(',') + '\n';
        table.getRowModel().rows.forEach(row => {
            csv += columns.map((col, index) => index === 0 ? row.original[col.accessorKey].title : row.original[col.accessorKey]).join(',') + '\n';
        });

        try {
            await navigator.clipboard.writeText(csv);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }
</script>

<div class="flex items-center justify-end mb-2 gap-2">
    <PillToggle bind:value={abilityFilter} />
</div>

<table class="w-full">
    <thead>
    {#each table.getHeaderGroups() as headerGroup}
        <tr>
            {#each headerGroup.headers as header}
                <th colSpan={header.colSpan}>
                    {#if !header.isPlaceholder}
                        <button
                            class:cursor-pointer={header.column.getCanSort()}
                            class:select-none={header.column.getCanSort()}
                            onclick={header.column.getToggleSortingHandler()}
                        >
                            <FlexRender content={header.column.columnDef.header} context={header.getContext()}/>
                            {#if header.column.getIsSorted().toString() === 'asc'}
                                🔼
                            {:else if header.column.getIsSorted().toString() === 'desc'}
                                🔽
                            {/if}
                        </button>
                    {/if}
                </th>
            {/each}
        </tr>
    {/each}
    </thead>
    <tbody>
    {#each table.getRowModel().rows as row}
        <tr>
            {#each row.getVisibleCells() as cell}
                <td {...cell.column.columnDef.meta}>
                    <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
                </td>
            {/each}
        </tr>
    {/each}
    </tbody>
    <tfoot>
    {#each table.getFooterGroups() as footerGroup}
        <tr>
            {#each footerGroup.headers as header}
                <th colSpan={header.colSpan}>
                    {#if !header.isPlaceholder}
                        <FlexRender content={header.column.columnDef.footer} context={header.getContext()}/>
                    {/if}
                </th>
            {/each}
        </tr>
    {/each}
    </tfoot>
</table>

<button onclick={copyCSV}>
    <img class="w-auto h-[64px]" src="/csv.png" alt="copy-to-csv" />
</button>
