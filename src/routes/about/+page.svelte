<script lang="ts">
    import miso from '$lib/assets/miso.jpg';
    import tofu from '$lib/assets/tofu.jpeg';
    import engaged from '$lib/assets/engaged.jpg';
    import book_store from '$lib/assets/book_store.jpg';
</script>

<h1>About Us</h1>

<div class="book-store">
    <p>
        Hey! We are Austin Jones and Mariah Haley. Chances are that if you are attending our
        wedding, you likely know us quite well already. That said, the following are some things you
        might not know yet.
    </p>
    <img src={book_store} alt="The bride and groom outside a store of books." />
</div>

<h2>How we met</h2>

<p>
    We actually met in the 6th grade. We were both awkward and shy, but that didn't stop Mariah's
    friend from asking Austin if he liked Mariah. On paper, our middle school romance lasted two
    weeks. In reality, we really only hugged once.
</p>

<p>
    After those two weeks, we actually broke up. Mariah used the excuse that her dad didn't let her
    date boys at the time. Austin was understandably crestfallen.
</p>

<h2>How we met again</h2>

It wasn't until high school that we met again. We had senior english class together. We became
friends over the course of sitting and being on projects together. Long before we dated or liked
each other, we were already great friends. This friendship has persisted and grown in the
intervening years. Right after we graduated high school, Mariah asked Austin to be here boyfriend.
That was on May 27, 2017.

<h2>Our little life up to now</h2>

We have been together now for over 9 years. In that time, we have built quite a life together.

<h3>The cats</h3>

We have two lovely cats, and they are our world. We dote on them, play with them, and generally
spoil them. Both of these little girls certainly do alot to make our house into a home.

<div class="tofu">
    <p>
        Our first is Tofu. We found her under a porch in Shelbyville. Although, she has an attitude
        that has all but forgotten her humble beginnings. She's a crazy cat who loves to play. She's
        also a grandma with a bed time and a routine.
    </p>

    <img src={tofu} alt="Tofu" />
</div>

<div class="miso">
    <p>
        Our second cat is Miso. She loves cuddles and is far more clever than her full-send
        personality would let on. She loves being pet and will just take your lap from you. She will
        also work to no end to get into anything you don't want her to.
    </p>
    <img src={miso} alt="Miso" />
</div>

<h3>Bookclub</h3>

<p>
    Community and books are mutually important to us. So, we started a book club back in 2023! We've
    be reading, meeting, and chatting ever since. Book club is an important part of our little life
    that we have, and we are grateful for everyone in it.
</p>

<h2>How Austin Proposed</h2>

<p>
    As you well know, Mariah can read my mind, so it was important to me to surprise her. Which was
    made all the more difficult by the fact that she helped me pick out the ring.
</p>

<p>
    Probably 3 days before I asked, I started asking her for tips on my single leg takedown. For
    what it's worth Mariah has been doing jiu jitsu for three years and I've been doing it for three
    weeks. If you don't know, a single leg involves:
</p>

<ul>
    <li>getting low</li>
    <li>stepping within grab range of someone</li>
    <li>picking up their leg</li>
    <li>taking them down</li>
</ul>

<p>
    For my purposes, I needed to smoothly do the first two bullets. Essentially me getting down on
    one knee in front of her standing. Thankfully, I suck at doing these. So, Mariah was anything
    but suspicious when I was asking for tips about single leg takedown technique.
</p>

<p>
    Montage me making this more of a thing. Over a few days, I kept asking her for tips for single
    legs, shoots, etc.; basically how I could more smoothly kneel to propose.
</p>

<p>
    This morning, in that liminal space between getting ready and leaving, I surreptitiously sat at
    my nightstand and pocketed the ring box. My heart rate rising, I started practicing my single
    legs by myself in the living room.
</p>

<p>
    I was nervously palming the ring box in and out of my hand. I was making sure that the clam
    shell opened out. I was repositioning it so I could easily grab it. All while acting like I was
    taking down some invisible opponent.
</p>

<p>
    Then Mariah comes into the room seeing me practicing my shoots. I all but blurt, "so when I do
    my step in, how do I pull the other one through to be strong?" She helped me with patience. I
    gave it two practice reps of her giving me single leg tips.
</p>

<p>Then smoothly, I said "you mean like this" and:</p>

<ol>
    <li>Grabbed the ring box from my pocket</li>
    <li>Dropped my knee, cracking the clamshell</li>
    <li>Said "will you marry me"</li>
</ol>

<p>
    After her shock of being surprised subsided, she said "yes"! Then we gushed over each other and
    talked about how much we loved one another. Afterward, we were off getting breakfast, like we
    will be doing for a long time.
</p>

<div style="display: flex;">
    <img src={engaged} alt="Austin and Mariah engaged" />
</div>

<style>
    img {
        object-position: center 30%;
        object-fit: cover;
        margin: 0 auto;
        width: 50%;
        height: 50%;
    }

    .tofu,
    .book-store,
    .miso {
        margin: 10px 0px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;

        & p {
            flex: 1 1 300px;
        }
        & img {
            flex: 0 1 300px;
        }
    }

    .book-store img {
        object-position: center 80%;
        aspect-ratio: 4/3;
        object-fit: cover;
        margin: 0 auto;
        width: 50%;
        height: 40%;
    }
    .tofu img {
        object-position: center 20%;
        aspect-ratio: 4/3;
        object-fit: cover;
        margin: 0 auto;
        width: 50%;
        height: 40%;
    }

    .miso {
        flex-direction: row-reverse;

        & p {
            flex: 1 1 300px;
        }
        & img {
            flex: 0 1 300px;
        }
    }
</style>
