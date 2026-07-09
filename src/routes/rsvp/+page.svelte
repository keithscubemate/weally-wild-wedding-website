<script lang="ts">
	let { data } = $props();
</script>

<p>rsvp works!</p>

{#each data.parties as party}
	<p>{party.name} -- {party.is_rsvp}</p>
{:else}
	<p>No parties :(</p>
{/each}
