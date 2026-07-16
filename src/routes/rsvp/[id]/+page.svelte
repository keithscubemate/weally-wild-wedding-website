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

<h2>Party: {party.name}</h2>

{#if form?.success}
    <p>Successfully submitted</p>
{:else if form?.message}
    <p>ERROR: {form.message}</p>
{/if}

{#if data.party.finalized}
    <div>
        <p>You have finalized your RSVP. Thank you!</p>

        <h3>Guests</h3>

        <ul>
            {#each guests as guest (guest.id)}
                <li>
                    <label>
                        <input disabled={true} type="checkbox" checked={guest.is_rsvp != 0} />
                        {guest.name}
                    </label>
                </li>
            {:else}
                <p>No guests :(</p>
            {/each}
        </ul>
    </div>

    <div>
        <h3>Notes:</h3>

        <textarea disabled={true} bind:value={party.notes}></textarea>
    </div>
{:else}
    <form
        method="POST"
        use:enhance={() => {
            return async ({ update }) => {
                await update({ reset: false });
                refresh();
            };
        }}
    >
        <input type="hidden" name="party_name" value={party.name} />
        <input type="hidden" name="party_id" value={party.id} />
        <div>
            <h3>Guests</h3>

            <p>Check the names of the people in your party who will be attending.</p>

            <ul>
                {#each guests as guest (guest.id)}
                    <li>
                        <label>
                            <input
                                name="attending"
                                type="checkbox"
                                value={guest.id}
                                checked={guest.is_rsvp != 0}
                                onchange={() => (guest.is_rsvp ^= 1)}
                            />
                            {guest.name}
                        </label>
                    </li>
                {:else}
                    <p>No guests :(</p>
                {/each}
            </ul>
        </div>

        <div>
            <h3>Notes:</h3>

            <p>Please add any information the wedding planner should now about your party.</p>

            <textarea name="notes" bind:value={party.notes}></textarea>
        </div>

        <div>
            <label>
                <input
                    type="checkbox"
                    name="finalize"
                    value={party.finalized}
                    checked={party.finalized != 0}
                    onchange={() => (party.finalized ^= 1)}
                />
                Check this box to finalize your submission.
            </label>
        </div>
        <div>
            <button type="submit"> Submit </button>
            <button type="button" onclick={refresh}> Clear </button>
        </div>
    </form>
{/if}
