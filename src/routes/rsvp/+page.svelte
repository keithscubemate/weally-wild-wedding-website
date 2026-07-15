<script lang="ts">
	let { data } = $props();
</script>

<p>rsvp works!</p>

<ul>
	{#each data.parties as party}
		<a href="/rsvp/{party.id}">
			<p>{party.name} -- {party.finalized}</p>
		</a>
	{:else}
		<li><p>No parties :(</p></li>
	{/each}
</ul>
