---
layout: course
title: About Frequency domain and FFT
description: This note records my understanding and insights into certain concepts while completing my first task (hidden image).
---

## Some important concepts

**Spatial domain（空间域）**：图像原本的像素/latent 排布空间，直接表示每个位置的亮度、颜色或特征值。

**Frequency domain（频域）**：把图像拆成不同频率的正余弦成分后得到的表示，用来观察图像的整体结构、边缘、纹理和噪声分布。

DFT（离散傅里叶变换）：把离散图像从空间域转换到频域的数学变换。

FFT（快速傅里叶变换）：DFT 的高效计算方法，结果本质上还是频域的复数表示。

IFFT（逆傅里叶变换）：把频域表示重新还原回空间域图像。

Complex spectrum（复数频谱）：FFT 的结果是复数，每个频率点同时包含 magnitude 和 phase。

Magnitude / Amplitude（幅值）：表示某个频率成分“有多强”，通常和图像能量、对比度、纹理强度相关。

Phase（相位）：表示不同频率成分在空间中如何对齐，强烈影响图像结构、轮廓、位置和形状组织。

Power spectrum（功率谱）：通常是 magnitude 的平方，用来衡量各频率上的能量分布。

Energy（能量）：在频域里主要由 magnitude 决定，直观上表示图像信号强度集中在哪些频率上。

Parseval theorem（帕塞瓦尔定理）：空间域图像的总能量等价于频域 magnitude 平方的总和。

DC component（直流分量）：频率为 0 的成分，表示图像的平均亮度或整体偏置。

Low frequency（低频）：变化慢的成分，通常对应大尺度轮廓、整体布局、粗结构和光照趋势。

High frequency（高频）：变化快的成分，通常对应边缘、细节、纹理、噪声和锐利变化。

Mid frequency（中频）：介于粗结构和细纹理之间，常影响局部形状、器官级结构、区域边界和较大的纹理模式。

fftshift：把频谱中心移动到图像中央，方便用半径 mask 选择低频或高频区域。

Frequency radius / r（频率半径）：以频谱中心为原点，用归一化半径控制保留多少低频区域。

Low-pass mask（低通掩码）：只保留低频成分，抑制高频细节和噪声。

High-pass mask（高通掩码）：只保留高频成分，突出边缘、纹理和局部变化。

Band-pass mask（带通掩码）：只保留某一段频率，用来观察或控制中尺度结构。

Hard mask（硬掩码）：某个半径内直接取 1、外面直接取 0，简单但边界突兀。

Soft mask（软掩码）：在频率边界附近平滑过渡，减少频域截断造成的振铃或不稳定。

Alpha（融合强度）：控制参考图 phase 或频域信息注入的比例，越大说明参考结构约束越强。

Radius（融合范围）：控制参与注入的频率范围，越大说明更多中高频结构也被参考图影响。

Phase-only reconstruction（仅相位重建）：保留 phase、统一或丢弃 magnitude 后重建图像，用来观察 phase 本身携带的结构信息。

Magnitude-only reconstruction（仅幅值重建）：保留 magnitude、随机或清零 phase 后重建图像，通常结构会明显混乱。

Fourier fusion（频域融合）：把一个图像的某些频率信息替换或混合到另一个图像中。

Phase injection（相位注入）：把 reference 的某个频率范围内的 phase 注入到 noise / latent / feature 中，用 reference 结构影响生成结果。

Low-frequency phase injection（低频相位注入）：只把 reference 的低频 phase 放入生成起点或中间特征，目标是传递粗结构而不是细节纹理。

Latent-space FFT（latent 空间 FFT）：不是在 RGB 图像上做 FFT，而是在 VAE latent 或 UNet feature 上分析频率结构。

VAE latent（VAE 潜变量）：SDXL 把图像压缩到 latent 空间后再生成，latent 的频率不等同于像素频率，但仍保留空间结构。

Noise latent（初始噪声 latent）：扩散模型生成的起点，本身接近随机，但它的频域 phase/magnitude 仍可被人为改造。

Reference latent（参考图 latent）：reference 图经过 VAE encode 后得到的 latent，可以从中提取结构性 phase 信息。

UNet block frequency（UNet block 频率特征）：不同 UNet block 对应不同空间分辨率，因此可以理解为处理不同尺度的结构和细节。

Mid-block injection（midblock 注入）：在 UNet 最低分辨率/瓶颈位置注入 reference 结构，更容易影响全局布局和粗结构。

Skip connection（跳跃连接）：UNet 中连接 encoder 和 decoder 的路径，常保留空间细节和局部结构。

Down block（下采样块）：UNet 编码阶段逐步降低分辨率，倾向于把局部图像压缩成更抽象的结构表示。

Up block（上采样块）：UNet 解码阶段逐步恢复分辨率，倾向于生成细节、纹理和最终可见内容。

Block-wise control（分块控制）：根据 UNet 不同 block 的分辨率和语义层级，设计不同强度或不同范围的注入策略。

Frequency-domain hidden image（频域隐藏图）：通过低频结构或 phase 控制，让生成图表面符合 prompt，但内部隐含 reference 轮廓或结构。

This course provides a comprehensive introduction to data science principles and practices. Students will:

- Learn the end-to-end data science workflow
- Gain practical experience with data manipulation tools
- Develop skills in data visualization and communication
- Apply statistical methods to derive insights from data

## Prerequisites

- Basic programming knowledge (preferably in Python)
- Introductory statistics
- Comfort with basic algebra

## Textbooks
