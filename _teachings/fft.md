---
layout: course
title: About my first work
description: This note records my understanding and insights into certain concepts while completing my first task (OnePhase).
---

2026.8.26

目前第一个work基本接近尾声了，论文OK了，还差一个代码仓库没弄好，现在来简单记录下做了什么事

## Motivation

读了[PTDiffusion](https://xianggao1102.github.io/PTDiffusion_webpage/)后感觉这个隐藏图任务还是比较有意思的：给一张ref图，一句prompt，然后生成的图片把ref图藏在prompt生成的这个场景中。具体例子可以看下面的图:

<p align="center">
  <img src="/assets/images/1.png" alt="hiddenimage" style="max-width: 80%; height: auto;">
</p>

他的核心思想也比较清晰，就是**图像的phase决定着图像的结构信息**。于是就设计了一个叫ptm的模块，在latent空间里把ref图的phase和prompt指导生成的噪点图的phase做一个简单的系数融合，然后因为他是建立在多步去噪生成模型上做的，所以他就把时间步引入到phase的系数进行调控，对每一步使用ptm的强度做限制

于是我就打算从他这个任务入手找找问题，看看能不能做一些improvement

复现了PTDiffusion后自己用大量ref和prompts生成了不少图，代码也研究了很久，主要发现两个可以做improve的地方：

- 模型生成的图片质量有限（可能是用的sd1.5，模型太老）
- 模型生成速度太慢，一张图要等个半分钟才出来（ddim多步去噪）

前期一直在图片质量的角度去想着怎么提升，不断的读论文，最开始我觉得ptd他完全没把ref图的magnitude用上，就觉得可能是这个magnitude没处理导致生成的图像有些细节不足（这个任务比较独特的一点就是评判标准很模糊，都是通过自己的感觉来判断图生成的质量）。我刚开始一度以为magnitude是控制图像细节的，于是对magnitude做了一些简单的数学处理后把它用到ptd里，结果发现生成图完全崩坏，后面仔细了解才知道magnitude是决定能量分布的，不是所谓的细节，所以去处理magnitude这条路走不通

| 维度 | 低频 (Low Frequency) | 高频 (High Frequency) |
| --- | --- | --- |
| **相位 (Phase)** | 决定大面积区域/宏观主体的**位置与空间布局** | 决定局部边缘、细微纹理的**精确空间位置** |
| **幅值 (Magnitude)** | 决定整体的**亮度分布与基调能量** | 决定边缘与纹理的**对比度、锐度与丰富度** |

后面又读到几篇做onestep T2I的文章，于是开始转向从速度的角度做improve，在和老师的几次讨论下觉得可以用onestep的模型去试试能不能完成这个隐藏图任务，果然是可以的，基本idea就此形成

## What Did I Do

我设计的这个架构（OnePhase）还是比较朴素的，这也是听了导师给我的建议（他说一般领域内的第一个方法，通常比较设计上可以非常朴素的，不要把它想的很难）。而且onestep的T2I模型可以入手的地方实在不多

简单来说，我设计了一个叫sspf的组件用来融合参考图的结构到噪声图中，然后分别在进入onestep的unet前和unet的midblock使用sspf，具体流程如下：

<p align="center">
  <img src="/assets/images/2.png" alt="hiddenimage" style="max-width: 80%; height: auto;">
</p>

我的这个sspf融合是和频域相关的，和ptd不一样的是，我只取了参考图的**低频**相位，而不是全部相位，因为单步生成不像多步去噪那样可以有很多地方做refine，如果取了全部相位，那么会导致结果图严重失去视觉平衡效果（ref图会很突兀）

在midblock重新使用sspf也是为了让图像的最终效果更好：如果仅在最开始用sspf，由于图像的分辨率较高，phase展示的结构边缘信息会非常明显，导致最终生图出现不自然的怪异边缘伪影。相反，midblock他的分辨度是整个去噪过程中最低的，于是我就在midblock在用一次sspf，这样能够显著圆滑原本生硬的边界

框架本来其实还加了一个在skip connection的调控，但是发现效果和不放没太大差别，于是就删了

至于最终生成图的效果，我还是很惊喜的，OnePhase生成的图像效果在多项指标上都远超ptdiffusion，也进行了userstudy，具体的实验在文章中写的比较详细，我就不再描述。

以下展示些我的效果图：

<p align="center">
  <img src="/assets/images/3.png" alt="hiddenimage" style="max-width: 100%; height: auto;">
</p>


## Reflection and Summary

这算是我第一次完整的完成一项科研工作，也让我知道科研没有想象的那么遥不可及，只要专心去做，一定会有结果的，目前虽然不知道文章能不能中，但是最宝贵的还是自己完成一个work的过程，从读论文，找idea，设计方法，做实验，画图，写论文，收获实在太多。这里尤其要感谢我的导师，给我提供经费租服务器，在整个过程中持续给我建议，给我指明方向，帮我改论文。

反思的话就是如下几点：

- 做实验，设计方法之前一定要动脑子，仔细思考这一步是不是有用的，要把所有可能的结果都考虑上，要不然很容易给自己挖坑，我就因为设计一个实验时候随随便便导致白跑服务器一天，结果全部没用

- 有些事情，拿ai做效率是远高于自己做的，但不是说让你啥都问ai，会用ai和乱用ai完全两码事








