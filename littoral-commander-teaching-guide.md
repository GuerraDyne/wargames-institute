# Learning Littoral Commander: A Layered Approach to Modern Naval Combat

**Category:** Game Guide
**Tags:** Modern naval warfare, Teaching methods, Complexity management, Sensors, Missiles, Electronic warfare
**Summary:** Break down Littoral Commander's complex systems by starting with core concepts and adding layers of realism one at a time until you understand the full simulation.

---

## The Problem with Learning Littoral Commander

Littoral Commander is a simulation of modern naval combat in coastal waters. It models detection systems, missile engagements, electronic warfare, overlapping sensor coverage, and multi-platform coordination. If you open the rulebook and try to absorb everything at once, you'll drown in procedures before you understand what the game is actually teaching you.

Here's the trap: most players try to learn the full rules on Turn 1. They're juggling detection rolls, missile flight times, jamming allocations, and countermeasure expenditure while also trying to figure out *why any of this matters*. By Turn 3, they're exhausted and confused.

The solution is to **start simple and add complexity in layers**. Each layer introduces 2-3 new concepts. You play until those concepts feel natural, then you add the next layer. By the time you reach full complexity, you've built the mental models to handle it.

This article walks you through exactly that process.

---

## What Littoral Commander Actually Models

Before touching any rules, understand what the game is trying to teach you.

**The Core Question:** How do modern naval forces detect, target, and destroy enemy units in contested littoral (coastal) waters where detection is uncertain, missiles can be countered, and electronic warfare dominates?

**The Key Insight:** Modern naval combat isn't about ships dueling at visual range like WWII battleships trading broadsides. It's fundamentally about:

- **Sensor games** (Can you see me? Can I see you? Who knows what, when?)
- **Targeting chains** (Detecting a unit ≠ being able to target it ≠ being able to engage it)
- **Missile dynamics** (Launching a missile ≠ hitting the target)
- **Electronic warfare** (Jamming sensors, spoofing missiles, going dark to hide)
- **Information dominance** (Knowing the enemy's position without revealing your own is decisive)

This is a completely different mental model than surface gun combat. Littoral Commander teaches you to think in terms of **sensor coverage, detection probability, and targeting cycles**, not armor thickness and gun ranges.

Once you internalize this shift—from "can my guns reach them?" to "can my sensors find them, and can my missiles get through their defenses?"—the entire game clicks into place.

---

## Layer 0: The Core Loop (No Complexity)

### Why Start Here

You need to understand the skeleton of the game before adding muscles, organs, and skin. Layer 0 strips away *everything* except the absolute basics: ships move, ships shoot missiles, missiles hit targets.

This sounds trivial, but it's not. By playing the simplest version, you internalize the turn sequence, understand what "range" means in a missile-centric game, and get a feel for positioning. You're building the foundation.

**What you're learning:** The basic rhythm of the game. How movement works. What happens when you fire a missile. How damage affects units. Nothing fancy—just the core loop repeated until it feels automatic.

### The Scenario

Two surface groups facing off in open water. No terrain, no complications. Blue has 2 frigates. Red has 2 frigates. Everyone can see everyone. Missiles always hit. First side to destroy the enemy wins.

This scenario teaches you that positioning matters (you need to be in missile range), timing matters (who shoots first?), and resource management matters (each ship has limited missiles).

### The Simplified Ruleset (Layer 0)

**Setup:**
- Place 2 Blue frigates on one side of the map
- Place 2 Red frigates on the opposite side
- All units start visible to all players

**Turn Sequence:**
1. **Movement Phase:** Each ship can move up to 4 hexes
2. **Targeting Phase:** Each ship picks one visible enemy unit within missile range (8 hexes)
3. **Launch Phase:** Each ship fires one missile at its designated target
4. **Resolution Phase:** All missiles automatically hit their targets and deal damage
5. **Status Check:** Remove any destroyed units

**Unit Stats (Frigate):**
- Movement: 4 hexes
- Missile Range: 8 hexes
- Missiles Remaining: 6
- Hit Points: 2 (destroyed after 2 hits)

**Victory Condition:** Eliminate all enemy ships

**Play This Until:** You can execute a turn without thinking about the rules. You instinctively check ranges before moving. You understand that closing distance matters, and that running out of missiles is a real problem.

---

## Layer 1: The Fog Descends (Detection Mechanics)

### Why This Changes Everything

In Layer 0, you could always see the enemy. You moved, targeted, fired. Simple. But in real naval warfare, *you don't know where the enemy is*. Detection isn't automatic—it's uncertain, probabilistic, and limited by sensor range.

This single change transforms the game. Now you're asking fundamentally different questions:

- Should I move closer to increase my detection chance, even though it exposes me?
- Do I fire at a faint contact (low confidence) or wait for a better lock?
- Can I coordinate sensors from multiple ships to improve detection?
- Should I use active radar (see better, but reveal my position) or passive sensors (stay hidden, but see less)?

Detection uncertainty introduces *fog of war*. You're no longer playing perfect information chess. You're making decisions under uncertainty, which is what real naval commanders do every day.

### What Detection Models

Modern sensors aren't magic. Radar has limited range. Detection probability decreases with distance. Weather affects sensor performance. Fast-moving targets are easier to detect than slow ones. Enemy jamming degrades your sensors.

Littoral Commander abstracts this into a simple system: you roll dice to detect enemy units within your sensor range. The farther away they are, the harder they are to detect. You might detect a unit one turn, then lose the contact the next turn if they move out of optimal range.

This teaches you that **information is perishable**. That contact you detected 3 turns ago? If you haven't reacquired it, you don't know where it is anymore. You're shooting at ghosts.

### The Scenario

Same setup as Layer 0, but now units start undetected. You must find the enemy before you can shoot them. This forces you to think about sensor management, not just missile range.

Blue's mission: Detect and destroy Red forces. Red's mission: Same. Both sides start blind.

### The Simplified Ruleset (Layer 1)

**Setup:**
- Place units as in Layer 0
- All units start **undetected**
- Each ship has a sensor range of 10 hexes

**Turn Sequence:**
1. **Detection Phase:**
   - For each friendly ship, roll 1d6 for each enemy unit within sensor range (10 hexes)
   - **Success on 4+** (base detection roll)
   - **Modifier:** -1 to roll for each 3 hexes beyond 6 hexes (longer range = harder to detect)
   - If successful, mark that enemy unit as "detected" for this turn only

2. **Movement Phase:** Ships move up to 4 hexes

3. **Targeting Phase:** Each ship can only target **detected** enemies within missile range

4. **Launch Phase:** Fire missiles at designated targets

5. **Resolution Phase:** Missiles automatically hit (still no countermeasures yet)

6. **Status Check:** Remove destroyed units

**Detection Examples:**
- Enemy at 5 hexes: Roll 4+ to detect (normal range)
- Enemy at 8 hexes: Roll 5+ to detect (-1 penalty for distance)
- Enemy at 11 hexes: Beyond sensor range, cannot detect

**Key Rule:** Detection doesn't persist. If you detected a unit last turn but fail the roll this turn, you lose the contact. You must re-detect it.

**Play This Until:** You're instinctively checking sensor ranges before moving. You understand why multiple ships coordinating detection is powerful (more dice = better chance to find the enemy). You've experienced the frustration of losing a contact and having to search for it again.

---

## Layer 2: Missiles Don't Always Hit (Defense and Uncertainty)

### Why This Is Where It Gets Real

In Layer 0 and Layer 1, once you launched a missile, it hit. Guaranteed. That's not how modern naval combat works.

Real missiles take time to fly to their targets. During that flight time, the target can:
- Shoot down the incoming missile with point defense systems
- Deploy chaff or flares to decoy the missile
- Use electronic countermeasures to spoof the missile's seeker
- Maneuver to break lock

This changes your entire tactical calculus. Now launching one missile at a defended cruiser is basically a waste of ordnance. But launching *ten* missiles simultaneously? That overwhelms their defenses. Some will get through.

### What This Layer Teaches

**Saturation is king.** Single missile attacks are inefficient. Coordinated salvos from multiple platforms are decisive. This is why modern navies operate in task forces—not because individual ships are weak, but because *coordinated fires* are exponentially more effective than isolated attacks.

You also learn **resource management at a deeper level**. Point defense systems have limited ready rounds. Countermeasures are finite. Once a ship expends its defensive stockpile, it's vulnerable. Forcing the enemy to burn through their defenses on decoy salvos, then hitting them with the real attack, is a legitimate tactic.

And you learn **timing**. If you can coordinate missile launches so that all impacts happen in the same turn, the target has to deal with everything at once. They can't regenerate defenses between salvos.

### The Scenario

Blue task force (2 frigates, 1 destroyer) vs Red task force (2 frigates, 1 destroyer). Detection is still in play (Layer 1), but now you also have to deal with missile defense.

The destroyer has better point defense than the frigates. You need to decide: attack the defended destroyer (higher value target, harder to kill) or the undefended frigates (easier kills, but lower value)?

### The Simplified Ruleset (Layer 2)

**Setup:**
- Same as Layer 1, but add 1 destroyer per side
- Destroyers have better point defense

**Turn Sequence:**
1. **Detection Phase:** (same as Layer 1)
2. **Movement Phase:** (same as Layer 1)
3. **Targeting & Launch Phase:** Designate targets and fire missiles (note flight times)
4. **Missile Flight Phase** (NEW):
   - Track missiles in flight (missiles take 1 turn to reach target from 8+ hexes)
   - Shorter range = instant impact
5. **Defense Phase** (NEW):
   - Target rolls point defense vs each incoming missile
   - Target can deploy countermeasures (limited uses)
6. **To-Hit Phase** (NEW):
   - Roll to-hit for each surviving missile
7. **Damage Resolution:** Apply damage from successful hits
8. **Status Check:** Remove destroyed units

**New Unit Stats:**

*Frigate:*
- Point Defense: 1 shot per turn (roll 5+ to destroy incoming missile)
- Countermeasures: 3 uses (each use grants -1 to incoming missile to-hit roll)

*Destroyer:*
- Point Defense: 3 shots per turn (roll 4+ per shot)
- Countermeasures: 5 uses

**Missile To-Hit:**
- Base: 4+ on 1d6
- Modifier: -1 if target used countermeasures this turn
- Modifier: -1 if target is maneuvering (moved 3+ hexes this turn)

**Saturation Example:**
- Frigate fires 1 missile at destroyer
  - Destroyer shoots it down with point defense (4+ on 1d6, likely success)
  - Even if it gets through, the missile rolls to-hit at 4+ (50% chance)
  - Low chance of hitting

- 3 frigates fire 3 missiles at destroyer (coordinated salvo)
  - Destroyer has 3 point defense shots, shoots at all 3 missiles
  - Likely 1-2 missiles get through the point defense layer
  - Destroyer deploys countermeasures (-1 to-hit for all surviving missiles)
  - Surviving missiles roll to-hit at 5+ instead of 4+
  - High chance at least 1 missile connects

**Play This Until:** You're thinking in terms of "salvos" not "shots." You understand why concentrating fire on a single target is more effective than spreading attacks. You're tracking enemy defensive expenditure and timing your big attacks for when they're depleted. You instinctively coordinate launches from multiple ships to saturate defenses.

---

## Layer 3: The Electromagnetic Battlefield (Electronic Warfare)

### Why This Is The Graduate Level

Electronic warfare (EW) is where Littoral Commander separates casual players from serious students of modern naval combat. This layer introduces jamming, emissions control (EMCON), and passive detection.

Here's the conceptual shift: **turning on your radar is a decision, not a default state**.

In Layers 0-2, you assumed your sensors were always on. You searched for the enemy, detected them, shot at them. But in Layer 3, you learn that *emissions reveal your position*. Every time you ping with active radar, you're announcing "I'm here!" to anyone with passive sensors.

This creates a dilemma:
- **Emit (active radar):** You see better, but the enemy knows where you are
- **EMCON (emissions silent):** You're invisible, but you're also blind (or relying on passive sensors, which have shorter range)

### What Electronic Warfare Models

Real naval task forces don't have all ships radiating at full power. They use **emission management**. A typical tactic:

1. Most ships stay dark (EMCON)
2. One ship (often the most expendable) emits and acts as the sensor platform
3. That ship shares targeting data with the dark ships
4. Enemy detects the emitting ship, shoots at it
5. The dark ships fire from positions the enemy doesn't know

You can also *jam* enemy sensors. Noise jamming reduces their detection range. Deception jamming creates false contacts, forcing them to waste missiles on ghosts.

This layer teaches you that **information warfare is real**. Degrading enemy sensors can be more valuable than shooting. Forcing them to go active (emit) to find you reveals their position. Staying dark while coordinating fires from multiple platforms is the ultimate tactical goal.

### The Scenario

Blue and Red task forces, same composition as Layer 2, but now you have EW assets. One ship per side has a dedicated jamming suite.

Blue's mission: Locate and destroy Red forces while minimizing own emissions. Red's mission: Same, plus jamming Blue's search radars.

The winner is the side that manages emissions better, coordinates dark platforms effectively, and uses jamming to degrade enemy situational awareness.

### The Simplified Ruleset (Layer 3)

**Setup:**
- Same units as Layer 2
- Add 1 EW frigate per side (specialized electronic warfare ship)

**Turn Sequence:**
1. **Emissions Planning Phase** (NEW):
   - Declare which ships are emitting (active radar) vs EMCON (silent)
   - Emitting ships can detect normally
   - EMCON ships have reduced detection range (6 hexes instead of 10) but cannot be detected by enemy passive sensors

2. **ESM Phase** (Electronic Support Measures - NEW):
   - Any ship with passive sensors (all ships) can detect enemy **emissions** (not the ship itself, but its radar signature)
   - Auto-detect any emitting enemy ship within 15 hexes (passive detection range is longer than active)
   - You know direction and approximate range, but not precise location
   - Mark "emission detected" for each emitting enemy

3. **Jamming Phase** (NEW):
   - EW ships allocate jamming: noise jamming or deception jamming
   - **Noise jamming:** Reduces enemy detection range by 4 hexes for ships within 8 hexes of jammer
   - **Deception jamming:** Creates 2 false contacts (enemy wastes effort targeting ghosts)

4. **Detection Phase:**
   - Active radars detect as in Layer 1, modified by jamming
   - EMCON ships have -4 hex detection range but cannot be passively detected

5. **Movement Phase:** (same as Layer 1-2)

6. **Targeting & Launch Phase:** (same as Layer 2)

7. **Missile Flight, Defense, To-Hit, Damage:** (same as Layer 2, but jamming affects missile seekers)

**EW Frigate Special Stats:**
- Jamming Range: 8 hexes
- Jamming Options: Noise (reduce detection) or Deception (false contacts)
- Can jam OR emit for detection, not both

**EMCON Trade-offs:**
- **Emitting (Radar ON):**
  - Detection range: 10 hexes
  - Can be detected passively by enemy at 15 hexes
  - Vulnerable to anti-radiation missiles (not in this layer, but conceptually)

- **EMCON (Radar OFF):**
  - Detection range: 6 hexes (passive sensors only)
  - Cannot be detected passively
  - Must rely on other ships for targeting data

**Coordination Example:**
- Blue Destroyer (high-value ship): Goes EMCON, stays hidden
- Blue Frigate 1: Emits, detects Red ships, shares targeting data with destroyer
- Blue Frigate 2: Goes EMCON, receives targeting from Frigate 1, fires from hidden position
- Blue EW Frigate: Jams Red's search radars, degrading their detection range

Result: Red detects the emitting Blue Frigate 1, shoots at it. But the real threat is the hidden Destroyer and Frigate 2, which are shooting from positions Red doesn't know.

**Play This Until:** You're making EMCON decisions instinctively. You understand why having one ship "light up" while others stay dark is a valid tactic. You're using jamming to degrade enemy sensors, not just shooting. You've coordinated attacks where the firing ships are not the emitting ships. You understand that information dominance (knowing where they are while they don't know where you are) is more valuable than raw firepower.

---

## Layer 4: Combined Operations (The Full Game)

### Why This Is Where Strategy Emerges

Layers 0-3 taught you the building blocks. Layer 4 teaches you how to combine them into operational art.

Now you're not just managing surface ships. You have:
- **Air assets** (different sensors, different weapons, different movement rules)
- **Submarines** (underwater, different detection, torpedoes instead of missiles)
- **Shore-based radars** (fixed position, extended sensor range)
- **Mission objectives** (it's not just "kill everything")
- **Time pressure** (limited turns to achieve objectives)

This is where the game stops being tactical (how do I win this engagement?) and starts being operational (how do I achieve the mission within constraints?).

### What Full Complexity Models

Real naval operations aren't "destroy all enemy ships." They're:
- "Neutralize coastal defenses to enable amphibious landing" (time-limited, specific targets)
- "Establish sea control in this zone for 48 hours" (area denial, not destruction)
- "Locate and destroy enemy submarine" (ASW mission, detection-focused)

You have limited air sorties. You have limited time. You have limited ordnance. You can't just throw everything at the enemy—you have to prioritize.

**The big lesson:** Combined arms is mandatory. Your surface ships can't do it alone. You need:
- Air to extend sensor range and provide over-the-horizon targeting
- Subs to threaten enemy surface ships and force them into defensive postures
- Shore radars to provide persistent sensor coverage
- Coordinated timing so all platforms hit at once

### The Scenario

**Blue Mission:** Destroy Red coastal radar installation (hex X,Y) within 10 turns. The radar is protected by Red surface ships and coastal anti-air defenses.

**Red Mission:** Defend coastal radar for 10 turns. Secondary: Inflict maximum casualties on Blue forces.

Blue has:
- 3 surface ships (1 destroyer, 2 frigates)
- 2 air sorties (attack aircraft with anti-ship missiles)
- 1 submarine (diesel-electric, limited endurance)

Red has:
- 2 surface ships (1 destroyer, 1 frigate)
- 1 coastal radar (fixed position, provides detection for Red forces)
- 2 shore-based SAM (surface-to-air missile) sites protecting the radar

**The Operational Problem:** Blue can't just charge in—the coastal SAMs will destroy their aircraft, and the surface ships can't reach the radar without getting detected by it first (giving Red perfect information). Blue must:
1. Suppress or destroy the SAMs (requires air or missiles)
2. Neutralize Red surface ships (they'll shoot at Blue aircraft)
3. Destroy the radar (primary objective)
4. Do all this within 10 turns

This is a multi-phase operation requiring coordination, timing, and prioritization.

### The Simplified Ruleset (Layer 4)

**Turn Sequence:**
1. **Planning Phase:**
   - Allocate air sorties (limited number per game)
   - Set EMCON states
   - Designate jamming targets
   - Plan submarine movement

2. **ESM/Detection Phase:**
   - Passive ESM (detect emissions)
   - Active radar detection (modified by jamming and terrain)
   - Sonar detection (submarines only)
   - Shore radar provides detection to all Red units

3. **Movement Phase:**
   - Surface ships move
   - Aircraft move (faster, different movement rules)
   - Submarines move (underwater, slower)

4. **Air Operations Phase:**
   - Aircraft launch weapons
   - SAM sites engage aircraft (air defense)
   - Aircraft return to carrier/base (track sortie expenditure)

5. **Targeting & Launch Phase:**
   - Surface ships designate targets
   - Submarines designate targets
   - Launch missiles/torpedoes

6. **Missile Flight Phase:**
   - Track all missiles in flight
   - Different missile types have different flight times

7. **Defense Phase:**
   - Point defense vs incoming missiles
   - Countermeasures
   - Torpedo countermeasures (different rules)

8. **To-Hit & Damage Resolution:**
   - Roll to-hit for all weapons
   - Apply damage
   - Check mission objectives

9. **Status Check:**
   - Remove destroyed units
   - Check turn limit (is mission time expired?)
   - Check victory conditions

**New Unit Types:**

*Attack Aircraft:*
- Movement: 20 hexes per turn
- Weapons: 2 anti-ship missiles (range 6 hexes)
- Vulnerable to SAMs (must survive SAM engagement to attack)
- Limited sorties: Once expended, aircraft returns to base

*Submarine:*
- Movement: 2 hexes (submerged)
- Detection: Sonar range 6 hexes (roll 5+ to detect surface ships)
- Surface ships detect sub on 6+ (very hard to find)
- Weapons: Torpedoes (range 4 hexes, auto-hit if undetected)

*Coastal Radar (Red):*
- Fixed position (cannot move)
- Detection range: 15 hexes (auto-detect all emitting ships)
- Shares targeting data with all Red units
- Hit Points: 1 (fragile, but mission-critical for Red)

*SAM Site (Red):*
- Fixed position
- Engages Blue aircraft within 8 hexes
- Roll 4+ to destroy aircraft before it can attack
- Cannot engage surface ships or submarines

**Victory Conditions:**

**Blue Wins If:**
- Coastal radar destroyed within 10 turns

**Red Wins If:**
- Radar survives 10 turns
- OR Blue loses 2+ surface ships (unacceptable casualties)

**Operational Considerations:**

Blue must think multi-phase:
1. **Phase 1 (Turns 1-3):** Locate Red surface ships with submarine and recon (don't reveal main force yet)
2. **Phase 2 (Turns 4-6):** Suppress SAM sites with coordinated air/missile strike
3. **Phase 3 (Turns 7-9):** Destroy or neutralize Red surface ships (they defend the radar)
4. **Phase 4 (Turn 10):** Final assault on coastal radar

Red must think defensively:
1. Use shore radar to provide perfect situational awareness
2. Position surface ships to intercept Blue aircraft
3. Protect SAM sites (they're Blue's priority target)
4. Force Blue to trade casualties for mission success (make it expensive)

**Example Turn (Blue, Turn 5):**

*Planning:*
- Blue Destroyer: EMCON, waiting for targeting data
- Blue Frigates: Emit, coordinating sensor coverage
- Blue Submarine: Submerged, moving toward Red surface ships
- Blue Aircraft: Allocated for SAM suppression strike this turn

*ESM:*
- Blue passively detects Red coastal radar emissions (15 hex range)
- Blue knows general direction of Red radar

*Detection:*
- Blue Frigates detect 1 Red frigate (active radar, 10 hex range)
- Red coastal radar detects both emitting Blue frigates (auto-detect)
- Red does NOT detect Blue Destroyer (EMCON, no emissions)
- Red does NOT detect Blue submarine (submerged, hard to find)

*Movement:*
- Blue Aircraft moves 20 hexes toward Red SAM sites
- Blue Frigates move closer to Red surface ships
- Blue Destroyer stays dark, receives targeting from frigates

*Air Operations:*
- Blue Aircraft enters SAM engagement range (8 hexes)
- Red SAM Site 1 engages: rolls 4+ to destroy aircraft (let's say fails, aircraft survives)
- Blue Aircraft launches 2 missiles at SAM Site 1
- Aircraft turns back toward friendly forces (sortie expended)

*Targeting & Launch:*
- Blue Frigate 1 fires 2 missiles at detected Red frigate
- Blue Destroyer (hidden) fires 2 missiles at Red frigate (receives targeting from Frigate 1)
- Red frigate faces 4 incoming missiles (saturation attack)

*Defense:*
- Red frigate has 1 point defense shot (rolls, shoots down 1 missile)
- Red frigate deploys countermeasures (reduces to-hit for remaining 3 missiles)
- 3 missiles roll to-hit at 5+ (countermeasures modifier)
- Let's say 2 hit, Red frigate takes 2 damage, destroyed

*Damage Resolution:*
- Red SAM Site 1 takes 2 missile hits, destroyed
- Red Frigate destroyed
- Blue Aircraft survives, returns to carrier

*Status:*
- Turn 5 complete
- Blue casualties: 0
- Red casualties: 1 SAM site, 1 frigate
- Turns remaining: 5
- Radar still standing (Blue mission incomplete)

Blue is making progress: 1 SAM down, 1 surface ship down. But they're running out of time and have only 1 air sortie left. They need to prioritize: destroy the second SAM, or go for the radar now?

**Play This Until:** You're thinking operationally (multi-turn plans, phased operations, acceptable losses). You understand combined arms coordination (air sets up surface strikes, sub threatens to split enemy attention). You're making trade-offs (speed vs stealth, mission success vs force preservation). You can look at a scenario and immediately identify the critical path to victory.

---

## Why This Layered Approach Works

**Cognitive Load Management:** Each layer adds 2-3 new concepts. You master them before adding more. You're never juggling 15 new rules at once.

**Mental Model Building:** You're not memorizing procedures—you're building an intuition for how modern naval warfare works. By Layer 4, you can predict what Layer 5 would add (if it existed) because you understand the underlying model.

**Transfer Learning:** Once you internalize Layer 2 (missiles can be defended against), you can guess Layer 3 will add sensor degradation (jamming). The concepts build on each other logically.

**Motivation Through Progress:** Layer 0 feels like checkers. Layer 4 feels like commanding a task force. You see yourself improving, which keeps you engaged.

**Scaffolding:** Each layer is a playable game. You're not waiting until Layer 4 to "actually play." You're playing at every stage, just with increasing sophistication.

---

## Teaching Sessions (How to Use This Guide)

**Session 1: Layer 0 (30 minutes)**
- Read "What Littoral Commander Actually Models"
- Play 3-5 turns of Layer 0
- Focus: Internalize turn sequence, understand missile range
- Debrief: "This is the skeleton. Everything else builds on this."

**Session 2: Layer 1 (45 minutes)**
- Read Layer 1 explanation
- Play 5-7 turns with detection mechanics
- Focus: Uncertainty, sensor management, losing contacts
- Debrief: "Now you understand why detection matters. The enemy isn't always visible."

**Session 3: Layer 2 (60 minutes)**
- Read Layer 2 explanation
- Play full scenario (until victory)
- Focus: Saturation attacks, defense management, coordination
- Debrief: "One missile = waste. Ten missiles = kills. Coordination is everything."

**Session 4: Layer 3 (60 minutes)**
- Read Layer 3 explanation
- Play full scenario with EMCON and jamming
- Focus: Emissions management, information warfare
- Debrief: "The side that controls information wins. Shooting is secondary."

**Session 5: Layer 4 (90-120 minutes)**
- Read Layer 4 explanation
- Play full operational scenario
- Focus: Multi-platform coordination, mission prioritization, time constraints
- Debrief: "This is operational art. You're not fighting an engagement—you're executing a campaign."

By Session 5, you're playing the full game. But you built up to it systematically instead of drowning in rules on Turn 1.

---

## What Littoral Commander Teaches About Modern Warfare

By progressing through these layers, you learn concepts that professional naval planners use:

**1. Detection Dominates:** If you can't see the enemy, you can't engage them. Sensors matter more than weapons in the opening phases of an engagement.

**2. Information Asymmetry Is Decisive:** Knowing where the enemy is (without them knowing your position) is more valuable than having the best weapons. This is why EMCON and jamming are critical.

**3. Missiles Changed the Calculus:** Range no longer correlates with ship size or tonnage. A small corvette with modern missiles can threaten a capital ship. This is why modern naval forces focus on distributed lethality—many small platforms instead of few large ones.

**4. Defense Is Finite:** Point defense systems and countermeasures run out. Saturation attacks (coordinated fires from multiple platforms) overwhelm defenses. This is why volume of fire matters in modern combat.

**5. Emissions Management Is Tactical:** Turning on your radar is a decision with consequences. Radiate, and you see better—but you also reveal yourself. Go dark, and you're safer—but you're blind. Real naval forces balance this constantly.

**6. Combined Arms Is Mandatory:** No single platform can win alone. Surface ships can't operate without air cover. Air can't penetrate without surface ships suppressing SAMs. Submarines threaten and force enemy defensive postures. You need all three working together.

**7. Mission Focus > Enemy Destruction:** Winning isn't always "kill everything." Sometimes it's "achieve this objective while preserving your force." Time constraints and limited resources force prioritization.

These aren't just game mechanics—they're **real operational concepts** that navies worldwide use in planning and exercises.

---

## Final Advice: How to Actually Use This

**Don't Skip Layers.** The temptation is to jump straight to Layer 4 because "that's the real game." But you'll spend the entire session checking rules instead of making decisions. Master each layer before advancing.

**Teach Abstraction, Not Chrome.** When introducing Layer 2, don't say "here are 12 types of countermeasures with different effects." Say "targets can defend themselves—here's how it works in simple terms." Add granularity later.

**Use Designed Scenarios.** Each layer should have a specific scenario that teaches the new concepts. Don't just say "play with these rules now." Give them a tactical problem to solve using the new mechanics.

**Reflect After Each Layer.** Don't just play and move on. Ask: "What did this mechanic teach me about modern naval warfare? Why does this rule exist?" Understanding the *why* behind the rules makes them memorable.

**Let Players Discover.** Don't lecture about saturation attacks in Layer 2. Let them try firing one missile at a destroyer, watch it get shot down, then ask "how would you change your approach?" They'll figure out coordinated salvos on their own, which is more powerful than you telling them.

---

## Conclusion

Littoral Commander is a complex simulation of modern naval combat. But complexity ≠ difficulty if you build understanding systematically.

Start with the core abstraction: modern naval combat is about detection, targeting chains, and missile dynamics—not gun duels.

Layer in mechanics one concept at a time: detection, then missile defense, then electronic warfare, then combined operations.

By the time you reach full complexity, you're not overwhelmed. You've built the mental models to handle it. You understand *why* the rules exist, not just *what* they are.

**Start simple. Add layers. Master each before moving forward.**

That's how you learn Littoral Commander. That's how you learn any complex wargame. That's how you build expertise in any complex system.

Now go play Layer 0. See you at Layer 4.
