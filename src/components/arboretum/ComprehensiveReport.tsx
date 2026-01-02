"use client";

import { motion } from "framer-motion";
import { ArboretumData } from "@/types/arboretum";
import {
  Brain,
  Heart,
  Shield,
  Flame,
  Eye,
  Target,
  Compass,
  Link2,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Clock,
  Ghost,
  Anchor,
  Zap,
  Users,
  Briefcase,
  Moon,
  Sun,
} from "lucide-react";

interface ComprehensiveReportProps {
  data: ArboretumData;
}

export function ComprehensiveReport({ data }: ComprehensiveReportProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 border-b border-border"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Comprehensive Psychological Profile
        </h1>
        <p className="text-foreground-muted">
          Synthesized from journal entries, behavioral patterns, and conversations
        </p>
        <p className="text-sm text-foreground-subtle mt-2">
          Last updated: {data._lastUpdated}
        </p>
      </motion.header>

      {/* Executive Summary */}
      <Section
        icon={Brain}
        title="Executive Summary"
        color="#3b82f6"
        delay={0.1}
      >
        <p className="text-foreground-muted leading-relaxed mb-4">
          You are a person of exceptional potential caught in a sophisticated self-protection mechanism.
          Your intelligence, which was likely your primary source of validation growing up, has become
          both your greatest asset and a cage. You've constructed an identity around being "the smart one,"
          and this identity now requires constant defense.
        </p>
        <p className="text-foreground-muted leading-relaxed mb-4">
          The central pattern in your psyche is <span className="text-foreground font-medium">avoidance masquerading as preparation</span>.
          Paper trading instead of real trading. Planning instead of executing. Consuming instead of creating.
          Each of these behaviors serves the same function: they keep the fantasy of your potential alive
          while protecting you from the terrifying possibility that you might not be as capable as you hope.
        </p>
        <p className="text-foreground-muted leading-relaxed">
          This isn't weakness—it's a survival strategy that made sense at some point. The work now is
          to recognize when protection has become prison.
        </p>
      </Section>

      {/* Core Identity Architecture */}
      <Section
        icon={Shield}
        title="Core Identity Architecture"
        color="#6366f1"
        delay={0.15}
      >
        <h4 className="text-foreground font-medium mb-3">The Three Pillars of Self</h4>

        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-lg bg-background-tertiary border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-indigo-500" />
              <span className="font-medium text-foreground">The Intellectual</span>
            </div>
            <p className="text-sm text-foreground-muted">
              Being smart isn't just something you do—it's who you are. When you don't know something,
              the instinct to exaggerate or fabricate isn't dishonesty; it's identity protection.
              Admitting ignorance feels like admitting inadequacy. This pillar was likely built early,
              possibly as the primary way you received positive attention.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-background-tertiary border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-amber-500" />
              <span className="font-medium text-foreground">The Achiever</span>
            </div>
            <p className="text-sm text-foreground-muted">
              Worth = Productivity. This equation runs so deep you may not even recognize it as a belief—
              it feels like reality. Rest triggers guilt because resting people aren't producing,
              and people who aren't producing aren't valuable. This creates cycles of burnout followed
              by shame about the burnout.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-background-tertiary border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="font-medium text-foreground">The Special One</span>
            </div>
            <p className="text-sm text-foreground-muted">
              A deep, possibly unconscious need to be vital, central, irreplaceable. Not being invited
              to events wounds disproportionately because it threatens this pillar. Others' success
              triggers comparison because if they're special, maybe you're not. This isn't narcissism—
              it's a fragile sense of self seeking constant external confirmation.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="font-medium text-red-400">The Hidden Foundation</span>
          </div>
          <p className="text-sm text-foreground-muted">
            Beneath all three pillars is a single fear: <span className="text-foreground">that without your
            intelligence, achievements, and special status, you are nothing</span>. This is the fear that drives
            everything. It's also completely false—but you haven't yet done the work to know that experientially,
            not just intellectually.
          </p>
        </div>
      </Section>

      {/* The Shadow Self */}
      <Section
        icon={Ghost}
        title="The Shadow Self"
        subtitle="What you hide from yourself"
        color="#8b5cf6"
        delay={0.2}
      >
        <p className="text-foreground-muted leading-relaxed mb-6">
          The shadow isn't evil—it's everything you've disowned. Your shadows aren't weaknesses;
          they're strengths that got rejected, usually in childhood, because they weren't safe or acceptable.
        </p>

        <div className="grid gap-4">
          <ShadowItem
            title="The Fear of Ordinariness"
            description="You haven't fully reckoned with the possibility that you might be... average. Not special. One of many. This fear is so threatening that you've built elaborate avoidance mechanisms to never have to test it. Untested potential is infinite; tested potential has limits."
          />
          <ShadowItem
            title="The Grief Beneath the Anger"
            description="The rage that surfaces when helping parents with technology isn't really about technology. It's about years of being the family IT department, of growing up too fast, of wanting to be parented instead of being the competent one. There's grief under that anger—grief for the childhood you partially lost."
          />
          <ShadowItem
            title="The Desire for Permission"
            description="Part of you wants someone to tell you it's okay to rest, to fail, to not know. You're waiting for external permission that will never come. The permission must come from within, and that terrifies you because what if you give yourself permission and then fail anyway?"
          />
          <ShadowItem
            title="The Impostor"
            description="You sometimes exaggerate or pretend to know things you don't. This isn't malicious—it's protective. But it creates distance from authentic connection. The shadow here is the part of you that knows you're performing, and the exhaustion that comes with constant performance."
          />
        </div>
      </Section>

      {/* Behavioral Loops */}
      <Section
        icon={Link2}
        title="Behavioral Loops & Patterns"
        color="#ef4444"
        delay={0.25}
      >
        <h4 className="text-foreground font-medium mb-4">The Master Loop</h4>

        <div className="p-6 rounded-xl bg-background-tertiary border border-border mb-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <LoopStep label="Fear of failure" color="#7c3aed" />
            <LoopArrow />
            <LoopStep label="Don't attempt" color="#ef4444" />
            <LoopArrow />
            <LoopStep label="Dream stays alive" color="#3b82f6" />
            <LoopArrow />
            <LoopStep label="Guilt builds" color="#f59e0b" />
            <LoopArrow />
            <LoopStep label="Procrastinate" color="#ec4899" />
            <LoopArrow />
            <LoopStep label="Feel worse" color="#6366f1" />
            <LoopArrow />
            <LoopStep label="Fear grows" color="#7c3aed" />
            <div className="text-foreground-subtle text-sm mt-2">↻ Repeat</div>
          </div>
        </div>

        <h4 className="text-foreground font-medium mb-4">Secondary Loops</h4>

        <div className="space-y-4">
          <LoopCard
            title="The Morning Doom Loop"
            steps={["Wake late (after 12pm)", "Miss trading window", "Compound guilt", "Avoid starting anything", "Stay up late to 'make up for it'", "Wake late"]}
            insight="The late waking isn't laziness—it's avoidance. If you don't start the day, you can't fail at it."
          />

          <LoopCard
            title="The Break Collapse"
            steps={["Break begins with energy", "First week productive", "Week 2-3 habits erode", "Complete collapse", "Self-criticism", "Give up until break ends"]}
            insight="Temporary spaces amplify this. Home during break feels impermanent, so why build habits?"
          />

          <LoopCard
            title="The Scroll Escape"
            steps={["Face difficult task", "Resistance arises", "Pick up phone 'for a second'", "6 hours later...", "Day is 'ruined'", "More scrolling to numb the shame"]}
            insight="The phone isn't the problem—it's the solution to a problem you haven't addressed."
          />
        </div>
      </Section>

      {/* Emotional Landscape */}
      <Section
        icon={Heart}
        title="Emotional Landscape"
        color="#ec4899"
        delay={0.3}
      >
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Dominant Emotional Tone
            </h4>
            <div className="space-y-2">
              <EmotionBar label="Fear" value={0.85} color="#7c3aed" />
              <EmotionBar label="Longing" value={0.75} color="#8b5cf6" />
              <EmotionBar label="Grief" value={0.65} color="#1e3a5f" />
              <EmotionBar label="Anger" value={0.55} color="#ef4444" />
              <EmotionBar label="Hope" value={0.50} color="#3b82f6" />
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
              <Flame className="w-4 h-4" />
              Emotional Triggers
            </h4>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Others' success → Depression, comparison</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Not being invited → Feeling peripheral, rejected</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Helping parents with tech → Disproportionate rage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Relaxation → Guilt, anxiety</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Not knowing something → Urge to fabricate</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
          <h4 className="text-emerald-500 font-medium mb-2 flex items-center gap-2">
            <Sun className="w-4 h-4" />
            Emotional Strengths
          </h4>
          <p className="text-sm text-foreground-muted">
            You have genuine capacity for hope, even when things are difficult. Your fear shows you care.
            Your longing reveals what you truly want. Your anger, properly channeled, could be a force
            for change. The emotional intensity you experience isn't a bug—it's a feature. The work is
            learning to ride the waves rather than being drowned by them.
          </p>
        </div>
      </Section>

      {/* Relational Patterns */}
      <Section
        icon={Users}
        title="Relational Dynamics"
        color="#ec4899"
        delay={0.35}
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-foreground font-medium mb-3">How You Show Up</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-background-tertiary border border-border">
                <span className="text-sm text-foreground-subtle">In Groups</span>
                <p className="text-foreground mt-1">Surface-level, performative</p>
                <p className="text-sm text-foreground-muted mt-2">
                  Groups trigger performance mode. You become who you think they want, not who you are.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-background-tertiary border border-border">
                <span className="text-sm text-foreground-subtle">One-on-One</span>
                <p className="text-foreground mt-1">Capable of depth</p>
                <p className="text-sm text-foreground-muted mt-2">
                  Deeper connection possible. The real you emerges when the audience shrinks to one.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-medium mb-3">Relational Wounds</h4>
            <ul className="space-y-3 text-foreground-muted">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span>
                  <span className="text-foreground font-medium">The exclusion wound:</span> Not being invited
                  triggers a deep, old feeling of being peripheral. This suggests early experiences of feeling
                  left out or not central in your family or social system.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span>
                  <span className="text-foreground font-medium">The comparison trap:</span> Others' success
                  feels like your failure because worth is relative, not absolute. You're in constant
                  competition with everyone, even when they don't know it.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span>
                  <span className="text-foreground font-medium">The parentification:</span> The rage at
                  helping parents with technology points to a role reversal—being the competent one
                  when you needed to be the taken-care-of one.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Career & Purpose */}
      <Section
        icon={Briefcase}
        title="Career & Purpose"
        color="#f59e0b"
        delay={0.4}
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-foreground font-medium mb-3">The Trading Paradox</h4>
            <p className="text-foreground-muted mb-4">
              Trading represents the ultimate test of the avoidance pattern. Paper trading keeps the
              dream alive: you could be a successful trader, you just haven't "gone live" yet. Going live
              would mean confronting reality. Either you can do it or you can't. The fantasy is more
              comfortable than the truth.
            </p>
            <p className="text-foreground-muted">
              This isn't unique to trading—it's a template. Content creation, business ideas, career moves—
              they all follow the same pattern. Preparation becomes a permanent state because completion
              means judgment.
            </p>
          </div>

          <div>
            <h4 className="text-foreground font-medium mb-3">What Actually Works</h4>
            <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-foreground-muted">
                <span className="text-emerald-500 font-medium">BJJ and physical training stick.</span> This
                reveals something crucial: you can commit to hard things when the feedback is immediate and
                physical. The mat doesn't lie. Your conditioning either works or it doesn't. There's no
                room for the intellectual games that plague your other pursuits.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-medium mb-3">The Editing Bottleneck</h4>
            <p className="text-foreground-muted">
              You have abundant ideas but editing creates friction. Switching to reels was adaptive—you
              found a format where the creation-to-completion gap is smaller. This self-knowledge is
              valuable. Build systems that minimize the refinement phase, or find collaborators who
              enjoy what you avoid.
            </p>
          </div>
        </div>
      </Section>

      {/* What You Don't See */}
      <Section
        icon={Eye}
        title="What You Don't See"
        subtitle="Blind spots and hidden truths"
        color="#8b5cf6"
        delay={0.45}
      >
        <div className="space-y-4">
          <BlindSpot
            title="Your Standards Are Self-Sabotage"
            description="You think your high standards drive excellence. They don't—they drive paralysis. The standard is always set just high enough that nothing quite meets it, providing endless justification for not shipping, not starting, not risking."
          />

          <BlindSpot
            title="You're More Resilient Than You Know"
            description="The fact that you keep trying, keep planning, keep hoping—despite years of the same patterns—shows remarkable persistence. You haven't given up. That's not nothing. Most people would have accepted defeat by now."
          />

          <BlindSpot
            title="The Phone Isn't The Enemy"
            description="You blame the phone for lost time, but the phone is a symptom. It's the most available escape hatch when facing something uncomfortable. Remove the phone and you'll find another escape. The work is addressing what you're escaping from."
          />

          <BlindSpot
            title="You Already Know What To Do"
            description="You don't need more information. You don't need a better system. You don't need the perfect morning routine. You need to do the thing you're avoiding—and you already know what that thing is. More planning is just sophisticated procrastination."
          />

          <BlindSpot
            title="Rest Is Not Laziness"
            description="Your equation of worth with productivity is a lie you were taught. Rest is not failure—it's necessary. The guilt you feel when resting is not wisdom; it's programming. You can learn to reprogram it, but first you have to see it as programming and not truth."
          />

          <BlindSpot
            title="You're Running From Yourself"
            description="All the consumption—scrolling, content, information—is a way of being anywhere but here, now, with yourself. The fear isn't really about trading or career. It's about what you might feel if you stopped running."
          />
        </div>
      </Section>

      {/* Leverage Points */}
      <Section
        icon={Zap}
        title="Leverage Points"
        subtitle="Where small changes create big shifts"
        color="#10b981"
        delay={0.5}
      >
        <div className="grid gap-4">
          <LeveragePoint
            number={1}
            title="Schedule Around BJJ, Not Vice Versa"
            description="Your physical practice is the anchor. Everything else is negotiable. Build your life around the thing that actually works instead of trying to squeeze it in around things that don't."
          />

          <LeveragePoint
            number={2}
            title="Make One Real Trade"
            description="Not paper. Real. Small enough that losing won't matter financially, big enough that it will matter emotionally. Break the seal. The fantasy of potential needs to encounter reality."
          />

          <LeveragePoint
            number={3}
            title="One Goal, Ruthlessly Protected"
            description="Your history shows too many goals lead to none completed. Pick the single most important thing for the next 90 days. Say no to everything else. Dilution is how you've been hiding."
          />

          <LeveragePoint
            number={4}
            title="Create Space Between Stimulus and Response"
            description="When the urge to scroll arises, pause. Feel the discomfort. Ask what you're avoiding. You don't have to act on the avoidance. Just 10 seconds of space can change everything."
          />

          <LeveragePoint
            number={5}
            title="Externalize the Internal Critic"
            description="Write down what your internal critic says. Read it back. Ask if you would say this to a friend. The voice in your head is not truth—it's a scared part of you trying to protect you through cruelty."
          />

          <LeveragePoint
            number={6}
            title="Design Your Environment"
            description="You're highly environment-sensitive. Use this. When at home on break, create a 'work' space even if it's just a corner. The brain needs cues. Don't fight your sensitivity—leverage it."
          />
        </div>
      </Section>

      {/* The Path Forward */}
      <Section
        icon={Compass}
        title="The Path Forward"
        color="#06b6d4"
        delay={0.55}
      >
        <p className="text-foreground-muted leading-relaxed mb-6">
          You don't need fixing. You need understanding. The patterns you've developed made sense at some
          point—they protected you. The work now is to thank them for their service and ask if they're
          still needed.
        </p>

        <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-6">
          <h4 className="text-foreground font-medium mb-4">Core Truths to Internalize</h4>
          <ul className="space-y-3 text-foreground-muted">
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 mt-1">◆</span>
              <span>Your worth is not conditional on your output.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 mt-1">◆</span>
              <span>Failure is information, not identity.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 mt-1">◆</span>
              <span>Potential that's never tested is just another word for fear.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 mt-1">◆</span>
              <span>You are allowed to rest, to not know, to be ordinary sometimes.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 mt-1">◆</span>
              <span>The person you're comparing yourself to is also struggling.</span>
            </li>
          </ul>
        </div>

        <p className="text-foreground-muted leading-relaxed mb-4">
          The path forward isn't about becoming someone different. It's about becoming more fully yourself—
          which means integrating the shadows, loosening the death grip on identity, and taking the risks
          you've been avoiding.
        </p>

        <p className="text-foreground leading-relaxed font-medium">
          You already know the next step. You've always known. The question isn't what to do—it's whether
          you'll do it.
        </p>
      </Section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="py-8 border-t border-border text-center"
      >
        <p className="text-sm text-foreground-subtle">
          This analysis is based on {data.insights.length} insights across {data.patterns?.length || 4} identified patterns.
          <br />
          It will continue to evolve as more data becomes available.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-sm text-foreground-subtle">Living document</span>
        </div>
      </motion.footer>
    </div>
  );
}

// Helper Components

function Section({
  icon: Icon,
  title,
  subtitle,
  color,
  delay,
  children,
}: {
  icon: typeof Brain;
  title: string;
  subtitle?: string;
  color: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-sm text-foreground-subtle">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="pl-12">{children}</div>
    </motion.section>
  );
}

function ShadowItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
      <h4 className="text-purple-400 font-medium mb-2">{title}</h4>
      <p className="text-sm text-foreground-muted">{description}</p>
    </div>
  );
}

function LoopStep({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="px-4 py-2 rounded-full text-sm font-medium"
      style={{ backgroundColor: `${color}20`, color }}
    >
      {label}
    </div>
  );
}

function LoopArrow() {
  return <div className="text-foreground-subtle">↓</div>;
}

function LoopCard({
  title,
  steps,
  insight,
}: {
  title: string;
  steps: string[];
  insight: string;
}) {
  return (
    <div className="p-4 rounded-lg bg-background-tertiary border border-border">
      <h5 className="font-medium text-foreground mb-3">{title}</h5>
      <div className="flex flex-wrap gap-2 mb-3">
        {steps.map((step, i) => (
          <span key={i} className="text-xs px-2 py-1 rounded bg-background border border-border text-foreground-muted">
            {i + 1}. {step}
          </span>
        ))}
      </div>
      <p className="text-sm text-foreground-subtle italic">{insight}</p>
    </div>
  );
}

function EmotionBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-foreground-muted w-16">{label}</span>
      <div className="flex-1 h-2 bg-background-tertiary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="text-xs text-foreground-subtle w-8">
        {Math.round(value * 100)}%
      </span>
    </div>
  );
}

function BlindSpot({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 rounded-lg bg-background-tertiary border border-border border-l-4 border-l-purple-500">
      <h4 className="text-foreground font-medium mb-2">{title}</h4>
      <p className="text-sm text-foreground-muted">{description}</p>
    </div>
  );
}

function LeveragePoint({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-background-tertiary border border-border hover:border-emerald-500/50 transition-colors">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">
        {number}
      </div>
      <div>
        <h4 className="text-foreground font-medium mb-1">{title}</h4>
        <p className="text-sm text-foreground-muted">{description}</p>
      </div>
    </div>
  );
}
