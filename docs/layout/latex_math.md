---
counter: true
---

# LateX数学公式
在 Markdown 中使用 LaTeX 数学公式，通常是通过数学插件（如 MathJax 或 KaTeX）实现的。绝大多数 Markdown 编辑器（如 Typora, Obsidian, VS Code, GitHub）都支持这种语法。

以下是 LaTeX 数学公式的**全能指南**，按分类整理，方便查找。

---

### 公式输入基础

1.  **行内公式 (Inline Math)**：用一对 `$` 包裹。
    *   语法：`$E=mc^2$`
    *   效果：$E=mc^2$
2.  **块级公式 (Block Math)**：用两对 `$$` 包裹，公式会居中并独立成行。
    *   语法：
        ```latex
        $$ \frac{-b \pm \sqrt{b^2-4ac}}{2a} $$
        ```

---

### 希腊字母

| 字符 | 语法 | 字符 | 语法 | 大写 | 语法 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| $\alpha$ | `\alpha` | $\beta$ | `\beta` | $\Gamma$ | `\Gamma` |
| $\gamma$ | `\gamma` | $\delta$ | `\delta` | $\Delta$ | `\Delta` |
| $\epsilon$ | `\epsilon` | $\zeta$ | `\zeta` | $\Theta$ | `\Theta` |
| $\eta$ | `\eta` | $\theta$ | `\theta` | $\Lambda$ | `\Lambda` |
| $\lambda$ | `\lambda` | $\mu$ | `\mu` | $\Xi$ | `\Xi` |
| $\pi$ | `\pi` | $\rho$ | `\rho` | $\Pi$ | `\Pi` |
| $\sigma$ | `\sigma` | $\tau$ | `\tau` | $\Sigma$ | `\Sigma` |
| $\phi$ | `\phi` | $\psi$ | `\psi` | $\Phi$ | `\Phi` |
| $\omega$ | `\omega` | $\chi$ | `\chi` | $\Omega$ | `\Omega` |

---

### 上标、下标、根号与分式

1.  **上下标**：
    *   上标：`x^2` $\rightarrow x^2$
    *   下标：`x_i` $\rightarrow x_i$
    *   组合使用：`x_i^n` $\rightarrow x_i^n$
    *   多字符必须用 `{}`：`e^{i\pi} + 1 = 0` $\rightarrow e^{i\pi} + 1 = 0$
2.  **分式 (Fractions)**：
    *   `\frac{分子}{分母}`：`\frac{1}{2}` $\rightarrow \frac{1}{2}$
3.  **根号 (Roots)**：
    *   平方根：`\sqrt{x}` $\rightarrow \sqrt{x}$
    *   n次方根：`\sqrt[n]{x}` $\rightarrow \sqrt[n]{x}$

---

### 运算符与数学符号

1.  **算术运算**：
    *   乘法：`\times` ($\times$)，`\cdot` ($\cdot$)
    *   除法：`\div` ($\div$)
    *   正负号：`\pm` ($\pm$)，`\mp` ($\mp$)
2.  **关系符号**：
    *   不等于：`\neq` ($\neq$)
    *   约等于：`\approx` ($\approx$)
    *   大于等于：`\geq` ($\geq$)
    *   小于等于：`\leq` ($\leq$)
    *   远大于：`\gg$ ($\gg$)
3.  **逻辑与集合**：
    *   属于：`\in$ ($\in$)，`\notin` ($\notin$)
    *   子集：`\subset` ($\subset$)，`\subseteq` ($\subseteq$)
    *   交集/并集：`\cap` ($\cap$)，`\cup` ($\cup$)
    *   任意/存在：`\forall` ($\forall$)，`\exists` ($\exists$)
    *   无穷：`\infty` ($\infty$)

---

### 括号与大型运算符

1.  **自动调整大小的括号**：
    *   使用 `\left(` 和 `\right)`。
    *   示例：`\left( \frac{1}{2} \right)` $\rightarrow \left( \frac{1}{2} \right)$（括号会随内容变高）
2.  **累加、累乘、积分**：
    *   累加：`\sum_{i=1}^{n}` $\rightarrow \sum_{i=1}^{n}$
    *   累乘：`\prod_{i=1}^{n}` $\rightarrow \prod_{i=1}^{n}$
    *   积分：`\int_a^b` $\rightarrow \int_a^b$
    *   二重积分：`\iint` ($\iint$)
    *   极限：`\lim_{x \to \infty}` $\rightarrow \lim_{x \to \infty}$

---

### 矩阵

使用 `\begin{matrix}` 环境。常用的有：

*   `matrix` (无括号)
*   `pmatrix` (圆括号 `()`)
*   `bmatrix` (方括号 `[]`)
*   `vmatrix` (行列式 `||`)

```latex
$$
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
$$
```
渲染为：

$$\begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

---

### 方程组与分段函数

使用 `cases` 环境：
```latex
$$
f(n) =
\begin{cases} 
n/2,  & \text{if } n \text{ is even} \\
3n+1, & \text{if } n \text{ is odd}
\end{cases}
$$
```
渲染为：

$$f(n) = \begin{cases} n/2, & \text{if } n \text{ is even} \\ 3n+1, & \text{if } n \text{ is odd} \end{cases}$$

---

### 公式对齐

当需要写很长的推导过程且需要等号对齐时，使用 `aligned` 环境，并在对齐点放置 `&`。
```latex
$$
\begin{aligned}
(a+b)^2 &= (a+b)(a+b) \\
        &= a^2 + ab + ba + b^2 \\
        &= a^2 + 2ab + b^2
\end{aligned}
$$
```
渲染为：

$$\begin{aligned} (a+b)^2 &= (a+b)(a+b) \\ &= a^2 + ab + ba + b^2 \\ &= a^2 + 2ab + b^2 \end{aligned}$$

---

### 字体修饰与空格

1.  **字体样式**：
    *   数学正体：`\mathrm{text}` $\rightarrow \mathrm{text}$
    *   数学粗体：`\mathbf{text}` $\rightarrow \mathbf{text}$
    *   数学文本：`\text{内容}` $\rightarrow \text{内容}$ (在公式中插入中文必须用这个)
2.  **空格**：
    *   LaTeX 会忽略公式中的普通空格。需使用：
        *   小空格：`\,`
        *   中空格：`\;`
        *   大空格：`\quad`
        *   双大空格：`\qquad`

---

### 常用箭头

| 箭头 | 语法 | 箭头 | 语法 |
| :--- | :--- | :--- | :--- |
| $\to$ | `\to` 或 `\rightarrow` | $\Rightarrow$ | `\Rightarrow` |
| $\gets$ | `\gets` | $\Leftarrow$ | `\Leftarrow` |
| $\leftrightarrow$ | `\leftrightarrow` | $\Leftrightarrow$ | `\Leftrightarrow$ |
| $\uparrow$ | `\uparrow` | $\downarrow$ | `\downarrow` |

---

### 💡 小贴士
*   **在线调试**：如果不确定语法，可以在 [codecogs](https://editor.codecogs.com/) 或 [Overleaf](https://www.overleaf.com/) 上实时预览。
*   **转义符号**：如果想在数学公式里显示 `$`，请使用 `\$`。
*   **换行**：在矩阵或多行公式中，使用 `\\` 表示换行。