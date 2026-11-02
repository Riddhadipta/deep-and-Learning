/* =========================================================
   DeepLens — Interactive Deep Learning Academy
   Course: Deep Learning Foundations (LUH WS 2026/27)
   Instructor: Prof. Sandipan Sikdar · TA: Tobias Kalmbach
   ========================================================= */

// ========================== MATHEMATICAL RENDERING (KATEX) ==========================
function renderMath(target = document.body) {
  if (!target) return;

  // 1. Render all elements with class .formula in KaTeX display mode
  const formulaEls = [];
  if (target.classList && target.classList.contains('formula')) {
    formulaEls.push(target);
  }
  if (target.querySelectorAll) {
    target.querySelectorAll('.formula').forEach(el => formulaEls.push(el));
  }

  formulaEls.forEach(el => {
    if (!el.querySelector('.katex')) {
      let raw = el.innerText || el.textContent || '';
      raw = raw.trim();
      if (raw.startsWith('$$') && raw.endsWith('$$')) {
        raw = raw.slice(2, -2).trim();
      }
      if (window.katex && raw) {
        try {
          window.katex.render(raw, el, {
            displayMode: true,
            throwOnError: false
          });
          el.setAttribute('data-katex-rendered', 'true');
        } catch (err) {
          console.warn("KaTeX display render error on formula:", raw, err);
        }
      }
    }
  });

  // 2. Render all inline $...$ or $$...$$ formulas using KaTeX auto-render extension
  if (window.renderMathInElement) {
    try {
      window.renderMathInElement(target, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
        throwOnError: false
      });
    } catch (err) {
      console.warn("renderMathInElement error:", err);
    }
  }
}

// ========================== 14-WEEK SYLLABUS DATA (SLIDE 6) ==========================
const SYLLABUS_WEEKS = [
  { week: 1, date: "15.10", theme: "Intro + Neural Networks I", topics: "AI Revolution, ERM, Linear vs Non-linear, Perceptrons, Forward Pass" },
  { week: 2, date: "22.10", theme: "Neural Networks II", topics: "Backpropagation, Gradient Descent, Loss landscapes, Regularization" },
  { week: 3, date: "29.10", theme: "Deeper architectures I (Images)", topics: "Convolutional Neural Networks (CNNs), Pooling, ResNet, AlexNet" },
  { week: 4, date: "05.11", theme: "Deeper architectures II (Sequences)", topics: "Recurrent Networks (RNNs, LSTMs), Self-Attention & Transformers" },
  { week: 5, date: "12.11", theme: "Deeper architectures III (Graph Data)", topics: "Graphs & Topology, Adjacency matrices, Dealing with molecular data" },
  { week: 6, date: "19.11", theme: "Deeper architectures IV (Graph Data)", topics: "Graph Neural Networks (GNNs), Message passing, Drug discovery (Halicin)" },
  { week: 7, date: "26.11", theme: "Generative models I", topics: "Generative modeling principles, Generative Adversarial Networks (GANs)" },
  { week: 8, date: "03.12", theme: "Generative models II", topics: "Variational Autoencoders (VAEs), Latent space representations" },
  { week: 9, date: "10.12", theme: "Generative models III", topics: "Diffusion models, Score-based generative networks, Image inpainting" },
  { week: 10, date: "17.12", theme: "Learning paradigm I", topics: "Self-supervised learning, Contrastive learning (SimCLR, MoCo)" },
  { week: 11, date: "07.01", theme: "Learning paradigm II", topics: "Multi-task learning, Meta-learning (MAML), Few-shot transfer" },
  { week: 12, date: "14.01", theme: "Adversarial Robustness I", topics: "Data poisoning attacks, Backdoor vulnerabilities in training sets" },
  { week: 13, date: "21.01", theme: "Adversarial Robustness II", topics: "Evasion attacks (FGSM, PGD), Certified defenses, Adversarial training" },
  { week: 14, date: "28.01", theme: "Summary and outlook", topics: "Review of foundational paradigms, Frontiers of Deep Learning" }
];

// ========================== MODULES & LESSONS ==========================
const MODULES = [
  {
    id: 'lecture1',
    num: 1,
    title: 'Lecture 1: Foundations, ERM & Perceptrons',
    desc: 'Supervised learning setup, Empirical Risk Minimization, Linear collapse theorem, loss function derivations, and 10-fold cross validation.',
    icon: '🏛️',
    iconColor: 'violet',
    difficulty: 'beginner',
    lessons: [
      {
        id: 'supervised-setup',
        title: 'Supervised Learning & ERM',
        content: `
          <h2>Supervised Learning Framework</h2>
          <p>As presented in <strong>Deep Learning Foundations (Slides 11–14)</strong>, supervised learning operates on labeled training examples:</p>
          <div class="formula">\\mathcal{D} = \\{(x^1, y^1), (x^2, y^2), \\dots, (x^n, y^n)\\}</div>
          <div class="info-box">
            <div class="info-title">📋 Mathematical Notation (Slides 11–12)</div>
            <p><strong>$x^i \\in \\mathbb{R}^d$</strong> — the feature vector of the $i$-th training example (e.g. Living Area in $\\text{ft}^2$, Number of bedrooms).</p>
            <p><strong>$y^i$</strong> — the ground truth label.</p>
            <p><strong>Classification:</strong> $y^i \\in [c]$ (discrete class index, e.g. $\{0, 1\}$ or $\\{\\text{cat}, \\text{dog}, \\text{car}\\}$).</p>
            <p><strong>Regression:</strong> $y^i \\in \\mathbb{R}$ (continuous target, e.g. House Price in $\\$1000$s).</p>
          </div>
          <h3>Empirical Risk Minimization (ERM) (Slide 14)</h3>
          <p>We seek a parameterized model $f_W: \\mathbb{R}^d \\to \\mathbb{R}$ that minimizes the empirical average of the loss function over our training set:</p>
          <div class="formula">\\min_W \\frac{1}{n} \\sum_{i=1}^n l(f_W(x^i), y^i)</div>
          <p>Where $l(\\cdot, \\cdot)$ is the task-specific loss function measuring prediction error.</p>
        `
      },
      {
        id: 'linear-vs-deep',
        title: 'Linear Choice & Collapse Theorem',
        content: `
          <h2>Linear Models vs. Deep Stacking</h2>
          <p>Why can't we simply use a linear function $f_W(x) = W^T x + b$?</p>
          <div class="info-box">
            <div class="info-title">⚖️ Trade-offs (Slide 21)</div>
            <p><strong>+ Convex Optimization:</strong> Linear models with convex loss have a single global minimum — easy and guaranteed convergence!</p>
            <p><strong>- Limited Representation:</strong> They can only draw hyperplanes and cannot separate non-linear distributions (e.g. XOR, concentric circles).</p>
          </div>
          <h3>The Linear Collapse Theorem (Slide 30)</h3>
          <p>If we chain multiple layers with linear activations $\\phi(a) = a$:</p>
          <div class="formula">
            \\begin{aligned}
            y &= W_3(W_2(W_1 x + b_1) + b_2) + b_3 \\\\
            &= W_3 W_2 W_1 x + (W_3 W_2 b_1 + W_3 b_2 + b_3) \\\\
            &= W_{\\text{eff}} x + b_{\\text{eff}}
            \\end{aligned}
          </div>
          <p><strong>Core Exam Takeaway:</strong> No matter how deep you make a linear network, it algebraically collapses into a single linear model! Non-linear activations are strictly mandatory for deep expressive power.</p>
        `
      },
      {
        id: 'loss-derivations',
        title: 'Derivation of Loss Functions',
        content: `
          <h2>Derivation of Loss Functions (Slides 15–20)</h2>
          <h3>1. Regression: Squared Error Loss</h3>
          <div class="formula">l(f_W(x^i), y^i) = \\frac{1}{2} (f_W(x^i) - y^i)^2</div>
          <p>The factor $\\frac{1}{2}$ conveniently cancels with the exponent $2$ when taking derivatives during gradient descent.</p>
          <h3>2. Binary Classification: Likelihood to Cross-Entropy</h3>
          <p>For $y \\in \\{0, 1\\}$, the model predicts probability $\\hat{y} = g(f_W(x)) = \\frac{1}{1 + e^{-f_W(x)}}$. The probability distribution is modeled as a Bernoulli trial:</p>
          <div class="formula">P(y \\mid x) = \\hat{y}^y (1 - \\hat{y})^{1 - y}</div>
          <p>Maximizing the likelihood $L(W) = \\prod_{i=1}^n P(y^i \\mid x^i)$ is equivalent to minimizing the Negative Log-Likelihood (NLL), known as <strong>Binary Cross-Entropy (BCE)</strong>:</p>
          <div class="formula">l_{\\text{BCE}}(\\hat{y}, y) = - \\left[ y \\log(\\hat{y}) + (1 - y) \\log(1 - \\hat{y}) \\right]</div>
          <h3>3. Multi-Class: Softmax Cross-Entropy (Slides 34–36)</h3>
          <p>For $c$ classes, class logits $z_k = W_k^T x + b_k$ are converted to probabilities via Softmax:</p>
          <div class="formula">P(y = k \\mid x) = \\frac{e^{z_k}}{\\sum_{j=1}^c e^{z_j}}</div>
          <p>The multi-class categorical cross-entropy loss is:</p>
          <div class="formula">l_{\\text{CE}} = - \\sum_{k=1}^c y_k \\log(P(y = k \\mid x)) = - \\log(P(y = y_{\\text{true}} \\mid x))</div>
        `
      },
      {
        id: 'matrix-and-eval',
        title: 'Matrix Formulation & 10-Fold CV',
        content: `
          <h2>Matrix Formulation of Forward Pass (Slide 27)</h2>
          <p>For a batch of $n$ inputs organized as matrix $X \\in \\mathbb{R}^{n \\times d}$:</p>
          <div class="formula">Z = X W + B, \\quad A = \\sigma(Z)</div>
          <p>Where $W \\in \\mathbb{R}^{d \\times h}$ is the weight matrix, $B \\in \\mathbb{R}^{n \\times h}$ is the broadcasted bias matrix, and $\\sigma(\\cdot)$ is applied element-wise.</p>
          <h3>10-Fold Cross-Validation (Slide 43)</h3>
          <p>When training data is scarce, a simple train-test split risks high variance. In $k$-fold cross-validation:</p>
          <ol>
            <li>Split the dataset $\\mathcal{D}$ into $k=10$ equal disjoint partitions (folds).</li>
            <li>For $j = 1, \\dots, 10$: train on 9 folds ($90\\%$) and evaluate on the held-out fold $j$ ($10\\%$).</li>
            <li>Compute the final performance metric as the average across all 10 folds: $\\bar{\\text{score}} = \\frac{1}{10} \\sum_{j=1}^{10} \\text{score}_j$.</li>
          </ol>
        `
      }
    ]
  },
  {
    id: 'lecture2',
    num: 2,
    title: 'Lecture 2: Optimization, Backpropagation & Normalization',
    desc: 'Gradient descent variants, computation graphs & reverse backpropagation, advanced optimizers (Momentum, NAG, Adam), weight initializations, and normalization.',
    icon: '⚡',
    iconColor: 'cyan',
    difficulty: 'intermediate',
    lessons: [
      {
        id: 'gd-steepest-descent',
        title: 'Gradient & Steepest Descent',
        content: `
          <h2>Direction of Steepest Descent (Slides 4–8)</h2>
          <p>Given an objective function $f(W): \\mathbb{R}^d \\to \\mathbb{R}$, the gradient $\\nabla f(W)$ is the vector of all first-order partial derivatives:</p>
          <div class="formula">\\nabla f(W) = \\left[ \\frac{\\partial f}{\\partial W_1}, \\frac{\\partial f}{\\partial W_2}, \\dots, \\frac{\\partial f}{\\partial W_d} \\right]^T</div>
          <div class="info-box">
            <div class="info-title">🎯 Geometric Property (Slide 6)</div>
            <p>The gradient $\\nabla f(W)$ points in the direction of <strong>steepest ascent</strong>. Consequently, the negative gradient $-\\nabla f(W)$ points in the direction of <strong>steepest descent</strong>!</p>
          </div>
          <h3>Gradient Descent Update Rule</h3>
          <div class="formula">W_{t+1} = W_t - \\alpha \\nabla f(W_t)</div>
          <p>Where $\\alpha > 0$ is the learning rate. If $\\alpha$ is too small, convergence is painfully slow. If $\\alpha$ is too large, it overshoots and diverges!</p>
        `
      },
      {
        id: 'backprop-computation-graph',
        title: 'Computation Graph & Backpropagation',
        content: `
          <h2>Computation Graphs & Reverse Mode Autodiff (Slides 9–14)</h2>
          <p>Backpropagation is an efficient implementation of the multivariable chain rule applied to a directed acyclic graph (DAG) of elementary operations.</p>
          <h3>The Branch Sum Rule (Slide 10 Exam Classic!)</h3>
          <p>Consider the function from Slide 10: $e = (a + b)(b + 1)$. Let $c = a + b$ and $d = b + 1$, so $e = c \\cdot d$.</p>
          <p>Because the input variable $b$ fans out to two downstream nodes ($c$ and $d$), its upstream gradients must be <strong>summed</strong>:</p>
          <div class="formula">
            \\frac{\\partial e}{\\partial b} = \\frac{\\partial e}{\\partial c} \\frac{\\partial c}{\\partial b} + \\frac{\\partial e}{\\partial d} \\frac{\\partial d}{\\partial b}
          </div>
          <p>For example, if $a=2, b=1$: $c=3, d=2, e=6$.</p>
          <div class="formula">
            \\frac{\\partial e}{\\partial e} = 1, \\quad \\frac{\\partial e}{\\partial c} = d = 2, \\quad \\frac{\\partial e}{\\partial d} = c = 3
          </div>
          <div class="formula">
            \\frac{\\partial e}{\\partial a} = \\frac{\\partial e}{\\partial c} \\frac{\\partial c}{\\partial a} = 2 \\times 1 = 2
          </div>
          <div class="formula">
            \\frac{\\partial e}{\\partial b} = 2 \\times 1 + 3 \\times 1 = 5
          </div>
          <p>Notice that analytic derivative $\\frac{d}{db}[(a+b)(b+1)] = (b+1) + (a+b) = 2 + 3 = 5$. The graph computation matches exactly!</p>
        `
      },
      {
        id: 'gd-variants',
        title: 'Batch vs. SGD vs. Mini-batch',
        content: `
          <h2>Gradient Descent Variants (Slides 15–17)</h2>
          <p>How much data do we process before making each weight update?</p>
          <table style="width:100%; border-collapse:collapse; margin:16px 0;">
            <tr style="border-bottom:1px solid var(--border-color); text-align:left;">
              <th style="padding:8px;">Variant</th>
              <th style="padding:8px;">Data per Step</th>
              <th style="padding:8px;">Pros</th>
              <th style="padding:8px;">Cons</th>
            </tr>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:8px; font-weight:bold;">Batch GD</td>
              <td style="padding:8px;">All $N$ samples</td>
              <td style="padding:8px;">Exact gradient direction</td>
              <td style="padding:8px;">Cannot fit large datasets in GPU memory; slow updates</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:8px; font-weight:bold;">Stochastic GD (SGD)</td>
              <td style="padding:8px;">1 sample</td>
              <td style="padding:8px;">Fast updates, noise helps escape shallow local minima</td>
              <td style="padding:8px;">High gradient variance, wildly oscillates</td>
            </tr>
            <tr>
              <td style="padding:8px; font-weight:bold; color:var(--emerald-400);">Mini-batch GD</td>
              <td style="padding:8px;">$B$ samples ($32 - 512$)</td>
              <td style="padding:8px;">Optimal vectorization on GPUs, smooth gradients</td>
              <td style="padding:8px;">Requires tuning batch size $B$</td>
            </tr>
          </table>
        `
      },
      {
        id: 'advanced-optimizers',
        title: 'Optimizers: Momentum to Adam',
        content: `
          <h2>Advanced Optimizers (Slides 18–26)</h2>
          <h3>1. Momentum (Slide 19)</h3>
          <p>Adds a fraction $\\gamma \\approx 0.9$ of the previous velocity to dampen oscillations across steep ravines:</p>
          <div class="formula">v_t = \\gamma v_{t-1} + \\alpha \\nabla f(W_t), \\quad W_{t+1} = W_t - v_t</div>
          <h3>2. Nesterov Accelerated Gradient (NAG) (Slide 20)</h3>
          <p>Computes the gradient at the predicted "look-ahead" position $W_t - \\gamma v_{t-1}$ rather than the current position:</p>
          <div class="formula">v_t = \\gamma v_{t-1} + \\alpha \\nabla f(W_t - \\gamma v_{t-1}), \\quad W_{t+1} = W_t - v_t</div>
          <h3>3. Adam (Adaptive Moment Estimation) (Slides 24–25)</h3>
          <p>Combines 1st moment (momentum) and 2nd moment (RMSprop) with <strong>bias correction</strong>:</p>
          <div class="formula">
            \\begin{aligned}
            m_t &= \\beta_1 m_{t-1} + (1 - \\beta_1) g_t \\quad (\\text{1st moment, } \\beta_1 = 0.9) \\\\
            v_t &= \\beta_2 v_{t-1} + (1 - \\beta_2) g_t^2 \\quad (\\text{2nd moment, } \\beta_2 = 0.999) \\\\
            \\hat{m}_t &= \\frac{m_t}{1 - \\beta_1^t}, \\quad \\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t} \\quad (\\text{Bias correction!}) \\\\
            W_{t+1} &= W_t - \\frac{\\alpha}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t
            \\end{aligned}
          </div>
          <div class="info-box">
            <div class="info-title">💡 Why Bias Correction is Essential (Slide 25)</div>
            <p>Since $m_0 = 0$ and $v_0 = 0$, uncorrected estimates $m_t$ and $v_t$ are heavily biased towards zero, especially in early steps (when $t$ is small). Dividing by $1 - \\beta^t$ corrects for this initialization bias!</p>
          </div>
        `
      },
      {
        id: 'lr-schedules',
        title: 'Learning Rate Schedules & Decay',
        content: `
          <h2>Learning Rate Schedules (Slides 27–32)</h2>
          <p>Keeping learning rate constant leads to oscillations around the minimum. Common schedules:</p>
          <ul>
            <li><strong>Step Decay:</strong> Reduce $\\alpha$ by a factor (e.g. $0.1$) every $k$ epochs.</li>
            <li><strong>Cosine Annealing:</strong> $\\alpha_t = \\alpha_{\\min} + \\frac{1}{2}(\\alpha_{\\max} - \\alpha_{\\min})(1 + \\cos(t\\pi / T))$.</li>
            <li><strong>Linear Warmup:</strong> Gradually increase $\\alpha$ from $0$ to $\\alpha_0$ over the first few hundred steps before decaying.</li>
          </ul>
          <div class="info-box">
            <div class="info-title">⚠️ Exam Question: Does Adam need LR decay? (Slide 32)</div>
            <p><strong>YES!</strong> While Adam adapts learning rates coordinate-wise via $\\frac{1}{\\sqrt{\\hat{v}_t} + \\epsilon}$, it still benefits from decaying the base learning rate $\\alpha$ towards zero in late epochs to prevent overshooting!</p>
          </div>
        `
      },
      {
        id: 'weight-init',
        title: 'Weight Initialization: Xavier & Kaiming',
        content: `
          <h2>Weight Initialization Dynamics (Slides 33–39)</h2>
          <h3>1. Zero Initialization Trap</h3>
          <p>If all weights are initialized to 0, every hidden neuron in layer $l$ computes the exact same activation and receives the exact same gradient. The neurons can never specialize (<strong>symmetry trap</strong>)!</p>
          <h3>2. Standard Normal $\\mathcal{N}(0, 1)$</h3>
          <p>For deep networks, variance explodes or collapses exponentially with depth ($Var(z^{[L]}) \\approx D^L$).</p>
          <h3>3. Xavier / Glorot Initialization (Slide 37)</h3>
          <p>Assumes linear or tanh activations. To preserve activation variance from input to output:</p>
          <div class="formula">\\operatorname{Var}(W) = \\frac{2}{n_{\\text{in}} + n_{\\text{out}}} \\quad \\text{or} \\quad W \\sim \\mathcal{N}\\left(0, \\frac{2}{n_{\\text{in}} + n_{\\text{out}}}\\right)</div>
          <h3>4. Kaiming / He Initialization for ReLU (Slide 39)</h3>
          <p>ReLU zeroes out half the inputs ($x \\le 0$), halving the activation variance. To compensate, He et al. multiply the variance by 2:</p>
          <div class="formula">\\operatorname{Var}(W) = \\frac{2}{n_{\\text{in}}} \\quad \\iff \\quad W \\sim \\mathcal{N}\\left(0, \\frac{2}{n_{\\text{in}}}\\right)</div>
          <p>Without this extra factor of 2, variance halves at every ReLU layer ($2^{-L}$), causing activations to collapse to zero in 20+ layer networks!</p>
        `
      },
      {
        id: 'norm-and-reg',
        title: 'Normalization & Regularization',
        content: `
          <h2>Normalization & Regularization (Slides 40–56)</h2>
          <h3>Batch Normalization (Ioffe & Szegedy, 2015) (Slides 41–44)</h3>
          <p>Normalizes activations across the mini-batch dimension $N$ for each feature channel:</p>
          <div class="formula">
            \\mu_B = \\frac{1}{B} \\sum_{i=1}^B x_i, \\quad \\sigma_B^2 = \\frac{1}{B} \\sum_{i=1}^B (x_i - \\mu_B)^2, \\quad \\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}
          </div>
          <p>Then applies learnable scale $\\gamma$ and shift $\\beta$ parameters: $y_i = \\gamma \\hat{x}_i + \\beta$.</p>
          <div class="info-box">
            <div class="info-title">⚠️ Major Exam Trap: BatchNorm at Test Time (Slide 43)</div>
            <p>At inference / test time, you do <strong>NOT</strong> compute $\\mu$ and $\\sigma$ from test batches! Instead, the network uses the <strong>running average</strong> of means and variances tracked during training.</p>
          </div>
          <h3>Layer Normalization (Slide 45)</h3>
          <p>Normalizes across all features for a single sample (independent of batch size $B$). Indispensable for sequence models and Transformers.</p>
          <h3>Inverted Dropout (Slide 55)</h3>
          <p>During training, randomly zeroes neuron activations with probability $p$, and scales the surviving activations by $\\frac{1}{1-p}$:</p>
          <div class="formula">a_{\\text{train}} = \\frac{m \\odot a}{1 - p}, \\quad m \\sim \\text{Bernoulli}(1-p)</div>
          <p>This ensures that no scaling is needed at test time ($a_{\\text{test}} = a$).</p>
        `
      }
    ]
  },
  {
    id: 'lecture3',
    num: 3,
    title: 'Lecture 3: Deeper Architectures I: CNNs & Image Recognition',
    desc: 'Why fully connected networks fail on images, 2D convolution mechanics, spatial geometry formulas, parameter counting, pooling, and landmark architectures (AlexNet, VGG, GoogLeNet, ResNet).',
    icon: '👁️',
    iconColor: 'emerald',
    difficulty: 'advanced',
    lessons: [
      {
        id: 'why-not-fc',
        title: 'The Spatial Crisis: Why Not Fully Connected?',
        content: `
          <h2>Why Fully Connected Networks Fail on Images (Slides 3–5)</h2>
          <p>Suppose we feed an image into a standard Fully Connected (FC) layer:</p>
          <ol>
            <li><strong>Parameter Explosion:</strong> Even for a tiny $28 \\times 28 \\times 1$ image with 1600 hidden neurons, the first layer alone requires:
              <div class="formula">784 \\times 1600 \\approx 1.25 \\text{ million weights!}</div>
              For a full $224 \\times 224 \\times 3$ image, an FC layer with 1024 units would require $224 \\times 224 \\times 3 \\times 1024 \\approx 154 \\text{ million parameters!}$ Overfitting is guaranteed.
            </li>
            <li><strong>Destruction of Spatial Topology:</strong> Flattening a 2D image into a 1D vector completely ignores that adjacent pixels are correlated. Shuffling pixel indices would yield the same input to an FC layer!</li>
          </ol>
          <p><strong>The Solution:</strong> Convolutional Neural Networks (CNNs), which enforce <em>local connectivity</em> and <em>parameter sharing</em>.</p>
        `
      },
      {
        id: 'conv-mechanics',
        title: 'Mechanics of 2D Convolution',
        content: `
          <h2>Mechanics of Convolution (Slides 6–16)</h2>
          <p>A convolution layer applies a bank of small learnable filters across the spatial dimensions of an input volume:</p>
          <div class="info-box">
            <div class="info-title">📏 Key Geometric Rule (Slide 13)</div>
            <p><strong>Filters always extend across the full depth of the input volume!</strong></p>
            <p>If the input has shape $H \\times W \\times C_{\\text{in}}$, a filter of spatial size $F \\times F$ actually has dimensions:</p>
            <div class="formula">F \\times F \\times C_{\\text{in}}</div>
          </div>
          <h3>The Dot Product Operation</h3>
          <p>At each spatial position $(x, y)$, the filter computes a dot product over all $F \\times F \\times C_{\\text{in}}$ values plus a scalar bias:</p>
          <div class="formula">z_{x, y} = \\sum_{c=1}^{C_{\\text{in}}} \\sum_{u=1}^F \\sum_{v=1}^F w_{u, v, c} \\cdot I_{x+u, y+v, c} + b</div>
          <p>Applying $C_{\\text{out}}$ different filters produces an output volume of depth $C_{\\text{out}}$, where each slice is an activation feature map!</p>
        `
      },
      {
        id: 'spatial-geometry',
        title: 'Spatial Geometry & Padding Formulas',
        content: `
          <h2>Spatial Output Dimension Formula (Slides 18–23)</h2>
          <p>Given an input of spatial size $N \\times N$, filter size $F$, zero-padding $P$, and stride $S$, the output spatial size $N_{\\text{out}}$ is:</p>
          <div class="formula">N_{\\text{out}} = \\left\\lfloor \\frac{N - F + 2P}{S} \\right\\rfloor + 1</div>
          <div class="info-box">
            <div class="info-title">📐 Preservation Padding Condition (Slide 22)</div>
            <p>To preserve spatial dimensions ($N_{\\text{out}} = N$) when stride $S=1$, the required padding $P$ is:</p>
            <div class="formula">P = \\frac{F - 1}{2}</div>
            <p>Examples: For $F=3$, set $P=1$. For $F=5$, set $P=2$. For $F=7$, set $P=3$. (This is why convolutional kernels almost always have odd spatial sizes!)</p>
          </div>
        `
      },
      {
        id: 'param-counting',
        title: 'Parameter Counting & Pooling',
        content: `
          <h2>Parameter Counting in CNNs (Slides 24–25 Exam Favorite!)</h2>
          <p>For a convolution layer with $C_{\\text{in}}$ input channels, $C_{\\text{out}}$ filters of size $F \\times F$:</p>
          <div class="formula">
            \\begin{aligned}
            \\text{Weights per filter} &= F \\times F \\times C_{\\text{in}} \\\\
            \\text{Bias per filter} &= 1 \\\\
            \\mathbf{\\text{Total Learnable Parameters}} &= \\mathbf{C_{\\text{out}} \\times (F^2 \\cdot C_{\\text{in}} + 1)}
            \\end{aligned}
          </div>
          <div class="info-box">
            <div class="info-title">🧮 Slide 24 Exact Example</div>
            <p>Input: $32 \\times 32 \\times 3$ ($C_{\\text{in}}=3$). 10 filters of size $5 \\times 5$ ($C_{\\text{out}}=10, F=5$), stride 1, pad 2.</p>
            <p>Parameters = $10 \\times (5 \\times 5 \\times 3 + 1) = 10 \\times (75 + 1) = \\mathbf{760 \\text{ parameters!}}$</p>
          </div>
          <h3>Pooling Layers (Slide 26–30)</h3>
          <p>Max Pooling with a $2 \\times 2$ window and stride 2 halves both spatial dimensions ($N \\to N/2$) while leaving depth unchanged.</p>
          <p><strong>Crucial Fact:</strong> Pooling has <strong>0 learnable parameters!</strong> It is a fixed deterministic downsampling operation.</p>
        `
      },
      {
        id: 'landmark-architectures',
        title: 'Landmark Architectures: AlexNet to ResNet',
        content: `
          <h2>Landmark Architectures (Slides 31–43)</h2>
          <h3>1. AlexNet (Krizhevsky et al., 2012)</h3>
          <p>Trained on ImageNet with 2 GPUs. Breakthrough innovations:</p>
          <ul>
            <li>First large-scale deployment of <strong>ReLU</strong> ($6\\times$ faster training than tanh).</li>
            <li>Heavy data augmentation (2048x translations and flips).</li>
            <li>Dropout ($p=0.5$) on fully connected layers to prevent overfitting.</li>
          </ul>
          <h3>2. VGGNet (Simonyan & Zisserman, 2014)</h3>
          <p>Demonstrated that deep stacks of small $3 \\times 3$ convs are far superior to large $5 \\times 5$ or $7 \\times 7$ convs:</p>
          <div class="formula">
            \\text{Two } 3\\times 3 \\text{ convs}: 2 \\times (3^2 C^2) = 18 C^2 < 25 C^2 = 1 \\times (5^2 C^2) \\quad (28\\% \\text{ fewer parameters!})
          </div>
          <p>Stacking also introduces more non-linear activation layers, increasing representational depth!</p>
          <h3>3. GoogLeNet / Inception (Szegedy et al., 2014)</h3>
          <p>Introduced $1 \\times 1$ convolutions as dimensionality reduction bottlenecks. In Slide 36, a $1 \\times 1$ bottleneck reduces computational operations from <strong>854M ops to 99.5M ops</strong> (nearly $10\\times$ reduction)! Replaced final massive FC layers with <strong>Global Average Pooling (GAP)</strong>.</p>
          <h3>4. ResNet (He et al., 2015)</h3>
          <p>Solved the <em>degradation problem</em> (where deeper networks have higher training error) via <strong>Residual Skip Connections</strong>:</p>
          <div class="formula">H(x) = \\mathcal{F}(x) + x</div>
          <p>By the chain rule, gradients flow backwards along an identity gradient highway:</p>
          <div class="formula">\\frac{\\partial \\mathcal{E}}{\\partial x} = \\frac{\\partial \\mathcal{E}}{\\partial H} \\left( \\frac{\\partial \\mathcal{F}}{\\partial x} + 1 \\right)</div>
          <p>The $+1$ term prevents gradients from vanishing, enabling training of models with 152+ layers!</p>
        `
      }
    ]
  }
];

const ACTIVATIONS_ZOO = {
  identity: {
    name: "Identity",
    formula: "\\phi(x) = x",
    derivative: "\\phi'(x) = 1",
    range: "(-\\infty, \\infty)",
    continuity: "C^\\infty",
    desc: "Linear activation. Stacking identity layers collapses the entire network to a single linear transformation (Slide 30).",
    fn: x => x,
    dfn: x => 1
  },
  step: {
    name: "Binary Step",
    formula: "\\phi(x) = 1 \\text{ if } x \\ge 0 \\text{ else } 0",
    derivative: "\\phi'(x) = 0 \\quad (x \\ne 0)",
    range: "\\{0, 1\\}",
    continuity: "C^{-1}",
    desc: "Used in original Rosenblatt perceptron. Zero gradient everywhere prevents gradient-based learning via backprop.",
    fn: x => x >= 0 ? 1 : 0,
    dfn: x => 0
  },
  sigmoid: {
    name: "Logistic / Sigmoid",
    formula: "\\phi(x) = \\frac{1}{1 + e^{-x}}",
    derivative: "\\phi'(x) = \\phi(x)(1 - \\phi(x))",
    range: "(0, 1)",
    continuity: "C^\\infty",
    desc: "Squashes real values to probabilities. Prone to vanishing gradients for $|x| > 4$ where derivative drops to near zero.",
    fn: x => 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x)))),
    dfn: x => { const s = 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x)))); return s * (1 - s); }
  },
  tanh: {
    name: "Hyperbolic Tangent (Tanh)",
    formula: "\\phi(x) = \\tanh(x) = \\frac{e^x - e^{-x}}{e^x + e^{-x}}",
    derivative: "\\phi'(x) = 1 - \\tanh^2(x)",
    range: "(-1, 1)",
    continuity: "C^\\infty",
    desc: "Zero-centered alternative to sigmoid. Still suffers from gradient saturation at extreme values.",
    fn: x => Math.tanh(x),
    dfn: x => { const t = Math.tanh(x); return 1 - t * t; }
  },
  relu: {
    name: "ReLU (Rectified Linear Unit)",
    formula: "\\phi(x) = \\max(0, x)",
    derivative: "\\phi'(x) = 1 \\text{ if } x > 0 \\text{ else } 0",
    range: "[0, \\infty)",
    continuity: "C^0",
    desc: "The standard default for deep learning. Non-saturating gradient for $x>0$, computationally trivial, but susceptible to dying ReLU.",
    fn: x => Math.max(0, x),
    dfn: x => x > 0 ? 1 : 0
  },
  gelu: {
    name: "Gaussian Error Linear Unit (GELU)",
    formula: "\\phi(x) = x \\cdot \\Phi(x) \\approx 0.5x(1 + \\tanh(\\sqrt{2/\\pi}(x + 0.044715x^3)))",
    derivative: "\\phi'(x) \\approx \\Phi(x) + x \\cdot \\phi(x)",
    range: "(-0.17, \\infty)",
    continuity: "C^\\infty",
    desc: "Default activation in modern Transformers (BERT, GPT-3/4, ViT). Probabilistic regularized relaxation of ReLU.",
    fn: x => 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * Math.pow(x, 3)))),
    dfn: x => {
      const h = 0.001;
      const f1 = 0.5 * (x + h) * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * ((x + h) + 0.044715 * Math.pow(x + h, 3))));
      const f0 = 0.5 * (x - h) * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * ((x - h) + 0.044715 * Math.pow(x - h, 3))));
      return (f1 - f0) / (2 * h);
    }
  },
  softplus: {
    name: "Softplus",
    formula: "\\phi(x) = \\ln(1 + e^x)",
    derivative: "\\phi'(x) = \\frac{1}{1 + e^{-x}} = \\sigma(x)",
    range: "(0, \\infty)",
    continuity: "C^\\infty",
    desc: "Smooth continuous approximation of ReLU. Derivative is exactly the logistic sigmoid function.",
    fn: x => Math.log(1 + Math.exp(Math.min(50, x))),
    dfn: x => 1 / (1 + Math.exp(-x))
  },
  elu: {
    name: "Exponential Linear Unit (ELU)",
    formula: "\\phi(x) = x \\text{ if } x > 0 \\text{ else } \\alpha(e^x - 1)",
    derivative: "\\phi'(x) = 1 \\text{ if } x > 0 \\text{ else } \\phi(x) + \\alpha",
    range: "(-\\alpha, \\infty)",
    continuity: "C^1 (\\alpha=1)",
    desc: "Brings mean activations closer to zero like batch norm, with smoother non-zero saturation for negative inputs.",
    fn: x => x > 0 ? x : (Math.exp(x) - 1),
    dfn: x => x > 0 ? 1 : Math.exp(x)
  },
  selu: {
    name: "Scaled ELU (SELU)",
    formula: "\\phi(x) = \\lambda x \\text{ if } x > 0 \\text{ else } \\lambda \\alpha(e^x - 1)",
    derivative: "\\phi'(x) = \\lambda \\text{ if } x > 0 \\text{ else } \\lambda \\alpha e^x",
    range: "(-\\lambda\\alpha, \\infty)",
    continuity: "C^0",
    desc: "Induces self-normalizing properties in feedforward networks where activations naturally converge to zero mean and unit variance.",
    fn: x => { const lam = 1.0507, alp = 1.67326; return x > 0 ? lam * x : lam * alp * (Math.exp(x) - 1); },
    dfn: x => { const lam = 1.0507, alp = 1.67326; return x > 0 ? lam : lam * alp * Math.exp(x); }
  },
  leakyrelu: {
    name: "Leaky ReLU",
    formula: "\\phi(x) = x \\text{ if } x > 0 \\text{ else } 0.01x",
    derivative: "\\phi'(x) = 1 \\text{ if } x > 0 \\text{ else } 0.01",
    range: "(-\\infty, \\infty)",
    continuity: "C^0",
    desc: "Fixes the 'dying ReLU' issue by allowing a small, non-zero gradient ($0.01$) when $x \\le 0$.",
    fn: x => x > 0 ? x : 0.01 * x,
    dfn: x => x > 0 ? 1 : 0.01
  }
};

// ========================== QUIZ QUESTIONS ==========================
const QUIZ_DATA = {
  lecture1: {
    title: 'Lecture 1: Foundations, ERM & Loss Derivations',
    icon: '🏛️',
    questions: [
      {
        q: 'According to Slide 14, what is Empirical Risk Minimization (ERM)?',
        options: [
          'Maximizing the number of hidden layers in a neural network',
          'Minimizing empirical loss over $n$ training samples: $\\min_W \\frac{1}{n} \\sum_{i=1}^n l(f_W(x^i), y^i)$',
          'Setting all weights to zero to avoid overfitting',
          'Evaluating the test dataset before starting training'
        ],
        correct: 1,
        explanation: 'ERM searches for parameters $W$ that minimize the empirical average of the loss function over the $n$ observed training examples: $\\min_W \\frac{1}{n} \\sum_{i=1}^n l(f_W(x^i), y^i)$.'
      },
      {
        q: 'In Slide 30, what happens when multiple layers with linear activations are stacked?',
        options: [
          'They gain the capacity to solve the non-linear XOR problem',
          'The network mathematically collapses into a single linear classifier: $W_{\\text{eff}} x + b_{\\text{eff}}$',
          'The loss becomes non-convex and unsolvable',
          'The number of parameters increases exponentially with no way to multiply them'
        ],
        correct: 1,
        explanation: 'Matrix multiplication is associative and linear. Stacking $W_3(W_2(W_1 x + b_1) + b_2) + b_3$ reduces algebraically to $W_{\\text{eff}} x + b_{\\text{eff}}$. Non-linearities are strictly necessary.'
      },
      {
        q: 'Slide 39 derives the gradient of squared loss for a linear model. What is $\\frac{\\partial L}{\\partial W_j}$?',
        options: [
          '$(f_W(x) - y) x_j$',
          '$(f_W(x) - y)^2$',
          '$\\alpha (f_W(x) - y)$',
          '$\\frac{1}{2} (f_W(x) - y) W_j$'
        ],
        correct: 0,
        explanation: '$\\frac{\\partial}{\\partial W_j} \\left[ \\frac{1}{2} (f_W(x) - y)^2 \\right] = (f_W(x) - y) \\frac{\\partial}{\\partial W_j} \\left(\\sum_i W_i x_i - y\\right) = (f_W(x) - y) x_j$.'
      },
      {
        q: 'Why do we use Softmax instead of Sigmoid for multi-class classification (Slide 35)?',
        options: [
          'Sigmoid cannot compute exponential numbers',
          'Softmax normalizes class logits so their probabilities sum to exactly $1.0$ across all classes',
          'Softmax requires fewer matrix weights than Sigmoid',
          'Softmax converts discrete labels into continuous regression targets'
        ],
        correct: 1,
        explanation: 'Softmax computes $\\frac{e^{z_i}}{\\sum_j e^{z_j}}$, ensuring all outputs lie in $(0, 1)$ and sum to 1, forming a valid categorical probability distribution.'
      },
      {
        q: 'Why is 10-Fold Cross-Validation preferred over a single train-test split on small data (Slide 43)?',
        options: [
          'It guarantees 100% test accuracy',
          'It eliminates the need for computing gradients',
          'It averages performance over 10 distinct test partitions, avoiding random sample fluctuations',
          'It trains 10 times faster than a single split'
        ],
        correct: 2,
        explanation: 'A single train-test split is vulnerable to luck of the draw. 10-fold cross validation tests every data point exactly once and provides variance estimates.'
      }
    ]
  },
  lecture2: {
    title: 'Lecture 2: Optimization, Backprop & Normalization',
    icon: '⚡',
    questions: [
      {
        q: 'Consider Slide 10: $e = (a + b)(b + 1)$. If $a=2, b=1$, what is $\\frac{\\partial e}{\\partial b}$ by the Branch Sum Rule?',
        options: [
          '2',
          '3',
          '5',
          '6'
        ],
        correct: 2,
        explanation: 'Let $c=a+b=3$ and $d=b+1=2$. $\\frac{\\partial e}{\\partial b} = \\frac{\\partial e}{\\partial c}\\frac{\\partial c}{\\partial b} + \\frac{\\partial e}{\\partial d}\\frac{\\partial d}{\\partial b} = d(1) + c(1) = 2 + 3 = 5$.'
      },
      {
        q: 'Why is Bias Correction essential in Adam ($\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t}, \\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t}$) (Slide 25)?',
        options: [
          'To ensure learning rates increase linearly with batch size',
          'Because $m_0=0$ and $v_0=0$ bias early estimates towards zero',
          'To convert SGD momentum into Nesterov momentum',
          'To prevent weights from becoming negative'
        ],
        correct: 1,
        explanation: 'Initializing moments at zero causes moving averages $m_t, v_t$ to underestimate the true first and second moments in early iterations. Dividing by $1 - \\beta^t$ corrects for this initialization bias.'
      },
      {
        q: 'Does Adam require a learning rate decay schedule (Slide 32)?',
        options: [
          'No, Adam automatically decays learning rates to zero on its own',
          'Yes, decaying the base learning rate prevents oscillations and fine-tunes near the minimum',
          'No, Adam only works with a strictly constant learning rate',
          'Only when training recurrent neural networks'
        ],
        correct: 1,
        explanation: 'Even though Adam adapts individual coordinate step sizes via $\\frac{1}{\\sqrt{\\hat{v}_t} + \\epsilon}$, decaying the base learning rate $\\alpha$ is essential in late training to prevent overshooting the basin of attraction.'
      },
      {
        q: 'Why does Kaiming/He initialization use variance $\\frac{2}{n_{\\text{in}}}$ instead of Xavier\'s $\\frac{1}{n_{\\text{in}}}$ (Slide 39)?',
        options: [
          'Because Kaiming initialization was designed for tanh networks',
          'Because ReLU zeroes out half of all inputs ($x \\le 0$), halving the activation variance',
          'Because 2 is Euler\'s constant in gradient descent',
          'Because GPUs require powers of two for matrix multiplication'
        ],
        correct: 1,
        explanation: 'Since $\\text{ReLU}(x) = \\max(0, x)$ sets negative inputs to zero, the variance of its output is halved. Multiplying by 2 restores activation variance to $1.0$ through deep ReLU layers.'
      },
      {
        q: 'During inference/testing, how are $\\mu$ and $\\sigma$ calculated in Batch Normalization (Slide 43)?',
        options: [
          'Re-computed from the batch of test samples',
          'Set to $\\mu=0$ and $\\sigma=1$',
          'Using the running average of means and variances accumulated during training',
          'Randomly sampled from a standard normal distribution'
        ],
        correct: 2,
        explanation: 'Test samples may arrive one-by-one ($B=1$), making batch statistics impossible. BN freezes parameters and uses running mean and variance tracked during training.'
      },
      {
        q: 'How does Inverted Dropout handle scaling during training and testing (Slide 55)?',
        options: [
          'Scales by $1 - p$ at test time and does nothing during training',
          'Scales by $\\frac{1}{1 - p}$ during training so no scaling is needed at test time',
          'Multiplies all weights by 2 at both training and testing',
          'Divides the loss by $p$ during backpropagation'
        ],
        correct: 1,
        explanation: 'Inverted Dropout divides active activations by $1 - p$ during training, preserving expected values ($E[a_{\\text{train}}] = a$). At test time, activations are evaluated directly without modification.'
      }
    ]
  },
  lecture3: {
    title: 'Lecture 3: Deeper Architectures I: CNNs & Landmark Models',
    icon: '👁️',
    questions: [
      {
        q: 'According to Slide 24: Input is $32 \\times 32 \\times 3$. A conv layer has 10 filters of size $5 \\times 5$, stride 1, pad 2. How many total learnable parameters are in this layer?',
        options: [
          '750 parameters',
          '760 parameters',
          '10,240 parameters',
          '2,400 parameters'
        ],
        correct: 1,
        explanation: 'Formula: $C_{\\text{out}} \\times (F^2 C_{\\text{in}} + 1)$. Here: $10 \\times (5 \\times 5 \\times 3 + 1) = 10 \\times (75 + 1) = 10 \\times 76 = \\mathbf{760 \\text{ parameters}}$ (750 weights + 10 biases).'
      },
      {
        q: 'How many learnable parameters does a standard Max Pooling layer ($2\\times 2$, stride 2) have (Slide 26)?',
        options: [
          '0',
          '4 per channel',
          '$2 \\times 2 \\times C_{\\text{in}}$',
          '1 per feature map'
        ],
        correct: 0,
        explanation: 'Max Pooling is a deterministic downsampling operation that selects the maximum element in each window. It contains zero learnable parameters.'
      },
      {
        q: 'Why did VGGNet replace $5 \\times 5$ convolutions with a stack of two $3 \\times 3$ convolutions (Slide 33)?',
        options: [
          'Two $3\\times 3$ convs have a smaller receptive field than one $5\\times 5$',
          'Two $3\\times 3$ convs use $18C^2$ weights vs $25C^2$ for $5\\times 5$ (28% fewer params) and add an extra non-linearity',
          'Two $3\\times 3$ convs require fewer forward passes',
          '$5\\times 5$ convs cannot be implemented on GPUs'
        ],
        correct: 1,
        explanation: 'Both achieve an effective $5\\times 5$ receptive field, but two $3\\times 3$ layers require $2 \\times 3^2 C^2 = 18C^2$ parameters compared to $1 \\times 5^2 C^2 = 25C^2$ (a 28% reduction), while introducing an extra non-linear activation.'
      },
      {
        q: 'In GoogLeNet/Inception, how do $1 \\times 1$ convolutions reduce computation (Slide 36)?',
        options: [
          'They eliminate spatial dimensions entirely',
          'They act as low-dimensional bottleneck projections, reducing input channels before expensive $3\\times 3$ or $5\\times 5$ convs (e.g. 854M to 99.5M ops)',
          'They convert float32 numbers into 8-bit integers',
          'They bypass backpropagation'
        ],
        correct: 1,
        explanation: 'A $1\\times 1$ conv projects $C_{\\text{in}}$ channels down to a smaller bottleneck depth $C_{\\text{mid}}$ without altering spatial size, slashing total FLOPs from 854M to 99.5M ops.'
      },
      {
        q: 'What is the "Degradation Problem" that ResNet solved (Slide 40)?',
        options: [
          'Overfitting causing test error to skyrocket while training error is near 0',
          'As network depth increases, training error gets worse (higher), due to optimization difficulties rather than overfitting',
          'GPU memory degradation caused by large batch sizes',
          'Weights decaying to zero under L2 regularization'
        ],
        correct: 1,
        explanation: 'In plain deep networks, adding layers increased training error (e.g. 56 layers performed worse than 20 layers on training data!). ResNet solved this with identity shortcut connections.'
      },
      {
        q: 'In ResNet, why does the residual connection $H(x) = \\mathcal{F}(x) + x$ prevent vanishing gradients (Slide 41)?',
        options: [
          'It sets all gradients to zero',
          'The derivative $\\frac{\\partial H}{\\partial x} = \\frac{\\partial \\mathcal{F}}{\\partial x} + 1$ contains an identity term ($+1$) allowing gradients to flow back directly without decaying',
          'It replaces backpropagation with forward-mode autodiff',
          'It doubles the learning rate for residual layers'
        ],
        correct: 1,
        explanation: 'Because $\\frac{\\partial H}{\\partial x} = \\frac{\\partial \\mathcal{F}}{\\partial x} + 1$, the gradient flowing backwards always contains an additive $+1$ term that acts as an identity gradient highway directly to early layers.'
      }
    ]
  },
  applications: {
    title: 'AI Revolution Applications',
    icon: '🚀',
    questions: [
      {
        q: 'How did Stokes et al. (2020) identify Halicin using deep learning?',
        options: [
          'By generating 3D images of bacteria in Petri dishes',
          'By training a directed message-passing neural network on 2,335 molecules to predict growth inhibition',
          'By using genetic algorithms to synthesize novel protein structures',
          'By applying natural language processing to Wikipedia pharmacology pages'
        ],
        correct: 1,
        explanation: 'The Halicin paper trained a graph neural network on 2,335 diverse molecules to predict E. coli growth inhibition, then screened over 100 million compounds to discover Halicin.'
      },
      {
        q: 'What was the breakthrough achievement of Mnih et al. (2015) with Deep Q-Networks (DQN)?',
        options: [
          'A chess engine with handwritten evaluation rules',
          'Human-level control in 49 Atari 2600 games directly from raw pixel input and game scores',
          'The first neural network to beat the world Go champion',
          'A computer vision system that could detect pedestrian crossings in video feeds'
        ],
        correct: 1,
        explanation: 'DQN mastered 49 Atari 2600 games end-to-end directly from raw pixels using deep reinforcement learning without game-specific engineering.'
      },
      {
        q: 'Why are Score-based Generative Models (Diffusion) preferred over GANs for image inpainting?',
        options: [
          'Diffusion models train in fewer seconds than GANs',
          'They produce diverse, high-fidelity sample distributions with stable maximum likelihood training and no mode collapse',
          'Diffusion models do not require GPUs',
          'They only work with binary black and white images'
        ],
        correct: 1,
        explanation: 'Score-based diffusion models provide stable training dynamics (avoiding the adversarial minimax instability of GANs) and generate photorealistic inpainting that seamlessly matches surrounding context.'
      }
    ]
  }
};

const state = {
  currentSection: 'home',
  currentModule: null,
  currentLessonIdx: 0,
  completedLessons: new Set(JSON.parse(localStorage.getItem('dl_completed') || '[]')),
  quizScores: JSON.parse(localStorage.getItem('dl_quiz_scores') || '{}'),
  quizState: null,
  // Matrix studio
  matrixMode: '5feat', // '5feat' or 'housing'
  matrixWeights: null,
  collapseAct: 'linear',
  selectedActZoo: 'relu',
  // Gradient Descent engine
  gd: {
    data: [],
    W: 0.1,
    b: 0.0,
    alpha: 0.05,
    sampleIdx: 0,
    autoInterval: null
  },
  // MLE & Softmax
  mle: { y: 1, p: 0.85 },
  // Backprop & Computation Graph
  bp: {
    a: 2.0,
    b: 1.0,
    hasForward: false,
    hasBackward: false
  },
  // Optimizer Arena
  opt: {
    type: 'adam',
    x: -3.5,
    y: 2.5,
    path: [],
    iter: 0,
    running: false,
    timer: null,
    v: [0, 0],
    m: [0, 0],
    G: [0, 0]
  },
  // Weight Init & Normalization
  initNorm: {
    initScheme: 'kaiming',
    normMode: 'batch'
  },
  // CNN Lab
  cnn: {
    cin: 3,
    hin: 32,
    f: 5,
    cout: 10,
    s: 1,
    p: 2,
    arch: 'alexnet',
    kernel: 'sobelX',
    mouseX: 120,
    mouseY: 100
  },
  softmax: { logits: [2.1, 0.8, -1.2], target: 0 },
  // Inpainting
  inpaint: {
    brushSize: 24,
    isDrawing: false,
    hasMask: false,
    sceneIdx: 0
  },
  // Atari
  atari: {
    mode: 'human', // 'human' or 'ai'
    paddleX: 200,
    ballX: 240,
    ballY: 170,
    ballVx: 3,
    ballVy: -3,
    score: 0,
    bricks: [],
    animId: null
  },
  // Halicin
  halicin: {
    variant: 'native',
    hoveredAtom: null
  },
  // Flood
  flood: {
    rain: 85,
    soil: 70
  },
  // K-Fold
  kfold: {
    data: [],
    results: []
  },
  // Playground
  playground: {
    dataset: 'circles',
    layers: [4, 4],
    lr: 0.03,
    activation: 'relu',
    noise: 15,
    training: false,
    epoch: 0,
    network: null,
    data: null,
    lossHistory: []
  }
};

function saveProgress() {
  localStorage.setItem('dl_completed', JSON.stringify([...state.completedLessons]));
  localStorage.setItem('dl_quiz_scores', JSON.stringify(state.quizScores));
}

// ========================== NAVIGATION ==========================
function navigateTo(section) {
  state.currentSection = section;
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const sectionEl = document.getElementById(`section-${section}`);
  if (sectionEl) {
    sectionEl.classList.remove('active');
    void sectionEl.offsetWidth;
    sectionEl.classList.add('active');
  }

  document.querySelectorAll(`.nav-link[data-section="${section}"]`).forEach(l => l.classList.add('active'));

  if (section === 'modules' && !state.currentModule) {
    showModuleList();
  }
  if (section === 'applications') {
    setTimeout(() => {
      initInpaintCanvas();
      initAtariCanvas();
      initMoleculeCanvas();
      initFloodCanvas();
    }, 50);
  }
  if (section === 'matrix-studio') {
    setTimeout(() => {
      renderMatrixFlow();
      drawCollapseDemo();
      drawActivationZooPlot();
    }, 50);
  }
  if (section === 'gradient-lab') {
    setTimeout(() => {
      initGdEngine();
      drawMleLossPlot();
      updateSoftmaxBars();
      initBackpropSimulator();
      initOptimizerArena();
      initInitNormLab();
    }, 50);
  }
  if (section === 'cnn-lab') {
    setTimeout(() => {
      initCnnLab();
    }, 50);
  }
  if (section === 'validation-lab') {
    setTimeout(() => initKFoldLab(), 50);
  }
  if (section === 'playground') {
    setTimeout(() => initPlayground(), 50);
  }
  if (section === 'quiz') {
    renderQuizTopics();
  }

  if (sectionEl) {
    setTimeout(() => renderMath(sectionEl), 60);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hook all nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const section = link.dataset.section;
    if (section === 'modules') state.currentModule = null;
    navigateTo(section);
  });
});

document.getElementById('logo').addEventListener('click', () => navigateTo('home'));
document.getElementById('btn-start-learning').addEventListener('click', () => navigateTo('modules'));
document.getElementById('btn-apps-hero').addEventListener('click', () => navigateTo('applications'));
document.getElementById('btn-matrix-hero').addEventListener('click', () => navigateTo('matrix-studio'));

// Feature strip card click navigation
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('click', () => {
    const dest = card.dataset.navigate;
    if (dest) navigateTo(dest);
  });
});

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});

// ========================== SYLLABUS TIMELINE ==========================
function renderSyllabusTimeline() {
  const container = document.getElementById('syllabus-timeline');
  if (!container) return;
  container.innerHTML = SYLLABUS_WEEKS.map(w => `
    <div class="syllabus-card">
      <div class="s-week-tag">Week ${w.week} · ${w.date}</div>
      <div class="s-title">${w.theme}</div>
      <div class="s-topics">${w.topics}</div>
    </div>
  `).join('');
}

// ========================== APP 1: INPAINTING STUDIO ==========================
let inpaintCtx = null;
let maskCtx = null;
let maskCanvas = null;

function initInpaintCanvas() {
  const canvas = document.getElementById('inpaint-canvas');
  if (!canvas) return;
  inpaintCtx = canvas.getContext('2d');

  if (!maskCanvas) {
    maskCanvas = document.createElement('canvas');
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    maskCtx = maskCanvas.getContext('2d');
  }

  loadInpaintScene(state.inpaint.sceneIdx);

  // Brush controls
  const brushSlider = document.getElementById('brush-size');
  brushSlider.addEventListener('input', () => {
    state.inpaint.brushSize = parseInt(brushSlider.value);
    document.getElementById('brush-size-val').textContent = `${state.inpaint.brushSize}px`;
  });

  // Mouse painting
  let painting = false;
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  canvas.onmousedown = (e) => {
    painting = true;
    paintMask(getPos(e));
  };
  window.onmouseup = () => { painting = false; };
  canvas.onmousemove = (e) => {
    if (!painting) return;
    paintMask(getPos(e));
  };

  // Touch painting for mobile
  canvas.ontouchstart = (e) => {
    e.preventDefault();
    painting = true;
    const touch = e.touches[0];
    paintMask(getPos(touch));
  };
  canvas.ontouchend = () => { painting = false; };
  canvas.ontouchmove = (e) => {
    e.preventDefault();
    if (!painting) return;
    const touch = e.touches[0];
    paintMask(getPos(touch));
  };

  document.getElementById('btn-reset-inpaint').onclick = () => {
    loadInpaintScene(state.inpaint.sceneIdx);
  };
  document.getElementById('btn-load-sample').onclick = () => {
    state.inpaint.sceneIdx = (state.inpaint.sceneIdx + 1) % 3;
    loadInpaintScene(state.inpaint.sceneIdx);
  };
  document.getElementById('btn-run-inpaint').onclick = () => runNeuralInpainting();
}

function loadInpaintScene(idx) {
  const canvas = document.getElementById('inpaint-canvas');
  const W = canvas.width, H = canvas.height;
  inpaintCtx.clearRect(0, 0, W, H);
  maskCtx.clearRect(0, 0, W, H);

  // Draw procedural rich scene with an object to remove
  if (idx === 0) {
    // Scene 1: Beautiful sunset landscape with a photobomber / lamppost
    const grad = inpaintCtx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#1e1b4b');
    grad.addColorStop(0.4, '#db2777');
    grad.addColorStop(0.7, '#f59e0b');
    grad.addColorStop(1, '#064e3b');
    inpaintCtx.fillStyle = grad;
    inpaintCtx.fillRect(0, 0, W, H);

    // Mountains
    inpaintCtx.fillStyle = '#0f172a';
    inpaintCtx.beginPath();
    inpaintCtx.moveTo(0, H - 60);
    inpaintCtx.lineTo(120, H - 180);
    inpaintCtx.lineTo(260, H - 90);
    inpaintCtx.lineTo(380, H - 210);
    inpaintCtx.lineTo(W, H - 70);
    inpaintCtx.lineTo(W, H);
    inpaintCtx.lineTo(0, H);
    inpaintCtx.fill();

    // A prominent signpost / object to remove in the foreground
    inpaintCtx.fillStyle = '#f43f5e';
    inpaintCtx.fillRect(210, H - 170, 60, 110);
    inpaintCtx.fillStyle = '#ffffff';
    inpaintCtx.font = 'bold 12px Inter';
    inpaintCtx.fillText('ERASE ME', 214, H - 110);
  } else if (idx === 1) {
    // Scene 2: City skyline with an aerial drone
    const sky = inpaintCtx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#0284c7');
    sky.addColorStop(1, '#93c5fd');
    inpaintCtx.fillStyle = sky;
    inpaintCtx.fillRect(0, 0, W, H);

    // Buildings
    inpaintCtx.fillStyle = '#1e293b';
    for (let x = 0; x < W; x += 40) {
      const bh = 100 + Math.sin(x) * 60;
      inpaintCtx.fillRect(x, H - bh, 36, bh);
    }

    // Drone / flyer to remove
    inpaintCtx.fillStyle = '#e11d48';
    inpaintCtx.beginPath();
    inpaintCtx.arc(240, 80, 26, 0, Math.PI * 2);
    inpaintCtx.fill();
    inpaintCtx.fillStyle = '#fff';
    inpaintCtx.fillText('TARGET', 220, 84);
  } else {
    // Scene 3: Studio portrait with scratched watermark
    inpaintCtx.fillStyle = '#2e1065';
    inpaintCtx.fillRect(0, 0, W, H);
    inpaintCtx.fillStyle = '#ec4899';
    inpaintCtx.beginPath();
    inpaintCtx.arc(W / 2, H / 2, 70, 0, Math.PI * 2);
    inpaintCtx.fill();

    // Scratch line watermark
    inpaintCtx.strokeStyle = '#facc15';
    inpaintCtx.lineWidth = 14;
    inpaintCtx.beginPath();
    inpaintCtx.moveTo(80, 60);
    inpaintCtx.lineTo(390, 280);
    inpaintCtx.stroke();
  }

  document.getElementById('inpaint-mask-coverage').textContent = '0%';
  document.getElementById('inpaint-status').textContent = 'Ready';
}

function paintMask(pos) {
  const r = state.inpaint.brushSize / 2;
  maskCtx.fillStyle = '#ffffff';
  maskCtx.beginPath();
  maskCtx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
  maskCtx.fill();

  // Overlay white mask translucent on screen
  inpaintCtx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  inpaintCtx.beginPath();
  inpaintCtx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
  inpaintCtx.fill();

  document.getElementById('inpaint-mask-coverage').textContent = 'Mask Active';
}

function runNeuralInpainting() {
  const statusEl = document.getElementById('inpaint-status');
  statusEl.textContent = 'Diffusion Pass...';

  const canvas = document.getElementById('inpaint-canvas');
  const W = canvas.width, H = canvas.height;
  const imgData = inpaintCtx.getImageData(0, 0, W, H);
  const maskData = maskCtx.getImageData(0, 0, W, H);

  // Generative context synthesis inside mask
  let step = 0;
  const maxSteps = 15;
  const timer = setInterval(() => {
    step++;
    // Multi-scale diffusion smoothing & texture blend
    for (let y = 1; y < H - 1; y++) {
      for (let x = 1; x < W - 1; x++) {
        const idx = (y * W + x) * 4;
        if (maskData.data[idx] > 50) {
          // Average surrounding unmasked or diffusing neighbors
          let r = 0, g = 0, b = 0, count = 0;
          const neighbors = [
            [-1, 0], [1, 0], [0, -1], [0, 1],
            [-2, 0], [2, 0], [0, -2], [0, 2]
          ];
          for (const [dx, dy] of neighbors) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < W && ny >= 0 && ny < H) {
              const nidx = (ny * W + nx) * 4;
              r += imgData.data[nidx];
              g += imgData.data[nidx + 1];
              b += imgData.data[nidx + 2];
              count++;
            }
          }
          imgData.data[idx] = r / count + (Math.random() - 0.5) * 4;
          imgData.data[idx + 1] = g / count + (Math.random() - 0.5) * 4;
          imgData.data[idx + 2] = b / count + (Math.random() - 0.5) * 4;
        }
      }
    }
    inpaintCtx.putImageData(imgData, 0, 0);

    if (step >= maxSteps) {
      clearInterval(timer);
      maskCtx.clearRect(0, 0, W, H);
      statusEl.textContent = 'Completed ✨';
      document.getElementById('inpaint-mask-coverage').textContent = 'Inpainted';
    }
  }, 40);
}

// ========================== APP 2: ATARI DEEP RL ARCADE ==========================
function initAtariCanvas() {
  const canvas = document.getElementById('atari-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  // Initialize bricks
  const rows = 4, cols = 6;
  const brickW = 68, brickH = 16, pad = 8, topOffset = 30;
  state.atari.bricks = [];
  const colors = ['#f43f5e', '#fb923c', '#fbbf24', '#34d399'];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      state.atari.bricks.push({
        x: 18 + c * (brickW + pad),
        y: topOffset + r * (brickH + pad),
        w: brickW,
        h: brickH,
        color: colors[r],
        alive: true
      });
    }
  }

  // Mouse move for human
  canvas.onmousemove = (e) => {
    if (state.atari.mode !== 'human') return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (W / rect.width);
    state.atari.paddleX = Math.max(0, Math.min(W - 80, x - 40));
  };

  document.getElementById('btn-atari-human').onclick = () => {
    state.atari.mode = 'human';
    document.getElementById('btn-atari-human').classList.add('active');
    document.getElementById('btn-atari-ai').classList.remove('active');
  };

  document.getElementById('btn-atari-ai').onclick = () => {
    state.atari.mode = 'ai';
    document.getElementById('btn-atari-ai').classList.add('active');
    document.getElementById('btn-atari-human').classList.remove('active');
  };

  document.getElementById('btn-atari-reset').onclick = () => {
    state.atari.ballX = W / 2;
    state.atari.ballY = H / 2;
    state.atari.ballVx = 3.5;
    state.atari.ballVy = -3.5;
    state.atari.score = 0;
    state.atari.bricks.forEach(b => b.alive = true);
  };

  // Main arcade game loop
  if (state.atari.animId) cancelAnimationFrame(state.atari.animId);

  function loop() {
    ctx.clearRect(0, 0, W, H);

    // AI DQN Controller
    if (state.atari.mode === 'ai') {
      const paddleCenter = state.atari.paddleX + 40;
      const targetX = state.atari.ballX + state.atari.ballVx * 4;
      const diff = targetX - paddleCenter;

      // Simulated Q-values
      let qLeft = 0.33, qStay = 0.34, qRight = 0.33;
      if (diff < -15) {
        qLeft = 0.78; qStay = 0.14; qRight = 0.08;
        state.atari.paddleX -= 5;
      } else if (diff > 15) {
        qRight = 0.78; qStay = 0.14; qLeft = 0.08;
        state.atari.paddleX += 5;
      } else {
        qStay = 0.75; qLeft = 0.12; qRight = 0.13;
      }
      state.atari.paddleX = Math.max(0, Math.min(W - 80, state.atari.paddleX));

      // Update Q-value UI
      document.getElementById('q-val-left').textContent = qLeft.toFixed(2);
      document.getElementById('q-val-stay').textContent = qStay.toFixed(2);
      document.getElementById('q-val-right').textContent = qRight.toFixed(2);
      document.getElementById('q-fill-left').style.width = `${qLeft * 100}%`;
      document.getElementById('q-fill-stay').style.width = `${qStay * 100}%`;
      document.getElementById('q-fill-right').style.width = `${qRight * 100}%`;
      document.getElementById('atari-selected-action').textContent = qLeft > qRight && qLeft > qStay ? 'LEFT' : qRight > qLeft && qRight > qStay ? 'RIGHT' : 'STAY';
    }

    // Move ball
    state.atari.ballX += state.atari.ballVx;
    state.atari.ballY += state.atari.ballVy;

    // Bounce walls
    if (state.atari.ballX <= 6 || state.atari.ballX >= W - 6) state.atari.ballVx *= -1;
    if (state.atari.ballY <= 6) state.atari.ballVy *= -1;

    // Paddle bounce
    if (state.atari.ballY >= H - 28 && state.atari.ballY <= H - 18) {
      if (state.atari.ballX >= state.atari.paddleX && state.atari.ballX <= state.atari.paddleX + 80) {
        state.atari.ballVy = -Math.abs(state.atari.ballVy);
        // Angle deflection based on hit position
        const hitOffset = (state.atari.ballX - (state.atari.paddleX + 40)) / 40;
        state.atari.ballVx = hitOffset * 4.5;
      }
    }

    // Bottom out
    if (state.atari.ballY > H) {
      state.atari.ballX = W / 2;
      state.atari.ballY = H / 2;
      state.atari.ballVy = -3.5;
    }

    // Brick collisions
    let bricksLeft = 0;
    for (const b of state.atari.bricks) {
      if (!b.alive) continue;
      bricksLeft++;
      if (state.atari.ballX >= b.x && state.atari.ballX <= b.x + b.w &&
          state.atari.ballY >= b.y && state.atari.ballY <= b.y + b.h) {
        b.alive = false;
        state.atari.ballVy *= -1;
        state.atari.score += 10;
        document.getElementById('atari-score').textContent = state.atari.score;
        break;
      }
    }
    document.getElementById('atari-bricks-left').textContent = bricksLeft;

    // Draw bricks
    for (const b of state.atari.bricks) {
      if (!b.alive) continue;
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, b.y, b.w, b.h);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.strokeRect(b.x, b.y, b.w, b.h);
    }

    // Draw paddle
    ctx.fillStyle = '#67e8f9';
    ctx.shadowColor = '#67e8f9';
    ctx.shadowBlur = 10;
    ctx.fillRect(state.atari.paddleX, H - 22, 80, 10);
    ctx.shadowBlur = 0;

    // Draw ball
    ctx.beginPath();
    ctx.arc(state.atari.ballX, state.atari.ballY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#f0f0f5';
    ctx.fill();

    state.atari.animId = requestAnimationFrame(loop);
  }
  state.atari.animId = requestAnimationFrame(loop);
}

// ========================== APP 3: HALICIN MOLECULAR GRAPH ==========================
function initMoleculeCanvas() {
  const canvas = document.getElementById('molecule-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  // Atoms in 2D layout (Halicin scaffold)
  const atoms = [
    { id: 1, elem: 'S', x: 100, y: 150, color: '#facc15' },
    { id: 2, elem: 'N', x: 140, y: 110, color: '#38bdf8' },
    { id: 3, elem: 'N', x: 180, y: 130, color: '#38bdf8' },
    { id: 4, elem: 'C', x: 160, y: 180, color: '#94a3b8' },
    { id: 5, elem: 'N', x: 220, y: 140, color: '#38bdf8' },
    { id: 6, elem: 'C', x: 260, y: 140, color: '#94a3b8' },
    { id: 7, elem: 'S', x: 300, y: 180, color: '#facc15' },
    { id: 8, elem: 'C', x: 340, y: 140, color: '#94a3b8' },
    { id: 9, elem: 'N', x: 400, y: 140, color: '#38bdf8' },
    { id: 10, elem: 'O', x: 420, y: 100, color: '#f43f5e' },
    { id: 11, elem: 'O', x: 430, y: 180, color: '#f43f5e' }
  ];

  const bonds = [
    [1, 2], [2, 3], [3, 4], [4, 1], [3, 5],
    [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [9, 11]
  ];

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw bonds
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 2.5;
    for (const [a1, a2] of bonds) {
      const atom1 = atoms.find(a => a.id === a1);
      const atom2 = atoms.find(a => a.id === a2);
      ctx.beginPath();
      ctx.moveTo(atom1.x, atom1.y);
      ctx.lineTo(atom2.x, atom2.y);
      ctx.stroke();
    }

    // Draw atoms
    for (const a of atoms) {
      ctx.beginPath();
      ctx.arc(a.x, a.y, 14, 0, Math.PI * 2);
      ctx.fillStyle = a.color;
      ctx.fill();
      ctx.strokeStyle = '#0a0a0f';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#0a0a0f';
      ctx.font = 'bold 11px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(a.elem, a.x, a.y);
    }
  }

  draw();

  // Variant buttons
  document.getElementById('btn-halicin-native').onclick = () => {
    document.querySelectorAll('.molecule-actions button').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-halicin-native').classList.add('active');
    document.getElementById('halicin-pred-score').textContent = '0.96';
    document.getElementById('halicin-verdict').textContent = 'POTENT ANTIBIOTIC';
    document.getElementById('halicin-verdict').style.color = 'var(--emerald-400)';
    document.getElementById('halicin-desc').textContent = 'Native Halicin: High predicted affinity for trans-membrane proton gradient disruption.';
  };

  document.getElementById('btn-halicin-variant-a').onclick = () => {
    document.querySelectorAll('.molecule-actions button').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-halicin-variant-a').classList.add('active');
    document.getElementById('halicin-pred-score').textContent = '0.32';
    document.getElementById('halicin-verdict').textContent = 'INACTIVE / WEAK';
    document.getElementById('halicin-verdict').style.color = 'var(--rose-400)';
    document.getElementById('halicin-desc').textContent = 'Removal of the nitro (-NO2) group destroys bacterial electrochemical depolarization capability.';
  };

  document.getElementById('btn-halicin-variant-b').onclick = () => {
    document.querySelectorAll('.molecule-actions button').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-halicin-variant-b').classList.add('active');
    document.getElementById('halicin-pred-score').textContent = '0.81';
    document.getElementById('halicin-verdict').textContent = 'MODERATELY ACTIVE';
    document.getElementById('halicin-verdict').style.color = 'var(--amber-400)';
    document.getElementById('halicin-desc').textContent = 'Thiadiazole modification maintains moderate binding affinity with increased chemical stability.';
  };
}

// ========================== APP 4: FLOOD FORECASTING ==========================
function initFloodCanvas() {
  const canvas = document.getElementById('flood-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  function update() {
    const rain = state.flood.rain;
    const soil = state.flood.soil;

    ctx.clearRect(0, 0, W, H);

    // Peak discharge calculation
    const peak = 120 + rain * 2.8 + soil * 2.2;
    document.getElementById('flood-peak-discharge').textContent = `${Math.round(peak)} m³/s`;

    // Alert status
    const alertCard = document.getElementById('flood-alert-card');
    const badge = document.getElementById('flood-alert-badge');
    const text = document.getElementById('flood-alert-text');

    if (peak > 550) {
      badge.className = 'alert-badge danger';
      badge.textContent = '🚨 CRITICAL FLOOD WARNING';
      text.textContent = 'Severe riverbank overflow imminent at Day +3. Immediate evacuation recommended.';
    } else if (peak > 350) {
      badge.className = 'alert-badge warning';
      badge.textContent = '⚠️ MODERATE FLOOD RISK';
      text.textContent = 'Peak river discharge is predicted to approach bankfull capacity at Day +3.';
    } else {
      badge.className = 'alert-badge safe';
      badge.textContent = '✓ NORMAL RIVER REGIME';
      text.textContent = 'Hydrological conditions are stable within baseline capacity.';
    }

    // Draw hydrograph
    const padding = { top: 20, right: 20, bottom: 30, left: 50 };
    const chartW = W - padding.left - padding.right;
    const chartH = H - padding.top - padding.bottom;

    // Threshold line (350 m3/s)
    const threshY = padding.top + chartH * (1 - 350 / 800);
    ctx.strokeStyle = 'rgba(251, 113, 133, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padding.left, threshY);
    ctx.lineTo(W - padding.right, threshY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(251, 113, 133, 0.7)';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText('Flood Threshold: 350 m³/s', padding.left + 8, threshY - 4);

    // Generate 7-day discharge points
    const days = [0, 1, 2, 3, 4, 5, 6];
    const discharges = days.map(d => {
      const bell = Math.exp(-Math.pow(d - 3, 2) / 2);
      return 100 + (peak - 100) * bell;
    });

    // Draw curve
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top + chartH);
    for (let i = 0; i < days.length; i++) {
      const x = padding.left + (i / (days.length - 1)) * chartW;
      const y = padding.top + chartH * (1 - discharges[i] / 800);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(padding.left + chartW, padding.top + chartH);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, padding.top, 0, H - padding.bottom);
    grad.addColorStop(0, 'rgba(34, 211, 238, 0.35)');
    grad.addColorStop(1, 'rgba(34, 211, 238, 0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Line stroke
    ctx.beginPath();
    for (let i = 0; i < days.length; i++) {
      const x = padding.left + (i / (days.length - 1)) * chartW;
      const y = padding.top + chartH * (1 - discharges[i] / 800);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Day labels
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.textAlign = 'center';
    for (let i = 0; i < days.length; i++) {
      const x = padding.left + (i / (days.length - 1)) * chartW;
      ctx.fillText(`Day ${i}`, x, H - 10);
    }
  }

  document.getElementById('flood-rain').oninput = (e) => {
    state.flood.rain = parseInt(e.target.value);
    document.getElementById('flood-rain-val').textContent = `${state.flood.rain} mm`;
    update();
  };
  document.getElementById('flood-soil').oninput = (e) => {
    state.flood.soil = parseInt(e.target.value);
    document.getElementById('flood-soil-val').textContent = `${state.flood.soil}%`;
    update();
  };

  update();
}

// App tab switching
document.querySelectorAll('.app-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.app-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.app-pane').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const pane = document.getElementById(`pane-${tab.dataset.app}`);
    if (pane) pane.classList.add('active');

    if (tab.dataset.app === 'inpainting') setTimeout(initInpaintCanvas, 20);
    if (tab.dataset.app === 'atari') setTimeout(initAtariCanvas, 20);
    if (tab.dataset.app === 'halicin') setTimeout(initMoleculeCanvas, 20);
    if (tab.dataset.app === 'flood') setTimeout(initFloodCanvas, 20);
  });
});

// ========================== MATRIX & MATH STUDIO ==========================
function initMatrixStudioState() {
  if (state.matrixMode === '5feat') {
    state.matrixWeights = {
      x: [1.2, -0.5, 0.8, 2.0, -1.1],
      W: [
        [0.4, -0.2, 0.7, 0.1, -0.5],
        [-0.6, 0.9, 0.3, -0.4, 0.8],
        [0.2, 0.5, -0.8, 0.6, 0.1]
      ],
      b: [0.1, -0.3, 0.2]
    };
  } else {
    // Housing price mode (Slide 11)
    state.matrixWeights = {
      x: [2100, 3], // 2100 sq ft, 3 bedrooms
      W: [
        [0.15, 12.0],
        [-0.05, 5.0]
      ],
      b: [50.0, 20.0]
    };
  }
}

function renderMatrixFlow() {
  if (!state.matrixWeights) initMatrixStudioState();
  const container = document.getElementById('matrix-flow-container');
  if (!container) return;

  const { x, W, b } = state.matrixWeights;
  const numHidden = W.length;
  const numInputs = x.length;

  // Compute z = W*x + b
  const z = [];
  for (let i = 0; i < numHidden; i++) {
    let sum = b[i];
    for (let j = 0; j < numInputs; j++) {
      sum += W[i][j] * x[j];
    }
    z.push(sum);
  }

  // Activation h = ReLU(z)
  const h = z.map(v => Math.max(0, v));

  container.innerHTML = `
    <div class="matrix-block">
      <div class="matrix-title"><span>Input Vector $x$</span><span>(${numInputs} \\times 1$)</span></div>
      <div class="matrix-grid-cells" style="grid-template-columns: 1fr;">
        ${x.map((val, idx) => `
          <input type="number" class="matrix-input-cell matrix-x" data-idx="${idx}" value="${val.toFixed(2)}" step="0.1">
        `).join('')}
      </div>
    </div>

    <div class="matrix-block" style="grid-column: span 2;">
      <div class="matrix-title"><span>Weight Matrix $W_1$</span><span>(${numHidden} \\times ${numInputs}$)</span></div>
      <div class="matrix-grid-cells" style="grid-template-columns: repeat(${numInputs}, 1fr);">
        ${W.map((row, r) => row.map((wVal, c) => `
          <input type="number" class="matrix-input-cell matrix-w" data-r="${r}" data-c="${c}" value="${wVal.toFixed(2)}" step="0.1">
        `).join('')).join('')}
      </div>
    </div>

    <div class="matrix-block">
      <div class="matrix-title"><span>Bias $b_1$</span><span>(${numHidden} \\times 1$)</span></div>
      <div class="matrix-grid-cells" style="grid-template-columns: 1fr;">
        ${b.map((bVal, idx) => `
          <input type="number" class="matrix-input-cell matrix-b" data-idx="${idx}" value="${bVal.toFixed(2)}" step="0.1">
        `).join('')}
      </div>
    </div>

    <div class="matrix-block">
      <div class="matrix-title"><span>Activated $h = \\phi(z)$</span><span>(${numHidden} \\times 1$)</span></div>
      <div class="matrix-grid-cells" style="grid-template-columns: 1fr;">
        ${h.map(hVal => `
          <div class="matrix-input-cell" style="background:rgba(52,211,153,0.15); color:var(--emerald-400); font-weight:700;">
            ${hVal.toFixed(3)}
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Math breakdown display
  const breakdownEl = document.getElementById('matrix-step-detail');
  breakdownEl.innerHTML = `
    <div><strong>Dot-Product Calculations (Slide 27):</strong></div>
    ${z.map((zVal, i) => {
      const terms = x.map((xv, j) => `(${W[i][j].toFixed(2)} \\times ${xv.toFixed(2)})`).join(' + ');
      return `<div>$$z_{${i+1}} = ${terms} + ${b[i].toFixed(2)} = ${zVal.toFixed(3)} \\xrightarrow{\\text{ReLU}} h_{${i+1}} = ${h[i].toFixed(3)}$$</div>`;
    }).join('')}
  `;

  renderMath(container);
  renderMath(breakdownEl);

  // Attach input listeners
  container.querySelectorAll('.matrix-x').forEach(el => {
    el.onchange = () => {
      state.matrixWeights.x[parseInt(el.dataset.idx)] = parseFloat(el.value) || 0;
      renderMatrixFlow();
    };
  });
  container.querySelectorAll('.matrix-w').forEach(el => {
    el.onchange = () => {
      const r = parseInt(el.dataset.r), c = parseInt(el.dataset.c);
      state.matrixWeights.W[r][c] = parseFloat(el.value) || 0;
      renderMatrixFlow();
    };
  });
  container.querySelectorAll('.matrix-b').forEach(el => {
    el.onchange = () => {
      state.matrixWeights.b[parseInt(el.dataset.idx)] = parseFloat(el.value) || 0;
      renderMatrixFlow();
    };
  });
}

document.getElementById('btn-mode-5feat').onclick = () => {
  state.matrixMode = '5feat';
  initMatrixStudioState();
  renderMatrixFlow();
};
document.getElementById('btn-mode-housing').onclick = () => {
  state.matrixMode = 'housing';
  initMatrixStudioState();
  renderMatrixFlow();
};
document.getElementById('btn-rand-weights').onclick = () => {
  const { W, b } = state.matrixWeights;
  for (let r = 0; r < W.length; r++) {
    for (let c = 0; c < W[r].length; c++) {
      W[r][c] = (Math.random() * 2 - 1);
    }
    b[r] = (Math.random() * 0.4 - 0.2);
  }
  renderMatrixFlow();
};

// Studio sub-tab switching
document.querySelectorAll('.studio-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.studio-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.studio-pane').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const pane = document.getElementById(`pane-${tab.dataset.tab}`);
    if (pane) pane.classList.add('active');

    if (tab.dataset.tab === 'matrix-forward') setTimeout(renderMatrixFlow, 20);
    if (tab.dataset.tab === 'linear-collapse') setTimeout(drawCollapseDemo, 20);
    if (tab.dataset.tab === 'activations-zoo') setTimeout(drawActivationZooPlot, 20);
  });
});

// ========================== LINEAR COLLAPSE DEMO ==========================
function drawCollapseDemo() {
  const canvas = document.getElementById('collapse-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  const act = state.collapseAct;
  const isLinear = act === 'linear';

  // Compute effective collapsed parameters
  const resultBox = document.getElementById('collapsed-matrix-result');
  if (isLinear) {
    resultBox.innerHTML = `
      <div><strong>Computed Effective Linear Transformation:</strong></div>
      <div>$$W_{\\text{effective}} = W_3 W_2 W_1 = [1.42, -0.88]$$</div>
      <div>$$b_{\\text{effective}} = W_3 W_2 b_1 + W_3 b_2 + b_3 = 0.24$$</div>
      <div style="color:var(--amber-400); margin-top:4px;">Result: Straight hyperplane $1.42 x_1 - 0.88 x_2 + 0.24 = 0$</div>
    `;
    document.getElementById('collapse-verdict').innerHTML = `
      <span class="status-pill status-warn">🚨 Linear Collapse Active</span>
      <p>Because $\\phi(a)=a$, stacking layers produces only a straight line. It is mathematically impossible to separate XOR or concentric patterns!</p>
    `;
  } else {
    resultBox.innerHTML = `
      <div><strong>Deep Non-Linear Representation Active:</strong></div>
      <div>Activation: $\\phi(a) = \\max(0, a)$ (ReLU)</div>
      <div style="color:var(--emerald-400); margin-top:4px;">Result: Multi-region piecewise linear manifold capable of arbitrary continuous approximation!</div>
    `;
    document.getElementById('collapse-verdict').innerHTML = `
      <span class="status-pill status-ok">✓ Non-Linear Folding Enabled</span>
      <p>Non-linear activations allow each neuron to warp space, creating complex curved decision boundaries.</p>
    `;
  }
  if (resultBox) renderMath(resultBox);
  const verdictEl = document.getElementById('collapse-verdict');
  if (verdictEl) renderMath(verdictEl);

  // Draw XOR points
  const points = [
    { x: -0.5, y: -0.5, label: 1 },
    { x: 0.5, y: 0.5, label: 1 },
    { x: -0.5, y: 0.5, label: 0 },
    { x: 0.5, y: -0.5, label: 0 }
  ];

  // Draw background decision boundary
  const res = 40;
  for (let i = 0; i < res; i++) {
    for (let j = 0; j < res; j++) {
      const x = (i / res) * 2 - 1;
      const y = (j / res) * 2 - 1;
      let pred;
      if (isLinear) {
        pred = (x * 1.2 - y * 0.9) > 0 ? 1 : 0;
      } else {
        // Non-linear XOR boundary
        pred = (x * y > 0) ? 1 : 0;
      }
      ctx.fillStyle = pred === 1 ? 'rgba(167, 139, 250, 0.2)' : 'rgba(103, 232, 249, 0.2)';
      ctx.fillRect((i / res) * W, (j / res) * H, W / res + 1, H / res + 1);
    }
  }

  // Plot data points
  for (const p of points) {
    const px = ((p.x + 1) / 2) * W;
    const py = ((p.y + 1) / 2) * H;
    ctx.beginPath();
    ctx.arc(px, py, 9, 0, Math.PI * 2);
    ctx.fillStyle = p.label === 1 ? '#a78bfa' : '#67e8f9';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

document.querySelectorAll('#collapse-act-group button').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('#collapse-act-group button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.collapseAct = btn.dataset.act;
    drawCollapseDemo();
  };
});

// ========================== ACTIVATIONS ZOO (SLIDE 33) ==========================
function renderActivationZooSelector() {
  const container = document.getElementById('act-zoo-selector');
  if (!container) return;
  container.innerHTML = Object.entries(ACTIVATIONS_ZOO).map(([key, act]) => `
    <button class="act-pill ${key === state.selectedActZoo ? 'active' : ''}" data-act="${key}">
      ${act.name}
    </button>
  `).join('');

  container.querySelectorAll('.act-pill').forEach(btn => {
    btn.onclick = () => {
      container.querySelectorAll('.act-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedActZoo = btn.dataset.act;
      drawActivationZooPlot();
    };
  });
}

function drawActivationZooPlot() {
  renderActivationZooSelector();
  const act = ACTIVATIONS_ZOO[state.selectedActZoo];
  if (!act) return;

  // Render info card
  const card = document.getElementById('act-formula-card');
  card.innerHTML = `
    <h4 style="color:var(--violet-400); font-size:1.1rem; margin-bottom:8px;">${act.name}</h4>
    <div class="formula">${act.formula}</div>
    <div style="font-size:0.84rem; line-height:1.6; margin:10px 0;">
      <div><strong>Derivative:</strong> $${act.derivative}$</div>
      <div><strong>Range:</strong> $${act.range}$</div>
      <div><strong>Continuity:</strong> $${act.continuity}$</div>
    </div>
    <p style="font-size:0.85rem; color:var(--text-secondary);">${act.desc}</p>
  `;
  renderMath(card);

  const canvas = document.getElementById('act-plot-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  // Axes
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2);
  ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H);
  ctx.stroke();

  const minX = -6, maxX = 6;
  const minY = -2, maxY = 3;

  function toPx(x, y) {
    return {
      px: ((x - minX) / (maxX - minX)) * W,
      py: H - ((y - minY) / (maxY - minY)) * H
    };
  }

  // Plot phi(x) (Violet)
  ctx.strokeStyle = '#a78bfa';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let px = 0; px <= W; px++) {
    const x = minX + (px / W) * (maxX - minX);
    const y = act.fn(x);
    const pos = toPx(x, y);
    if (px === 0) ctx.moveTo(pos.px, pos.py);
    else ctx.lineTo(pos.px, pos.py);
  }
  ctx.stroke();

  // Plot phi'(x) (Cyan)
  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  for (let px = 0; px <= W; px++) {
    const x = minX + (px / W) * (maxX - minX);
    const dy = act.dfn(x);
    const pos = toPx(x, dy);
    if (px === 0) ctx.moveTo(pos.px, pos.py);
    else ctx.lineTo(pos.px, pos.py);
  }
  ctx.stroke();
  ctx.setLineDash([]);
}

// ========================== OPTIMIZATION & ERM LAB ==========================
function initGdEngine() {
  // Synthetic Housing Data (Living Area in 100s ft2 vs Price in $1000s)
  state.gd.data = [
    { x: 1.4, y: 2.3 },
    { x: 1.6, y: 3.3 },
    { x: 2.1, y: 4.0 },
    { x: 2.4, y: 3.7 },
    { x: 3.0, y: 5.4 }
  ];
  state.gd.W = 0.5;
  state.gd.b = 0.5;

  document.getElementById('gd-alpha').oninput = (e) => {
    state.gd.alpha = parseFloat(e.target.value);
    document.getElementById('gd-alpha-val').textContent = state.gd.alpha.toFixed(3);
  };

  document.getElementById('btn-gd-step').onclick = () => stepGradientDescent();
  document.getElementById('btn-gd-auto').onclick = () => toggleAutoGd();
  document.getElementById('btn-gd-reset').onclick = () => {
    if (state.gd.autoInterval) clearInterval(state.gd.autoInterval);
    state.gd.W = 0.5;
    state.gd.b = 0.5;
    state.gd.sampleIdx = 0;
    document.getElementById('btn-gd-auto').textContent = '▶ Auto Iterate';
    drawGdScatter();
    drawGdContour();
  };

  drawGdScatter();
  drawGdContour();
}

function stepGradientDescent() {
  const sample = state.gd.data[state.gd.sampleIdx];
  const pred = state.gd.W * sample.x + state.gd.b;
  const error = pred - sample.y;
  const gradW = error * sample.x;
  const gradB = error;

  state.gd.W -= state.gd.alpha * gradW;
  state.gd.b -= state.gd.alpha * gradB;

  // Update trace
  const traceEl = document.getElementById('gd-step-trace');
  document.getElementById('trace-sample').innerHTML = `Sample ${state.gd.sampleIdx + 1}: Living Area $x = ${(sample.x * 1000).toFixed(0)}\\text{ ft}^2$, True Price $y = \\$${(sample.y * 100).toFixed(0)}\\text{k}$`;
  document.getElementById('trace-prediction').innerHTML = `Predicted $f_W(x) = \\$${(pred * 100).toFixed(1)}\\text{k}$`;
  document.getElementById('trace-error').innerHTML = `Residual Error $(f_W(x) - y) = ${error.toFixed(3)}$`;
  document.getElementById('trace-grad').innerHTML = `Gradient contribution $\\frac{\\partial L}{\\partial W} = ${gradW.toFixed(3)}$, $\\frac{\\partial L}{\\partial b} = ${gradB.toFixed(3)}$`;
  document.getElementById('trace-update').innerHTML = `New Parameters: $W = ${state.gd.W.toFixed(3)}$, $b = ${state.gd.b.toFixed(3)}$`;
  if (traceEl) renderMath(traceEl);

  state.gd.sampleIdx = (state.gd.sampleIdx + 1) % state.gd.data.length;

  drawGdScatter();
  drawGdContour();
}

function toggleAutoGd() {
  const btn = document.getElementById('btn-gd-auto');
  if (state.gd.autoInterval) {
    clearInterval(state.gd.autoInterval);
    state.gd.autoInterval = null;
    btn.textContent = '▶ Auto Iterate';
  } else {
    btn.textContent = '⏸ Pause';
    state.gd.autoInterval = setInterval(stepGradientDescent, 250);
  }
}

function drawGdScatter() {
  const canvas = document.getElementById('gd-scatter-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  const pad = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  function toPx(x, y) {
    return {
      px: pad.left + (x / 3.5) * chartW,
      py: pad.top + chartH * (1 - y / 6.0)
    };
  }

  // Draw regression line
  ctx.strokeStyle = '#a78bfa';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  const p1 = toPx(0.5, state.gd.W * 0.5 + state.gd.b);
  const p2 = toPx(3.5, state.gd.W * 3.5 + state.gd.b);
  ctx.moveTo(p1.px, p1.py);
  ctx.lineTo(p2.px, p2.py);
  ctx.stroke();

  // Draw residuals (error bars)
  for (const pt of state.gd.data) {
    const ptPx = toPx(pt.x, pt.y);
    const linePx = toPx(pt.x, state.gd.W * pt.x + state.gd.b);
    ctx.strokeStyle = 'rgba(251, 113, 133, 0.6)';
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(ptPx.px, ptPx.py);
    ctx.lineTo(linePx.px, linePx.py);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // Draw data points
  for (let i = 0; i < state.gd.data.length; i++) {
    const pt = state.gd.data[i];
    const pos = toPx(pt.x, pt.y);
    ctx.beginPath();
    ctx.arc(pos.px, pos.py, 6, 0, Math.PI * 2);
    ctx.fillStyle = i === state.gd.sampleIdx ? '#fbbf24' : '#67e8f9';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

function drawGdContour() {
  const canvas = document.getElementById('gd-contour-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  // Loss contours centered around minimum
  const minW = 1.4, minB = 0.8;
  const cx = W / 2, cy = H / 2;

  for (let r = 20; r <= 140; r += 20) {
    ctx.strokeStyle = `rgba(167, 139, 250, ${0.1 + (r / 140) * 0.3})`;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 1.4, r * 0.8, 0.2, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Current weight point
  const curX = cx + (state.gd.W - minW) * 80;
  const curY = cy + (state.gd.b - minB) * 80;

  ctx.beginPath();
  ctx.arc(curX, curY, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#34d399';
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Optimization tabs
document.querySelectorAll('.opt-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.opt-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.opt-pane').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const pane = document.getElementById(`pane-${tab.dataset.tab}`);
    if (pane) pane.classList.add('active');

    if (tab.dataset.tab === 'gd-engine') setTimeout(initGdEngine, 20);
    if (tab.dataset.tab === 'loss-mle') setTimeout(drawMleLossPlot, 20);
    if (tab.dataset.tab === 'softmax-multiclass') setTimeout(updateSoftmaxBars, 20);
    if (tab.dataset.tab === 'backprop-graph') setTimeout(initBackpropSimulator, 20);
    if (tab.dataset.tab === 'optimizers-zoo') setTimeout(initOptimizerArena, 20);
    if (tab.dataset.tab === 'init-norm') setTimeout(initInitNormLab, 20);
  });
});

// ========================== MLE & BCE LOSS COMPARISON ==========================
function drawMleLossPlot() {
  const canvas = document.getElementById('mle-loss-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  const y = state.mle.y;
  const p = state.mle.p;

  // BCE loss: - (y log p + (1-y) log (1-p))
  const bce = -(y * Math.log(Math.max(1e-7, p)) + (1 - y) * Math.log(Math.max(1e-7, 1 - p)));
  // MSE loss: 0.5 * (p - y)^2
  const mse = 0.5 * Math.pow(p - y, 2);

  document.getElementById('mle-bce-loss').textContent = bce.toFixed(3);
  document.getElementById('mle-mse-loss').textContent = mse.toFixed(3);

  // Plot curves
  const pad = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  // BCE Curve (Violet)
  ctx.strokeStyle = '#a78bfa';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let px = 0; px <= chartW; px++) {
    const prob = 0.02 + (px / chartW) * 0.96;
    const loss = -(y * Math.log(prob) + (1 - y) * Math.log(1 - prob));
    const yPx = pad.top + chartH * (1 - Math.min(3.5, loss) / 3.5);
    if (px === 0) ctx.moveTo(pad.left + px, yPx);
    else ctx.lineTo(pad.left + px, yPx);
  }
  ctx.stroke();

  // MSE Curve (Cyan)
  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 2;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  for (let px = 0; px <= chartW; px++) {
    const prob = px / chartW;
    const loss = 0.5 * Math.pow(prob - y, 2);
    const yPx = pad.top + chartH * (1 - loss / 3.5);
    if (px === 0) ctx.moveTo(pad.left + px, yPx);
    else ctx.lineTo(pad.left + px, yPx);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  // Current point
  const curX = pad.left + p * chartW;
  const curY = pad.top + chartH * (1 - Math.min(3.5, bce) / 3.5);
  ctx.beginPath();
  ctx.arc(curX, curY, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#f59e0b';
  ctx.fill();
}

document.querySelectorAll('#mle-label-group button').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('#mle-label-group button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.mle.y = parseInt(btn.dataset.y);
    drawMleLossPlot();
  };
});

document.getElementById('mle-prob-slider').oninput = (e) => {
  state.mle.p = parseFloat(e.target.value);
  document.getElementById('mle-prob-val').textContent = state.mle.p.toFixed(2);
  drawMleLossPlot();
};

// ========================== MULTI-CLASS SOFTMAX ==========================
function updateSoftmaxBars() {
  const z = state.softmax.logits;
  const maxZ = Math.max(...z);
  const expZ = z.map(v => Math.exp(v - maxZ));
  const sumExp = expZ.reduce((a, b) => a + b, 0);
  const probs = expZ.map(v => v / sumExp);

  const names = ['🐱 Cat', '🐶 Dog', '🚗 Car'];
  const container = document.getElementById('softmax-bars-container');
  if (!container) return;

  container.innerHTML = names.map((name, i) => `
    <div class="s-class-row">
      <div class="s-class-header">
        <span>${name}</span>
        <span>$p_{${i}} = ${(probs[i] * 100).toFixed(1)}\\%$</span>
      </div>
      <div class="s-bar-track">
        <div class="s-bar-fill" style="width: ${probs[i] * 100}%; background: ${i === state.softmax.target ? 'var(--emerald-400)' : 'var(--gradient-primary)'}"></div>
      </div>
    </div>
  `).join('');

  renderMath(container);

  // Cross-entropy loss for target class
  const targetP = probs[state.softmax.target];
  const ceLoss = -Math.log(Math.max(1e-7, targetP));
  document.getElementById('multiclass-ce-val').textContent = ceLoss.toFixed(3);
}

document.getElementById('slider-z-cat').oninput = (e) => {
  state.softmax.logits[0] = parseFloat(e.target.value);
  document.getElementById('val-z-cat').textContent = state.softmax.logits[0].toFixed(1);
  updateSoftmaxBars();
};
document.getElementById('slider-z-dog').oninput = (e) => {
  state.softmax.logits[1] = parseFloat(e.target.value);
  document.getElementById('val-z-dog').textContent = state.softmax.logits[1].toFixed(1);
  updateSoftmaxBars();
};
document.getElementById('slider-z-car').oninput = (e) => {
  state.softmax.logits[2] = parseFloat(e.target.value);
  document.getElementById('val-z-car').textContent = state.softmax.logits[2].toFixed(1);
  updateSoftmaxBars();
};

document.querySelectorAll('#target-class-group button').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('#target-class-group button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.softmax.target = parseInt(btn.dataset.class);
    updateSoftmaxBars();
  };
});

// ========================== MODULES & LESSON VIEWER ==========================
function updateGlobalProgress() {
  const totalLessons = MODULES.reduce((sum, m) => sum + m.lessons.length, 0);
  const completed = state.completedLessons.size;
  const pct = Math.round((completed / totalLessons) * 100);

  const textEl = document.getElementById('progress-text');
  if (textEl) textEl.textContent = `${pct}%`;

  const circle = document.getElementById('progress-circle');
  if (circle) {
    const circumference = 2 * Math.PI * 11;
    circle.setAttribute('stroke-dashoffset', circumference - (pct / 100) * circumference);
  }
}

function renderCurriculumCards() {
  const container = document.getElementById('curriculum-cards');
  if (!container) return;
  container.innerHTML = MODULES.map(m => {
    const completedCount = m.lessons.filter(l => state.completedLessons.has(l.id)).length;
    const pct = Math.round((completedCount / m.lessons.length) * 100);
    return `
      <div class="curriculum-card" data-module="${m.id}">
        <div class="card-icon ${m.iconColor}">${m.icon}</div>
        <h4 class="card-title">${m.title}</h4>
        <p class="card-desc">${m.desc}</p>
        <div class="card-meta">
          <span class="card-tag ${m.difficulty}">${m.difficulty}</span>
          <span class="card-lessons">${m.lessons.length} lessons</span>
        </div>
        <div class="card-progress-bar">
          <div class="card-progress-fill" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.curriculum-card').forEach(card => {
    card.addEventListener('click', () => {
      openModule(card.dataset.module);
    });
  });
}

function showModuleList() {
  const listEl = document.getElementById('module-list');
  const viewEl = document.getElementById('lesson-view');
  const backBtn = document.getElementById('modules-back-btn');
  if (listEl) listEl.style.display = 'flex';
  if (viewEl) viewEl.style.display = 'none';
  if (backBtn) backBtn.style.display = 'none';
  document.getElementById('modules-title').textContent = 'Learning Modules';
  document.getElementById('modules-desc').textContent = 'Structured university foundations aligned with Leibniz Universität Hannover WS 2026/27.';

  const container = document.getElementById('module-list');
  if (!container) return;
  container.innerHTML = MODULES.map(m => {
    const completedCount = m.lessons.filter(l => state.completedLessons.has(l.id)).length;
    const allDone = completedCount === m.lessons.length;
    return `
      <div class="module-item ${allDone ? 'completed' : ''}" data-module="${m.id}">
        <div class="module-num">${allDone ? '✓' : m.num}</div>
        <div class="module-info">
          <h3>${m.icon} ${m.title}</h3>
          <p>${m.desc}</p>
        </div>
        <div class="module-status">
          <span class="module-badge card-tag ${m.difficulty}">${m.difficulty}</span>
          <span class="card-lessons">${completedCount}/${m.lessons.length}</span>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.module-item').forEach(item => {
    item.addEventListener('click', () => openModule(item.dataset.module));
  });
}

function openModule(moduleId) {
  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod) return;

  state.currentModule = mod;
  state.currentLessonIdx = 0;
  navigateTo('modules');

  document.getElementById('module-list').style.display = 'none';
  document.getElementById('lesson-view').style.display = 'grid';
  document.getElementById('modules-back-btn').style.display = 'inline-flex';
  document.getElementById('modules-title').textContent = `${mod.icon} ${mod.title}`;
  document.getElementById('modules-desc').textContent = mod.desc;

  renderLessonSidebar();
  renderLesson();
}

document.getElementById('modules-back-btn').addEventListener('click', () => {
  state.currentModule = null;
  showModuleList();
});

function renderLessonSidebar() {
  const mod = state.currentModule;
  if (!mod) return;
  const sidebar = document.getElementById('lesson-sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = mod.lessons.map((l, i) => {
    const completed = state.completedLessons.has(l.id);
    const active = i === state.currentLessonIdx;
    return `
      <div class="lesson-nav-item ${active ? 'active' : ''} ${completed ? 'completed' : ''}" data-idx="${i}">
        <span class="lesson-nav-dot"></span>
        <span>${l.title}</span>
      </div>
    `;
  }).join('');

  sidebar.querySelectorAll('.lesson-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      state.currentLessonIdx = parseInt(item.dataset.idx);
      renderLessonSidebar();
      renderLesson();
    });
  });
}

function renderLesson() {
  const mod = state.currentModule;
  if (!mod) return;
  const lesson = mod.lessons[state.currentLessonIdx];
  const container = document.getElementById('lesson-content');
  if (!container) return;

  const isFirst = state.currentLessonIdx === 0;
  const isLast = state.currentLessonIdx === mod.lessons.length - 1;

  container.innerHTML = `
    ${lesson.content}
    <div class="lesson-nav-actions">
      <button class="btn btn-ghost btn-sm" id="lesson-prev" ${isFirst ? 'disabled style="opacity:0.3;pointer-events:none;"' : ''}>
        ← Previous
      </button>
      <button class="btn btn-primary btn-sm" id="lesson-complete">
        ${state.completedLessons.has(lesson.id) ? '✓ Completed' : 'Mark Complete'}
      </button>
      <button class="btn btn-ghost btn-sm" id="lesson-next" ${isLast ? 'disabled style="opacity:0.3;pointer-events:none;"' : ''}>
        Next →
      </button>
    </div>
  `;

  // Render mathematical notation cleanly via KaTeX
  renderMath(container);

  document.getElementById('lesson-complete').addEventListener('click', () => {
    state.completedLessons.add(lesson.id);
    saveProgress();
    updateGlobalProgress();
    renderLessonSidebar();
    renderLesson();
    renderCurriculumCards();
  });

  document.getElementById('lesson-prev').addEventListener('click', () => {
    if (state.currentLessonIdx > 0) {
      state.currentLessonIdx--;
      renderLessonSidebar();
      renderLesson();
    }
  });

  document.getElementById('lesson-next').addEventListener('click', () => {
    if (state.currentLessonIdx < mod.lessons.length - 1) {
      state.currentLessonIdx++;
      renderLessonSidebar();
      renderLesson();
    }
  });

  container.scrollTop = 0;
}

// ========================== NEURAL NETWORK PLAYGROUND ==========================
class SimpleNN {
  constructor(layerSizes, activation = 'relu') {
    this.layers = [];
    this.activation = activation;
    for (let i = 0; i < layerSizes.length - 1; i++) {
      const fanIn = layerSizes[i];
      const fanOut = layerSizes[i + 1];
      this.layers.push({
        W: this.randomMatrix(fanOut, fanIn, fanIn),
        b: new Array(fanOut).fill(0)
      });
    }
  }

  randomMatrix(rows, cols, fanIn) {
    const scale = Math.sqrt(2 / fanIn);
    const m = [];
    for (let r = 0; r < rows; r++) {
      m[r] = [];
      for (let c = 0; c < cols; c++) {
        m[r][c] = (Math.random() * 2 - 1) * scale;
      }
    }
    return m;
  }

  activate(x) {
    switch (this.activation) {
      case 'relu': return Math.max(0, x);
      case 'sigmoid': return 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x))));
      case 'tanh': return Math.tanh(x);
      default: return Math.max(0, x);
    }
  }

  activateDerivative(x) {
    switch (this.activation) {
      case 'relu': return x > 0 ? 1 : 0;
      case 'sigmoid': { const s = this.activate(x); return s * (1 - s); }
      case 'tanh': { const t = Math.tanh(x); return 1 - t * t; }
      default: return x > 0 ? 1 : 0;
    }
  }

  forward(input) {
    let a = [...input];
    const activations = [a];
    const preActivations = [];

    for (let l = 0; l < this.layers.length; l++) {
      const { W, b } = this.layers[l];
      const z = [];
      for (let j = 0; j < W.length; j++) {
        let sum = b[j];
        for (let i = 0; i < a.length; i++) {
          sum += W[j][i] * a[i];
        }
        z.push(sum);
      }
      preActivations.push(z);

      if (l === this.layers.length - 1) {
        a = z.map(v => 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, v)))));
      } else {
        a = z.map(v => this.activate(v));
      }
      activations.push(a);
    }

    return { output: a, activations, preActivations };
  }

  predict(input) {
    return this.forward(input).output;
  }

  train(X, Y, lr) {
    let totalLoss = 0;
    let correct = 0;

    for (let s = 0; s < X.length; s++) {
      const { output, activations, preActivations } = this.forward(X[s]);
      const target = Y[s];

      for (let k = 0; k < output.length; k++) {
        const p = Math.max(1e-7, Math.min(1 - 1e-7, output[k]));
        totalLoss -= target[k] * Math.log(p) + (1 - target[k]) * Math.log(1 - p);
      }

      const pred = output[0] > 0.5 ? 1 : 0;
      if (pred === target[0]) correct++;

      let delta = output.map((o, k) => o - target[k]);

      for (let l = this.layers.length - 1; l >= 0; l--) {
        const aPrev = activations[l];
        const { W, b } = this.layers[l];

        const dW = [];
        for (let j = 0; j < W.length; j++) {
          dW[j] = [];
          for (let i = 0; i < W[j].length; i++) {
            dW[j][i] = delta[j] * aPrev[i];
          }
        }

        for (let j = 0; j < W.length; j++) {
          b[j] -= lr * delta[j];
          for (let i = 0; i < W[j].length; i++) {
            W[j][i] -= lr * dW[j][i];
          }
        }

        if (l > 0) {
          const newDelta = [];
          for (let i = 0; i < W[0].length; i++) {
            let sum = 0;
            for (let j = 0; j < W.length; j++) {
              sum += W[j][i] * delta[j];
            }
            newDelta.push(sum * this.activateDerivative(preActivations[l - 1][i]));
          }
          delta = newDelta;
        }
      }
    }

    return {
      loss: totalLoss / X.length,
      accuracy: correct / X.length
    };
  }
}

function generateDataset(type, n = 200, noise = 0.15) {
  const X = [], Y = [];
  switch (type) {
    case 'circles': {
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const isInner = Math.random() < 0.5;
        const r = isInner ? Math.random() * 0.35 : 0.55 + Math.random() * 0.35;
        const x = r * Math.cos(angle) + (Math.random() - 0.5) * noise * 0.5;
        const y = r * Math.sin(angle) + (Math.random() - 0.5) * noise * 0.5;
        X.push([x, y]);
        Y.push([isInner ? 1 : 0]);
      }
      break;
    }
    case 'xor': {
      for (let i = 0; i < n; i++) {
        const x = Math.random() * 2 - 1;
        const y = Math.random() * 2 - 1;
        const label = (x > 0) === (y > 0) ? 1 : 0;
        X.push([x + (Math.random() - 0.5) * noise, y + (Math.random() - 0.5) * noise]);
        Y.push([label]);
      }
      break;
    }
    case 'spiral': {
      for (let i = 0; i < n; i++) {
        const cls = i < n / 2 ? 0 : 1;
        const r = (i % (n / 2)) / (n / 2);
        const t = r * 4 * Math.PI + cls * Math.PI;
        const x = r * Math.cos(t) + (Math.random() - 0.5) * noise * 0.3;
        const y = r * Math.sin(t) + (Math.random() - 0.5) * noise * 0.3;
        X.push([x, y]);
        Y.push([cls]);
      }
      break;
    }
    case 'gaussian': {
      for (let i = 0; i < n; i++) {
        const cls = Math.random() < 0.5 ? 0 : 1;
        const cx = cls === 0 ? -0.4 : 0.4;
        const cy = cls === 0 ? -0.4 : 0.4;
        const x = cx + (Math.random() - 0.5) * (0.4 + noise * 0.02);
        const y = cy + (Math.random() - 0.5) * (0.4 + noise * 0.02);
        X.push([x, y]);
        Y.push([cls]);
      }
      break;
    }
  }
  return { X, Y };
}

function initPlayground() {
  renderLayersDisplay();
  regenerateData();
  createNetwork();
  drawDecisionBoundary();
  drawNetworkArchitecture();
  drawLossChart();
}

function renderLayersDisplay() {
  const container = document.getElementById('pg-layers-display');
  if (!container) return;
  container.innerHTML = state.playground.layers.map((neurons, i) => `
    <div class="pg-layer-chip">
      <span>${neurons}</span>
      <button data-layer="${i}" data-action="dec" title="Remove neuron">▼</button>
      <button data-layer="${i}" data-action="inc" title="Add neuron">▲</button>
    </div>
  `).join('');

  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.layer);
      if (btn.dataset.action === 'inc' && state.playground.layers[idx] < 8) {
        state.playground.layers[idx]++;
      } else if (btn.dataset.action === 'dec' && state.playground.layers[idx] > 1) {
        state.playground.layers[idx]--;
      }
      createNetwork();
      renderLayersDisplay();
      drawNetworkArchitecture();
    });
  });
}

function regenerateData() {
  state.playground.data = generateDataset(
    state.playground.dataset,
    200,
    state.playground.noise / 100
  );
}

function createNetwork() {
  const pg = state.playground;
  const sizes = [2, ...pg.layers, 1];
  pg.network = new SimpleNN(sizes, pg.activation);
  pg.epoch = 0;
  pg.lossHistory = [];
  const epochEl = document.getElementById('pg-epoch');
  if (epochEl) epochEl.textContent = '0';
  const lossEl = document.getElementById('pg-loss');
  if (lossEl) lossEl.textContent = '—';
  const accEl = document.getElementById('pg-accuracy');
  if (accEl) accEl.textContent = '—';
}

document.getElementById('pg-dataset-picker')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.pg-dataset-btn');
  if (!btn) return;
  document.querySelectorAll('.pg-dataset-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.playground.dataset = btn.dataset.dataset;
  stopTraining();
  regenerateData();
  createNetwork();
  drawDecisionBoundary();
  drawNetworkArchitecture();
  drawLossChart();
});

document.getElementById('pg-add-layer')?.addEventListener('click', () => {
  if (state.playground.layers.length < 5) {
    state.playground.layers.push(4);
    stopTraining();
    createNetwork();
    renderLayersDisplay();
    drawNetworkArchitecture();
  }
});

document.getElementById('pg-remove-layer')?.addEventListener('click', () => {
  if (state.playground.layers.length > 1) {
    state.playground.layers.pop();
    stopTraining();
    createNetwork();
    renderLayersDisplay();
    drawNetworkArchitecture();
  }
});

const lrSlider = document.getElementById('pg-lr');
lrSlider?.addEventListener('input', () => {
  state.playground.lr = Math.pow(10, parseFloat(lrSlider.value));
  document.getElementById('pg-lr-value').textContent = state.playground.lr.toFixed(4);
});

document.getElementById('pg-activation')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.pg-toggle');
  if (!btn) return;
  document.querySelectorAll('#pg-activation .pg-toggle').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.playground.activation = btn.dataset.value;
  stopTraining();
  createNetwork();
  drawNetworkArchitecture();
});

const noiseSlider = document.getElementById('pg-noise');
noiseSlider?.addEventListener('input', () => {
  state.playground.noise = parseInt(noiseSlider.value);
  document.getElementById('pg-noise-value').textContent = `${state.playground.noise}%`;
  regenerateData();
  drawDecisionBoundary();
});

let pgTrainingInterval = null;
document.getElementById('pg-train-btn')?.addEventListener('click', () => {
  if (state.playground.training) stopTraining();
  else startTraining();
});

document.getElementById('pg-reset-btn')?.addEventListener('click', () => {
  stopTraining();
  regenerateData();
  createNetwork();
  drawDecisionBoundary();
  drawNetworkArchitecture();
  drawLossChart();
});

function startTraining() {
  state.playground.training = true;
  const btn = document.getElementById('pg-train-btn');
  if (btn) btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="4" height="12" rx="1"/><rect x="9" y="2" width="4" height="12" rx="1"/></svg><span>Pause</span>`;

  pgTrainingInterval = setInterval(() => {
    const pg = state.playground;
    if (!pg.network || !pg.data) return;

    let result;
    for (let i = 0; i < 10; i++) {
      result = pg.network.train(pg.data.X, pg.data.Y, pg.lr);
      pg.epoch++;
      pg.lossHistory.push(result.loss);
    }

    document.getElementById('pg-epoch').textContent = pg.epoch;
    document.getElementById('pg-loss').textContent = result.loss.toFixed(4);
    document.getElementById('pg-accuracy').textContent = `${(result.accuracy * 100).toFixed(1)}%`;

    drawDecisionBoundary();
    drawLossChart();
  }, 50);
}

function stopTraining() {
  state.playground.training = false;
  clearInterval(pgTrainingInterval);
  const btn = document.getElementById('pg-train-btn');
  if (btn) btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><polygon points="4,2 14,8 4,14"/></svg><span>Train</span>`;
}

function drawDecisionBoundary() {
  const canvas = document.getElementById('pg-decision-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const pg = state.playground;

  ctx.clearRect(0, 0, W, H);

  if (pg.network) {
    const resolution = 50;
    const cellW = W / resolution;
    const cellH = H / resolution;

    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const x = (i / resolution) * 2 - 1;
        const y = (j / resolution) * 2 - 1;
        const pred = pg.network.predict([x, y])[0];

        const r = Math.round(167 + (103 - 167) * pred);
        const g = Math.round(139 + (232 - 139) * pred);
        const b_c = Math.round(250 + (249 - 250) * pred);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b_c}, 0.3)`;
        ctx.fillRect(i * cellW, j * cellH, cellW + 1, cellH + 1);
      }
    }
  }

  if (pg.data) {
    for (let i = 0; i < pg.data.X.length; i++) {
      const [x, y] = pg.data.X[i];
      const label = pg.data.Y[i][0];
      const px = ((x + 1) / 2) * W;
      const py = ((y + 1) / 2) * H;

      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = label === 1 ? '#a78bfa' : '#67e8f9';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
}

function drawNetworkArchitecture() {
  const canvas = document.getElementById('pg-network-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  const pg = state.playground;
  const layerSizes = [2, ...pg.layers, 1];
  const numLayers = layerSizes.length;
  const padding = 60;
  const colors = ['#a78bfa', '#67e8f9', '#fbbf24', '#34d399', '#fb7185', '#a78bfa', '#67e8f9'];

  const nodePositions = [];
  layerSizes.forEach((size, li) => {
    const x = padding + (li / (numLayers - 1)) * (W - 2 * padding);
    const positions = [];
    for (let ni = 0; ni < size; ni++) {
      const y = H / 2 - ((size - 1) * 30) / 2 + ni * 30;
      positions.push({ x, y });
    }
    nodePositions.push(positions);
  });

  for (let l = 0; l < nodePositions.length - 1; l++) {
    for (const n1 of nodePositions[l]) {
      for (const n2 of nodePositions[l + 1]) {
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  for (let l = 0; l < nodePositions.length; l++) {
    const color = colors[l % colors.length];
    for (const { x, y } of nodePositions[l]) {
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      const grad = ctx.createRadialGradient(x, y, 0, x, y, 16);
      grad.addColorStop(0, color + '30');
      grad.addColorStop(1, color + '00');
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  ctx.font = '10px Inter';
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.textAlign = 'center';
  const labels = ['Input', ...pg.layers.map((_, i) => `Hidden ${i + 1}`), 'Output'];
  for (let l = 0; l < nodePositions.length; l++) {
    const x = nodePositions[l][0].x;
    ctx.fillText(labels[l], x, H - 10);
  }
}

function drawLossChart() {
  const canvas = document.getElementById('pg-loss-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  const history = state.playground.lossHistory;
  if (history.length < 2) return;

  const maxLoss = Math.max(...history.slice(0, 50), 1);
  const padding = { top: 30, right: 20, bottom: 20, left: 50 };
  const chartW = W - padding.left - padding.right;
  const chartH = H - padding.top - padding.bottom;

  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (i / 4) * chartH;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(W - padding.right, y);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '10px JetBrains Mono';
    ctx.textAlign = 'right';
    ctx.fillText((maxLoss * (1 - i / 4)).toFixed(2), padding.left - 8, y + 4);
  }

  const grad = ctx.createLinearGradient(0, padding.top, 0, H - padding.bottom);
  grad.addColorStop(0, 'rgba(167, 139, 250, 0.3)');
  grad.addColorStop(1, 'rgba(167, 139, 250, 0)');

  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top + chartH);

  const step = Math.max(1, Math.floor(history.length / chartW));
  const displayed = [];
  for (let i = 0; i < history.length; i += step) {
    displayed.push(history[i]);
  }

  for (let i = 0; i < displayed.length; i++) {
    const x = padding.left + (i / (displayed.length - 1)) * chartW;
    const y = padding.top + (1 - displayed[i] / maxLoss) * chartH;
    ctx.lineTo(x, y);
  }

  ctx.lineTo(padding.left + chartW, padding.top + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  for (let i = 0; i < displayed.length; i++) {
    const x = padding.left + (i / (displayed.length - 1)) * chartW;
    const y = padding.top + (1 - displayed[i] / maxLoss) * chartH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#a78bfa';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// ========================== QUIZ SYSTEM ==========================
function renderQuizTopics() {
  const container = document.getElementById('quiz-topics');
  if (!container) return;
  container.style.display = 'grid';
  document.getElementById('quiz-active').style.display = 'none';
  document.getElementById('quiz-results').style.display = 'none';

  container.innerHTML = Object.entries(QUIZ_DATA).map(([key, quiz]) => {
    const best = state.quizScores[key];
    return `
      <div class="quiz-topic-card" data-topic="${key}">
        <div class="quiz-topic-icon">${quiz.icon}</div>
        <h4 class="quiz-topic-title">${quiz.title}</h4>
        <p class="quiz-topic-count">${quiz.questions.length} questions</p>
        ${best !== undefined ? `<p class="quiz-topic-best">Best: ${best}%</p>` : ''}
      </div>
    `;
  }).join('');

  container.querySelectorAll('.quiz-topic-card').forEach(card => {
    card.addEventListener('click', () => startQuiz(card.dataset.topic));
  });
}

function startQuiz(topic) {
  const quiz = QUIZ_DATA[topic];
  if (!quiz) return;

  state.quizState = {
    topic,
    currentQ: 0,
    answers: [],
    score: 0
  };

  document.getElementById('quiz-topics').style.display = 'none';
  document.getElementById('quiz-active').style.display = 'block';
  document.getElementById('quiz-results').style.display = 'none';

  renderQuestion();
}

function renderQuestion() {
  const qs = state.quizState;
  const quiz = QUIZ_DATA[qs.topic];
  const q = quiz.questions[qs.currentQ];
  const total = quiz.questions.length;

  document.getElementById('quiz-progress-fill').style.width = `${((qs.currentQ) / total) * 100}%`;
  document.getElementById('quiz-question-num').textContent = `Question ${qs.currentQ + 1} of ${total}`;
  document.getElementById('quiz-question').innerHTML = q.q;
  document.getElementById('quiz-feedback').style.display = 'none';
  document.getElementById('quiz-next-btn').style.display = 'none';

  const letters = ['A', 'B', 'C', 'D'];
  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = q.options.map((opt, i) => `
    <div class="quiz-option" data-idx="${i}">
      <span class="quiz-option-letter">${letters[i]}</span>
      <span>${opt}</span>
    </div>
  `).join('');

  const activeBox = document.getElementById('quiz-active');
  if (activeBox) renderMath(activeBox);

  optionsContainer.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', () => answerQuestion(parseInt(opt.dataset.idx)));
  });
}

function answerQuestion(selected) {
  const qs = state.quizState;
  const quiz = QUIZ_DATA[qs.topic];
  const q = quiz.questions[qs.currentQ];
  const isCorrect = selected === q.correct;

  if (isCorrect) qs.score++;
  qs.answers.push(selected);

  document.querySelectorAll('.quiz-option').forEach(opt => {
    const idx = parseInt(opt.dataset.idx);
    opt.style.pointerEvents = 'none';
    if (idx === q.correct) opt.classList.add('correct');
    if (idx === selected && !isCorrect) opt.classList.add('incorrect');
  });

  const feedback = document.getElementById('quiz-feedback');
  feedback.style.display = 'block';
  feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
  feedback.innerHTML = `<strong>${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong><br>${q.explanation}`;
  renderMath(feedback);

  const nextBtn = document.getElementById('quiz-next-btn');
  nextBtn.style.display = 'inline-flex';
  nextBtn.textContent = qs.currentQ < quiz.questions.length - 1 ? 'Next Question' : 'See Results';
}

document.getElementById('quiz-next-btn')?.addEventListener('click', () => {
  const qs = state.quizState;
  const quiz = QUIZ_DATA[qs.topic];

  if (qs.currentQ < quiz.questions.length - 1) {
    qs.currentQ++;
    renderQuestion();
  } else {
    showQuizResults();
  }
});

document.getElementById('quiz-exit-btn')?.addEventListener('click', () => {
  state.quizState = null;
  renderQuizTopics();
});

function showQuizResults() {
  const qs = state.quizState;
  const quiz = QUIZ_DATA[qs.topic];
  const pct = Math.round((qs.score / quiz.questions.length) * 100);

  if (!state.quizScores[qs.topic] || pct > state.quizScores[qs.topic]) {
    state.quizScores[qs.topic] = pct;
    saveProgress();
  }

  document.getElementById('quiz-active').style.display = 'none';
  document.getElementById('quiz-results').style.display = 'block';

  document.getElementById('quiz-score-text').textContent = `${pct}%`;

  const circle = document.getElementById('score-circle');
  const circumference = 2 * Math.PI * 50;
  setTimeout(() => {
    circle.setAttribute('stroke-dashoffset', circumference - (pct / 100) * circumference);
  }, 100);

  const titles = pct === 100 ? 'Perfect Score! 🎉' : pct >= 80 ? 'Great Job! 🌟' : pct >= 60 ? 'Good Effort! 💪' : 'Keep Learning! 📚';
  const descs = pct === 100 ? 'You\'ve mastered this topic!' : pct >= 80 ? `You scored ${qs.score}/${quiz.questions.length}. Excellent work!` : `Review the lecture notes and try again.`;

  document.getElementById('quiz-results-title').textContent = titles;
  document.getElementById('quiz-results-desc').textContent = descs;
}

document.getElementById('quiz-retry-btn')?.addEventListener('click', () => {
  startQuiz(state.quizState.topic);
});

document.getElementById('quiz-back-btn')?.addEventListener('click', () => {
  state.quizState = null;
  renderQuizTopics();
});

// ========================== PARTICLES & HERO NETWORK ==========================
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const COUNT = 45;

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
      color: Math.random() < 0.5 ? '167,139,250' : '103,232,249'
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, 0.5)`;
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(167, 139, 250, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

function animateHeroNetwork() {
  const canvas = document.getElementById('hero-network');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const layers = [3, 5, 5, 4, 2];
  const nodes = [];
  const W = canvas.width, H = canvas.height;

  layers.forEach((count, li) => {
    const x = 60 + (li / (layers.length - 1)) * (W - 120);
    for (let ni = 0; ni < count; ni++) {
      const y = (H / 2) - ((count - 1) * 40) / 2 + ni * 40;
      nodes.push({ x, y, layer: li, pulse: Math.random() * Math.PI * 2 });
    }
  });

  function draw(time) {
    ctx.clearRect(0, 0, W, H);

    for (const n1 of nodes) {
      for (const n2 of nodes) {
        if (n2.layer === n1.layer + 1) {
          const alpha = 0.06 + 0.04 * Math.sin(time / 1000 + n1.pulse + n2.pulse);
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      const pulse = 0.6 + 0.4 * Math.sin(time / 800 + n.pulse);
      const r = 6 + pulse * 3;
      const colors = ['#a78bfa', '#67e8f9', '#fbbf24', '#34d399', '#fb7185'];
      const color = colors[n.layer % colors.length];

      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3);
      grad.addColorStop(0, color + '40');
      grad.addColorStop(1, color + '00');
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}


// ========================== BACKPROPAGATION SIMULATOR (SLIDE 10) ==========================
function initBackpropSimulator() {
  const inputA = document.getElementById('bp-input-a');
  const inputB = document.getElementById('bp-input-b');
  const valA = document.getElementById('bp-val-a');
  const valB = document.getElementById('bp-val-b');
  const btnFwd = document.getElementById('btn-bp-forward');
  const btnBwd = document.getElementById('btn-bp-backward');
  const container = document.getElementById('comp-graph-nodes');

  if (!inputA || !inputB || !container) return;

  function updateGraph() {
    state.bp.a = parseFloat(inputA.value);
    state.bp.b = parseFloat(inputB.value);
    valA.textContent = state.bp.a.toFixed(1);
    valB.textContent = state.bp.b.toFixed(1);

    const a = state.bp.a;
    const b = state.bp.b;
    const c = a + b;
    const d = b + 1;
    const e = c * d;

    // Gradients
    const dede = 1.0;
    const dedc = d;
    const dedd = c;
    const deda = dedc * 1.0; // d * 1
    const dedb = dedc * 1.0 + dedd * 1.0; // Branch Sum Rule!

    container.innerHTML = `
      <div class="comp-nodes-grid" style="display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; gap:16px; margin:20px 0;">
        <div class="comp-node ${state.bp.hasForward ? 'active-fwd' : ''} ${state.bp.hasBackward ? 'active-bwd' : ''}">
          <div class="comp-node-header">Input $a$</div>
          <div class="comp-node-val">$a = ${a.toFixed(1)}$</div>
          ${state.bp.hasBackward ? `<div class="comp-node-grad">$\\frac{\\partial e}{\\partial a} = ${deda.toFixed(1)}$</div>` : ''}
        </div>

        <div class="comp-node ${state.bp.hasForward ? 'active-fwd' : ''} ${state.bp.hasBackward ? 'active-bwd' : ''}" style="border-color:var(--amber-400);">
          <div class="comp-node-header" style="color:var(--amber-400);">Input $b$ (Branch)</div>
          <div class="comp-node-val">$b = ${b.toFixed(1)}$</div>
          ${state.bp.hasBackward ? `<div class="comp-node-grad" style="color:var(--amber-400); font-weight:bold;">$\\frac{\\partial e}{\\partial b} = ${dedb.toFixed(1)}$</div>` : ''}
        </div>

        <div class="comp-node ${state.bp.hasForward ? 'active-fwd' : ''} ${state.bp.hasBackward ? 'active-bwd' : ''}">
          <div class="comp-node-header">Node $c = a + b$</div>
          <div class="comp-node-val">$c = ${c.toFixed(1)}$</div>
          ${state.bp.hasBackward ? `<div class="comp-node-grad">$\\frac{\\partial e}{\\partial c} = ${dedc.toFixed(1)}$</div>` : ''}
        </div>

        <div class="comp-node ${state.bp.hasForward ? 'active-fwd' : ''} ${state.bp.hasBackward ? 'active-bwd' : ''}">
          <div class="comp-node-header">Node $d = b + 1$</div>
          <div class="comp-node-val">$d = ${d.toFixed(1)}$</div>
          ${state.bp.hasBackward ? `<div class="comp-node-grad">$\\frac{\\partial e}{\\partial d} = ${dedd.toFixed(1)}$</div>` : ''}
        </div>

        <div class="comp-node ${state.bp.hasForward ? 'active-fwd' : ''} ${state.bp.hasBackward ? 'active-bwd' : ''}" style="border-color:var(--emerald-400);">
          <div class="comp-node-header" style="color:var(--emerald-400);">Output $e = c \\times d$</div>
          <div class="comp-node-val" style="font-weight:bold; color:var(--emerald-400);">$e = ${e.toFixed(2)}$</div>
          ${state.bp.hasBackward ? `<div class="comp-node-grad">$\\frac{\\partial e}{\\partial e} = 1.0$</div>` : ''}
        </div>
      </div>
    `;

    // Update trace
    const trE = document.getElementById('bp-trace-e');
    const trCD = document.getElementById('bp-trace-cd');
    const trA = document.getElementById('bp-trace-a');
    const trB = document.getElementById('bp-trace-b');

    if (trE) trE.innerHTML = `$$\\frac{\\partial e}{\\partial e} = 1.0$$`;
    if (trCD) trCD.innerHTML = `$$\\frac{\\partial e}{\\partial c} = d = ${d.toFixed(1)}, \\quad \\frac{\\partial e}{\\partial d} = c = ${c.toFixed(1)}$$`;
    if (trA) trA.innerHTML = `$$\\frac{\\partial e}{\\partial a} = \\frac{\\partial e}{\\partial c} \\frac{\\partial c}{\\partial a} = (${d.toFixed(1)}) \\times 1 = ${deda.toFixed(1)}$$`;
    if (trB) {
      trB.innerHTML = `$$\\frac{\\partial e}{\\partial b} = \\underbrace{\\frac{\\partial e}{\\partial c} \\frac{\\partial c}{\\partial b}}_{${dedc.toFixed(1)} \\times 1} + \\underbrace{\\frac{\\partial e}{\\partial d} \\frac{\\partial d}{\\partial b}}_{${dedd.toFixed(1)} \\times 1} = ${dedc.toFixed(1)} + ${dedd.toFixed(1)} = \\mathbf{${dedb.toFixed(1)}} \\quad \\text{(Branch Sum Rule!)}$$`;
    }

    renderMath(container);
    renderMath(document.getElementById('bp-gradient-trace'));
  }

  inputA.oninput = () => { state.bp.hasBackward = false; updateGraph(); };
  inputB.oninput = () => { state.bp.hasBackward = false; updateGraph(); };

  if (btnFwd) {
    btnFwd.onclick = () => {
      state.bp.hasForward = true;
      state.bp.hasBackward = false;
      updateGraph();
    };
  }

  if (btnBwd) {
    btnBwd.onclick = () => {
      state.bp.hasForward = true;
      state.bp.hasBackward = true;
      updateGraph();
    };
  }

  updateGraph();
}


// ========================== OPTIMIZER ARENA (SLIDES 18–25) ==========================
function initOptimizerArena() {
  const canvas = document.getElementById('opt-arena-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const btnRun = document.getElementById('btn-opt-run');
  const btnReset = document.getElementById('btn-opt-reset');
  const iterEl = document.getElementById('opt-cur-iter');
  const lossEl = document.getElementById('opt-cur-loss');
  const statusEl = document.getElementById('opt-status-text');
  const mathDetail = document.getElementById('opt-math-detail');

  // Surface: f(x, y) = 0.5 * x^2 + 10 * y^2 (Anisotropic Ravine)
  // grad = [x, 20*y]
  function f(x, y) {
    return 0.5 * x * x + 10 * y * y;
  }
  function grad(x, y) {
    return [x, 20 * y];
  }

  function toCanvas(x, y) {
    // x in [-4.5, 4.5] -> [30, W - 30]
    // y in [-3.0, 3.0] -> [H - 30, 30]
    const cx = 30 + ((x + 4.5) / 9.0) * (W - 60);
    const cy = (H - 30) - ((y + 3.0) / 6.0) * (H - 60);
    return [cx, cy];
  }

  function drawContour() {
    ctx.clearRect(0, 0, W, H);

    // Draw background subtle grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = -4; x <= 4; x += 1) {
      const [p1x, p1y] = toCanvas(x, -3);
      const [p2x, p2y] = toCanvas(x, 3);
      ctx.beginPath();
      ctx.moveTo(p1x, p1y);
      ctx.lineTo(p2x, p2y);
      ctx.stroke();
    }
    for (let y = -3; y <= 3; y += 1) {
      const [p1x, p1y] = toCanvas(-4.5, y);
      const [p2x, p2y] = toCanvas(4.5, y);
      ctx.beginPath();
      ctx.moveTo(p1x, p1y);
      ctx.lineTo(p2x, p2y);
      ctx.stroke();
    }

    // Draw elliptical contour lines: 0.5*x^2 + 10*y^2 = C
    const levels = [0.2, 1.0, 3.0, 8.0, 20.0, 50.0, 90.0];
    levels.forEach((c, idx) => {
      ctx.beginPath();
      const a = Math.sqrt(2 * c); // rx along x
      const b = Math.sqrt(c / 10); // ry along y
      const [centerPx, centerPy] = toCanvas(0, 0);
      const [edgePx] = toCanvas(a, 0);
      const [, edgePy] = toCanvas(0, b);
      const rx = Math.abs(edgePx - centerPx);
      const ry = Math.abs(edgePy - centerPy);

      ctx.ellipse(centerPx, centerPy, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(167, 139, 250, ${0.12 + idx * 0.04})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });

    // Draw center minimum
    const [mx, my] = toCanvas(0, 0);
    ctx.beginPath();
    ctx.arc(mx, my, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#34d399';
    ctx.fill();

    // Draw optimizer path
    const path = state.opt.path;
    if (path.length > 1) {
      ctx.beginPath();
      const [sX, sY] = toCanvas(path[0][0], path[0][1]);
      ctx.moveTo(sX, sY);
      for (let i = 1; i < path.length; i++) {
        const [px, py] = toCanvas(path[i][0], path[i][1]);
        ctx.lineTo(px, py);
      }
      ctx.strokeStyle = '#67e8f9';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#67e8f9';
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw path vertices
      path.forEach((pt, i) => {
        const [px, py] = toCanvas(pt[0], pt[1]);
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = i === path.length - 1 ? '#fbbf24' : '#67e8f9';
        ctx.fill();
      });
    }

    // Draw current head
    if (path.length > 0) {
      const cur = path[path.length - 1];
      const [cx, cy] = toCanvas(cur[0], cur[1]);
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  function resetOpt() {
    if (state.opt.timer) {
      clearInterval(state.opt.timer);
      state.opt.timer = null;
    }
    state.opt.running = false;
    state.opt.x = -3.8;
    state.opt.y = 2.4;
    state.opt.path = [[state.opt.x, state.opt.y]];
    state.opt.iter = 0;
    state.opt.v = [0, 0];
    state.opt.m = [0, 0];
    state.opt.G = [0, 0];

    if (btnRun) btnRun.textContent = '▶ Start Optimizer';
    if (iterEl) iterEl.textContent = '0';
    if (lossEl) lossEl.textContent = f(state.opt.x, state.opt.y).toFixed(3);
    if (statusEl) statusEl.textContent = 'Ready';

    drawContour();
    updateMathDetail();
  }

  function stepOpt() {
    if (state.opt.iter >= 80) {
      stopOpt();
      if (statusEl) statusEl.textContent = 'Reached max steps';
      return;
    }

    const type = state.opt.type;
    let [x, y] = [state.opt.x, state.opt.y];
    let [gx, gy] = grad(x, y);

    if (type === 'sgd') {
      const lr = 0.085;
      x = x - lr * gx;
      y = y - lr * gy;
    } else if (type === 'momentum') {
      const lr = 0.04;
      const gamma = 0.9;
      state.opt.v[0] = gamma * state.opt.v[0] + lr * gx;
      state.opt.v[1] = gamma * state.opt.v[1] + lr * gy;
      x = x - state.opt.v[0];
      y = y - state.opt.v[1];
    } else if (type === 'nesterov') {
      const lr = 0.04;
      const gamma = 0.9;
      // Lookahead point
      const xLook = x - gamma * state.opt.v[0];
      const yLook = y - gamma * state.opt.v[1];
      const [gLookX, gLookY] = grad(xLook, yLook);
      state.opt.v[0] = gamma * state.opt.v[0] + lr * gLookX;
      state.opt.v[1] = gamma * state.opt.v[1] + lr * gLookY;
      x = x - state.opt.v[0];
      y = y - state.opt.v[1];
    } else if (type === 'adagrad') {
      const lr = 0.65;
      const eps = 1e-6;
      state.opt.G[0] += gx * gx;
      state.opt.G[1] += gy * gy;
      x = x - (lr / (Math.sqrt(state.opt.G[0]) + eps)) * gx;
      y = y - (lr / (Math.sqrt(state.opt.G[1]) + eps)) * gy;
    } else if (type === 'adam') {
      const lr = 0.18;
      const beta1 = 0.9, beta2 = 0.999, eps = 1e-8;
      const t = state.opt.iter + 1;
      state.opt.m[0] = beta1 * state.opt.m[0] + (1 - beta1) * gx;
      state.opt.m[1] = beta1 * state.opt.m[1] + (1 - beta1) * gy;
      state.opt.v[0] = beta2 * state.opt.v[0] + (1 - beta2) * (gx * gx);
      state.opt.v[1] = beta2 * state.opt.v[1] + (1 - beta2) * (gy * gy);

      // Bias correction
      const mHatX = state.opt.m[0] / (1 - Math.pow(beta1, t));
      const mHatY = state.opt.m[1] / (1 - Math.pow(beta1, t));
      const vHatX = state.opt.v[0] / (1 - Math.pow(beta2, t));
      const vHatY = state.opt.v[1] / (1 - Math.pow(beta2, t));

      x = x - (lr / (Math.sqrt(vHatX) + eps)) * mHatX;
      y = y - (lr / (Math.sqrt(vHatY) + eps)) * mHatY;
    }

    state.opt.x = x;
    state.opt.y = y;
    state.opt.path.push([x, y]);
    state.opt.iter++;

    const curLoss = f(x, y);
    if (iterEl) iterEl.textContent = state.opt.iter;
    if (lossEl) lossEl.textContent = curLoss.toFixed(4);

    if (curLoss < 0.005) {
      stopOpt();
      if (statusEl) statusEl.textContent = '✓ Converged at minimum!';
    } else {
      if (statusEl) statusEl.textContent = `Optimizing (step ${state.opt.iter})`;
    }

    drawContour();
  }

  function startOpt() {
    state.opt.running = true;
    if (btnRun) btnRun.textContent = '⏸ Pause';
    state.opt.timer = setInterval(stepOpt, 80);
  }

  function stopOpt() {
    state.opt.running = false;
    if (btnRun) btnRun.textContent = '▶ Resume';
    if (state.opt.timer) {
      clearInterval(state.opt.timer);
      state.opt.timer = null;
    }
  }

  function updateMathDetail() {
    if (!mathDetail) return;
    const type = state.opt.type;
    let mathHtml = '';
    if (type === 'sgd') {
      mathHtml = `
        <h4>Vanilla SGD (Slide 16)</h4>
        <div class="formula">W_{t+1} = W_t - \\alpha \\nabla f(W_t)</div>
        <p><strong>Ravine Behavior:</strong> Oscillates wildly across the steep $y$-axis ($20y$) while making excruciatingly slow progress along the flat $x$-axis.</p>
      `;
    } else if (type === 'momentum') {
      mathHtml = `
        <h4>Polyak Momentum (Slide 19)</h4>
        <div class="formula">v_t = \\gamma v_{t-1} + \\alpha \\nabla f(W_t), \\quad W_{t+1} = W_t - v_t</div>
        <p><strong>Ravine Behavior:</strong> Momentum ($\\\\gamma=0.9$) averages out oscillating $y$-gradients and accumulates positive velocity along $x$, accelerating straight down the canyon.</p>
      `;
    } else if (type === 'nesterov') {
      mathHtml = `
        <h4>Nesterov Accelerated Gradient (NAG) (Slide 20)</h4>
        <div class="formula">v_t = \\gamma v_{t-1} + \\alpha \\nabla f(W_t - \\gamma v_{t-1}), \\quad W_{t+1} = W_t - v_t</div>
        <p><strong>Look-Ahead Mechanism:</strong> Evaluates gradient at predicted position, providing an early "braking" mechanism that prevents catastrophic overshooting.</p>
      `;
    } else if (type === 'adagrad') {
      mathHtml = `
        <h4>Adagrad (Slide 21)</h4>
        <div class="formula">G_t = G_{t-1} + g_t^2, \\quad W_{t+1} = W_t - \\frac{\\alpha}{\\sqrt{G_t} + \\epsilon} g_t</div>
        <p><strong>Coordinate Adaptation:</strong> Automatically dampens the steep $y$ direction. However, monotonic accumulation of $g_t^2$ in $G_t$ causes the effective learning rate to decay to zero prematurely.</p>
      `;
    } else if (type === 'adam') {
      mathHtml = `
        <h4>Adam (Kingma & Ba, 2014) (Slides 24–25)</h4>
        <div class="formula">
          \\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t}, \\quad \\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t}, \\quad W_{t+1} = W_t - \\frac{\\alpha}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t
        </div>
        <p><strong>Bias Correction:</strong> Essential in early steps ($t \\le 20$) because $m_0 = 0, v_0 = 0$. Provides unmatched rapid and stable convergence down anisotropic valleys!</p>
      `;
    }
    mathDetail.innerHTML = mathHtml;
    renderMath(mathDetail);
  }

  // Hook toggle buttons
  document.querySelectorAll('#opt-selector-group button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#opt-selector-group button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.opt.type = btn.dataset.opt;
      resetOpt();
    };
  });

  if (btnRun) {
    btnRun.onclick = () => {
      if (state.opt.running) {
        stopOpt();
      } else {
        startOpt();
      }
    };
  }

  if (btnReset) {
    btnReset.onclick = resetOpt;
  }

  resetOpt();
}


// ========================== INITIALIZATION & NORMALIZATION LAB (SLIDES 33–44) ==========================
function initInitNormLab() {
  const varCanvas = document.getElementById('init-variance-canvas');
  const verdictBox = document.getElementById('init-verdict-box');
  const normCanvas = document.getElementById('norm-matrix-canvas');
  const normMathBox = document.getElementById('norm-math-box');

  if (!varCanvas || !normCanvas) return;

  function drawVariancePlot() {
    const ctx = varCanvas.getContext('2d');
    const W = varCanvas.width, H = varCanvas.height;
    ctx.clearRect(0, 0, W, H);

    const scheme = state.initNorm.initScheme;
    const numLayers = 10;
    const variances = [];

    // Simulate 10 layers variance dynamics
    if (scheme === 'zero') {
      for (let l = 1; l <= numLayers; l++) variances.push(0);
    } else if (scheme === 'normal') {
      // Explodes or collapses
      let cur = 1.0;
      for (let l = 1; l <= numLayers; l++) {
        variances.push(Math.min(10.0, cur));
        cur *= 0.15; // collapses rapidly
      }
    } else if (scheme === 'xavier') {
      // With ReLU: halves at every layer! 0.5^L
      let cur = 1.0;
      for (let l = 1; l <= numLayers; l++) {
        variances.push(cur);
        cur *= 0.5;
      }
    } else if (scheme === 'kaiming') {
      // Factor of 2 compensates for ReLU!
      for (let l = 1; l <= numLayers; l++) {
        variances.push(1.0 + (Math.sin(l) * 0.05));
      }
    }

    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(40, H - 30);
    ctx.lineTo(W - 20, H - 30);
    ctx.stroke();

    // Draw reference line Var = 1.0
    const refY = (H - 30) - (1.0 / 2.0) * (H - 60);
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
    ctx.beginPath();
    ctx.moveTo(40, refY);
    ctx.lineTo(W - 20, refY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#34d399';
    ctx.font = '10px monospace';
    ctx.fillText('Target Var = 1.0', W - 110, refY - 5);

    // Draw bars
    const barW = (W - 80) / numLayers;
    variances.forEach((v, idx) => {
      const bx = 45 + idx * barW;
      const barH = Math.min(H - 60, (v / 2.0) * (H - 60));
      const by = (H - 30) - barH;

      let color = '#a78bfa';
      if (scheme === 'kaiming') color = '#34d399';
      if (scheme === 'xavier') color = '#fbbf24';
      if (scheme === 'normal' || scheme === 'zero') color = '#fb7185';

      ctx.fillStyle = color;
      ctx.fillRect(bx + 4, by, barW - 8, barH);

      // Layer label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '9px sans-serif';
      ctx.fillText(`L${idx + 1}`, bx + barW / 2 - 6, H - 15);
    });

    // Verdict text
    let verdictHtml = '';
    if (scheme === 'zero') {
      verdictHtml = `<div class="info-box" style="border-left-color:var(--rose-400);"><strong style="color:var(--rose-400);">⚠️ Symmetry Trap (Slide 33):</strong> When $W=0$, every neuron computes $0$ and receives the identical backprop gradient $\\nabla W = 0$. Hidden units can never differentiate.</div>`;
    } else if (scheme === 'normal') {
      verdictHtml = `<div class="info-box" style="border-left-color:var(--rose-400);"><strong style="color:var(--rose-400);">💥 Vanishing Activations (Slide 34):</strong> Standard normal $\\mathcal{N}(0, 0.01)$ causes activation variance to collapse exponentially ($10^{-7}$ by layer 10), freezing gradient propagation entirely!</div>`;
    } else if (scheme === 'xavier') {
      verdictHtml = `<div class="info-box" style="border-left-color:var(--amber-400);"><strong style="color:var(--amber-400);">⚠️ Xavier Fails on ReLU (Slide 38):</strong> Xavier preserves variance for linear/tanh. But because ReLU extinguishes half of activations ($x \\le 0$), variance halves at each layer ($2^{-L}$), decaying to $\\approx 0.001$ at layer 10.</div>`;
    } else if (scheme === 'kaiming') {
      verdictHtml = `<div class="info-box" style="border-left-color:var(--emerald-400);"><strong style="color:var(--emerald-400);">✅ Kaiming / He Preserves Variance (Slide 39):</strong> Using $\\operatorname{Var}(W) = \\frac{2}{n_{\\text{in}}}$ multiplies weight variance by 2, exactly neutralizing ReLU\'s halving effect! Variance stays $\\approx 1.0$ across all 10 layers.</div>`;
    }
    verdictBox.innerHTML = verdictHtml;
    renderMath(verdictBox);
  }

  function drawNormMatrix() {
    const ctx = normCanvas.getContext('2d');
    const W = normCanvas.width, H = normCanvas.height;
    ctx.clearRect(0, 0, W, H);

    const mode = state.initNorm.normMode;
    const N = 5; // Batch size
    const D = 8; // Features
    const cellW = (W - 80) / D;
    const cellH = (H - 50) / N;

    // Draw matrix
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < D; j++) {
        const x = 50 + j * cellW;
        const y = 25 + i * cellH;

        let fill = 'rgba(255, 255, 255, 0.05)';
        let stroke = 'rgba(255, 255, 255, 0.1)';

        if (mode === 'batch') {
          // Highlight column j=2
          if (j === 2) {
            fill = 'rgba(52, 211, 153, 0.35)';
            stroke = '#34d399';
          }
        } else {
          // Highlight row i=1
          if (i === 1) {
            fill = 'rgba(167, 139, 250, 0.35)';
            stroke = '#a78bfa';
          }
        }

        ctx.fillStyle = fill;
        ctx.fillRect(x + 2, y + 2, cellW - 4, cellH - 4);
        ctx.strokeStyle = stroke;
        ctx.strokeRect(x + 2, y + 2, cellW - 4, cellH - 4);

        // Simulated value
        const val = (Math.sin(i * 3 + j * 7) * 0.9).toFixed(1);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '10px monospace';
        ctx.fillText(val, x + cellW / 2 - 9, y + cellH / 2 + 4);
      }
    }

    // Labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '10px sans-serif';
    ctx.fillText('Batch N', 5, H / 2);
    ctx.fillText('Feature Dimension D →', W / 2 - 50, 15);

    // Math box
    let mathHtml = '';
    if (mode === 'batch') {
      mathHtml = `
        <div class="info-box" style="border-left-color:var(--emerald-400);">
          <strong style="color:var(--emerald-400);">Batch Normalization (Slide 41–44):</strong>
          <p>Normalizes vertically across the mini-batch dimension $N$ for each individual feature column $j$:</p>
          <div class="formula">\\mu_j = \\frac{1}{N}\\sum_{i=1}^N x_{ij}, \\quad \\sigma_j^2 = \\frac{1}{N}\\sum_{i=1}^N (x_{ij} - \\mu_j)^2</div>
          <p><strong>⚠️ Crucial Exam Rule (Slide 43):</strong> At inference/test time, we do <strong>NOT</strong> compute $\\mu$ and $\\sigma$ from test batches! Instead, the network uses the frozen <em>running averages</em> accumulated during training.</p>
        </div>
      `;
    } else {
      mathHtml = `
        <div class="info-box" style="border-left-color:var(--violet-400);">
          <strong style="color:var(--violet-400);">Layer Normalization (Slide 45):</strong>
          <p>Normalizes horizontally across all features $D$ for each individual sample $i$ independently:</p>
          <div class="formula">\\mu_i = \\frac{1}{D}\\sum_{j=1}^D x_{ij}, \\quad \\sigma_i^2 = \\frac{1}{D}\\sum_{j=1}^D (x_{ij} - \\mu_i)^2</div>
          <p><strong>Key Advantage:</strong> Completely independent of batch size $N$, identical behavior at train and test time, and essential for sequence models and Transformers!</p>
        </div>
      `;
    }
    normMathBox.innerHTML = mathHtml;
    renderMath(normMathBox);
  }

  // Hook init schemes
  document.querySelectorAll('#init-scheme-group button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#init-scheme-group button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.initNorm.initScheme = btn.dataset.init;
      drawVariancePlot();
    };
  });

  // Hook norm modes
  document.querySelectorAll('#norm-mode-group button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#norm-mode-group button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.initNorm.normMode = btn.dataset.norm;
      drawNormMatrix();
    };
  });

  drawVariancePlot();
  drawNormMatrix();
}


// ========================== CNN LAB (LECTURE 3) ==========================
function initCnnLab() {
  initCnnCalc();
  initCnnArchitectures();
  initCnnKernel();

  // CNN tabs switcher
  document.querySelectorAll('.cnn-tab').forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll('.cnn-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.cnn-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = document.getElementById(`pane-${tab.dataset.tab}`);
      if (pane) {
        pane.classList.add('active');
        renderMath(pane);
      }
      if (tab.dataset.tab === 'cnn-calc') setTimeout(initCnnCalc, 20);
      if (tab.dataset.tab === 'cnn-architectures') setTimeout(initCnnArchitectures, 20);
      if (tab.dataset.tab === 'cnn-kernel') setTimeout(initCnnKernel, 20);
    };
  });
}

function initCnnCalc() {
  const cinInp = document.getElementById('inp-cin');
  const hinInp = document.getElementById('inp-hin');
  const fInp = document.getElementById('inp-f');
  const coutInp = document.getElementById('inp-cout');
  const sInp = document.getElementById('inp-s');
  const pInp = document.getElementById('inp-p');
  const resultsEl = document.getElementById('cnn-calc-results');
  const previewCanvas = document.getElementById('cnn-grid-preview');

  if (!cinInp || !hinInp || !fInp || !coutInp || !sInp || !pInp || !resultsEl) return;

  function update() {
    const Cin = parseInt(cinInp.value) || 1;
    const Hin = parseInt(hinInp.value) || 1;
    const F = parseInt(fInp.value) || 1;
    const Cout = parseInt(coutInp.value) || 1;
    const S = parseInt(sInp.value) || 1;
    const P = parseInt(pInp.value) || 0;

    document.getElementById('lbl-cin').textContent = Cin;
    document.getElementById('lbl-hin').textContent = Hin;
    document.getElementById('lbl-f').textContent = F;
    document.getElementById('lbl-cout').textContent = Cout;
    document.getElementById('lbl-s').textContent = S;
    document.getElementById('lbl-p').textContent = P;

    // Formulas from Slides 18–25
    const numerator = Hin - F + 2 * P;
    const Hout = Math.floor(numerator / S) + 1;
    const isIntegerFit = numerator % S === 0;

    const weightsPerFilter = F * F * Cin;
    const totalWeights = Cout * weightsPerFilter;
    const totalBiases = Cout;
    const totalParams = totalWeights + totalBiases; // Cout * (F^2 * Cin + 1)

    // FLOPs: Hout * Wout * Cout * (F^2 * Cin)
    const macs = Hout * Hout * Cout * weightsPerFilter;

    // Max pooling equivalent (2x2, stride 2)
    const poolHout = Math.floor((Hin - 2) / 2) + 1;

    resultsEl.innerHTML = `
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap:12px;">
        <div class="cnn-stat-card">
          <div class="s-label">Output Spatial $H_{\\text{out}} \\times W_{\\text{out}}$</div>
          <div class="s-val" style="color:var(--cyan-400);">${Hout} \\times ${Hout}</div>
          <div class="s-sub">${isIntegerFit ? '✓ Exact integer fit' : '⚠️ Fractional (floored)'}</div>
        </div>

        <div class="cnn-stat-card">
          <div class="s-label">Total Learnable Parameters</div>
          <div class="s-val" style="color:var(--emerald-400);">${totalParams.toLocaleString()}</div>
          <div class="s-sub">${totalWeights.toLocaleString()} weights + ${totalBiases} biases</div>
        </div>

        <div class="cnn-stat-card">
          <div class="s-label">Output Volume Shape</div>
          <div class="s-val" style="color:var(--violet-400);">${Cout} \\times ${Hout} \\times ${Hout}</div>
          <div class="s-sub">${(Cout * Hout * Hout).toLocaleString()} activations</div>
        </div>

        <div class="cnn-stat-card">
          <div class="s-label">Compare: MaxPool ($2\\times 2$, S=2)</div>
          <div class="s-val" style="color:var(--amber-400);">${poolHout} \\times ${poolHout}</div>
          <div class="s-sub" style="color:var(--emerald-400); font-weight:bold;">0 learnable parameters!</div>
        </div>
      </div>

      <div class="info-box" style="margin-top:14px;">
        <div class="info-title">🧮 Step-by-Step Parameter Calculation (Slide 24)</div>
        <div class="formula">
          \\text{Params} = C_{\\text{out}} \\times (F^2 \\cdot C_{\\text{in}} + 1) = ${Cout} \\times (${F}^2 \\times ${Cin} + 1) = ${Cout} \\times (${F * F * Cin} + 1) = \\mathbf{${totalParams.toLocaleString()}}
        </div>
      </div>
    `;

    renderMath(resultsEl);
    drawPreview(Hin, Hout, F, S, P, Cin, Cout);
  }

  function drawPreview(Hin, Hout, F, S, P, Cin, Cout) {
    if (!previewCanvas) return;
    const ctx = previewCanvas.getContext('2d');
    const W = previewCanvas.width, H = previewCanvas.height;
    ctx.clearRect(0, 0, W, H);

    // Draw Input Volume Box
    ctx.strokeStyle = '#67e8f9';
    ctx.lineWidth = 1.5;
    ctx.fillStyle = 'rgba(103, 232, 249, 0.15)';
    ctx.fillRect(40, 50, 110, 110);
    ctx.strokeRect(40, 50, 110, 110);

    ctx.fillStyle = '#67e8f9';
    ctx.font = '11px sans-serif';
    ctx.fillText(`Input (${Cin} × ${Hin} × ${Hin})`, 40, 40);

    // Draw filter window inside input
    ctx.fillStyle = 'rgba(251, 191, 36, 0.4)';
    ctx.strokeStyle = '#fbbf24';
    ctx.fillRect(45, 55, 35, 35);
    ctx.strokeRect(45, 55, 35, 35);
    ctx.fillStyle = '#fbbf24';
    ctx.font = '9px sans-serif';
    ctx.fillText(`${F}×${F}`, 48, 75);

    // Arrow
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(170, 105);
    ctx.lineTo(240, 105);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(235, 100);
    ctx.lineTo(240, 105);
    ctx.lineTo(235, 110);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '10px sans-serif';
    ctx.fillText(`Conv (${Cout} filters)`, 172, 95);

    // Draw Output Volume Box
    ctx.strokeStyle = '#34d399';
    ctx.fillStyle = 'rgba(52, 211, 153, 0.15)';
    ctx.fillRect(260, 60, 90, 90);
    ctx.strokeRect(260, 60, 90, 90);

    ctx.fillStyle = '#34d399';
    ctx.font = '11px sans-serif';
    ctx.fillText(`Output (${Cout} × ${Hout} × ${Hout})`, 260, 45);

    // Output activation pixel
    ctx.fillStyle = '#34d399';
    ctx.fillRect(265, 65, 12, 12);
  }

  // Hook preset buttons
  document.querySelectorAll('#cnn-preset-group button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#cnn-preset-group button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const p = btn.dataset.preset;
      if (p === 'slide24') {
        cinInp.value = 3; hinInp.value = 32; fInp.value = 5; coutInp.value = 10; sInp.value = 1; pInp.value = 2;
      } else if (p === 'alex-conv1') {
        cinInp.value = 3; hinInp.value = 224; fInp.value = 11; coutInp.value = 96; sInp.value = 4; pInp.value = 0;
      } else if (p === 'alex-conv2') {
        cinInp.value = 96; hinInp.value = 27; fInp.value = 5; coutInp.value = 256; sInp.value = 1; pInp.value = 2;
      } else if (p === 'vgg-conv') {
        cinInp.value = 64; hinInp.value = 224; fInp.value = 3; coutInp.value = 64; sInp.value = 1; pInp.value = 1;
      }
      update();
    };
  });

  [cinInp, hinInp, fInp, coutInp, sInp, pInp].forEach(inp => {
    inp.oninput = update;
  });

  update();
}

function initCnnArchitectures() {
  const container = document.getElementById('arch-display-pane');
  if (!container) return;

  function renderArch(arch) {
    let content = '';
    if (arch === 'alexnet') {
      content = `
        <div class="lab-card glass-panel" style="margin-bottom:20px;">
          <div class="lab-card-header">
            <h3>AlexNet (Krizhevsky, Sutskever, & Hinton — ImageNet 2012)</h3>
            <span class="badge" style="background:var(--violet-500); color:white; padding:4px 8px; border-radius:6px; font-size:0.75rem;">Top-5 Error: 16.4%</span>
          </div>
          <p>The turning point that sparked the deep learning boom. 8 layers: 5 convolutional + 3 fully connected (~60M parameters).</p>
          <div class="info-box" style="margin:16px 0;">
            <div class="info-title">🚀 Key Innovations (Slides 31–32)</div>
            <p><strong>1. First large-scale ReLU:</strong> Replaced tanh activations with $\\text{ReLU}(x) = \\max(0, x)$, speeding up gradient descent convergence by $6\\times$ without saturating!</p>
            <p><strong>2. Massive Data Augmentation:</strong> $2048\\times$ augmentation using random crops, horizontal flips, and PCA color jittering.</p>
            <p><strong>3. Dropout ($p=0.5$):</strong> Applied to FC6 and FC7 to prevent massive overfitting on 60M parameters.</p>
            <p><strong>4. Local Response Normalization (LRN):</strong> Later superseded by Batch Normalization.</p>
          </div>
        </div>
      `;
    } else if (arch === 'vgg') {
      content = `
        <div class="lab-card glass-panel" style="margin-bottom:20px;">
          <div class="lab-card-header">
            <h3>VGGNet (Simonyan & Zisserman — Oxford 2014)</h3>
            <span class="badge" style="background:var(--cyan-500); color:black; padding:4px 8px; border-radius:6px; font-size:0.75rem;">Top-5 Error: 7.3%</span>
          </div>
          <p>Pioneered architectural simplicity: replaced large filters ($11\\times 11, 7\\times 7$) exclusively with homogeneous stacks of tiny $3\\times 3$ filters with stride 1 and pad 1.</p>
          <div class="info-box" style="margin:16px 0; border-left-color:var(--cyan-400);">
            <div class="info-title">💡 The $3\\times 3$ Stacking Theorem (Slide 33 Exam Favorite!)</div>
            <p>A stack of two $3\\times 3$ conv layers has an effective receptive field of $5\\times 5$. But compare their parameter count:</p>
            <div class="formula">
              \\text{Two } 3\\times 3 \\text{ convs}: 2 \\times (3 \\times 3 \\times C^2) = \\mathbf{18 C^2} \\quad < \\quad \\text{One } 5\\times 5 \\text{ conv}: 1 \\times (5 \\times 5 \\times C^2) = \\mathbf{25 C^2}
            </div>
            <p><strong>Result:</strong> $28\\%$ fewer parameters, plus two non-linear ReLU activations instead of one, giving the network vastly greater expressive representation power!</p>
          </div>
        </div>
      `;
    } else if (arch === 'googlenet') {
      content = `
        <div class="lab-card glass-panel" style="margin-bottom:20px;">
          <div class="lab-card-header">
            <h3>GoogLeNet / Inception (Szegedy et al. — 2014)</h3>
            <span class="badge" style="background:var(--emerald-500); color:black; padding:4px 8px; border-radius:6px; font-size:0.75rem;">Top-5 Error: 6.7%</span>
          </div>
          <p>22 layers deep, yet used only ~5M parameters ($12\\times$ fewer than AlexNet) thanks to $1\\times 1$ conv bottlenecks and Global Average Pooling.</p>
          <div class="info-box" style="margin:16px 0; border-left-color:var(--emerald-400);">
            <div class="info-title">📉 The $1\\times 1$ Bottleneck FLOP Reduction (Slide 36 Exact Numbers)</div>
            <p>Consider an Inception module taking $28 \\times 28 \\times 192$ input and producing 32 feature maps of size $28 \\times 28$ via $5\\times 5$ conv:</p>
            <ul>
              <li><strong>Without $1\\times 1$ Bottleneck:</strong> $28 \\times 28 \\times 32 \\times (5 \\times 5 \\times 192) \\approx \\mathbf{120.4\\text{M operations}}$</li>
              <li><strong>With $1\\times 1$ Bottleneck (192 $\\to$ 16 $\\to$ 32):</strong>
                <br>Step 1 ($1\\times 1$ conv): $28 \\times 28 \\times 16 \\times (1 \\times 1 \\times 192) \\approx 2.4\\text{M ops}$
                <br>Step 2 ($5\\times 5$ conv): $28 \\times 28 \\times 32 \\times (5 \\times 5 \\times 16) \\approx 10.0\\text{M ops}$
                <br><strong>Total ops:</strong> $2.4\\text{M} + 10.0\\text{M} = \\mathbf{12.4\\text{M operations}}$ (Slashing FLOPs by nearly $10\\times$!)
              </li>
            </ul>
            <p>Across the whole Inception module, total operations drop from <strong>854M ops to 99.5M ops!</strong></p>
          </div>
        </div>
      `;
    } else if (arch === 'resnet') {
      content = `
        <div class="lab-card glass-panel" style="margin-bottom:20px;">
          <div class="lab-card-header">
            <h3>ResNet (He, Zhang, Ren, & Sun — 2015)</h3>
            <span class="badge" style="background:var(--amber-400); color:black; padding:4px 8px; border-radius:6px; font-size:0.75rem;">Top-5 Error: 3.57% (Superhuman!)</span>
          </div>
          <p>Revolutionized deep learning by enabling 152 layers to train successfully using Residual Skip Connections.</p>
          <div class="info-box" style="margin:16px 0; border-left-color:var(--amber-400);">
            <div class="info-title">⚡ The Degradation Problem & The Identity Gradient Highway (Slides 40–41)</div>
            <p><strong>The Degradation Problem:</strong> As plain networks grew deeper (e.g. 56 layers vs 20 layers), <em>training error increased</em>! It wasn't overfitting — deeper models simply couldn't be optimized due to vanishing gradients.</p>
            <p><strong>The Residual Solution:</strong> Instead of fitting $H(x)$, fit residual mapping $\\mathcal{F}(x) = H(x) - x$, giving:</p>
            <div class="formula">H(x) = \\mathcal{F}(x) + x</div>
            <p>During backpropagation, the gradient of the loss $\\mathcal{E}$ with respect to layer input $x$ is:</p>
            <div class="formula">
              \\frac{\\partial \\mathcal{E}}{\\partial x} = \\frac{\\partial \\mathcal{E}}{\\partial H} \\frac{\\partial H}{\\partial x} = \\frac{\\partial \\mathcal{E}}{\\partial H} \\left( \\frac{\\partial \\mathcal{F}(x)}{\\partial x} + 1 \\right) = \\frac{\\partial \\mathcal{E}}{\\partial H} \\frac{\\partial \\mathcal{F}}{\\partial x} + \\mathbf{\\frac{\\partial \\mathcal{E}}{\\partial H}}
            </div>
            <p><strong>The $+1$ Identity Term:</strong> Even if $\\frac{\\partial \\mathcal{F}}{\\partial x} \\approx 0$ (vanishing gradient), the additive $+1$ term passes the upstream gradient directly backwards without attenuation! This gradient highway completely conquered vanishing gradients.</p>
          </div>
        </div>
      `;
    }
    container.innerHTML = content;
    renderMath(container);
  }

  // Hook arch tabs
  document.querySelectorAll('.arch-tab').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.arch-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderArch(btn.dataset.arch);
    };
  });

  renderArch('alexnet');
}

function initCnnKernel() {
  const canvas = document.getElementById('conv-kernel-canvas');
  const matrixDisp = document.getElementById('kernel-matrix-display');
  if (!canvas || !matrixDisp) return;

  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  // Synthetic image grid (14x9 pixels)
  const cols = 14, rows = 9;
  const pw = Math.floor(W / cols);
  const ph = Math.floor(H / rows);

  // Generate synthetic image with vertical and horizontal edges
  const imgData = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      if (c >= 6 && c <= 8) {
        row.push(220); // Bright vertical stripe
      } else if (r >= 4 && r <= 5) {
        row.push(180); // Bright horizontal bar
      } else {
        row.push(40); // Dark background
      }
    }
    imgData.push(row);
  }

  const KERNELS = {
    sobelX: {
      name: 'Sobel G_x (Vertical Edges)',
      weights: [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
      ],
      bias: 0
    },
    sobelY: {
      name: 'Sobel G_y (Horizontal Edges)',
      weights: [
        [-1, -2, -1],
        [ 0,  0,  0],
        [ 1,  2,  1]
      ],
      bias: 0
    },
    blur: {
      name: 'Box Blur',
      weights: [
        [1/9, 1/9, 1/9],
        [1/9, 1/9, 1/9],
        [1/9, 1/9, 1/9]
      ],
      bias: 0
    },
    sharpen: {
      name: 'Sharpen Filter',
      weights: [
        [ 0, -1,  0],
        [-1,  5, -1],
        [ 0, -1,  0]
      ],
      bias: 0
    }
  };

  let hoverCol = 4, hoverRow = 4;

  function renderKernelCanvas() {
    ctx.clearRect(0, 0, W, H);

    // Draw base pixel grid
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const val = imgData[r][c];
        ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
        ctx.fillRect(c * pw, r * ph, pw - 1, ph - 1);
      }
    }

    // Highlight 3x3 filter window
    const kLeft = Math.max(0, Math.min(cols - 3, hoverCol - 1));
    const kTop = Math.max(0, Math.min(rows - 3, hoverRow - 1));

    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.strokeRect(kLeft * pw, kTop * ph, 3 * pw, 3 * ph);

    // Center output pixel dot
    ctx.fillStyle = '#67e8f9';
    ctx.beginPath();
    ctx.arc((kLeft + 1) * pw + pw / 2, (kTop + 1) * ph + ph / 2, 5, 0, Math.PI * 2);
    ctx.fill();

    // Compute live convolution dot product
    const kernel = KERNELS[state.cnn.kernel];
    let sum = 0;
    let terms = [];

    for (let kr = 0; kr < 3; kr++) {
      for (let kc = 0; kc < 3; kc++) {
        const pixelVal = imgData[kTop + kr][kLeft + kc];
        const w = kernel.weights[kr][kc];
        const prod = pixelVal * w;
        sum += prod;
        terms.push({ pixelVal, w: typeof w === 'number' && !Number.isInteger(w) ? w.toFixed(2) : w, prod: Math.round(prod) });
      }
    }

    const activation = Math.max(0, Math.round(sum + kernel.bias)); // ReLU

    matrixDisp.innerHTML = `
      <div style="font-size:0.9rem; margin-bottom:12px;">
        <strong>Active Filter:</strong> <span style="color:var(--amber-400);">${kernel.name}</span>
      </div>

      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:6px; max-width:320px; margin:0 auto 16px;">
        ${terms.map(t => `
          <div style="background:var(--bg-tertiary); padding:6px; border-radius:6px; font-size:0.75rem; text-align:center; border:1px solid var(--border-color);">
            <div style="color:var(--text-muted); font-size:0.65rem;">$x=${t.pixelVal}$</div>
            <div style="color:var(--amber-400); font-weight:bold;">$w=${t.w}$</div>
            <div style="color:var(--cyan-400); font-size:0.7rem;">=${t.prod}</div>
          </div>
        `).join('')}
      </div>

      <div class="formula">
        z = w^T x + b = \\sum_{i=1}^9 w_i x_i = ${Math.round(sum)} \\implies \\text{ReLU}(z) = \\mathbf{${activation}}
      </div>
      <p style="font-size:0.75rem; color:var(--text-muted); text-align:center; margin-top:8px;">
        Hover anywhere on the canvas to compute the local receptive field dot product!
      </p>
    `;

    renderMath(matrixDisp);
  }

  canvas.onmousemove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    hoverCol = Math.floor(x / pw);
    hoverRow = Math.floor(y / ph);
    renderKernelCanvas();
  };

  // Kernel buttons
  document.querySelectorAll('#kernel-select-group button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#kernel-select-group button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.cnn.kernel = btn.dataset.kernel;
      renderKernelCanvas();
    };
  });

  renderKernelCanvas();
}


// ========================== INITIALIZATION ==========================
function initAll() {
  renderSyllabusTimeline();
  initParticles();
  animateHeroNetwork();
  renderCurriculumCards();
  updateGlobalProgress();
  initMatrixStudioState();
  navigateTo('home');
  renderMath();
  setTimeout(() => renderMath(), 200);
  setTimeout(() => renderMath(), 800);
}

document.addEventListener('DOMContentLoaded', initAll);

