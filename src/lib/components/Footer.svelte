<script>
	import { SiteDescription, SiteTitle } from '$lib/info';
</script>

<footer>
	<span>
		<p>{SiteTitle}</p>
	</span>

	<span>
		<p class="chill">{SiteDescription}</p>
	</span>
</footer>

<style lang="css">
	footer {
		padding: 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		border-top: 2px dashed var(--main-border-color);

		@media (max-width: 700px) {
			flex-direction: column;
		}
	}
	p.chill {
		opacity: 0.5;
	}
</style>
