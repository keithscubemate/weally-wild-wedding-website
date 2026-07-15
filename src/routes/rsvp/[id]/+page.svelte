<script lang="ts">
    import { enhance } from '$app/forms';
    import { untrack } from 'svelte';

    let { data, form } = $props();

    let party = $state(untrack(() => data.party));
    let guests = $state(untrack(() => data.guests));

    const refresh = () => {
        party = structuredClone(data.party);
        guests = structuredClone(data.guests);
    };
</script>

<h2>Party: {party.name} ({party.id})</h2>

{#if form?.success}
    <p>Successfully submitted</p>
{:else if form?.message}
    <p>ERROR: {form.message}</p>
{/if}

<form
    method="POST"
    use:enhance={() => {
        return async ({ update }) => {
            await update({ reset: false });
            refresh();
        };
    }}
>
    <div>
        <label>
            Finalize {party.finalized}:
            <input type="hidden" name="party_name" value={party.name} />
            <input type="hidden" name="party_id" value={party.id} />
            <input
                type="checkbox"
                name="finalize"
                value={party.finalized}
                checked={party.finalized != 0}
                onchange={() => (party.finalized ^= 1)}
            />
        </label>
    </div>

    <div>
        <h3>Guests</h3>
        <ul>
            {#each guests as guest (guest.id)}
                <li>
                    <label>
                        {guest.name}:
                        <input
                            name="attending"
                            type="checkbox"
                            value={guest.id}
                            checked={guest.is_rsvp != 0}
                            onchange={() => (guest.is_rsvp ^= 1)}
                        />
                    </label>
                </li>
            {:else}
                <p>No guests :(</p>
            {/each}
        </ul>
    </div>

    <div>
        <h3>Notes:</h3>

        <!-- TODO(ajone239): hook up -->
        <textarea name="notes" bind:value={party.notes}></textarea>
    </div>

    <div>
        <button type="submit"> Submit </button>
        <button onclick={refresh}> Clear </button>
    </div>
</form>
