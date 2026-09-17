import { useState, useEffect, useRef, useCallback } from "react";

type Stage = "CAKE" | "BLOWING" | "CARD" | "CELEBRATION";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  type: "spark" | "petal" | "heart";
  rotation: number;
  rotationSpeed: number;
}

const NO_MESSAGES = [
  "Wait, really? 🥺",
  "Nice try! 😜",
  "Not an option! ❤️",
  "That button is very slippery! 😂",
  "Oops, missed it! 😉",
  "You know you want to say yes! 🥰",
  "There's only one right answer! 💍",
];

export function ProposalFinale() {
  const [stage, setStage] = useState<Stage>("CAKE");
  const [candlesLit, setCandlesLit] = useState(true);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0, rotate: 0 });
  const [climaxStep, setClimaxStep] = useState(0);
  const [playfulMsg, setPlayfulMsg] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Candle blowing transition
  const handleBlowCandles = () => {
    if (stage !== "CAKE") return;
    setStage("BLOWING");
    setCandlesLit(false);

    // After smoke and flutter effect, transition to morphing envelope card
    setTimeout(() => {
      setStage("CARD");
    }, 1900);
  };

  // Evasive "NO" button logic
  const handleNoEscape = useCallback(() => {
    setNoCount((prev) => {
      const nextCount = prev + 1;
      const msg = NO_MESSAGES[Math.min(nextCount - 1, NO_MESSAGES.length - 1)];
      setPlayfulMsg(msg);
      return nextCount;
    });

    // Randomize displacement within a safe container box
    const maxOffset = 130;
    const minOffset = 50;
    const signX = Math.random() > 0.5 ? 1 : -1;
    const signY = Math.random() > 0.5 ? 1 : -1;

    const newX = signX * (minOffset + Math.random() * (maxOffset - minOffset));
    const newY = signY * (minOffset + Math.random() * (maxOffset - minOffset));
    const rotate = (Math.random() - 0.5) * 28;

    setNoPos({ x: newX, y: newY, rotate });
  }, []);

  // Yes button celebration
  const handleYes = () => {
    setStage("CELEBRATION");
  };

  // Celebration Fireworks & Rose Petals canvas loop
  useEffect(() => {
    if (stage !== "CELEBRATION") return;

    // Trigger narrative text steps
    const t1 = setTimeout(() => setClimaxStep(1), 1000);
    const t2 = setTimeout(() => setClimaxStep(2), 2600);
    const t3 = setTimeout(() => setClimaxStep(3), 4200);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    const colors = [
      "#FF5E7E",
      "#FFAAA6",
      "#FFD3B6",
      "#FFD700",
      "#FF69B4",
      "#FFFFFF",
      "#E63946",
    ];

    const createFirework = (targetX: number, targetY: number) => {
      const count = 45;
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = 2.5 + Math.random() * 5.5;
        particlesRef.current.push({
          x: targetX,
          y: targetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1.5,
          color,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.012,
          type: "spark",
          rotation: 0,
          rotationSpeed: 0,
        });
      }
    };

    // Initial burst
    createFirework(canvas.width * 0.3, canvas.height * 0.35);
    createFirework(canvas.width * 0.7, canvas.height * 0.35);
    createFirework(canvas.width * 0.5, canvas.height * 0.25);

    // Spawn falling rose petals and floating hearts continuously
    const spawnTimer = setInterval(() => {
      if (Math.random() > 0.4) {
        createFirework(
          canvas.width * (0.2 + Math.random() * 0.6),
          canvas.height * (0.15 + Math.random() * 0.35),
        );
      }

      // Add falling petals
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: -20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: Math.random() * 1.8 + 1.2,
          size: Math.random() * 8 + 6,
          color: Math.random() > 0.3 ? "#E63946" : "#FF758F",
          alpha: 0.85,
          decay: 0.003,
          type: "petal",
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2,
        });
      }

      // Add floating hearts
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(Math.random() * 1.5 + 1.5),
        size: Math.random() * 14 + 10,
        color: "#FF4D6D",
        alpha: 0.8,
        decay: 0.004,
        type: "heart",
        rotation: 0,
        rotationSpeed: 0,
      });
    }, 450);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const alive: Particle[] = [];
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.rotationSpeed;

        if (p.type === "spark") {
          p.vy += 0.06; // subtle gravity
        } else if (p.type === "petal") {
          p.vx += Math.sin(p.y * 0.02) * 0.05; // swaying
        }

        if (p.alpha > 0 && p.y > -50 && p.y < canvas.height + 50) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);

          if (p.type === "spark") {
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.type === "petal") {
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 6;
            ctx.shadowColor = "rgba(230, 57, 70, 0.4)";
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 0.5, p.size, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.type === "heart") {
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 12;
            ctx.shadowColor = "rgba(255, 77, 109, 0.6)";
            ctx.font = `${Math.floor(p.size)}px serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("♥", 0, 0);
          }

          ctx.restore();
          alive.push(p);
        }
      }

      particlesRef.current = alive;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(spawnTimer);
      window.removeEventListener("resize", updateSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [stage]);

  const handleReplay = () => {
    setStage("CAKE");
    setCandlesLit(true);
    setNoCount(0);
    setNoPos({ x: 0, y: 0, rotate: 0 });
    setClimaxStep(0);
    setPlayfulMsg("");
  };

  return (
    <section className="finale-section" aria-label="Birthday wish and proposal">
      <div className="finale-backdrop" />

      {/* Canvas layer for celebration */}
      <canvas
        ref={canvasRef}
        className={`celebration-canvas ${stage === "CELEBRATION" ? "is-active" : ""}`}
      />

      <div className="finale-container">
        {/* STAGE 1 & 2: THE BIRTHDAY CAKE */}
        {(stage === "CAKE" || stage === "BLOWING") && (
          <div className={`cake-stage ${stage === "BLOWING" ? "is-blowing" : ""}`}>
            <div className="cake-header" data-reveal>
              <p className="finale-kicker">A little piece of forever</p>
              <h2 className="finale-title">
                One last little wish… <span className="glowing-star">✨</span>
              </h2>
              <p className="finale-desc">
                Close your eyes, make a wish from the deepest part of your heart, and blow out the
                candles.
              </p>
            </div>

            {/* 3D Animated Cake Element */}
            <div
              className="cake-3d-scene"
              onClick={handleBlowCandles}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleBlowCandles()}
              aria-label="Birthday cake. Click to blow out candles."
            >
              <div className="cake-glow-ambient" />

              {/* Candles */}
              <div className="candles-row">
                {[1, 2, 3].map((num) => (
                  <div className={`candle candle-${num}`} key={num}>
                    <div className={`candle-flame ${candlesLit ? "is-lit" : "is-out"}`}>
                      <span className="flame-core" />
                      <span className="flame-glow" />
                    </div>
                    {stage === "BLOWING" && <div className="candle-smoke" />}
                    <div className="candle-wick" />
                    <div className="candle-body" />
                  </div>
                ))}
              </div>

              {/* Multi-tier Cake */}
              <div className="cake-structure">
                <div className="cake-tier cake-tier-top">
                  <div className="frosting-drops">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="berries">
                    <span className="berry b-1">🍓</span>
                    <span className="berry b-2">✨</span>
                    <span className="berry b-3">🍓</span>
                  </div>
                </div>
                <div className="cake-tier cake-tier-bottom">
                  <div className="frosting-drapes">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="cream-band" />
                </div>
                <div className="cake-plate" />
              </div>

              {stage === "BLOWING" && (
                <div className="whoosh-burst">
                  <span className="whoosh-ring" />
                  <span className="whoosh-stars">✨ 🌟 💫 ✨</span>
                </div>
              )}
            </div>

            <div className="cake-action">
              <button
                type="button"
                className="blow-candles-btn"
                onClick={handleBlowCandles}
                disabled={stage === "BLOWING"}
              >
                <span className="wind-icon">🌬️</span>
                <span>{stage === "BLOWING" ? "Blowing candles…" : "Blow the candles"}</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3: THE PROPOSAL ENVELOPE / CARD */}
        {stage === "CARD" && (
          <div className="card-stage" data-reveal>
            <div className="card-3d-wrapper">
              <div className="card-ambient-lights">
                <span className="light-orb o-1" />
                <span className="light-orb o-2" />
                <span className="light-orb o-3" />
              </div>

              <div className="envelope-letter-box">
                <div className="proposal-card-inner">
                  <div className="ring-icon-wrapper">
                    <span className="ring-emoji">💍</span>
                    <span className="ring-glimmer">✨</span>
                  </div>

                  <p className="card-kicker">The Question</p>
                  <h3 className="proposal-headline">Will you marry me?</h3>
                  <p className="proposal-heart-tag">❤️</p>

                  {playfulMsg && <div className="playful-feedback">{playfulMsg}</div>}

                  <div className="proposal-buttons-cluster">
                    {/* YES BUTTON */}
                    <button
                      type="button"
                      className="proposal-btn btn-yes"
                      style={{
                        transform: `scale(${1 + Math.min(noCount * 0.045, 0.28)})`,
                      }}
                      onClick={handleYes}
                    >
                      <span className="btn-text">YES</span>
                      <span className="btn-heart">❤️</span>
                    </button>

                    {/* NO BUTTON (Evasive) */}
                    <div
                      className="no-btn-anchor"
                      style={{
                        transform: `translate(${noPos.x}px, ${noPos.y}px) rotate(${noPos.rotate}deg)`,
                      }}
                    >
                      <button
                        type="button"
                        className="proposal-btn btn-no"
                        onMouseEnter={handleNoEscape}
                        onTouchStart={(e) => {
                          e.preventDefault();
                          handleNoEscape();
                        }}
                        onClick={handleNoEscape}
                      >
                        NO
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 4: GRAND CELEBRATION WITH 3D COUPLE */}
        {stage === "CELEBRATION" && (
          <div className="celebration-stage">
            {/* 3D-Style Romantic Couple Scene */}
            <div className="couple-3d-scene">
              <div className="couple-moon-orb" />
              <div className="couple-ground-glow" />

              {/* Couple Silhouettes with romantic glow */}
              <div className="couple-assembly">
                {/* Groom / Partner 1 */}
                <div className="partner partner-left">
                  <svg
                    className="partner-silhouette"
                    viewBox="0 0 100 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Head */}
                    <circle cx="58" cy="30" r="14" fill="url(#coupleGrad)" />
                    {/* Neck */}
                    <rect x="54" y="44" width="8" height="8" rx="2" fill="url(#coupleGrad)" />
                    {/* Torso & Suit */}
                    <path
                      d="M 40,52 L 76,52 L 72,120 L 44,120 Z"
                      fill="url(#coupleGrad)"
                    />
                    {/* Reaching Out Arm */}
                    <path
                      d="M 68,60 C 82,72 90,85 100,90"
                      stroke="url(#coupleGrad)"
                      strokeWidth="9"
                      strokeLinecap="round"
                    />
                    {/* Back Arm */}
                    <path
                      d="M 44,60 C 38,80 36,100 40,115"
                      stroke="url(#coupleGrad)"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Legs */}
                    <rect x="45" y="118" width="10" height="74" rx="4" fill="url(#coupleGrad)" />
                    <rect x="61" y="118" width="10" height="74" rx="4" fill="url(#coupleGrad)" />
                    <defs>
                      <linearGradient id="coupleGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FFE3EC" />
                        <stop offset="50%" stopColor="#FFA6BD" />
                        <stop offset="100%" stopColor="#FF4D6D" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Sparkling Ring Between Them */}
                <div className="couple-center-sparkle">
                  <span className="sparkle-ring">💍</span>
                  <span className="sparkle-aura" />
                </div>

                {/* Bride / Partner 2 */}
                <div className="partner partner-right">
                  <svg
                    className="partner-silhouette"
                    viewBox="0 0 100 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Hair / Head */}
                    <circle cx="42" cy="32" r="13" fill="url(#coupleGrad2)" />
                    <path
                      d="M 32,32 C 30,48 35,62 38,72"
                      stroke="url(#coupleGrad2)"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    {/* Torso & Dress */}
                    <path
                      d="M 34,50 L 52,50 L 48,90 L 38,90 Z"
                      fill="url(#coupleGrad2)"
                    />
                    {/* Gown Flare */}
                    <path
                      d="M 38,88 Q 15,160 22,192 L 68,192 Q 62,150 48,88 Z"
                      fill="url(#coupleGrad2)"
                    />
                    {/* Reaching Out Arm */}
                    <path
                      d="M 36,58 C 22,72 14,84 0,90"
                      stroke="url(#coupleGrad2)"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="coupleGrad2" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="45%" stopColor="#FFC2D1" />
                        <stop offset="100%" stopColor="#E63946" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="couple-halo-light" />
            </div>

            {/* Paced Narrative Climax Text */}
            <div className="climax-text-wrap">
              {climaxStep >= 1 && (
                <p className="climax-lead" data-reveal>
                  And just like that…
                </p>
              )}

              {climaxStep >= 2 && (
                <h2 className="climax-heading" data-reveal>
                  Our next chapter begins. <span className="beating-heart">❤️</span>
                </h2>
              )}

              {climaxStep >= 3 && (
                <div className="climax-footer" data-reveal>
                  <p className="climax-ring-promise">💍 Forever and always ✨</p>
                  <button type="button" className="replay-btn" onClick={handleReplay}>
                    <span>Replay this moment</span>
                    <span className="replay-icon">↺</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
