<script>
    import stare from '$lib/assets/cute_stare.jpg';
    let { data } = $props();
</script>

<div class="hero">
    <img src={stare} alt="The groom and bride sharing a loving look." />
    <h1>Austin & Mariah</h1>
</div>

<div class="info-card">
    <div><b>When:</b> {data.date}</div>
    <div><b>Where:</b> {data.place}</div>
</div>

<h2>Schedule</h2>

<h3>Thursday</h3>

<h3>Friday</h3>

<h3>Saturday</h3>

<h3>Sunday</h3>

<h3>Sunday</h3>

<style>
    .hero {
        position: relative;
        aspect-ratio: 4/3;
        display: flex;
        align-items: flex-end;
        justify-content: left;

        & img {
            border-radius: 10px;
            position: absolute;
            inset: 0;
            object-position: center 30%;
            object-fit: cover;
            width: 100%;
            height: 100%;
            z-index: 0;
            box-shadow: 1px 2px 2px var(--border-over-shadow);
        }

        & h1 {
            border-radius: 10px;
            position: relative;
            margin: 10px;
            padding: 0.5rem 1.5rem;
            background: color-mix(in srgb, var(--bg-color) 70%, transparent);
            font-size: clamp(1.5rem, 5vw, 3rem);
            z-index: 1;
        }
    }
    .info-card div {
        margin: 5px;
    }
</style>
