---
layout: post
title:  "Rocket Propeller"
date:   2021-03-11 10:05:23 +0000
proj_name: rocket_propeller
use_math: true

categories: dynamics
---
<style type="text/css">
.center {
    margin: 0 auto;
    display: block;
}
.scale {
    min-width: 70%;
}
.box {
    border-style: solid;
}
</style>
{% include mathjax_support.html %}
Problems can seem deceptively simple. A while ago, I got asked what I thought
would be a boring and simple 2D dynamics problem, but it ended up becoming a
really interesting math problem involving complex numbers. I wanted to share
this problem because it illuminated a couple concepts for me, and I hope to
share that knowledge with others. First, I learned that understanding how
objects relate to eachother does not mean that I'll be able to easily solve for
how those same objects concretely interact with eachother. Second, I learned
that "imaginary" numbers can pop up all over the place, even in something as
seemingly simple as a 2D dynamics problem.

The problem that I was asked to help with, was understanding what would happen
if a force was constantly applied perpendicularly to a skinny bar at one of its
ends. The person who asked it thought a propeller could be modeled as a bar with
a massless rocket thruster at one of its ends -- and it can't -- but I didn't
tell them that because I thought it was funny and the problem was really
interesting.

## The Boring Part

Before I can get to the interesting part I have to go through the regular
dynamics. I tried to be thorough, so it includes a lot of math. If you want to
skip ahead to where the complex numbers are introduced, click
[here](#the-interesting-part). If you just want to see how I simulated the
system, click [here](#the-simulation).

# Problem Statement

A long skinny bar at rest with uniformly distributed mass <span>$m$</span>,
center of mass <span>$G$</span>, and length <span>$L$</span> experiences a
constant magnitude force <span>$\bf{\vec{F}}$</span> perpendicular to the bar at
point <span>$P$</span> on one of its ends. Describe the motion of the bar.

![Problem Figure](/assets/{{ page.proj_name }}/figure1.svg){: .center .scale }

# Step 1: Find orientation

The first step is to find the orientation of the bar at any point in time.

If I define <span>$\theta(t)$</span> to be the angle of the bar at time
<span>$t$</span>, then I can define:
<div>$$
\bf{\vec{r}}_{\mathit{P/G}} = \mathrm{\frac{\mathit{L}}{2}} \left[\matrix{ \cos(\theta)
\cr \sin(\theta) }\right] 
$$</div>
<div>$$
\bf{\vec{F}} = \lvert\vec{F}\rvert \left[\matrix{ -\sin(\theta) \cr \cos(\theta) }\right]
$$</div>

I need the <span>$\theta$</span> terms to keep track of the direction of the
force and the relative position of <span>$P$</span>. I'll also be solving for
<span>$\theta$</span>. 

Since <span>$\bf{\vec{F}}$</span> and <span>$\bf{\vec{r}}_{\mathrm{P/G}}$</span>
are always perpendicular to eachother, the torque about point <span>$G$</span>
on the bar is 
<div>$$
\bf{T_\mathit{G}} = \lvert\bf{\vec{r}}_{\mathrm{P/G}}\rvert \lvert\vec{F}\rvert 
$$</div>
<div>$$
= \frac{ \mathit{L} \lvert\bf{\vec{F}}\rvert }{\mathrm{2}}
$$</div>

You can verify this by pretending the cross product exists in two dimensions
like my undergraduate physics professor loved to do.

From 2D rigid body dynamics, 
<div>$$
\mathbf{T} = \mathrm{I}\mathbf{\alpha}
$$</div>
<div>$$
\bf{T_\mathit{G}} = \mathrm{I_\mathit{G}\frac{d^2 \theta}{d t^2}}
$$</div>

For a long skinny bar, the [moment of inertia of the rod about
<span>$G$</span>](https://en.wikipedia.org/wiki/List_of_moments_of_inertia)
is <span>$\mathrm{I}_\mathit{G} = \frac{mL^2}{12}$</span>. Substituting that and the value found
for torque above, the equation becomes:

<div>$$
\frac{ \mathit{L} \lvert\bf{\vec{F}}\rvert }{\mathrm{2}}
 = \mathrm{\frac{\mathit{mL}^2}{12} \frac{d^2 \theta}{d t^2}}
$$</div>

which can be simplified into:

<div>$$ 
\mathrm{\frac{d^2 \theta}{d t^2}} =
\frac{6\lvert\bf{\vec{F}}\rvert}{\mathit{mL}}
$$</div>

I was working from the assumption that the rod starts at rest and at
<span>$\theta = 0$</span>, so after integrating twice: 
<div> $$
\theta(t) = \frac{3\lvert\bf{\vec{F}}\rvert \mathit{t}^\mathrm{2}}{\mathit{mL}}
$$</div>

To make things easier I defined
<div> $$
k = \frac{3\lvert\bf{\vec{F}}\rvert}{\mathit{mL}}
$$</div>

So the orientation of the bar <span>$\theta(t)$</span> is
<div> $$
\theta(t) = kt^2
$$</div>

# Step 2: Find the motion

This part should be simple. I define the changing position of point
<span>$G$</span> as <span>$\bf{\vec{r}_\mathrm{G}}$</span> and apply Newton's
second law
<div> $$
\mathbf{\vec{F}} = \mathit{m}\mathbf{\vec{a}}
$$ </div>
<div> $$
\bf{\vec{F}} = \mathit{m}\frac{ \mathrm{d^2} \vec{\bf{r}}_\mathit{G}
}{\mathrm{d} \mathit{t}^\mathrm{2}} 
$$ </div>

Plugging in known values and simplifying I find:
<div>$$
\frac{ \mathrm{d^2} \vec{\bf{r}}_\mathit{G}}{\mathrm{d} \mathit{t}^2} =
\frac{ \lvert\bf{\vec{F}}\rvert }{\mathit{m}}
\left[\matrix{ -\sin(\mathit{kt^2}) \cr \cos(\mathit{kt^2}) }\right]
$$</div>

and now if I integrate with respect to time I get:
<div>$$
???
$$</div>
Wait. That doesn't look right. Let me try again.

and now if I integrate with respect to time I get:
<div>$$
???
$$</div>

Something looks wrong.

## The Interesting Part

Why did the problem become hard to solve? Well, the acceleration the bar
experiences is given by the following equation:
<div>$$
\vec{\bf{a}} =
\frac{ \lvert\bf{\vec{F}}\rvert }{\mathit{m}}
\left[\matrix{ -\sin(\mathit{kt^2}) \cr \cos(\mathit{kt^2}) }\right]
$$</div>

If I wanted to find the velocity of the bar, I needed to integrate that vector
with respect to time. To do that, I had to find both of these integrals
<div>$$
\int \sin(kt^2)dt
$$</div>
<div>$$
\int \cos(kt^2)dt
$$</div>
which I didn't know how to solve for.

At the time, I was trying to find a solution without using the internet. Using
the internet on problems like these can sometimes feel like cheating, and dampen
the satisfaction of coming up with a solution on my own. Looking it up now,
those are known as the [Fresnel
integrals](https://en.wikipedia.org/wiki/Fresnel_integral), but they were not
integrals that I knew how to solve then. What I did know was the [Gaussian
integral](https://en.wikipedia.org/wiki/Gaussian_integral), and I saw a sine and cosine that I could manipulate into an
exponential if I moved the problem into the complex plane. 

If I let the horizontal direction of the problem be represented by the real
numbers, and the vertical direction by the imaginary numbers, then the
acceleration vector becomes the complex number below.
<div>$$
z = \frac{ \lvert\bf{\vec{F}}\rvert }{\mathit{m}}(-\sin(kt^2) + i\cos(kt^2))
$$ </div>
<div>$$
= \frac{ i \lvert\bf{\vec{F}}\rvert }{\mathit{m}}(\cos(kt^2) + i\sin(kt^2) )
$$ </div>
<div>$$
= \frac{ i \lvert\bf{\vec{F}}\rvert }{\mathit{m}}e^{ikt^2}
$$ </div>

I still have the issue that there is no analytic solution for the integral, but
if I look at the problem as <span>$t \to \infty$</span> I can use a modified
Gaussian integral
<div>$$
\int_{0}^{\infty} {e^{-\alpha x^2}} dx = \frac{1}{2} \sqrt{\frac{\pi}{\alpha}}
$$</div>

and just pretend it works the same for imaginary numbers of
<span>$\alpha$</span> to find what the velocity approaches.

<div>$$
v = \int_{0}^{\infty}\frac{ i \lvert\bf{\vec{F}}\rvert }{\mathit{m}}e^{ikt^2} dt
$$</div>
<div>$$
= \frac{ i \lvert\bf{\vec{F}}\rvert }{\mathit{m}}\int_{0}^{\infty}e^{ikt^2} dt
$$</div>
<div>$$
= \frac{ i \lvert\bf{\vec{F}}\rvert }{2 \mathit{m}} \sqrt{\frac{\pi}{-ik}}
$$</div>
<div>$$
= \frac{ \lvert\bf{\vec{F}}\rvert }{\mathit{m}} \sqrt{\frac{\pi}{8k}}(-1 + i)
$$</div>

And if I plugin the value of <span>$k$</span> from above:

<div>$$
v = \sqrt{\frac{\pi\mathit{L}\lvert\bf{\vec{F}}\rvert}{12\mathit{m}}}
\left(-\frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}i\right)
$$</div>

Now I can translate back from the complex plane to the vector space to find that
the velocity of the bar approaches the following vector:

<div>$$
\mathbf{\vec{v}} =
\sqrt{\frac{\pi\mathit{L}\lvert\bf{\vec{F}}\rvert}{12\mathit{m}}}
\left[\matrix{\frac{-\sqrt{2}}{2} \cr \frac{\sqrt{2}}{2}}\right]
$$</div>

That answer felt satisfying. The general behavior could be described. The bar
will start at rest, and constantly increase its rotational velocity as its
linear velocity spirals asymptotically towards that final answer. Technically
there's more math that could be done, such as quantifying how long it takes to
reach a stable threshold near the final velocity, but that seemed difficult and
really I was just tired of math. I also had a more pressing issue.

How could I be sure that my answer was right? I had made fun of my undergraduate
physics professor earlier for pretending that cross products exist in two
dimensions, but now I had just come up with the assumption that Gaussian
integrals worked for complex numbers (maybe my professor was onto something...).
I could try to find the answer online, but I was still trying to avoid looking
up the answer to any part. So, I did the next worse thing: proof by simulation.
If it's good enough for the computer, it's good enough for me. 

## The Simulation

I included a simulation of this problem in the canvas below. Uncheck the
"stopped" box to start the simulation, and use the sliders to change the
parameters of the system and restart. The green arrow represents the current
velocity of the bar, while the blue arrow represents the expected velocity from
the math above. 

<div id="guiContainer"></div>
<br/>
<canvas id="simulation" class="center scale box">It seems you don't have canvas
supported. Sorry about that.</canvas>
<script src="/assets/{{ page.proj_name }}/propellerSim.js"></script>
<script type="text/javascript">
document.onreadystatechange = () => {
    if (document.readyState == "interactive") {
        let sim = new propellerSim.World(
            document.getElementById("simulation"),
            document.getElementById("guiContainer"),
        )
    }
}
</script>
<br/>

If you let the simulation run long enough, the bar will eventually rotate so
fast and accumulate enough error that it'll deviate from the expected output.
Increasing the number of substeps should increase the amount of time that it's
stable, but because of precision errors the velocity will always eventually
deviate. 

The source code can be viewed [here](https://github.com/moosenon/propeller_sim)
if you want to see it for yourself.
