# 🧠 Deep Learning Foundations — Interactive Academy
> **Course:** Deep Learning Foundations (WS 2026/27, Leibniz Universität Hannover)  
> **Instructor:** Prof. Sandipan Sikdar · **TA:** Tobias Kalmbach  
> **Live App:** [https://riddhadipta.github.io/deep-and-Learning/](https://riddhadipta.github.io/deep-and-Learning/)

An interactive, university-grade educational web application built for **Deep Learning Foundations**. Designed to master theoretical foundations, multivariable derivations, geometric intuitions, and real-time simulations from the lecture slides.

---

## 🚀 Features & Modules

### 🏛️ Module 1: Foundations, ERM & Perceptrons (Lecture 1)
- **Supervised Learning Framework & ERM:** Formal definitions of training sets $\mathcal{D} = \{(x^i, y^i)\}$, loss functions, and Empirical Risk Minimization.
- **The Linear Collapse Theorem:** Mathematical proof that stacking linear layers $\phi(z) = z$ without non-linearities collapses algebraically to a single linear model ($W_{\text{eff}} x + b_{\text{eff}}$).
- **Analytical Loss Derivations:** Mean Squared Error (MSE), Bernoulli Likelihood $\to$ Binary Cross-Entropy (BCE), Softmax $\to$ Categorical Cross-Entropy.
- **Matrix Formulation & 10-Fold Cross-Validation:** Batch tensor shapes $Z = XW + B$ and variance-reducing cross-validation protocols.

### ⚡ Module 2: Optimization, Backpropagation & Normalization (Lecture 2)
- **Computation Graph & Reverse Backpropagation:** Interactive computation graph of $e = (a+b)(b+1)$ implementing the **Branch Sum Rule** on fan-out nodes ($\frac{\partial e}{\partial b} = 5$).
- **The Optimizer Arena:** Real-time 2D simulation over an anisotropic ravine ($f(x, y) = 0.5x^2 + 10y^2$) comparing:
  - Vanilla SGD (ravine oscillation)
  - Polyak Momentum ($\gamma=0.9$, oscillation damping)
  - Nesterov Accelerated Gradient (NAG, look-ahead braking)
  - Adagrad (coordinate-wise decay)
  - Adam (1st/2nd moments + early step **bias correction** $\hat{m}_t = \frac{m_t}{1-\beta_1^t}$)
- **Weight Initialization Dynamics:** 10-layer variance propagation visualizer demonstrating why:
  - Zero initialization traps neurons in a symmetry lock.
  - Standard Normal $\mathcal{N}(0, 1)$ explodes or vanishes ($10^{-7}$).
  - Xavier/Glorot variance halves at every layer with ReLU ($2^{-L}$).
  - Kaiming/He restores stable variance ($\text{Var} \approx 1.0$) by multiplying variance by 2.
- **Normalization Lab:** Matrix visualization comparing **Batch Normalization** (vertical across batch $N$, with frozen running averages at test time) vs. **Layer Normalization** (horizontal across features $D$, sample-independent).

### 👁️ Module 3: Deeper Architectures I — CNNs & Image Recognition (Lecture 3)
- **Spatial Geometry & Parameter Counter:** Interactive calculation of:
  $$N_{\text{out}} = \left\lfloor \frac{N - F + 2P}{S} \right\rfloor + 1$$
  $$\mathbf{\text{Params} = C_{\text{out}} \times (F^2 \cdot C_{\text{in}} + 1)}$$
  and confirmation that Max Pooling layers have **0 learnable parameters**.
- **Landmark Architectures Explorer:**
  - **AlexNet (2012):** Large-scale ReLU ($6\times$ faster convergence), $2048\times$ data augmentation, Dropout $0.5$.
  - **VGGNet (2014):** $3\times 3$ stacking theorem ($18C^2 < 25C^2$ parameter savings + 2 ReLUs).
  - **GoogLeNet / Inception (2014):** $1\times 1$ bottleneck convs slashing operations from **854M to 99.5M ops**, Global Average Pooling (GAP).
  - **ResNet (2015):** The Degradation Problem and the **Identity Gradient Highway** ($\frac{\partial \mathcal{E}}{\partial x} = \frac{\partial \mathcal{E}}{\partial H}(\frac{\partial \mathcal{F}}{\partial x} + 1)$).
- **2D Convolution & Sobel Filter Studio:** Mouse-guided receptive field dot product $w^T x + b$ with Sobel edge detectors ($G_x, G_y$), box blur, and sharpen filters.

### 📝 Exam Quiz Arena
- Comprehensive exam-grade multiple choice quizzes for **Lecture 1**, **Lecture 2**, and **Lecture 3** with detailed step-by-step mathematical explanations targeting common exam traps.

---

## 💻 Local Development

Run locally using Python's built-in HTTP server:
```bash
python3 -m http.server 8080
```
Then open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 🔄 Adding Future Lectures

As new lectures are released throughout the semester (e.g. Lecture 4: Sequence Models & Transformers, Lecture 5: Graph Neural Networks & Halicin, Lecture 7: Generative Models & Diffusion):
1. Add new lesson content to `MODULES` in `app.js`.
2. Add exam questions to `QUIZ_DATA` in `app.js`.
3. Push to GitHub:
   ```bash
   git add .
   git commit -m "Add Lecture 4: Sequences & Self-Attention"
   git push
   ```
   GitHub Pages automatically re-deploys within 30 seconds!
