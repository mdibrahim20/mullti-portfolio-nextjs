"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

// function polarToXY(cx: number, cy: number, r: number, angleRad: number) {
//   return { x: cx + Math.cos(angleRad) * r, y: cy + Math.sin(angleRad) * r };
// }

// function RadarChart({ 
//   skillRadar, 
//   radarChartDesc 
// }: { 
//   skillRadar: any[];
//   radarChartDesc: string;
// }) {
//   const axes = skillRadar || [];
//   const n = axes.length;
//   if (n === 0) return null;
  
//   const cx = 110;
//   const cy = 110;
//   const R = 78;

//   const angles = axes.map((_, i) => -Math.PI / 2 + (2 * Math.PI * i) / n);
//   const points = axes.map((a, i) => {
//     const p = polarToXY(cx, cy, R * a.value, angles[i]);
//     return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
//   });

//   const labelPoints = axes.map((a, i) => {
//     const p = polarToXY(cx, cy, R + 22, angles[i]);
//     return { ...p, label: a.label };
//   });

//   return (
//     <div className="gradient-border rounded-2xl">
//       <div className="glass rounded-2xl p-5 shadow-glow">
//         <div className="flex items-center justify-between">
//           <div className="text-sm font-medium tracking-tight">Skill signal</div>
//           <div className="font-mono text-[11px] text-muted">radar.v1</div>
//         </div>

//         <svg viewBox="0 0 220 220" className="mt-4 w-full">
//           <defs>
//             <linearGradient id="rad" x1="0" x2="1" y1="0" y2="1">
//               <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.9" />
//               <stop offset="60%" stopColor="rgb(var(--accent2))" stopOpacity="0.8" />
//               <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0.9" />
//             </linearGradient>
//           </defs>

//           {/* Grid */}
//           {[0.25, 0.5, 0.75, 1].map((k) => (
//             <circle
//               key={k}
//               cx={cx}
//               cy={cy}
//               r={R * k}
//               fill="none"
//               stroke="rgb(var(--border) / 0.9)"
//               strokeWidth="1"
//               opacity={0.65}
//             />
//           ))}

//           {/* Axes */}
//           {angles.map((ang, i) => {
//             const p = polarToXY(cx, cy, R, ang);
//             return (
//               <line
//                 key={i}
//                 x1={cx}
//                 y1={cy}
//                 x2={p.x}
//                 y2={p.y}
//                 stroke="rgb(var(--border) / 0.9)"
//                 strokeWidth="1"
//                 opacity={0.7}
//               />
//             );
//           })}

//           {/* Shape */}
//           <motion.polygon
//             points={points.join(" ")}
//             fill="url(#rad)"
//             opacity={0.20}
//             initial={{ opacity: 0, scale: 0.98 }}
//             whileInView={{ opacity: 0.20, scale: 1 }}
//             viewport={{ once: true, margin: "-120px" }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//           />
//           <motion.polygon
//             points={points.join(" ")}
//             fill="none"
//             stroke="url(#rad)"
//             strokeWidth="2.5"
//             strokeLinejoin="round"
//             initial={{ pathLength: 0, opacity: 0 }}
//             whileInView={{ pathLength: 1, opacity: 1 }}
//             viewport={{ once: true, margin: "-120px" }}
//             transition={{ duration: 1.1, ease: "easeInOut" }}
//           />

//           {/* Nodes */}
//           {axes.map((a, i) => {
//             const p = polarToXY(cx, cy, R * a.value, angles[i]);
//             return (
//               <circle
//                 key={a.label}
//                 cx={p.x}
//                 cy={p.y}
//                 r={3.5}
//                 fill="rgb(var(--bg))"
//                 stroke="rgb(var(--accent))"
//                 strokeWidth="2"
//                 opacity={0.95}
//               />
//             );
//           })}

//           {/* Labels */}
//           {labelPoints.map((p) => (
//             <text
//               key={p.label}
//               x={p.x}
//               y={p.y}
//               fontSize="8"
//               fill="rgb(var(--muted))"
//               textAnchor="middle"
//               dominantBaseline="middle"
//             >
//               {p.label}
//             </text>
//           ))}
//         </svg>

//         <div className="mt-3 text-xs text-muted">
//           {radarChartDesc}
//         </div>
//       </div>
//     </div>
//   );
// }
function polarToXY(cx: number, cy: number, r: number, angleRad: number) {
  return { x: cx + Math.cos(angleRad) * r, y: cy + Math.sin(angleRad) * r };
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function normalize(value: number, min: number, max: number) {
  if (max === min) return 0;
  return (value - min) / (max - min); // 0..1
}

function RadarChart({
  title,
  version,
  axes,
  scale,
  desc,
}: {
  title: string;
  version?: string;
  axes: { key: string; label: string; value: number }[];
  scale?: { min?: number; max?: number; step?: number };
  desc: string;
}) {
  const n = axes?.length ?? 0;
  if (!n) return null;

  const cx = 110;
  const cy = 110;
  const R = 78;

  const min = typeof scale?.min === "number" ? scale.min : 0;
  const max = typeof scale?.max === "number" ? scale.max : 10;

  const angles = axes.map((_, i) => -Math.PI / 2 + (2 * Math.PI * i) / n);

  const points = axes.map((a, i) => {
    const raw = typeof a.value === "number" ? a.value : Number(a.value);
    const t = clamp(normalize(raw, min, max), 0, 1); // normalized
    const p = polarToXY(cx, cy, R * t, angles[i]);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  });

  const labelPoints = axes.map((a, i) => {
    const p = polarToXY(cx, cy, R + 24, angles[i]);
    return { ...p, label: a.label };
  });

  return (
    <div className="gradient-border rounded-2xl">
      <div className="glass rounded-2xl p-5 shadow-glow">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium tracking-tight">{title}</div>
          <div className="font-mono text-[11px] text-muted">{version ?? "radar.v1"}</div>
        </div>

        <svg viewBox="0 0 220 220" className="mt-4 w-full">
          <defs>
            <linearGradient id="rad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.9" />
              <stop offset="60%" stopColor="rgb(var(--accent2))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Grid rings */}
          {[0.25, 0.5, 0.75, 1].map((k) => (
            <circle
              key={k}
              cx={cx}
              cy={cy}
              r={R * k}
              fill="none"
              stroke="rgb(var(--border) / 0.9)"
              strokeWidth="1"
              opacity={0.65}
            />
          ))}

          {/* Axes lines */}
          {angles.map((ang, i) => {
            const p = polarToXY(cx, cy, R, ang);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={p.x}
                y2={p.y}
                stroke="rgb(var(--border) / 0.9)"
                strokeWidth="1"
                opacity={0.7}
              />
            );
          })}

          {/* Filled polygon */}
          <motion.polygon
            points={points.join(" ")}
            fill="url(#rad)"
            opacity={0.20}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 0.20, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />

          {/* Stroke polygon */}
          <motion.polygon
            points={points.join(" ")}
            fill="none"
            stroke="url(#rad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />

          {/* Nodes (dots) */}
          {axes.map((a, i) => {
            const raw = typeof a.value === "number" ? a.value : Number(a.value);
            const t = clamp(normalize(raw, min, max), 0, 1);
            const p = polarToXY(cx, cy, R * t, angles[i]);

            return (
              <circle
                key={a.key}
                cx={p.x}
                cy={p.y}
                r={4}
                fill="rgb(var(--bg))"
                stroke="rgb(var(--accent))"
                strokeWidth="2.5"
                opacity={0.98}
              />
            );
          })}

          {/* Labels */}
          {labelPoints.map((p) => (
            <text
              key={p.label}
              x={p.x}
              y={p.y}
              fontSize="10"
              fill="rgb(var(--muted))"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {p.label}
            </text>
          ))}
        </svg>

        <div className="mt-3 text-xs text-muted">{desc}</div>
      </div>
    </div>
  );
}

export function Skills({
  skillsData,
}: {
  skillsData?: {
    eyebrow: string;
    title: string;
    description: string;
    categories: {
      id: number;
      key: string;
      title: string;
      index: string;
      skills: string[];
    }[];
    radar: {
      label: string;
      description: string;
      axes: { key: string; label: string; value: number }[];
      scale: { min: number; max: number; step: number };
      style: {
        fill: string;
        stroke: string;
        showGrid: boolean;
        showDots: boolean;
      };
    } | null;
  } | null;
})
 {
  if (!skillsData) return null;

const {
  eyebrow,
  title,
  description,
  categories,
  radar,
} = skillsData;

  
  return (
    <section id="skills" className="scroll-mt-28">
      <SectionHeader
  eyebrow={eyebrow}
  title={title}
  desc={description}
/>


      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <Reveal>
          {radar && (
  <Reveal>
    {/* <RadarChart
      skillRadar={radar.axes}
      radarChartDesc={radar.description}
    /> */}
    {skillsData?.radar && (
  <RadarChart
    title={skillsData.radar.label ?? "Skill signal"}
    axes={skillsData.radar.axes ?? []}
    scale={skillsData.radar.scale ?? { min: 0, max: 10, step: 1 }}
    desc={skillsData.radar.description ?? ""}
  />
)}

  </Reveal>
)}

        </Reveal>

        <div className="space-y-4">
          <div className="space-y-4">
  {categories.map((group, idx) => (
    <Reveal key={group.id} delay={0.05 * idx}>
      <div className="rounded-2xl border border-border/80 bg-card/70 p-5 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium tracking-tight">
            {group.title}
          </div>
          <div className="font-mono text-[11px] text-muted">
            {group.index}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border/70 bg-bg/50 px-3 py-1 text-xs text-muted hover:text-fg transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  ))}
</div>

        </div>
      </div>
    </section>
  );
}
