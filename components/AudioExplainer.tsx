"use client";

import { useState, useRef, useEffect } from "react";
import { Info, Play, X, Droplet } from "lucide-react";
import type { ScoreKey } from "@/lib/types";

type Mode = "off" | "without" | "with";

type Meta = {
  title: string;
  explanation: string;
  audio: boolean;
  without?: string;
  with?: string;
};

const META: Record<ScoreKey, Meta> = {
  anc: {
    title: "Was ist ANC?",
    explanation:
      "Active Noise Cancellation filtert tiefe Geräusche aus deiner Umgebung – Motor, Klima, Stadtlärm.",
    audio: true,
    without: "Ohne ANC",
    with: "Mit ANC",
  },
  sound: {
    title: "Was meint Bass?",
    explanation:
      "Tiefe Frequenzen ab 60 Hz, die du im Bauch spürst. Gute Earbuds liefern sie sauber, ohne zu dröhnen.",
    audio: true,
    without: "Flacher Sound",
    with: "Mit Bass-Boost",
  },
  battery: {
    title: "Akkulaufzeit",
    explanation:
      "Wiedergabezeit mit aktivem ANC. Das Case verdreifacht die Laufzeit meist noch.",
    audio: false,
  },
  sport: {
    title: "Sport-Tauglichkeit",
    explanation:
      "Halt im Ohr bei Bewegung und Schutz vor Schweiß. Wichtig: IP-Rating ab IP54.",
    audio: false,
  },
  mic: {
    title: "Mikrofon-Qualität",
    explanation:
      "Wie klar deine Stimme bei Calls übertragen wird – mit Noise Gate gegen Hintergrundlärm.",
    audio: true,
    without: "Ohne Noise Gate",
    with: "Mit Noise Gate",
  },
  comfort: {
    title: "Tragekomfort",
    explanation:
      "Gewicht, Form, Tip-Auswahl. Entscheidend bei längeren Sessions.",
    audio: false,
  },
};

export default function AudioExplainer({ scoreKey }: { scoreKey: ScoreKey }) {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState<Mode>("off");
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const popupRef = useRef<HTMLDivElement>(null);

  const meta = META[scoreKey];

  function cleanupAudio() {
    nodesRef.current.forEach((n) => {
      try {
        if (
          "stop" in n &&
          typeof (n as AudioScheduledSourceNode).stop === "function"
        ) {
          (n as AudioScheduledSourceNode).stop();
        }
        n.disconnect();
      } catch {
        /* node may already be stopped */
      }
    });
    nodesRef.current = [];
  }

  function closePopup() {
    cleanupAudio();
    setPlaying("off");
    setOpen(false);
  }

  function startAudio(mode: "without" | "with") {
    cleanupAudio();

    if (!audioCtxRef.current) {
      const win = window as unknown as {
        AudioContext: typeof AudioContext;
        webkitAudioContext?: typeof AudioContext;
      };
      const Ctx = win.AudioContext ?? win.webkitAudioContext;
      if (!Ctx) return;
      audioCtxRef.current = new Ctx();
    }
    const ctx = audioCtxRef.current;
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    nodesRef.current.push(gain);

    if (scoreKey === "anc") {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      if (mode === "with") {
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 400;
        gain.gain.value = 0.25;
        source.connect(filter);
        filter.connect(gain);
        nodesRef.current.push(filter);
      } else {
        gain.gain.value = 0.6;
        source.connect(gain);
      }
      source.start();
      nodesRef.current.push(source);
    } else if (scoreKey === "sound") {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 80;
      gain.gain.value = mode === "with" ? 0.55 : 0.15;
      osc.connect(gain);
      osc.start();
      nodesRef.current.push(osc);
    } else if (scoreKey === "mic") {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 1000;
      gain.gain.value = 0.25;
      osc.connect(gain);
      osc.start();
      nodesRef.current.push(osc);

      if (mode === "without") {
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.25;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        noise.connect(gain);
        noise.start();
        nodesRef.current.push(noise);
      }
    }

    setPlaying(mode);
  }

  function togglePlay(mode: "without" | "with") {
    if (playing === mode) {
      cleanupAudio();
      setPlaying("off");
    } else {
      startAudio(mode);
    }
  }

  // outside-click and Escape
  useEffect(() => {
    if (!open) return;
    function handleMouse(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        closePopup();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closePopup();
    }
    document.addEventListener("mousedown", handleMouse);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleMouse);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupAudio();
      const ctx = audioCtxRef.current;
      if (ctx) {
        try {
          ctx.close();
        } catch {
          /* ctx may already be closed */
        }
      }
    };
  }, []);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        aria-label={`Erklärung: ${meta.title}`}
        className="text-slate-300 hover:text-blue-500 transition-colors ml-1 inline-flex items-center"
      >
        <Info size={12} />
      </button>
      {open && (
        <div
          ref={popupRef}
          className="absolute top-full left-0 mt-2 w-64 z-30 rounded-xl border-2 border-slate-100 bg-white p-3 shadow-lg text-left"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-2 gap-2">
            <h4 className="font-bold text-sm text-slate-900 leading-tight">
              {meta.title}
            </h4>
            <button
              type="button"
              onClick={closePopup}
              className="text-slate-400 hover:text-slate-700 shrink-0 -mt-0.5"
              aria-label="Schließen"
            >
              <X size={14} />
            </button>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            {meta.explanation}
          </p>
          {meta.audio ? (
            <>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Hör den Unterschied
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => togglePlay("without")}
                  className={`flex-1 flex items-center justify-center gap-1 text-xs font-semibold px-2 py-1.5 rounded-lg transition-all ${
                    playing === "without"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Play size={10} />
                  {meta.without}
                </button>
                <button
                  type="button"
                  onClick={() => togglePlay("with")}
                  className={`flex-1 flex items-center justify-center gap-1 text-xs font-semibold px-2 py-1.5 rounded-lg transition-all ${
                    playing === "with"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                  }`}
                >
                  <Play size={10} />
                  {meta.with}
                </button>
              </div>
            </>
          ) : scoreKey === "battery" ? (
            <p className="text-xs font-semibold text-slate-700">
              Bis zu 8 Stunden Laufzeit pro Ladung – mit Case meist 24+ Stunden.
            </p>
          ) : scoreKey === "sport" ? (
            <div className="flex items-center gap-2">
              <Droplet
                size={20}
                className="text-blue-500 animate-bounce shrink-0"
              />
              <p className="text-xs font-semibold text-slate-700">
                IP54 schützt vor Schweiß und leichtem Regen.
              </p>
            </div>
          ) : (
            <p className="text-xs font-semibold text-slate-700">
              Wenig drücken, gut sitzen – auch nach Stunden.
            </p>
          )}
        </div>
      )}
    </span>
  );
}
