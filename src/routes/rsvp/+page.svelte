<script lang="ts">
    import { enhance } from '$app/forms';
    let { form } = $props();
</script>

{#if form?.success}
    <p>Successfully submitted</p>
{/if}

<h2>Find your party:</h2>

<p>Please enter the first and last name of one of the members of your party.</p>

<form method="POST" use:enhance>
    <div>
        <label>
            First:
            <input type="text" required name="firstName" />
        </label>
        <label>
            Last:
            <input type="text" required name="lastName" />
        </label>
    </div>
    <button type="submit">Submit</button>
</form>

{#if form?.parties}
    <h2>Select your Party:</h2>

    {#each form?.parties as partay (partay.id)}
        <div class="party-card">
            <h4>
                <a href="/rsvp/{partay.id}">
                    Party: {partay.name}

                    {#if partay.finalized}
                        <span class="deco">[RSPD'd!]</span>
                    {/if}
                    <span class="click"></span>
                </a>
            </h4>

            <p>
                <b> Members: </b>
                {partay.guestNames.join(', ')}
            </p>
        </div>
    {/each}
{/if}

<style>
    .party-card {
        position: relative;
        padding: 5px;
        margin: 5px;
        border: 2px solid var(--main-border-color);
        border-radius: 8px;

        &:hover {
            background: var(--hover-bg-color);
        }

        a {
            color: inherit;
        }

        span.deco {
            color: var(--menu-color);
        }

        span.click {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;

            z-index: 1;
        }
    }
</style>
