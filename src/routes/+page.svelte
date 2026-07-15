<script>
    import { dev } from '$app/env';

    let { data } = $props();
</script>

<h1>Austin & Mariah</h1>

<h2>When</h2>

<!-- TODO(ajone239): make this a link -->
{data.date}

<h2>Where</h2>

<!-- TODO(ajone239): make this a link -->
{data.place}

<!-- TODO(ajone239): plan this out -->
<h2>Schedule</h2>

<h3>Thursday</h3>

<h3>Friday</h3>

<h3>Saturday</h3>

<h3>Sunday</h3>

<h3>Sunday</h3>

{#if dev}
    <div class="links">
        <a href="/about"> about </a>
        <a href="/admin"> admin </a>
        <a href="/demo"> demo </a>
        <a href="/faq"> faq </a>
        <a href="/registry"> registry </a>
        <a href="/rsvp"> rsvp </a>
    </div>
{/if}

<style>
    .links {
        display: flex;
        flex-direction: column;
    }
</style>
