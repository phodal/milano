## Stage 设计


生命周期设计：

 - 初始化，初始化 stage，资源加载器等
 - 加载（load），初始化所需要的资源
 - 运行（start），开始运行 Stage
 - 结束应用状态（endStage），删除应用的所有回调，事件等
 - 关闭应用（finish），结束应用，并切换到下一个 Stage

相关的周期实现逻辑在 ``TransitionScene.js`` 文件中：

 - 
