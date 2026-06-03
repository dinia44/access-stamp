import type { BlogPost } from "@/lib/content/types";

/** In-repo blog posts — used when Sanity is not configured and for seeding. */
export const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-i-wish-id-known",
    title: "What I wish I\u2019d known in my first year as a wheelchair user",
    date: "March 2026",
    excerpt:
      "The things nobody tells you, from choosing the right cushion to dealing with people's reactions.",
    readTime: "6 min read",
    sections: [
      {
        body: "The first year in a wheelchair is a crash course in things nobody mentions. Not the big stuff \u2014 you\u2019ll hear about ramps and Blue Badges quickly enough. It\u2019s the small, daily friction that catches you out.",
      },
      {
        heading: "Cushions matter more than the chair",
        body: "Most people spend hours choosing a wheelchair frame and almost no time on the cushion. But the cushion is what sits between you and pressure sores, pain, and posture problems. Ask your OT or wheelchair service specifically about pressure mapping. If they don\u2019t offer it, ask why. A good cushion can cost more than you expect \u2014 but an NHS wheelchair service should provide one if you\u2019re assessed as needing it.",
      },
      {
        heading: "People will react strangely",
        body: "Some people talk over you. Some crouch down. Some grab your chair without asking. Some congratulate you for being in a shop. None of this is your problem to fix. Work out your own responses for the situations that bother you most, and give yourself permission to ignore the rest.",
      },
      {
        heading: "Learn your door widths",
        body: "Your wheelchair has an overall width. Doors have a clear opening. Know both numbers. It saves you the daily lottery of \u2018will I fit?\u2019 and lets you plan visits without anxiety. Access Stamp\u2019s \u2018Will it fit?\u2019 tool does exactly this \u2014 you enter your chair width and we check it against audited venue measurements.",
      },
      {
        heading: "Transfers take practice",
        body: "Whether you\u2019re sliding, standing, or using a hoist, transfers improve with repetition and technique. Ask for a physiotherapy or occupational therapy review specifically about transfers \u2014 not just the destination (car, bed, toilet), but the technique, the surface height, and what happens if something goes wrong.",
      },
      {
        heading: "You\u2019ll need a repair plan",
        body: "Wheelchairs break. Castors seize, tyres puncture, joysticks fail. Know your wheelchair service repair number, have a backup plan for getting home, and keep a basic toolkit if you\u2019re able to do minor fixes. Our emergency guide covers this in detail.",
      },
      {
        heading: "It does get easier",
        body: "Not because the world becomes more accessible, but because you learn the shortcuts, the workarounds, and the people worth listening to. The first year is the steepest curve. Give yourself time.",
      },
    ],
  },
  {
    slug: "wheelchair-basics-daily-transfers",
    title: "Wheelchair basics: daily transfers",
    date: "February 2026",
    excerpt: "A practical walkthrough of transfer techniques, positioning, and building confidence.",
    readTime: "5 min read",
    sections: [
      {
        body: "A transfer is any movement from one seated position to another \u2014 wheelchair to car, wheelchair to toilet, wheelchair to bed. The principles are the same even though every person\u2019s technique is different.",
      },
      {
        heading: "Before anything else",
        body: "Lock your brakes. Move your footplates. Position the surfaces as close together as possible. Remove armrests if they\u2019re in the way and your chair allows it. These steps are non-negotiable.",
      },
      {
        heading: "Sliding board transfers",
        body: "A transfer board bridges the gap between two surfaces. Place it under your thigh on the wheelchair side and across to the target surface. Lean away from the direction of travel, shift your weight, and slide in small movements. The board should be long enough that you never have to reach the edge.",
      },
      {
        heading: "Standing transfers",
        body: "If you can weight-bear, standing transfers involve moving to the edge of the seat, positioning your feet, pushing up, pivoting, and lowering down. The key risk is losing balance mid-pivot. Practice with someone spotting you until you\u2019re confident, and always check the destination surface is stable.",
      },
      {
        heading: "Hoist transfers",
        body: "If you use a hoist, the sling fit matters enormously. A badly fitted sling causes pressure, sliding, and anxiety. Ask your OT to check your sling every time your weight or posture changes. Know how to attach, check, and release the sling \u2014 even if someone else operates the hoist.",
      },
      {
        heading: "Car transfers",
        body: "Car transfers depend on car height, door opening, parking space width, and whether you\u2019re transferring from a manual or powered chair. A transfer from a high SUV seat is very different from a low sports car. If you\u2019re choosing a new vehicle, try transfers in the showroom before committing.",
      },
      {
        heading: "When transfers go wrong",
        body: "Falls happen. Skin tears happen. If a transfer method stops working \u2014 because of pain, fatigue, or a change in condition \u2014 go back to your OT or physio before it becomes a crisis. A small technique adjustment can prevent a hospital admission.",
      },
    ],
  },
  {
    slug: "why-accessible-means-nothing",
    title: "Why \u2018wheelchair accessible\u2019 means almost nothing",
    date: "January 2026",
    excerpt: "The gap between what venues claim and what you actually find when you arrive.",
    readTime: "4 min read",
    sections: [
      {
        body: "\u2018Wheelchair accessible\u2019 is the most misleading phrase in venue marketing. A restaurant can claim it because there\u2019s a ramp to the front door \u2014 but the ramp leads to a step, the toilet is upstairs, and the tables are bolted to the floor 50cm apart.",
      },
      {
        heading: "What \u2018accessible\u2019 should mean",
        body: "Real access means you can get in, move around, use the toilet, sit comfortably, and leave safely \u2014 without asking for special help, waiting for staff, or compromising your dignity. That\u2019s a high bar, and most venues don\u2019t meet it.",
      },
      {
        heading: "What to check instead",
        body: "Forget the label. Ask specific questions: What is the door width? Is there a step at the entrance? Where is the accessible toilet and does it have grab rails? Is there turning space between tables? Is there Blue Badge parking within a reasonable distance? Can you get to every area you want to visit without using stairs?",
      },
      {
        heading: "Why Access Stamp exists",
        body: "We built Access Stamp because generic \u2018accessible\u2019 labels don\u2019t work. Our listings show real measurements, real photos, and real assessments \u2014 not marketing claims. We label our confidence level so you know whether information comes from a verified audit or a community report.",
      },
      {
        heading: "What you can do",
        body: "When you visit a venue, document what you find. Take a photo of the entrance, measure the doorway if you can, check the toilet. If you share that with us, we can add it to the listing so the next person doesn\u2019t have to guess.",
      },
    ],
  },
];