## Stage 设计


生命周期设计：

 - 初始化，初始化 stage，资源加载器等
 - 加载（load），初始化所需要的资源
 - 运行（start），开始运行 Stage
 - 结束应用状态（endStage）
    - 删除应用的所有监听
    - 移除 stage 的所有 child
    - 关闭 tick 事件
 - 关闭应用（finish）
    - 调用结束应用
    - 切换到下一个 Stage

相关的周期实现逻辑在 ``TransitionScene.js`` 文件中：

 - 
