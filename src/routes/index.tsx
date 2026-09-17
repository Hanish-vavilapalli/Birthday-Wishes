import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import memoryCoffee from "@/assets/memory-coffee.jpg";
import memoryHands from "@/assets/memory-hands.jpg";
import memoryWalk from "@/assets/memory-walk.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happiest Birthday, Nanna ❤️" },
      {
        name: "description",
        content: "A private birthday love letter, made for Nanna with all my heart.",
      },
      { property: "og:title", content: "Happiest Birthday, Nanna ❤️" },
      {
        property: "og:description",
        content: "A private birthday love letter, made for Nanna with all my heart.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayLetter,
});

const littleThings = [
  ["Your smile.", "The one that can change the shape of my entire day."],
  ["Your voice.", "Somehow, it always feels like coming home."],
  ["The way you care.", "Even about the smallest things no one else notices."],
  ["Your heart.", "Soft, brave, and more beautiful than you know."],
];

const memories = [
  { src: memoryWalk, caption: "That day ❤️", alt: "Two people walking together beneath evening streetlights" },
  { src: memoryHands, caption: "One of my favorite memories.", alt: "Two hands held together beside a rainy window" },
  { src: memoryCoffee, caption: "I wish I could go back to this moment.", alt: "Two cups of coffee by a window at night" },
];

function BirthdayLetter() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8%" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="love-letter">
      <div className="ambient-glow" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="particles" aria-hidden="true">
        {Array.from({ length: 16 }, (_, index) => (
          <i className={`particle particle-${index + 1}`} key={index} />
        ))}
        <span className="floating-heart heart-one">♥</span>
        <span className="floating-heart heart-two">♥</span>
        <span className="floating-heart heart-three">♥</span>
      </div>

      <section className="hero-section" aria-labelledby="birthday-title">
        <div className="hero-content">
          <p className="hero-kicker">A little piece of my heart, for you</p>
          <h1 id="birthday-title">Happiest Birthday, Nanna <span aria-hidden="true">♥</span></h1>
          <blockquote>
            “If I could give you one thing today,<br />
            it would be the ability to see yourself<br />
            through my eyes.”
          </blockquote>
          <div className="scroll-cue" aria-hidden="true"><span /></div>
        </div>
      </section>

      <section className="story-section content-section" aria-labelledby="story-title">
        <div className="narrow-copy">
          <p className="section-number" data-reveal>01 · Our story</p>
          <h2 id="story-title" data-reveal>And then, there was us…</h2>
          <div className="story-lines">
            <p data-reveal>I didn’t know that an ordinary day</p>
            <p data-reveal>would become one of the most important parts of my life.</p>
            <p data-reveal>Somewhere between the little conversations,</p>
            <p data-reveal>the laughter, and the quiet moments—</p>
            <p data-reveal>you became someone I never wanted to imagine life without.</p>
          </div>
        </div>
      </section>

      <section className="things-section content-section" aria-labelledby="things-title">
        <div className="narrow-copy">
          <p className="section-number" data-reveal>02 · The little things</p>
          <h2 id="things-title" data-reveal>The ways you make life softer.</h2>
          <div className="things-list">
            {littleThings.map(([title, body], index) => (
              <article className="thing" data-reveal key={title}>
                <span className="thing-index">0{index + 1}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="memories-section content-section" aria-labelledby="memories-title">
        <div className="section-heading">
          <p className="section-number" data-reveal>03 · Our memories</p>
          <h2 id="memories-title" data-reveal>Pieces of time I keep returning to.</h2>
        </div>
        <div className="memory-album">
          {memories.map((memory, index) => (
            <figure className={`memory memory-${index + 1}`} data-reveal key={memory.caption}>
              <div className="memory-frame">
                <img src={memory.src} alt={memory.alt} width={1024} height={1280} loading="lazy" />
              </div>
              <figcaption>{memory.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="pause-section" aria-label="A moment to pause">
        <div className="pause-copy">
          <p data-reveal>Some memories become photographs.</p>
          <p data-reveal>Some become a part of us.</p>
          <strong data-reveal>You became both.</strong>
        </div>
      </section>

      <section className="letter-section content-section" aria-labelledby="letter-title">
        <div className="letter-wrap">
          <p className="section-number" data-reveal>04 · For you, always</p>
          <h2 id="letter-title" data-reveal>Nanna, this is for you…</h2>
          <div className="letter-body">
            <p data-reveal>Happiest Birthday to the person who means more to me than I can ever put into words.</p>
            <p data-reveal>You have brought a kind of warmth into my life that I didn’t know I was missing. With you, even the most ordinary moments feel worth remembering.</p>
            <p data-reveal>Thank you for every smile, every conversation, every quiet bit of care, and every time you have simply been there. You make this world—and my world—so much more beautiful just by being in it.</p>
            <p data-reveal>I hope this year holds the same tenderness you give so freely to everyone around you. I hope you feel celebrated, protected, deeply understood, and endlessly loved.</p>
            <p data-reveal>And on every day that follows, I hope you remember this:</p>
            <p className="final-line" data-reveal>You are, and always will be, my favorite part of the story. <span aria-hidden="true">♥</span></p>
          </div>
          <div className="signature" data-reveal><span>With all my love,</span><strong>Always yours</strong></div>
        </div>
      </section>
    </main>
  );
}