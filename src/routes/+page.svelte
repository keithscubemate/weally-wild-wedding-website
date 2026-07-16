<script>
    import stare from '$lib/assets/cute_stare.jpg';
    let { data } = $props();
</script>

<div class="hero">
    <img src={stare} alt="The groom and bride sharing a loving look." />
    <h1>Austin & Mariah</h1>
</div>

<div class="info-card">
    <h3>General Info:</h3>
    <div><b>When:</b> {data.date}</div>
    <div><b>Where:</b> {data.place}</div>
</div>

<style>
    .hero {
        position: relative;
        aspect-ratio: 4/3;
        display: flex;
        align-items: flex-end;
        justify-content: left;

        & img {
            position: absolute;
            inset: 0;
            object-position: center 30%;
            object-fit: cover;
            z-index: 0;
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
        margin-top: 15px;
    }
</style>
