# 化疗计算器 H5
## 公式来源与计算方式

H 为身高 cm，W 为体重 kg，BSA 单位 m²。

- 成人男性：BSA = 0.00607H + 0.0127W − 0.0698。
- 成人女性：BSA = 0.00586H + 0.0126W − 0.0461。
- 药物总量 mg = 保留两位小数的 BSA × 输入的单位面积用量 mg/m²，最终取整。这是单位面积剂量换算，不推荐具体药物或用量。
- Cockcroft–Gault：CrCl = (140 − 年龄) × W ÷ (72 × Scr)，女性再乘 0.85，CrCl 单位 mL/min。
- Scr 使用 mg/dL；若输入 μmol/L，先除以 88.4。
- Calvert 文献公式：总剂量 mg = AUC × (GFR + 25)，AUC 单位 mg·min/mL。本页实际以取整 CrCl 代入，再把剂量取整；CrCl 与 GFR 不等同。
- BSA 保留两位使用 JavaScript toFixed(2)，清除率及总剂量取整使用 toFixed(0)。中间舍入属于软件规则，不应理解为文献推荐的临床舍入方法。

## 数值验证（2026-11-06）

对基准网页保存的内联计算函数进行直接执行，使用最小输入/输出适配器，逐项比较本项目输出：192 组体表面积/药量及 1,536 组清除率/卡铂剂量，共 1,728 组，全部一致。历史核对覆盖男女、成人/儿童分支（当前版本已移除儿童分支）、小数输入、两种肌酐单位及 AUC 1–8。不是浏览器点击测试或临床有效性验证，也不代表所有可能输入均相同。

本项目另有输入保护：空值、非正值和非有限数被拒绝；肾功能年龄限制 18 ≤ 年龄 < 140；清除率取整为 0 时不输出剂量。基准算法未提供同样保护，非法输入与适用边界不宣称一致。修改输入清除旧结果；切换肌酐单位清空数值；剂量计算会重新计算前一步。

不自动调整体重、肌酐下限、清除率上限或推荐 AUC。计算结果须由专业人员复核，不能直接作为处方依据。

## 文件与本地运行

`index.html` 页面；`style.css` 样式；`calculators.js` 纯计算函数；`app.js` 交互；`test.cjs` 自动化测试；`.nojekyll` 禁用 Jekyll。

可直接打开 index.html。更接近部署环境的预览：在此目录运行 `python -m http.server 8080`，打开 http://localhost:8080 。安装 Node.js 后运行 `node test.cjs` 验证公式与输入边界，无需 npm install。

## 部署到 GitHub Pages（网页操作）

1. 在 GitHub 新建仓库，例如 `medical-calculators`。使用支持 Pages 的仓库可见性及账号方案，简单起见可用公开仓库。
2. 解压项目，上传本目录中的文件到仓库根目录，确保 `index.html` 在根目录，不能额外嵌套一层文件夹。不要上传患者资料。
3. 仓库 Settings → Pages → Build and deployment：Source 选 Deploy from a branch，Branch 选 main，目录选 / (root)，保存。
4. 等待部署完成，使用 Pages 设置页提供的 HTTPS 地址。通常是 `https://你的用户名.github.io/medical-calculators/`，以实际显示为准。
5. 直达两个工具：在地址末尾加 `#bsa` 或 `#renal`。项目使用相对资源路径，无需修改仓库名前缀。
6. 更新文件并提交到 main 后会重新发布。若 404，检查分支、根目录入口和 Pages 部署记录。

参考：[GitHub 官方发布源配置](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。本交付未登录你的 GitHub、未创建仓库或执行发布。

## 发布前验收

自动测试覆盖成人男女 BSA、两种肌酐单位一致性、女性系数、中间舍入、无效输入。浏览器和微信真机验收尚未完成：发布后请在 iOS/Android 微信检查输入键盘、320px 屏宽、单位切换、结果失效和链接跳转，并请专业人员复核临床用途。

参考样例：成人男性 170 cm / 65 kg → BSA 1.79 m²；输入 100 mg/m² → 179 mg。男性 60 岁 / 65 kg / 88.4 μmol/L → CrCl 72 mL/min；AUC 5 → 485 mg。均为软件验证数据，不是用药建议。

界面分为“常用化疗药物用量计算器”和“卡铂用量计算器”。AUC 初始值及清空后的默认值为 6。
