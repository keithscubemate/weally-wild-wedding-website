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
            <input required name="firstName" />
        </label>
        <label>
            Last:
            <input required name="lastName" />
        </label>
    </div>
    <button type="submit">Submit</button>
</form>
