---
layout: course
title: About my first work
description: This note records my understanding and insights into certain concepts while completing my first task (hidden image).
---

2026.8.26

目前第一个work基本接近尾声了，论文OK了，还差一个代码仓库没弄好，现在来简单记录下做了什么事

## Prerequisites

**Spatial domain（空间域）**：图像原本的像素/latent 排布空间，直接表示每个位置的亮度、颜色或特征值。

**Frequency domain（频域）**：把图像拆成不同频率的正余弦成分后得到的表示，用来观察图像的整体结构、边缘、纹理和噪声分布。

**FFT**：把图像从空间域转化到频域

“好比把一首已经录好的交响乐（空间域），反向拆解成了它对应的乐谱（频域）。在听交响乐时，听到的是所有乐器混在一起的声音；但在乐谱上能精确地看到这里有几把小提琴的高音，那里有几把大提琴的低音”

**IFFT**：把频域表示重新还原回空间域图像。

**Phase**：表示不同频率成分在空间中如何对齐，主要就保存着图像的结构信息。

## 动机

读了[PTDiffusion](https://xianggao1102.github.io/PTDiffusion_webpage/)后感觉这个隐藏图任务还是比较有意思的：给一张ref图，一句prompt，然后生成的图片把ref图藏在prompt生成的这个场景中。具体例子可以看下面的图:

<p align="center">
  <img src="/assets/images/1.png" alt="hiddenimage" style="max-width: 80%; height: auto;">
</p>

就打算从他这个角度入手找找问题，看看能不能做一些improve

This course provides a comprehensive introduction to data science principles and practices. Students will:

- Learn the end-to-end data science workflow
- Gain practical experience with data manipulation tools
- Develop skills in data visualization and communication
- Apply statistical methods to derive insights from data

## Prerequisite

- Basic programming knowledge (preferably in Python)
- Introductory statistics
- Comfort with basic algebra

## Textbooks
