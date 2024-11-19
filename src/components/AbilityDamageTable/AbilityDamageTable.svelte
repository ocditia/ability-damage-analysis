<script>
    import {
        FlexRender,
        createTable,
        getCoreRowModel,
        getSortedRowModel
    } from '@tanstack/svelte-table';

    let { data, columns } = $props();

    let sorting = $state([]);

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
        data,
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
</script>

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
