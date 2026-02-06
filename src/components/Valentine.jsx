import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

// 1. IMAGE CONFIGURATION
const images = {
    memory1: "/valentine_Gift/images/memory1.jpg", 
    memory2: "/valentine_Gift/images/memory2.jpg",
    final: "/valentine_Gift/images/final.jpg" 
};

const noMessages = [
    "Oh? 👀 You clicked No already?",
    "Are you sure? My heart disagrees. 🥺",
    "Shivani... that button is suspicious 😏",
    "Imagine saying No to this face 🥺",
    "Just say Yes already! 💖",
    "Alright, enough drama. Say Yes! ✨",
    "You're clearly meant to be mine 💖"
];

// 2. FLOATING HEARTS COMPONENT
function FloatingHearts() {
    const hearts = ["❤️", "💖", "💗", "💓", "💝", "✨", "🌸"];
    const colors = ["text-pink-500", "text-red-500", "text-rose-400", "text-pink-600", "text-fuchsia-500"];

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {Array.from({ length: 30 }).map((_, i) => (
                <span
                    key={i}
                    className={`absolute animate-float ${colors[i % colors.length]} opacity-100`}
                    style={{
                        left: `${Math.random() * 100}%`,
                        fontSize: `${16 + Math.random() * 24}px`,
                        animationDuration: `${8 + Math.random() * 12}s`,
                        animationDelay: `${Math.random() * 8}s`,
                    }}
                >
                    {hearts[i % hearts.length]}
                </span>
            ))}
        </div>
    );
}

export default function Valentine() {
    const zoneRef = useRef(null);
    const noBtnRef = useRef(null);
    const [step, setStep] = useState("intro");
    const [theme, setTheme] = useState("pink");
    const [yesScale, setYesScale] = useState(1);
    const [noStage, setNoStage] = useState(0);
    const name = "Shivani";

    const themes = {
        pink: "from-pink-100 via-rose-100 to-pink-200",
        dark: "from-zinc-900 via-rose-950 to-black"
    };

    const handleCelebration = () => {
        const duration = 10 * 1000;
        const animationEnd = Date.now() + duration;
        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            confetti({
                particleCount: 40,
                spread: 360,
                origin: { x: Math.random(), y: Math.random() - 0.2 },
                colors: ['#ff69b4', '#ff1493', '#ffffff']
            });
        }, 250);
    };

    const moveNo = () => {
        if (!zoneRef.current || !noBtnRef.current) return;
        const zone = zoneRef.current.getBoundingClientRect();
        const btn = noBtnRef.current.getBoundingClientRect();
        noBtnRef.current.style.position = 'absolute';
        const newX = Math.random() * (zone.width - btn.width);
        const newY = Math.random() * (zone.height - btn.height);
        noBtnRef.current.style.left = `${newX}px`;
        noBtnRef.current.style.top = `${newY}px`;
        noBtnRef.current.style.margin = "0";
    };

    return (
        <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br ${themes[theme]} transition-colors duration-1000 p-4`}>
            
            {/* THIS WAS MISSING: Render the hearts here */}
            <FloatingHearts />
            
            <div className="min-h-screen flex items-center justify-center">
                <main className="relative z-10 w-full max-w-xl">
                    
                    {/* --- STEP 1: INTRO --- */}
                    {step === "intro" && (
                        <div className="animate-pop text-center bg-white/30 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/40 shadow-2xl">
                            <div className="mb-6 animate-heartbeat text-7xl">💝</div>
                            <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                                Hey {name} 💕
                            </h1>
                            <p className="mb-10 text-xl text-gray-700 italic font-medium leading-relaxed">
                                "In a world full of temporary things, <br/> you are my favorite feeling."
                            </p>
                            <button onClick={() => setStep("memories")} className="px-12 py-4 bg-pink-500 text-white rounded-full text-xl font-bold shadow-xl hover:bg-pink-600 transition-all active:scale-95">
                                Begin the Journey →
                            </button>
                        </div>
                    )}

                    {/* --- STEP 2: MEMORY LANE --- */}
                    {step === "memories" && (
                        <div className="animate-pop bg-white/40 backdrop-blur-2xl p-8 rounded-[3rem] border border-white/50 shadow-2xl w-full">
                            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center italic">Our Favorite Moments...</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-lg border-4 border-white">
                                    <img src={images.memory1} alt="Memory 1" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-pink-500/40 to-transparent flex items-end p-4">
                                        <p className="text-white font-bold">The beginning... ✨</p>
                                    </div>
                                </div>
                                <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-lg border-4 border-white md:mt-8">
                                    <img src={images.memory2} alt="Memory 2" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-pink-500/40 to-transparent flex items-end p-4">
                                        <p className="text-white font-bold">Always better together 💖</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <button onClick={() => setStep("letter")} className="px-10 py-3 bg-pink-500 text-white rounded-full font-bold shadow-lg hover:bg-pink-600 transition-all">
                                    Wait, I wrote you something...
                                </button>
                            </div>
                        </div>
                    )}

                    {/* --- STEP 3: LOVE LETTER --- */}
                    {step === "letter" && (
                        <div className="min-h-screen flex items-center justify-center p-4">
                            {/* Changed bg-[#fffaf0] to bg-white/40 and added backdrop-blur */}
                            <div className="animate-pop bg-white/40 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-lg w-full relative border-t-[40px] border-pink-200/50 ring-1 ring-white/50">
                                
                                {/* Wax Seal - made slightly translucent */}
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-16 h-16 bg-rose-600/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-white text-2xl border-4 border-rose-700/50 font-serif">
                                    {name.charAt(0)}
                                </div>
                                
                                <div className="font-serif text-gray-900 space-y-6 leading-relaxed relative z-10">
                                    <h3 className="text-3xl font-bold border-b border-pink-300/50 pb-2 mb-4 text-gray-900">
                                        Dearest {name},
                                    </h3>
                                    
                                    <p className="italic text-lg font-medium">
                                        Every once in a while, life gives us a moment that changes everything. 
                                        For me, that moment was meeting you.
                                    </p>
                                    
                                    <p className="italic text-lg font-medium">
                                        I wanted to make this special because you deserve the world. 
                                        Your smile is my favorite view, and your happiness is my favorite goal.
                                    </p>
                                    
                                    <div className="pt-6">
                                        <p className="font-bold text-pink-600 text-center text-2xl animate-pulse drop-shadow-sm">
                                            I have one very important question left...
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-10 text-center">
                                    <button 
                                        onClick={() => setStep("question")} 
                                        className="group px-8 py-3 bg-rose-500/80 backdrop-blur-sm text-white rounded-full font-serif hover:bg-rose-600 transition-all shadow-lg flex items-center gap-2 mx-auto hover:scale-105 active:scale-95"
                                    >
                                        Turn the page 
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- STEP 4: QUESTION --- */}
                    {step === "question" && (
                        <div className="animate-pop backdrop-blur-2xl bg-white/40 p-10 rounded-[3rem] border border-white/50 shadow-2xl text-center relative overflow-hidden">
                            <h1 className="text-4xl md:text-5xl font-black mb-8 text-gray-800">
                                Will you be my <br/><span className="text-pink-600 animate-pulse">Valentine?</span> 💖
                            </h1>
                            <div className="h-16 mb-4">{noStage > 0 && <p className="text-pink-600 font-semibold italic animate-bounce text-lg">"{noMessages[noStage]}"</p>}</div>
                            <section ref={zoneRef} onPointerMove={e => {
                                if (!noBtnRef.current) return;
                                const b = noBtnRef.current.getBoundingClientRect();
                                const d = Math.hypot((b.left + b.width / 2) - e.clientX, (b.top + b.height / 2) - e.clientY);
                                if (d < 120) moveNo();
                            }} className="relative flex items-center justify-center gap-8 w-full h-64 touch-none">
                                <button ref={noBtnRef} onClick={() => { setNoStage(s => Math.min(noMessages.length - 1, s + 1)); setYesScale(s => Math.min(4, s + 0.4)); moveNo(); }}
                                    className={`z-30 px-8 py-4 rounded-full font-bold shadow-md bg-white text-gray-400 border border-gray-100 transition-all duration-300 ${noStage > 7 ? "opacity-0 pointer-events-none" : ""}`}>
                                    No 😐
                                </button>
                                <button onClick={() => { setStep("celebration"); handleCelebration(); }}
                                    style={{ transform: `scale(${yesScale})`, zIndex: yesScale > 2 ? 40 : 10 }}
                                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-4 rounded-full font-black text-xl shadow-2xl animate-heartbeat flex items-center gap-3">
                                    Yes! 💘
                                </button>
                            </section>
                        </div>
                    )}

                    {/* --- STEP 5: CELEBRATION --- */}
                    {step === "celebration" && (
                        <div className="animate-pop text-center bg-white/70 backdrop-blur-3xl p-8 rounded-[3rem] border-4 border-white shadow-2xl relative">
                            
                            {/* Polaroid Style Image Container */}
                            <div className="bg-white p-3 pb-12 shadow-xl rotate-3 mb-8 transition-all hover:rotate-0 duration-500 mx-auto max-w-[320px]">
                                <div className="aspect-square w-full overflow-hidden rounded-sm border border-gray-100">
                                    <img 
                                        src={images.final} 
                                        alt="Us" 
                                        className="w-full h-full object-cover object-center" 
                                    />
                                </div>
                                <p className="mt-4 font-serif text-2xl text-pink-600 italic">Forever & Always ♾️</p>
                            </div>

                            <h2 className="text-4xl font-black text-pink-600 mb-4 drop-shadow-sm">I KNEW IT! 🥰</h2>
                            
                            <p className="text-gray-700 text-lg mb-6 leading-relaxed px-4 italic">
                                "You've just made me the happiest person in the universe. I can't wait to spend every Valentine's with you, {name}."
                            </p>

                            <div className="flex justify-center gap-4 text-4xl">
                                {["💘", "💕", "💖", "💓", "💗"].map((emoji, i) => (
                                    <span 
                                        key={i} 
                                        className="animate-bounce" 
                                        style={{ animationDelay: `${i * 0.1}s` }}
                                    >
                                        {emoji}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}