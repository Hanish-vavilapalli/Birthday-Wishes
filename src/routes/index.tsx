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
  "Your smile.",
  "Your kindness.",
  "The way you care.",
  "The little things you do without even realizing.",
];

const memories = [
  { src: memoryWalk, caption: "That day ❤️", alt: "Two people walking together beneath evening streetlights" },
  { src: memoryHands, caption: "One of my favorite memories.", alt: "Two hands held together gently in golden sunset light" },
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
          <h1 id="birthday-title">Happiest Birthday, Nanna <span aria-hidden="true">❤️</span></h1>
          <blockquote>
            “I hope this birthday brings you a new beginning,<br />
            a fresh heart,<br />
            and many beautiful reasons to smile.”
          </blockquote>
          <div className="scroll-cue" aria-hidden="true"><span /></div>
        </div>
      </section>

      {/* 01 · Our story */}
      <section className="story-section content-section" aria-labelledby="story-title">
        <div className="narrow-copy">
          <p className="section-number" data-reveal>01 · Our story</p>
          <h2 id="story-title" data-reveal>And then, there was us…</h2>
          <div className="story-lines">
            <p data-reveal>I’m grateful for every moment that brought you into my life.</p>
            <p data-reveal>The laughs, the little conversations, the memories, and even the difficult days.</p>
            <p data-reveal>Everything has been a part of your journey.</p>
            <p data-reveal className="story-highlight">And today, I just want you to look forward.</p>
          </div>
        </div>
      </section>

      {/* 02 · A new beginning */}
      <section className="beginning-section content-section" aria-labelledby="beginning-title">
        <div className="narrow-copy">
          <p className="section-number" data-reveal>02 · A new beginning</p>
          <h2 id="beginning-title" data-reveal>Let today be the start of something beautiful.</h2>
          <div className="beginning-lines">
            <p data-reveal>Leave behind the things that hurt you.</p>
            <p data-reveal>Don't keep living in the moments that made you sad.</p>
            <p data-reveal>Don't be afraid of the mistakes you made.</p>
            <div className="growth-text" data-reveal>
              <p>You learned from them.</p>
              <p>You grew from them.</p>
            </div>
            <div className="highlight-callout" data-reveal>
              <p>From this birthday, start your life with a fresh heart.</p>
            </div>
            <div className="choices-pill-group" data-reveal>
              <span className="choice-pill">Choose peace.</span>
              <span className="choice-pill">Choose happiness.</span>
              <span className="choice-pill">Choose yourself.</span>
            </div>
            <p data-reveal className="comfort-line">
              And whenever life feels difficult, remember that you don't have to face everything alone.
            </p>
          </div>
        </div>
      </section>

      {/* 03 · The little things */}
      <section className="things-section content-section" aria-labelledby="things-title">
        <div className="narrow-copy">
          <p className="section-number" data-reveal>03 · The little things</p>
          <h2 id="things-title" data-reveal>The things that make you, you.</h2>
          <div className="things-list">
            {littleThings.map((item, index) => (
              <article className="thing" data-reveal key={item}>
                <span className="thing-index">0{index + 1}</span>
                <div>
                  <h3>{item}</h3>
                </div>
              </article>
            ))}
          </div>
          <div className="things-closing" data-reveal>
            <p className="special-note">These are the things that make you special.</p>
            <p className="worth-note">Never change who you are just because someone failed to see your worth.</p>
          </div>
        </div>
      </section>

      {/* 04 · Our memories */}
      <section className="memories-section content-section" aria-labelledby="memories-title">
        <div className="section-heading">
          <p className="section-number" data-reveal>04 · Our memories</p>
          <h2 id="memories-title" data-reveal>Moments I’ll always keep close.</h2>
          <div className="memories-text" data-reveal>
            <p>Every picture holds a little piece of our story.</p>
            <p>Some moments are gone.</p>
            <p>Some moments will stay forever.</p>
            <p className="memories-heart">And I'm happy that I got to share them with you. <span aria-hidden="true">❤️</span></p>
          </div>
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

      {/* 05 · For you, always */}
      <section className="letter-section content-section" aria-labelledby="letter-title">
        <div className="letter-wrap">
          <p className="section-number" data-reveal>05 · For you, always</p>
          <h2 id="letter-title" data-reveal>Nanna, this birthday is different.</h2>
          <div className="letter-body">
            <p data-reveal>I don't want you to carry your past into this new year of your life.</p>
            <p data-reveal>Whatever happened, let it stay there.</p>
            <p data-reveal>No more looking back with regret.</p>
            <p data-reveal>No more hurting yourself over wrong decisions.</p>
            <p data-reveal>Take the lessons, leave the pain, and move forward.</p>
            <div className="letter-highlight" data-reveal>
              <p>You deserve a life filled with peace, happiness, love, and beautiful moments.</p>
            </div>
            <p data-reveal>I hope this new chapter brings you closer to everything you've ever wished for.</p>
            <p data-reveal>And most importantly, I hope you never forget how special you are.</p>
            <p className="final-line" data-reveal>
              Happiest Birthday, Nanna. <span aria-hidden="true">❤️</span>
            </p>
            <p className="final-blessing" data-reveal>
              May this be the beginning of your happiest chapter yet.
            </p>
          </div>
          <div className="signature" data-reveal>
            <span>With all my love,</span>
            <strong>Always yours</strong>
          </div>
        </div>
      </section>
    </main>
  );
}