<script lang="ts">
	let { data } = $props();
</script>

<h2>Party: {data.party.name} ({data.party.id})</h2>

{#each data.guests as guest}
	<p>{guest.name} -- {guest.is_rsvp}</p>
{:else}
	<p>No guests :(</p>
{/each}
